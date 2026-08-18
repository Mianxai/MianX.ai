import * as repo from "../repo";
import { enqueueJob } from "../jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "../audit";
import { clip } from "../validate";
import { getSupabaseAdmin } from "@/lib/supabase";
import { activateOperationsPod } from "./pod";
import {
  validateOpsOutput,
  validateSupportOutput,
  validateAnalyticsOutput,
} from "./schemas";
import {
  statusPreventsSuccess,
  deriveOpsApproval,
  assertProjectScope,
} from "./policy";
import { isProtectedAction } from "../executive/policy";

async function audit(entry) {
  await recordAudit(getSupabaseAdmin(), buildAuditEntry(entry));
}

function stepKey(rootKey, step) {
  return `${rootKey}:step:${step}`;
}

async function enqueueWorkflowJob(args) {
  return enqueueJob({ ...args, allowDraft: true, actorType: args.actorType || "system" });
}

export async function startOperationsIncident({
  projectId,
  signal,
  objective = null,
  proposedAction = null,
  idempotencyKey = null,
  actor,
  source = "api",
}) {
  const project = await repo.getProject(projectId);
  assertProjectScope({ jobProjectId: project.id, requestedProjectId: projectId });

  const clippedSignal = clip(signal, 8000);
  const rootKey =
    idempotencyKey ||
    `wf:operations-incident:${project.id}:${clip(clippedSignal, 40).replace(/\s+/g, "-").toLowerCase()}`;

  const proposed_action = proposedAction ? clip(proposedAction, 100) : null;
  const willNeedApproval =
    isProtectedAction(proposed_action) || deriveOpsApproval(proposed_action).required;
  const pod = activateOperationsPod({ projectId: project.id });

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Operations incident: ${clip(clippedSignal, 100)}`,
    description:
      "Wave-4: ops coordinator → support triage → analytics. " +
      "Advisory only; production remediation remains Founder-gated.",
    status: "pending",
    priority: "high",
    input: {
      workflow: "operations-incident",
      signal: clippedSignal,
      objective: objective || clippedSignal,
      proposed_action,
      source,
      stage: "ops-coordinator",
    },
    idempotency_key: rootKey,
    requires_approval: willNeedApproval,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueWorkflowJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "ops-coordinator",
    workflow: "operations-incident",
    workflowStep: 0,
    input: {
      signal: clippedSignal,
      objective: objective || clippedSignal,
      mode: "triage",
      proposed_action,
      project_id: project.id,
      task_id: task.id,
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
      metadata: { workflow: "operations-incident", pod_instances: pod.count, source },
    });
  }

  return { task, job, pod, created: created && jobCreated };
}

export function buildOperationsIncidentNextStep(job, output) {
  const proposed_action = job.input?.proposed_action || null;
  const prior = { ...(job.input?.prior || {}) };

  if (job.agent_slug === "ops-coordinator") {
    let ops;
    try {
      ops = validateOpsOutput(output);
    } catch (err) {
      return { halt: "ops_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(ops.ops_status)) {
      return {
        halt: ops.ops_status === "BLOCKED" ? "ops_blocked" : "ops_failed",
        reason: ops.blockers?.[0] || `Ops ${ops.ops_status}`,
        ops,
      };
    }
    return {
      nextSlug: "support-triage",
      input: {
        issue: clip(
          `Ops triage for: ${job.input?.signal || ""}. Class=${ops.incident_class}; severity=${ops.severity}`,
          8000
        ),
        ops,
        mode: "support",
        proposed_action,
        prior: { ...prior, "ops-coordinator": ops },
      },
    };
  }

  if (job.agent_slug === "support-triage") {
    let support;
    try {
      support = validateSupportOutput(output);
    } catch (err) {
      return { halt: "support_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(support.support_status)) {
      return { halt: "support_failed", reason: support.escalation, support };
    }
    return {
      nextSlug: "analytics-reporter",
      input: {
        evidence: {
          ops: prior["ops-coordinator"] || job.input?.ops,
          support,
          signal: job.input?.signal || prior.signal,
        },
        mode: "analytics",
        proposed_action,
        prior: { ...prior, "support-triage": support },
      },
    };
  }

  if (job.agent_slug === "analytics-reporter") {
    let analytics;
    try {
      analytics = validateAnalyticsOutput(output);
    } catch (err) {
      return { halt: "analytics_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(analytics.analytics_status)) {
      return { halt: "analytics_failed", analytics };
    }

    const approval = deriveOpsApproval(proposed_action);
    if (approval.required || isProtectedAction(proposed_action)) {
      return {
        approval: {
          capability: approval.capability || "approve_production_action",
          reason:
            `Operations incident analysis complete. Protected action "${proposed_action}" ` +
            "awaits Founder approval. No production remediation was executed.",
        },
      };
    }
    return { done: true };
  }

  return null;
}
