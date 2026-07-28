// Strict execution state machine.

import { validationError } from "../errors";
import { EXECUTION_STATES, STATE_TRANSITIONS } from "./states";

export function assertValidState(state) {
  if (!EXECUTION_STATES.includes(state) && state !== "rejected") {
    throw validationError(`Unknown execution state: ${state}`, { state });
  }
  return state;
}

export function canTransition(from, to) {
  assertValidState(from);
  assertValidState(to);
  const allowed = STATE_TRANSITIONS[from] || [];
  return allowed.includes(to);
}

export function transitionState(record, to, { reason = null, actor = null } = {}) {
  const from = record.status;
  if (!canTransition(from, to)) {
    const err = validationError(
      `Invalid execution transition ${from} → ${to}`,
      { from, to, id: record.id }
    );
    err.code = "INVALID_TRANSITION";
    throw err;
  }
  const now = new Date().toISOString();
  return {
    ...record,
    status: to,
    updated_at: now,
    audit_metadata: {
      ...(record.audit_metadata || {}),
      last_transition: { from, to, reason, actor, at: now },
    },
  };
}
