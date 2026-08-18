/**
 * Shared workforce summary normalization for Admin metric cards.
 * Missing values stay null (Unavailable); trusted zeros stay 0.
 */

import {
  coalesceWorkforceCount,
  formatWorkforceMetric,
} from "./terminology.js";

/**
 * @param {Record<string, unknown>} raw
 * @param {{ loading?: boolean, error?: string|null }} [opts]
 */
export function normalizeWorkforceSummary(raw = {}, opts = {}) {
  if (opts.loading) {
    return {
      state: "loading",
      error: null,
      registered: null,
      persisted: null,
      ready: null,
      allocated: null,
      active: null,
      running: null,
      liveTested: null,
      providerName: null,
      liveExecutionReady: null,
      schedulerHealth: null,
      displays: {
        registered: "Loading…",
        persisted: "Loading…",
        ready: "Loading…",
        allocated: "Loading…",
        active: "Loading…",
        running: "Loading…",
        liveTested: "Loading…",
        providerName: "Loading…",
        liveExecutionReady: "Loading…",
        schedulerHealth: "Loading…",
      },
    };
  }

  if (opts.error) {
    const unavailable = "Unavailable";
    return {
      state: "error",
      error: String(opts.error),
      registered: null,
      persisted: null,
      ready: null,
      allocated: null,
      active: null,
      running: null,
      liveTested: null,
      providerName: null,
      liveExecutionReady: null,
      schedulerHealth: null,
      displays: {
        registered: unavailable,
        persisted: unavailable,
        ready: unavailable,
        allocated: unavailable,
        active: unavailable,
        running: unavailable,
        liveTested: unavailable,
        providerName: unavailable,
        liveExecutionReady: unavailable,
        schedulerHealth: unavailable,
      },
    };
  }

  const registered = coalesceWorkforceCount(
    raw.registered,
    raw.capacitySeats,
    raw.capacity
  );
  const persisted = coalesceWorkforceCount(
    raw.persisted,
    raw.persistedSeats
  );
  const ready = coalesceWorkforceCount(
    raw.ready,
    raw.readyToAllocate,
    raw.readyToAllocateSeats
  );
  const allocated = coalesceWorkforceCount(
    raw.allocated,
    raw.allocatedSeats
  );
  const active = coalesceWorkforceCount(
    raw.active,
    raw.activeInstances
  );
  const running = coalesceWorkforceCount(
    raw.running,
    raw.runningAgents,
    raw.busy
  );
  const liveTested = coalesceWorkforceCount(
    raw.liveTested,
    raw.liveTestedSeats
  );

  const providerRaw = raw.providerName ?? raw.provider;
  const providerName =
    providerRaw === null || providerRaw === undefined || providerRaw === ""
      ? null
      : String(providerRaw);

  const liveExecutionReady =
    typeof raw.liveExecutionReady === "boolean"
      ? raw.liveExecutionReady
      : null;

  const schedulerHealth =
    raw.schedulerHealth === null ||
    raw.schedulerHealth === undefined ||
    raw.schedulerHealth === ""
      ? null
      : String(raw.schedulerHealth);

  return {
    state: "ready",
    error: null,
    registered,
    persisted,
    ready,
    allocated,
    active,
    running,
    liveTested,
    providerName,
    liveExecutionReady,
    schedulerHealth,
    displays: {
      registered: formatWorkforceMetric(registered).label,
      persisted: formatWorkforceMetric(persisted).label,
      ready: formatWorkforceMetric(ready).label,
      allocated: formatWorkforceMetric(allocated).label,
      active: formatWorkforceMetric(active).label,
      running: formatWorkforceMetric(running).label,
      liveTested: formatWorkforceMetric(liveTested).label,
      providerName: providerName == null ? "Unavailable" : providerName,
      liveExecutionReady:
        liveExecutionReady == null ? "Unavailable" : String(liveExecutionReady),
      schedulerHealth: schedulerHealth == null ? "Unavailable" : schedulerHealth,
    },
  };
}

/**
 * Stage-1 Production truth fixture for tests/harness only.
 */
export const CURRENT_WORKFORCE_SUMMARY_FIXTURE = Object.freeze({
  registered: 445,
  persisted: 445,
  ready: 445,
  allocated: 0,
  active: 0,
  liveTested: 0,
  providerName: "none",
  liveExecutionReady: false,
});
