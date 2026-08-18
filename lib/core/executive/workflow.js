// Executive-readiness workflow: Founder objective → CEO plan → C-Suite
// assessments → aggregate → Founder approval ONLY when a protected action
// is proposed. Advisory/read-only objectives complete without approval.
// Reuses the existing job queue / worker / audit path.

import * as repo from "../repo";
import { enqueueJob } from "../jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "../audit";
import { clip } from "../validate";
import { getSupabaseAdmin } from "@/lib/supabase";
import { validateExecutivePlan, aggregateExecutiveResult } from "./plan";
import { assertPlanDelegations } from "./delegation";
import { isProtectedAction } from "./policy";

export const EXECUTIVE_READINESS_STEPS = [
  "executive-ceo",
  "executive-cto",
  "executive-cpo",
  "executive-ciso",
  "executive-ceo", // synthesis
];

async function audit(entry) {
  await recordAudit(getSupabaseAdmin(), buildAuditEntry(entry));
}

function stepKey(rootKey, step) {
  return `${rootKey}:step:${step}`;
}

async function enqueueWorkflowJob(args) {
  return enqueueJob({ ...args, allowDraft: true, actorType: args.actorType || "system" });
}

/**
 * Starts an executive-readiness objective for a project.
 * @param {object} args
 * @param {string} [args.proposedAction] — if a protected action, Founder approval
 *   is required after synthesis; advisory objectives omit this.
 */
export async function startExecutiveObjective({
  projectId,
  objective,
  proposedAction = null,
  idempotencyKey = null,
  actor,
}) {
  const project = await repo.getProject(projectId);
  const rootKey =
    idempotencyKey ||
    `wf:executive-readiness:${project.id}:${clip(objective, 80).replace(/\s+/g, "-").toLowerCase()}`;

  const proposed_action = proposedAction ? clip(proposedAction, 100) : null;
  const willNeedApproval = isProtectedAction(proposed_action);

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Executive objective: ${clip(objective, 120)}`,
    description: willNeedApproval
      ? "Wave-1 executive readiness with proposed protected action — Founder approval required before that action."
      : "Wave-1 executive advisory readiness: CEO plans → CTO/CPO/CISO assess → aggregate. No protected action.",
    status: "pending",
    priority: "high",
    input: {
      workflow: "executive-readiness",
      objective,
      proposed_action,
    },
    idempotency_key: rootKey,
    // Task-level gate only when a protected action is already known at start.
    // Synthesis may still request approval if assessments propose one later.
    requires_approval: willNeedApproval,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueWorkflowJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "executive-ceo",
    workflow: "executive-readiness",
    workflowStep: 0,
    input: {
      objective,
      mode: "plan",
      proposed_action,
    },
    idempotencyKey: stepKey(rootKey, 0),
    actor,
    actorType: "admin",
  });

  if (created) {
    await audit({
      projectId: project.id,
      actor,
      actorType: "admin",
      action: AUDIT_ACTIONS.TASK_CREATED,
      resourceType: "task",
      resourceId: task.id,
      metadata: {
        workflow: "executive-readiness",
        proposed_action,
        approval_expected: willNeedApproval,
      },
    });
  }

  return { task, job, created: created && jobCreated };
}

/**
 * Builds the next executive-readiness step from a finished job output.
 * Returns { nextSlug, input } | { approval } | { halt } | { done: true }.
 */
export function buildExecutiveNextStep(job, output) {
  const step = job.workflow_step || 0;
  const prior = { ...(job.input?.prior || {}) };
  const objective = job.input?.objective || "";
  const proposed_action =
    job.input?.proposed_action ||
    job.input?.plan?.proposed_action ||
    null;

  // CASE E: cancelled — no further delegation (caller must not invoke when cancelled)
  // Handled by worker/task status checks upstream.

  // Step 0: CEO plan → validate → CTO
  if (step === 0 && job.agent_slug === "executive-ceo") {
    const planRaw = {
      ...output,
      proposed_action: output?.proposed_action || proposed_action || null,
    };
    const plan = validateExecutivePlan(planRaw, { parentSlug: "executive-ceo" });
    assertPlanDelegations(
      "executive-ceo",
      plan.workstreams.map((w) => w.owner_agent)
    );
    // Fixed readiness path requires tech/product/security owners present.
    const owners = new Set(plan.workstreams.map((w) => w.owner_agent));
    for (const required of ["executive-cto", "executive-cpo", "executive-ciso"]) {
      if (!owners.has(required)) {
        return {
          halt: "plan_missing_required_owners",
          reason: `Plan must include workstream owned by ${required}.`,
        };
      }
    }
    return {
      nextSlug: "executive-cto",
      input: {
        objective,
        mode: "assess",
        context: clip(plan.objective_summary, 4000),
        plan,
        proposed_action: plan.proposed_action,
        prior: { "executive-ceo": plan },
      },
    };
  }

  // Steps 1–2: C-Suite assessments chain
  if (job.agent_slug === "executive-cto") {
    prior["executive-cto"] = output;
    return {
      nextSlug: "executive-cpo",
      input: {
        objective,
        mode: "assess",
        plan: job.input?.plan,
        proposed_action,
        prior,
      },
    };
  }
  if (job.agent_slug === "executive-cpo") {
    prior["executive-cpo"] = output;
    return {
      nextSlug: "executive-ciso",
      input: {
        objective,
        mode: "assess",
        plan: job.input?.plan,
        proposed_action,
        prior,
      },
    };
  }

  // Step 3: CISO done → CEO synthesis
  if (job.agent_slug === "executive-ciso") {
    prior["executive-ciso"] = output;
    const plan = job.input?.plan || prior["executive-ceo"];
    const assessments = {
      "executive-cto": prior["executive-cto"],
      "executive-cpo": prior["executive-cpo"],
      "executive-ciso": output,
    };
    return {
      nextSlug: "executive-ceo",
      input: {
        objective,
        mode: "synthesize",
        plan,
        proposed_action,
        prior,
        assessments,
      },
    };
  }

  // Step 4: CEO synthesis → approval ONLY if protected action proposed (CASE B)
  // otherwise complete (CASE A). Child failure → halt (CASE C).
  if (step >= 4 && job.agent_slug === "executive-ceo") {
    const plan = job.input?.plan || job.input?.prior?.["executive-ceo"];
    const assessments = job.input?.assessments || {};
    const proposed =
      proposed_action ||
      plan?.proposed_action ||
      output?.proposed_action ||
      output?.primary_action ||
      null;

    const aggregated = aggregateExecutiveResult({
      objective,
      plan: { ...plan, proposed_action: proposed },
      assessments,
      proposedAction: proposed,
    });

    if (aggregated.status === "blocked") {
      return {
        halt: "executive_blocked",
        reason: aggregated.executive_result,
        aggregated,
      };
    }

    if (aggregated.approval_required && aggregated.approval_capability) {
      return {
        approval: {
          capability: aggregated.approval_capability,
          reason:
            `Protected action "${aggregated.primary_action}" requires Founder approval. ` +
            "No deploy, billing, secret, legal commitment, or transfer is performed automatically.",
        },
        aggregated,
      };
    }

    // CASE A — advisory complete
    return { done: true, aggregated };
  }

  return null;
}
