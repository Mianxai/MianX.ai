/**
 * Canonical Founder scheduler cadence — 5 minutes.
 * Stale/warning math must use this value, not platform hobby buffers alone.
 */
export const SCHEDULER_EXPECTED_INTERVAL_MS = 300_000; // 5 minutes
export const SCHEDULER_EXPECTED_INTERVAL_SEC = 300;

export function canonicalSchedulerExpectedIntervalMs() {
  return SCHEDULER_EXPECTED_INTERVAL_MS;
}
