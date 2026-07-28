/**
 * Founder approval gates for planning stages.
 * Nothing executes automatically.
 */

import {
  APPROVAL_STATUSES,
  makePlanningBase,
  nowIso,
  uid,
} from "./schemas.js";
import { recordPlanningAudit } from "./audit.js";

const ALLOWED = Object.freeze({
  pending: ["approved", "rejected", "returned", "archived"],
  approved: ["archived", "returned"],
  rejected: ["pending", "archived"],
  returned: ["pending", "archived"],
  archived: [],
});

/**
 * Create an approval gate object.
 */
export function createApprovalGate({
  name,
  stage,
  plan_id = null,
  project_id = null,
  organization_id = null,
  required_capability = "founder.approve_plan",
  owner = "founder",
} = {}) {
  return makePlanningBase({
    kind: "approval_gate",
    slug: `gate-${stage || "plan"}-${uid("g").slice(-6)}`,
    name: name || `Approve ${stage || "plan"}`,
    description: "Founder approval required before any further planning promotion or execution handoff.",
    status: "pending",
    project_id,
    organization_id,
    owner,
    payload: {
      stage: stage || "plan",
      plan_id,
      required_capability,
      decision: null,
      decided_at: null,
      decided_by: null,
      reason: null,
      executes: false,
    },
  });
}

export function transitionApproval(gate, nextStatus, { actor = "founder", reason = "" } = {}) {
  if (!gate || gate.kind !== "approval_gate") {
    throw new Error("Invalid approval gate");
  }
  const current = gate.status;
  if (!APPROVAL_STATUSES.includes(nextStatus)) {
    throw new Error(`Invalid approval status: ${nextStatus}`);
  }
  const allowed = ALLOWED[current] || [];
  if (!allowed.includes(nextStatus)) {
    throw new Error(`Cannot transition approval ${current} → ${nextStatus}`);
  }
  const updated = {
    ...gate,
    status: nextStatus,
    updated_at: nowIso(),
    payload: {
      ...gate.payload,
      decision: nextStatus,
      decided_at: nowIso(),
      decided_by: actor,
      reason: reason || null,
      executes: false,
    },
    audit_metadata: {
      ...(gate.audit_metadata || {}),
      last_transition: { from: current, to: nextStatus, actor, at: nowIso() },
    },
  };
  recordPlanningAudit({
    action: "planning.approval.transition",
    actor,
    gate_id: gate.id,
    from: current,
    to: nextStatus,
    reason,
    executes: false,
  });
  return updated;
}

export function assertApproved(gate, label = "plan") {
  if (!gate || gate.status !== "approved") {
    throw new Error(`Founder approval required for ${label} (status=${gate?.status || "missing"})`);
  }
  return true;
}

/** Read-only API guard: mutating planning actions require approval except draft create. */
export function isWriteAllowed(action, plan) {
  if (action === "create_plan" || action === "preview" || action === "read") return true;
  if (action === "request_approval") return plan?.status === "draft" || plan?.status === "returned";
  if (action === "decide_approval") return true; // still Founder via requireAdmin + capability
  if (action === "archive") return ["approved", "rejected", "returned", "pending_approval"].includes(plan?.status);
  return false;
}
