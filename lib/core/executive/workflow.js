// Executive-readiness workflow: Founder objective → CEO plan → C-Suite
// assessments → aggregate → Founder approval for protected launch decisions.
// Reuses the existing job queue / worker / audit path.

import * as repo from "../repo";
import { enqueueJob } from "../jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "../audit";
import { clip } from "../validate";
import { getSupabaseAdmin } from "@/lib/supabase";
import { validateExecutivePlan, aggregateExecutiveResult } from "./plan";
import { assertPlanDelegations } from "./delegation";

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
 */
export async function startExecutiveObjective({
  projectId,
  objective,
  idempotencyKey = null,
  actor,
}) {
  const project = await repo.getProject(projectId);
  const rootKey =
    idempotencyKey ||
    `wf:executive-readiness:${project.id}:${clip(objective, 80).replace(/\s+/g, "-").toLowerCase()}`;

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Executive objective: ${clip(objective, 120)}`,
    description:
      "Wave-1 executive readiness: CEO plans → CTO/CPO/CISO assess → aggregate → " +
      "Founder approval for protected launch decisions. No deploy/billing/secrets.",
    status: "pending",
    priority: "high",
    input: {
      workflow: "executive-readiness",
      objective,
    },
    idempotency_key: rootKey,
    requires_approval: true,
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
      metadata: { workflow: "executive-readiness" },
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

  // Step 0: CEO plan → validate → CTO
  if (step === 0 && job.agent_slug === "executive-ceo") {
    const plan = validateExecutivePlan(output, { parentSlug: "executive-ceo" });
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
    // If any child blocked, still synthesize (truthful blockers) then halt/approve.
    return {
      nextSlug: "executive-ceo",
      input: {
        objective,
        mode: "synthesize",
        plan,
        prior,
        assessments,
      },
    };
  }

  // Step 4: CEO synthesis → Founder approval (never auto-approve launch)
  if (step >= 4 && job.agent_slug === "executive-ceo") {
    const plan = job.input?.plan || job.input?.prior?.["executive-ceo"];
    const assessments = job.input?.assessments || {};
    const aggregated =
      output?.status && output.workstreams
        ? output
        : aggregateExecutiveResult({ objective, plan, assessments });

    if (aggregated.status === "blocked") {
      return { halt: "executive_blocked", reason: aggregated.executive_result };
    }

    return {
      approval: {
        capability: "approve_production_action",
        reason:
          "Industry OS launch readiness requires Founder approval. " +
          "No deploy, billing, secret, or legal commitment is performed automatically.",
      },
      aggregated,
    };
  }

  return null;
}
