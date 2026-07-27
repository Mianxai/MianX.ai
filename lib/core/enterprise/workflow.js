// Enterprise-objective workflow: Founder objective → decompose → route
// workstreams (deterministic plan stored on task) → aggregate status.
// Reuses the existing job queue / worker / audit path.

import * as repo from "../repo";
import { enqueueJob } from "../jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "../audit";
import { clip } from "../validate";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isProtectedAction } from "../executive/policy";
import {
  decomposeEnterpriseObjective,
  aggregateEnterpriseStatus,
  readyWorkstreams,
  deriveEnterpriseApproval,
} from "./orchestrator";

export const ENTERPRISE_OBJECTIVE_STEPS = [
  "workflow-orchestrator", // plan / kickoff
  "workflow-orchestrator", // synthesize after workstreams
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
 * Starts an enterprise-objective for a project.
 */
export async function startEnterpriseObjective({
  projectId,
  objective,
  departmentsNeeded = [],
  riskClass = "R2",
  proposedAction = null,
  projectProfile = "mianx-core",
  workstreamOverrides = null,
  idempotencyKey = null,
  actor,
  source = "api",
}) {
  const project = await repo.getProject(projectId);
  const rootKey =
    idempotencyKey ||
    `wf:enterprise-objective:${project.id}:${clip(objective, 60).replace(/\s+/g, "-").toLowerCase()}`;

  const decomposition = decomposeEnterpriseObjective({
    objective,
    departmentsNeeded,
    riskClass,
    proposedAction,
    projectProfile,
    workstreamOverrides,
  });

  const proposed_action = proposedAction ? clip(proposedAction, 100) : null;
  const willNeedApproval = isProtectedAction(proposed_action);

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Enterprise objective: ${clip(objective, 120)}`,
    description:
      "Enterprise orchestration: decompose Founder objective into department " +
      "workstreams with explicit dependencies. Does not instantiate the full workforce.",
    status: "pending",
    priority: "high",
    input: {
      workflow: "enterprise-objective",
      objective,
      proposed_action,
      departments_needed: departmentsNeeded,
      project_profile: projectProfile,
      decomposition,
      source,
      stage: "plan",
    },
    idempotency_key: rootKey,
    requires_approval: willNeedApproval,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueWorkflowJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "workflow-orchestrator",
    workflow: "enterprise-objective",
    workflowStep: 0,
    input: {
      objective,
      mode: "plan",
      proposed_action,
      decomposition,
      workstreams: decomposition.workstreams,
      project_id: project.id,
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
        workflow: "enterprise-objective",
        workstream_count: decomposition.workstreams.length,
        forbidden_full_workforce: true,
        source,
      },
    });
  }

  return {
    task,
    job,
    decomposition,
    created: created && jobCreated,
  };
}

/**
 * Advance enterprise-objective from a finished job output.
 * Returns { nextSlug, input } | { approval } | { halt } | { done: true }.
 */
export function buildEnterpriseNextStep(job, output) {
  const step = job.workflow_step || 0;
  const objective = job.input?.objective || "";
  const proposed_action = job.input?.proposed_action || null;
  const decomposition = job.input?.decomposition || output?.decomposition || null;

  // Step 0: orchestrator plan acknowledged → mark ready workstreams and synthesize path.
  if (step === 0 && job.agent_slug === "workflow-orchestrator") {
    const workstreams = (decomposition?.workstreams || job.input?.workstreams || []).map(
      (w) => ({ ...w })
    );

    // Apply optional status updates from the agent output (tests / fake provider).
    const updates = output?.workstream_updates || output?.workstreams || null;
    if (Array.isArray(updates)) {
      for (const u of updates) {
        const target = workstreams.find((w) => w.id === u.id);
        if (target && u.status) target.status = u.status;
      }
    } else if (output?.mark_ready_succeeded) {
      for (const w of readyWorkstreams(workstreams)) {
        w.status = "succeeded";
      }
    }

    const aggregate = aggregateEnterpriseStatus(workstreams);

    // If still pending/running and no updates, advance to synthesis with current state.
    if (aggregate.status === "PENDING" || aggregate.status === "RUNNING") {
      // Auto-complete ready streams only when provider signals mark_ready_succeeded
      // or explicit updates — otherwise halt as blocked incomplete.
      if (!updates && !output?.mark_ready_succeeded) {
        return {
          nextSlug: "workflow-orchestrator",
          input: {
            objective,
            mode: "synthesize",
            proposed_action,
            decomposition: { ...decomposition, workstreams },
            workstreams,
            prior: { plan: output },
          },
        };
      }
    }

    if (
      aggregate.status === "BLOCKED" ||
      aggregate.status === "FAILED" ||
      aggregate.status === "CANCELLED" ||
      aggregate.status === "DEAD_LETTER"
    ) {
      return {
        halt: `enterprise_${aggregate.status.toLowerCase()}`,
        reason: aggregate.reason,
        aggregate,
        workstreams,
      };
    }

    if (aggregate.status === "AWAITING_APPROVAL") {
      const approval = deriveEnterpriseApproval({
        proposedAction: proposed_action,
        aggregate,
      });
      return {
        approval: {
          capability: approval.approval_capability || "approve_production_action",
          reason:
            aggregate.reason ||
            "Enterprise objective awaiting Founder approval on a protected action.",
        },
        aggregate,
        workstreams,
      };
    }

    return {
      nextSlug: "workflow-orchestrator",
      input: {
        objective,
        mode: "synthesize",
        proposed_action,
        decomposition: { ...decomposition, workstreams },
        workstreams,
        aggregate,
        prior: { plan: output },
      },
    };
  }

  // Step 1+: synthesis
  if (job.agent_slug === "workflow-orchestrator" && (job.input?.mode === "synthesize" || step >= 1)) {
    let workstreams = (job.input?.workstreams || decomposition?.workstreams || []).map((w) => ({
      ...w,
    }));

    const updates = output?.workstream_updates || null;
    if (Array.isArray(updates)) {
      for (const u of updates) {
        const target = workstreams.find((w) => w.id === u.id);
        if (target && u.status) target.status = u.status;
      }
    } else if (output?.workstreams_status === "all_required_succeeded") {
      for (const w of workstreams) {
        if (w.required !== false && !w.optional) w.status = "succeeded";
      }
    } else if (output?.status === "SUCCESS" || output?.enterprise_status === "SUCCESS") {
      for (const w of workstreams) {
        if (w.status === "pending" || w.status === "running") w.status = "succeeded";
      }
    }

    const aggregate = aggregateEnterpriseStatus(workstreams);

    if (
      aggregate.status === "BLOCKED" ||
      aggregate.status === "FAILED" ||
      aggregate.status === "CANCELLED" ||
      aggregate.status === "DEAD_LETTER"
    ) {
      return {
        halt: `enterprise_${aggregate.status.toLowerCase()}`,
        reason: aggregate.reason,
        aggregate,
        workstreams,
      };
    }

    if (aggregate.status === "AWAITING_APPROVAL") {
      const approval = deriveEnterpriseApproval({
        proposedAction: proposed_action,
        aggregate,
      });
      return {
        approval: {
          capability: approval.approval_capability || "approve_production_action",
          reason: aggregate.reason,
        },
        aggregate,
        workstreams,
      };
    }

    if (aggregate.status === "SUCCESS" || aggregate.status === "PARTIAL_SUCCESS") {
      if (isProtectedAction(proposed_action)) {
        const approval = deriveEnterpriseApproval({
          proposedAction: proposed_action,
          aggregate,
        });
        return {
          approval: {
            capability: approval.approval_capability || "approve_production_action",
            reason: `Protected action "${proposed_action}" requires Founder approval after enterprise ${aggregate.status}.`,
          },
          aggregate,
          workstreams,
        };
      }
      return { done: true, aggregate, workstreams };
    }

    // Still running — no further auto-enqueue without explicit updates.
    return {
      halt: "enterprise_incomplete",
      reason: aggregate.reason || "Enterprise workstreams incomplete.",
      aggregate,
      workstreams,
    };
  }

  return null;
}
