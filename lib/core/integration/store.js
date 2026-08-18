/**
 * In-memory Phase H integration store (durable schema in migration).
 * Project-scoped. Resettable for deterministic tests.
 */

const runs = new Map();
const stageEvents = [];
const checkpoints = [];
const evidenceManifests = new Map();
const failureEvents = [];
const memoryEntries = [];
const learningProposals = [];
const idempotencyKeys = new Map();
const claimedTasks = new Set();
const auditLog = [];
let lastSuccessfulSimulationAt = null;
let lastFailedSimulationAt = null;

export function __resetIntegrationRuntime() {
  runs.clear();
  stageEvents.length = 0;
  checkpoints.length = 0;
  evidenceManifests.clear();
  failureEvents.length = 0;
  memoryEntries.length = 0;
  learningProposals.length = 0;
  idempotencyKeys.clear();
  claimedTasks.clear();
  auditLog.length = 0;
  lastSuccessfulSimulationAt = null;
  lastFailedSimulationAt = null;
}

export function saveRun(run) {
  runs.set(run.id, run);
  return run;
}

export function getRun(id) {
  return runs.get(id) || null;
}

export function listRuns({ project_id = null, status = null, stage = null } = {}) {
  let items = [...runs.values()];
  if (project_id) items = items.filter((r) => r.project_id === project_id);
  if (status) items = items.filter((r) => r.status === status);
  if (stage) items = items.filter((r) => r.current_stage === stage);
  return items.sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));
}

export function pushStageEvent(event) {
  stageEvents.push(event);
  return event;
}

export function listStageEvents({ integration_run_id = null, project_id = null } = {}) {
  let items = [...stageEvents];
  if (integration_run_id) {
    items = items.filter((e) => e.integration_run_id === integration_run_id);
  }
  if (project_id) items = items.filter((e) => e.project_id === project_id);
  return items;
}

export function pushCheckpoint(cp) {
  checkpoints.push(cp);
  return cp;
}

export function listCheckpoints({ integration_run_id = null, project_id = null } = {}) {
  let items = [...checkpoints];
  if (integration_run_id) {
    items = items.filter((c) => c.integration_run_id === integration_run_id);
  }
  if (project_id) items = items.filter((c) => c.project_id === project_id);
  return items;
}

export function latestCheckpoint(integration_run_id) {
  const items = listCheckpoints({ integration_run_id });
  return items[items.length - 1] || null;
}

export function saveEvidenceManifest(manifest) {
  evidenceManifests.set(manifest.integration_run_id, manifest);
  return manifest;
}

export function getEvidenceManifest(integration_run_id) {
  return evidenceManifests.get(integration_run_id) || null;
}

export function pushFailureEvent(event) {
  failureEvents.push(event);
  return event;
}

export function listFailureEvents({ integration_run_id = null, project_id = null } = {}) {
  let items = [...failureEvents];
  if (integration_run_id) {
    items = items.filter((e) => e.integration_run_id === integration_run_id);
  }
  if (project_id) items = items.filter((e) => e.project_id === project_id);
  return items;
}

export function pushMemoryEntry(entry) {
  memoryEntries.push(entry);
  return entry;
}

export function listMemoryEntries({
  integration_run_id = null,
  project_id = null,
} = {}) {
  let items = [...memoryEntries];
  if (integration_run_id) {
    items = items.filter((e) => e.integration_run_id === integration_run_id);
  }
  if (project_id) items = items.filter((e) => e.project_id === project_id);
  return items;
}

export function pushLearningProposal(p) {
  learningProposals.push(p);
  return p;
}

export function listLearningProposals({
  integration_run_id = null,
  project_id = null,
} = {}) {
  let items = [...learningProposals];
  if (integration_run_id) {
    items = items.filter((e) => e.integration_run_id === integration_run_id);
  }
  if (project_id) items = items.filter((e) => e.project_id === project_id);
  return items;
}

export function tryIdempotent(key, factory) {
  if (!key) return { hit: false, value: factory() };
  if (idempotencyKeys.has(key)) {
    return { hit: true, value: idempotencyKeys.get(key) };
  }
  const value = factory();
  idempotencyKeys.set(key, value);
  return { hit: false, value };
}

export function tryClaimTask(taskId) {
  if (claimedTasks.has(taskId)) return false;
  claimedTasks.add(taskId);
  return true;
}

export function isTaskClaimed(taskId) {
  return claimedTasks.has(taskId);
}

export function listClaimedTasks() {
  return [...claimedTasks];
}

export function recordAudit(entry) {
  auditLog.push({ ...entry, at: entry.at || new Date().toISOString() });
  return entry;
}

export function listAudit({ integration_run_id = null, project_id = null, limit = 200 } = {}) {
  let items = [...auditLog];
  if (integration_run_id) {
    items = items.filter((e) => e.integration_run_id === integration_run_id);
  }
  if (project_id) items = items.filter((e) => e.project_id === project_id);
  return items.slice(-limit);
}

export function markSimulationResult(ok) {
  const at = new Date().toISOString();
  if (ok) lastSuccessfulSimulationAt = at;
  else lastFailedSimulationAt = at;
}

export function getSimulationTimestamps() {
  return {
    lastSuccessfulSimulationAt,
    lastFailedSimulationAt,
  };
}
