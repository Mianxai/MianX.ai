// Approval policy and decision transitions.
//
// A run may only execute a protected capability if there is an approval record
// in the "approved" state. The QA Review agent additionally can never approve
// a production action (separation of duties), enforced here rather than in the
// UI so it can't be bypassed.

import { APPROVAL_STATUSES, APPROVAL_TRANSITIONS } from "./constants";
import { PROTECTED_CAPABILITIES } from "./agents";
import { invalidTransition, forbidden, validationError } from "./errors";

export function isProtectedCapability(capability) {
  return PROTECTED_CAPABILITIES.includes(capability);
}

// Determines whether a task/agent combination needs a human approval before a
// run may execute. True if the task explicitly requires approval, the agent
// definition requires it, or any requested capability is protected.
export function requiresApproval({ task, agentDefinition, requestedCapabilities = [] }) {
  if (task?.requires_approval) return true;
  if (agentDefinition?.requiresHumanApproval || agentDefinition?.requires_human_approval) {
    return true;
  }
  return requestedCapabilities.some(isProtectedCapability);
}

export function canTransitionApproval(from, to) {
  if (!APPROVAL_STATUSES.includes(from) || !APPROVAL_STATUSES.includes(to)) {
    return false;
  }
  return (APPROVAL_TRANSITIONS[from] || []).includes(to);
}

export function assertApprovalTransition(from, to) {
  if (!canTransitionApproval(from, to)) {
    throw invalidTransition(
      `Cannot move approval from "${from}" to "${to}".`,
      { from, to, allowed: APPROVAL_TRANSITIONS[from] || [] }
    );
  }
  return to;
}

// Validates an approval decision. `decidedBy` is the admin identity; an agent
// actor may never approve a protected production action.
export function validateApprovalDecision({ decision, decidedBy, actorType = "admin", capability }) {
  if (decision !== "approved" && decision !== "rejected") {
    throw validationError("Invalid decision.", {
      decision: 'decision must be "approved" or "rejected".',
    });
  }
  if (!decidedBy) {
    throw validationError("Invalid decision.", {
      decidedBy: "A deciding identity is required.",
    });
  }
  if (
    decision === "approved" &&
    actorType !== "admin" &&
    capability === "approve_production_action"
  ) {
    throw forbidden("An agent cannot approve a protected production action.");
  }
  return decision;
}
