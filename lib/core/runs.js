// Agent run state transitions.

import { RUN_STATUSES, RUN_TRANSITIONS } from "./constants";
import { invalidTransition } from "./errors";

export function canTransitionRun(from, to) {
  if (!RUN_STATUSES.includes(from) || !RUN_STATUSES.includes(to)) return false;
  return (RUN_TRANSITIONS[from] || []).includes(to);
}

export function assertRunTransition(from, to) {
  if (!canTransitionRun(from, to)) {
    throw invalidTransition(
      `Cannot move run from "${from}" to "${to}".`,
      { from, to, allowed: RUN_TRANSITIONS[from] || [] }
    );
  }
  return to;
}

export function isTerminalRun(status) {
  return ["succeeded", "failed", "cancelled"].includes(status);
}
