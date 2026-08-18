// Bounded failure classification and retry / dead-letter.

import { transitionState, canTransition } from "./state-machine";
import { ALLOCATION_BOUNDS } from "./states";

export function classifyFailure(err) {
  const code = err?.code || "";
  if (code === "PROVIDER_UNAVAILABLE") {
    return {
      kind: "provider_unavailable",
      transient: false,
      retry_safe: true,
      dead_letter: false,
    };
  }
  if (code === "OUTPUT_VALIDATION_FAILED" || code === "FORBIDDEN") {
    return { kind: "permanent", transient: false, dead_letter: true };
  }
  if (err?.transient === false) {
    return { kind: "permanent", transient: false, dead_letter: true };
  }
  if (err?.transient === true || code === "PROVIDER_CIRCUIT_OPEN" || err?.status === 429) {
    return { kind: "transient", transient: true };
  }
  return { kind: "transient", transient: true };
}

export function applyRetryOrDeadLetter(item, classified) {
  const attempt = item.attempt || 1;
  const max = item.max_attempts || ALLOCATION_BOUNDS.maxAttempts;
  const backoffMs = Math.min(60_000, 500 * 2 ** Math.max(0, attempt - 1));

  // Provider unavailable: failed + retry-safe, never success, no immediate DLQ.
  if (classified.kind === "provider_unavailable" || classified.retry_safe) {
    let next = item;
    if (canTransition(item.status, "failed")) {
      next = transitionState(item, "failed", { reason: classified.kind });
    }
    return {
      ...next,
      audit_metadata: {
        ...(next.audit_metadata || {}),
        failure_kind: classified.kind,
        retry_safe: true,
        falsely_completed: false,
      },
    };
  }

  if (classified.transient && attempt < max) {
    if (canTransition(item.status, "retry_wait")) {
      return {
        ...transitionState(item, "retry_wait", { reason: classified.kind }),
        next_available_at: new Date(Date.now() + backoffMs).toISOString(),
        audit_metadata: {
          ...(item.audit_metadata || {}),
          backoff_ms: backoffMs,
          failure_kind: classified.kind,
        },
      };
    }
  }

  // Permanent or exhausted → failed then dead_lettered
  let next = item;
  if (canTransition(item.status, "failed")) {
    next = transitionState(item, "failed", { reason: classified.kind });
  }
  if (
    (classified.dead_letter !== false || !classified.transient || attempt >= max) &&
    canTransition(next.status, "dead_lettered")
  ) {
    next = transitionState(next, "dead_lettered", { reason: "max_attempts_or_permanent" });
  }
  return {
    ...next,
    audit_metadata: {
      ...(next.audit_metadata || {}),
      failure_kind: classified.kind,
      escalated: true,
    },
  };
}

/** Move retry_wait → queued when backoff elapsed. */
export function releaseRetryWait(item, now = Date.now()) {
  if (item.status !== "retry_wait") return item;
  const readyAt = item.next_available_at
    ? new Date(item.next_available_at).getTime()
    : 0;
  if (now < readyAt) return item;
  if (canTransition("retry_wait", "queued")) {
    return transitionState(item, "queued", { reason: "backoff_elapsed" });
  }
  return item;
}
