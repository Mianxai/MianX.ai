/**
 * Shared Admin workforce terminology — inventory vs readiness vs runtime.
 * Prevents treating capacity seats as active/live-tested agents.
 */

export const WORKFORCE_COUNTER_TERMS = Object.freeze({
  registered: {
    key: "registered",
    label: "Registered capacity",
    means: "Authoritative allocatable workforce capacity slots (planning seats).",
    doesNotMean: "Running, allocated, or live-tested agents.",
  },
  persisted: {
    key: "persisted",
    label: "Persisted definitions",
    means: "Canonical workforce seats durably stored in the database.",
    doesNotMean: "Active runtime instances or provider execution.",
  },
  ready: {
    key: "ready",
    label: "Ready to allocate",
    means: "Persisted valid seats available for safe project allocation.",
    doesNotMean: "Already allocated, active, or live-tested.",
  },
  allocated: {
    key: "allocated",
    label: "Allocated",
    means: "Seats assigned to active project work.",
    doesNotMean: "Always-on agents or completed live provider tests.",
  },
  active: {
    key: "active",
    label: "Active instances",
    means: "Currently running agent instances for scoped work.",
    doesNotMean: "Total registered capacity (445).",
  },
  running: {
    key: "running",
    label: "Running",
    means: "Runtime busy/working agents in an operational scope.",
    doesNotMean: "Enterprise capacity inventory.",
  },
  live: {
    key: "live",
    label: "Live",
    means: "Live provider execution path (gated; usually disabled).",
    doesNotMean: "Deterministic simulation or capacity readiness alone.",
  },
  liveTested: {
    key: "liveTested",
    label: "Live-tested",
    means: "Seats that completed a controlled real provider execution with evidence.",
    doesNotMean: "Registered, ready, or simulation-only seats.",
  },
  operational: {
    key: "operational",
    label: "Operational",
    means: "Runtime health and execution evidence for scoped work.",
    doesNotMean: "That the full 445-seat inventory is autonomously running.",
  },
});

/** Affirmative false claims that must never appear as Founder-facing capacity truth. */
export const FORBIDDEN_WORKFORCE_CLAIMS = Object.freeze([
  /445\s+active\s+agents/i,
  /445\s+running(?:\s|$)/i,
  /445\s+live[- ]tested/i,
  /\bis an operational autonomous workforce\b/i,
  /\b445 always[- ]on agents\b/i,
]);

/**
 * True when text asserts a forbidden capacity claim (disclaimer lines ignored).
 * @param {string} text
 */
export function containsForbiddenWorkforceClaim(text) {
  const stripped = String(text || "")
    .split("\n")
    .filter(
      (line) =>
        !/\b(does not|must not|not prove|— not| - not|not 445|not always-on)\b/i.test(
          line
        )
    )
    .join("\n");
  return FORBIDDEN_WORKFORCE_CLAIMS.some((re) => re.test(stripped));
}

export const WORKFORCE_SURFACE_IDS = Object.freeze({
  SETUP: "workforce_setup",
  READINESS: "workforce_readiness",
  OPS: "workforce_ops",
  AGENTS: "agents_catalogue",
  RUNTIME_AGENTS: "runtime_agent_instances",
});

/**
 * Format a numeric workforce metric for Admin cards.
 * Zero stays "0"; missing/untrusted becomes "Unavailable".
 * @param {unknown} value
 * @param {{ allowMissingZero?: boolean }} [opts]
 */
export function formatWorkforceMetric(value, opts = {}) {
  if (value === null || value === undefined || value === "") {
    return { kind: "unavailable", label: "Unavailable", value: null };
  }
  if (typeof value === "string" && /^(n\/a|na|unavailable|—|-)$/i.test(value.trim())) {
    return { kind: "unavailable", label: "Unavailable", value: null };
  }
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return { kind: "unavailable", label: "Unavailable", value: null };
  }
  if (n === 0 && opts.allowMissingZero === false) {
    return { kind: "unavailable", label: "Unavailable", value: null };
  }
  return { kind: "numeric", label: String(n), value: n };
}

/**
 * First finite present candidate. Missing → null (Unavailable), never invents 0.
 * Explicit 0 is preserved.
 * @param {...unknown} candidates
 * @returns {number|null}
 */
export function coalesceWorkforceCount(...candidates) {
  for (const v of candidates) {
    if (v === null || v === undefined || v === "") continue;
    if (typeof v === "string" && /^(n\/a|na|unavailable|—|-)$/i.test(v.trim())) {
      continue;
    }
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

/**
 * Assert a truth snapshot matches the Stage-1 Production contract.
 * @param {{
 *   capacitySeats?: number,
 *   persistedSeats?: number,
 *   readyToAllocateSeats?: number,
 *   allocatedSeats?: number,
 *   activeInstances?: number,
 *   liveTestedSeats?: number,
 *   providerName?: string,
 *   liveExecutionReady?: boolean,
 * }} truth
 */
export function assertCurrentWorkforceTruthContract(truth = {}) {
  const failures = [];
  const expectEq = (key, expected) => {
    if (truth[key] !== expected) {
      failures.push(`${key}=${JSON.stringify(truth[key])} (expected ${expected})`);
    }
  };
  expectEq("capacitySeats", 445);
  expectEq("persistedSeats", 445);
  expectEq("readyToAllocateSeats", 445);
  expectEq("allocatedSeats", 0);
  expectEq("activeInstances", 0);
  expectEq("liveTestedSeats", 0);
  if (truth.providerName != null) expectEq("providerName", "none");
  if (truth.liveExecutionReady != null) expectEq("liveExecutionReady", false);
  return { ok: failures.length === 0, failures };
}

/**
 * Surface purpose copy for Founder-facing headers (accessible text).
 */
export const WORKFORCE_SURFACE_PURPOSE = Object.freeze({
  [WORKFORCE_SURFACE_IDS.SETUP]: {
    owns: "Enterprise workforce capacity bootstrap and persisted seat inventory.",
    doesNotProve:
      "Does not prove agents are allocated, active, live-tested, or that a provider is configured.",
  },
  [WORKFORCE_SURFACE_IDS.READINESS]: {
    owns: "Readiness gates, allocation eligibility, and provider/safety prerequisites.",
    doesNotProve:
      "Does not prove activation, live execution, or that readiness equals an operational workforce.",
  },
  [WORKFORCE_SURFACE_IDS.OPS]: {
    owns: "Runtime operational status, simulation controls, and live operational evidence for a project scope.",
    doesNotProve:
      "Does not own the static 445-seat enterprise definition registry as always-on agents.",
  },
  [WORKFORCE_SURFACE_IDS.AGENTS]: {
    owns: "Individual agent catalogue records, roles, departments, and agent-level detail.",
    doesNotProve:
      "Does not prove 445 active agents or replace Workforce Ops runtime health.",
  },
  [WORKFORCE_SURFACE_IDS.RUNTIME_AGENTS]: {
    owns: "Project-scoped registered agent instances and technical lifecycle controls.",
    doesNotProve:
      "Capacity Inventory is planning capacity only — not running agents.",
  },
});
