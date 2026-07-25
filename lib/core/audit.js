// Audit trail helpers. buildAuditEntry produces a normalized audit_logs row;
// recordAudit persists it best-effort (an audit write failure must never break
// the primary operation, but is logged server-side).

import { clip } from "./validate";

export const AUDIT_ACTIONS = {
  AGENT_REGISTERED: "agent.registered",
  TASK_CREATED: "task.created",
  TASK_UPDATED: "task.updated",
  TASK_VALIDATED: "task.validated",
  RUN_CREATED: "run.created",
  RUN_STARTED: "run.started",
  RUN_SUCCEEDED: "run.succeeded",
  RUN_FAILED: "run.failed",
  APPROVAL_REQUESTED: "approval.requested",
  APPROVAL_DECIDED: "approval.decided",
  JOB_ENQUEUED: "job.enqueued",
  JOB_CLAIMED: "job.claimed",
  JOB_STARTED: "job.started",
  JOB_SUCCEEDED: "job.succeeded",
  JOB_FAILED: "job.failed",
  JOB_REQUEUED: "job.requeued",
  JOB_DEAD_LETTERED: "job.dead_lettered",
  JOB_CANCELLED: "job.cancelled",
  JOB_CANCEL_REQUESTED: "job.cancel_requested",
  JOB_RETRIED: "job.retried",
  JOB_LEASES_RECOVERED: "job.leases_recovered",
  WORKFLOW_STEP_COMPLETED: "workflow.step_completed",
  WORKFLOW_HALTED: "workflow.halted",
};

export function buildAuditEntry({
  projectId = null,
  actor,
  actorType = "admin",
  action,
  resourceType,
  resourceId = null,
  metadata = {},
}) {
  return {
    project_id: projectId,
    actor: clip(actor, 200) || "system",
    actor_type: ["admin", "system", "agent"].includes(actorType) ? actorType : "system",
    action: clip(action, 100),
    resource_type: clip(resourceType, 60),
    resource_id: resourceId,
    metadata: metadata && typeof metadata === "object" ? metadata : {},
  };
}

// Persists an audit entry. Returns true on success, false on failure — never
// throws, so callers can audit without risking the primary transaction.
export async function recordAudit(supabaseAdmin, entry) {
  if (!supabaseAdmin) return false;
  try {
    const { error } = await supabaseAdmin.from("audit_logs").insert([entry]);
    if (error) {
      console.error("[mianx-core] audit write failed:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[mianx-core] audit write threw:", err);
    return false;
  }
}
