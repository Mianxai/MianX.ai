/**
 * In-memory durable-shape store for Phase II.1 foundation + tests.
 * Additive SQL migration defines Production tables (not applied in this PR).
 */

import { randomUUID } from "node:crypto";
import { PILOT_AGENT_SLUG, PILOT_PROJECT_ID } from "./constants";

const state = {
  runs: [],
  approvals: [],
  providerRequests: [],
  tokenUsage: [],
  costUsage: [],
  evidence: [],
  failures: [],
  killSwitchEvents: [],
  killSwitchActive: false,
  liveTestedSeats: 0,
  activeLeases: new Map(),
  idempotencyIndex: new Map(),
};

export function resetLivePilotStore() {
  state.runs = [];
  state.approvals = [];
  state.providerRequests = [];
  state.tokenUsage = [];
  state.costUsage = [];
  state.evidence = [];
  state.failures = [];
  state.killSwitchEvents = [];
  state.killSwitchActive = false;
  state.liveTestedSeats = 0;
  state.activeLeases = new Map();
  state.idempotencyIndex = new Map();
}

export function getLivePilotStoreSnapshot() {
  return {
    runs: [...state.runs],
    approvals: [...state.approvals],
    providerRequests: [...state.providerRequests],
    tokenUsage: [...state.tokenUsage],
    costUsage: [...state.costUsage],
    evidence: [...state.evidence],
    failures: [...state.failures],
    killSwitchEvents: [...state.killSwitchEvents],
    killSwitchActive: state.killSwitchActive,
    liveTestedSeats: state.liveTestedSeats,
    activeLeaseCount: state.activeLeases.size,
  };
}

export function isKillSwitchActive() {
  return state.killSwitchActive === true;
}

export function setKillSwitch(active, { actor = "system", reason = "" } = {}) {
  state.killSwitchActive = Boolean(active);
  const event = {
    id: randomUUID(),
    active: state.killSwitchActive,
    actor: String(actor).slice(0, 120),
    reason: String(reason).slice(0, 500),
    at: new Date().toISOString(),
  };
  state.killSwitchEvents.push(event);
  return event;
}

export function createPilotApproval({
  projectId,
  taskId,
  agentSlug,
  approvedBy,
  notes = "",
} = {}) {
  const row = {
    id: randomUUID(),
    projectId,
    taskId,
    agentSlug: agentSlug || PILOT_AGENT_SLUG,
    approvedBy: approvedBy || null,
    notes: String(notes).slice(0, 1000),
    status: "approved",
    createdAt: new Date().toISOString(),
  };
  state.approvals.push(row);
  return row;
}

export function getPilotApproval(id, projectId) {
  const row = state.approvals.find((a) => a.id === id);
  if (!row) return null;
  if (projectId && row.projectId !== projectId) return null;
  return row;
}

export function findPilotApproval({ projectId, taskId, agentSlug }) {
  return (
    state.approvals.find(
      (a) =>
        a.projectId === projectId &&
        a.taskId === taskId &&
        a.agentSlug === agentSlug &&
        a.status === "approved"
    ) || null
  );
}

export function createPilotRun(input = {}) {
  const idempotencyKey = input.idempotencyKey || null;
  if (idempotencyKey && state.idempotencyIndex.has(idempotencyKey)) {
    const existingId = state.idempotencyIndex.get(idempotencyKey);
    return { conflict: true, run: state.runs.find((r) => r.id === existingId) || null };
  }

  const run = {
    id: randomUUID(),
    projectId: input.projectId || PILOT_PROJECT_ID,
    taskId: input.taskId || null,
    agentDefinitionId: input.agentDefinitionId || PILOT_AGENT_SLUG,
    agentInstanceId: input.agentInstanceId || null,
    approvalId: input.approvalId || null,
    provider: input.provider || "none",
    model: input.model || null,
    status: input.status || "blocked",
    attempt: 1,
    leaseOwner: null,
    leaseExpiresAt: null,
    idempotencyKey,
    inputHash: input.inputHash || null,
    outputHash: input.outputHash || null,
    inputTokens: null,
    outputTokens: null,
    totalTokens: null,
    estimatedCostUsd: null,
    startedAt: null,
    endedAt: null,
    failureClassification: input.failureClassification || null,
    evidenceRefs: [],
    fabricated: false,
    simulated: Boolean(input.simulated),
    live: false,
    createdAt: new Date().toISOString(),
  };
  state.runs.push(run);
  if (idempotencyKey) state.idempotencyIndex.set(idempotencyKey, run.id);
  return { conflict: false, run };
}

export function getPilotRun(id, projectId) {
  const run = state.runs.find((r) => r.id === id);
  if (!run) return null;
  if (projectId && run.projectId !== projectId) return null;
  return run;
}

export function listPilotRuns({ projectId } = {}) {
  return state.runs.filter((r) => !projectId || r.projectId === projectId);
}

export function acquirePilotLease(runId, owner, ttlMs = 90_000) {
  const run = state.runs.find((r) => r.id === runId);
  if (!run) return { ok: false, code: "RUN_NOT_FOUND" };
  const existing = state.activeLeases.get(runId);
  if (existing && existing.expiresAt > Date.now() && existing.owner !== owner) {
    return { ok: false, code: "LEASE_HELD" };
  }
  const expiresAt = Date.now() + ttlMs;
  state.activeLeases.set(runId, { owner, expiresAt });
  run.leaseOwner = owner;
  run.leaseExpiresAt = new Date(expiresAt).toISOString();
  run.status = "leased";
  return { ok: true, run };
}

export function releasePilotLease(runId, owner) {
  const lease = state.activeLeases.get(runId);
  if (lease && lease.owner !== owner) return { ok: false, code: "LOST_LEASE" };
  state.activeLeases.delete(runId);
  const run = state.runs.find((r) => r.id === runId);
  if (run) {
    run.leaseOwner = null;
    run.leaseExpiresAt = null;
  }
  return { ok: true };
}

export function countActivePilotLeases() {
  const now = Date.now();
  for (const [id, lease] of state.activeLeases) {
    if (lease.expiresAt <= now) state.activeLeases.delete(id);
  }
  return state.activeLeases.size;
}

export function countQueuedPilotTasks() {
  return state.runs.filter((r) => ["queued", "approved", "pending_approval"].includes(r.status))
    .length;
}

export function recordProviderRequest(row) {
  const rec = { id: randomUUID(), createdAt: new Date().toISOString(), ...row };
  state.providerRequests.push(rec);
  return rec;
}

export function recordTokenUsage(row) {
  const rec = { id: randomUUID(), createdAt: new Date().toISOString(), ...row };
  state.tokenUsage.push(rec);
  return rec;
}

export function recordCostUsage(row) {
  const rec = { id: randomUUID(), createdAt: new Date().toISOString(), ...row };
  state.costUsage.push(rec);
  return rec;
}

export function recordPilotEvidence(row) {
  const rec = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    fabricated: false,
    simulated: false,
    ...row,
  };
  state.evidence.push(rec);
  return rec;
}

export function getPilotEvidence(id, projectId) {
  const row = state.evidence.find((e) => e.id === id);
  if (!row) return null;
  if (projectId && row.projectId !== projectId) return null;
  return row;
}

export function recordPilotFailure(row) {
  const rec = { id: randomUUID(), createdAt: new Date().toISOString(), ...row };
  state.failures.push(rec);
  return rec;
}

/**
 * Increment live-tested seats only when full genuine evidence gate passes.
 * Cap at 1 for the pilot. Simulation / failure must not increment.
 */
export function maybeIncrementLiveTestedSeats(evidenceGate) {
  if (!evidenceGate || evidenceGate.ok !== true) {
    return { incremented: false, liveTestedSeats: state.liveTestedSeats };
  }
  if (evidenceGate.fabricated || evidenceGate.simulated || evidenceGate.providerName === "none") {
    return { incremented: false, liveTestedSeats: state.liveTestedSeats };
  }
  if (state.liveTestedSeats >= 1) {
    return { incremented: false, liveTestedSeats: state.liveTestedSeats, capped: true };
  }
  state.liveTestedSeats = 1;
  return { incremented: true, liveTestedSeats: 1 };
}

export function getLiveTestedSeats() {
  return state.liveTestedSeats;
}
