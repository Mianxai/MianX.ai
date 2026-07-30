/**
 * Project-scoped agent instance lifecycle (definitions ≠ live workers).
 */

import { validationError, forbidden } from "../errors";

export const REAL_INSTANCE_LIFECYCLE = Object.freeze([
  "requested",
  "validating",
  "allocated",
  "idle",
  "assigned",
  "reasoning",
  "tool_executing",
  "waiting_for_dependency",
  "waiting_for_review",
  "waiting_for_founder",
  "retry_scheduled",
  "completed",
  "failed",
  "paused",
  "released",
  "archived",
]);

export const REAL_INSTANCE_TRANSITIONS = Object.freeze({
  requested: ["validating", "failed", "archived"],
  validating: ["allocated", "failed", "archived"],
  allocated: ["idle", "assigned", "released", "archived"],
  idle: ["assigned", "paused", "released", "archived"],
  assigned: ["reasoning", "waiting_for_dependency", "paused", "failed", "idle"],
  reasoning: [
    "tool_executing",
    "waiting_for_review",
    "waiting_for_founder",
    "completed",
    "failed",
    "retry_scheduled",
  ],
  tool_executing: [
    "reasoning",
    "waiting_for_review",
    "waiting_for_founder",
    "failed",
    "retry_scheduled",
  ],
  waiting_for_dependency: ["assigned", "reasoning", "paused", "failed"],
  waiting_for_review: ["completed", "failed", "assigned", "retry_scheduled"],
  waiting_for_founder: ["assigned", "completed", "failed", "released"],
  retry_scheduled: ["assigned", "failed", "released"],
  completed: ["idle", "released", "archived"],
  failed: ["retry_scheduled", "released", "archived"],
  paused: ["idle", "assigned", "released", "archived"],
  released: ["archived", "requested"],
  archived: [],
});

/** In-memory store for tests / local; durable adapter can replace later. */
const instances = new Map();

export function resetRealInstances() {
  instances.clear();
}

export function canTransitionRealInstance(from, to) {
  return (REAL_INSTANCE_TRANSITIONS[from] || []).includes(to);
}

export function assertRealInstanceTransition(from, to) {
  if (!canTransitionRealInstance(from, to)) {
    throw validationError(`Invalid instance transition ${from} → ${to}.`, { from, to });
  }
}

export function createRealInstance({
  organizationId = null,
  projectId,
  agentDefinitionId,
  objectiveId = null,
  allocationReason = "work_required",
  providerRoute = "openrouter/free",
  capabilitiesSnapshot = [],
} = {}) {
  if (!projectId) {
    throw validationError("Instance requires projectId.", { project_id: "required" });
  }
  if (!agentDefinitionId) {
    throw validationError("Instance requires agentDefinitionId.", {
      agent_definition_id: "required",
    });
  }
  const id = `rai_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const row = {
    id,
    organization_id: organizationId,
    project_id: projectId,
    agent_definition_id: agentDefinitionId,
    objective_id: objectiveId,
    current_task_id: null,
    status: "requested",
    allocation_reason: allocationReason,
    capabilities_snapshot: capabilitiesSnapshot,
    provider_route: providerRoute,
    workload: 0,
    lease: null,
    heartbeat_at: null,
    last_activity_at: new Date().toISOString(),
    token_counters: { prompt: 0, completion: 0, total: 0 },
    cost_counters: { estimatedUsd: 0 },
    audit_references: [],
    created_at: new Date().toISOString(),
  };
  instances.set(id, row);
  return { ...row };
}

export function transitionRealInstance(id, to, { projectId = null } = {}) {
  const row = instances.get(id);
  if (!row) throw validationError("Instance not found.", { id: "missing" });
  if (projectId && row.project_id !== projectId) {
    throw forbidden("Cross-project instance mutation denied.");
  }
  assertRealInstanceTransition(row.status, to);
  row.status = to;
  row.last_activity_at = new Date().toISOString();
  if (to === "reasoning" || to === "tool_executing" || to === "assigned") {
    row.heartbeat_at = row.last_activity_at;
  }
  instances.set(id, row);
  return { ...row };
}

export function getRealInstance(id) {
  const row = instances.get(id);
  return row ? { ...row } : null;
}

export function listRealInstances({ projectId = null, status = null } = {}) {
  let rows = [...instances.values()];
  if (projectId) rows = rows.filter((r) => r.project_id === projectId);
  if (status) rows = rows.filter((r) => r.status === status);
  return rows.map((r) => ({ ...r }));
}

export function isInstanceActivelyRunning(row) {
  return ["assigned", "reasoning", "tool_executing"].includes(row?.status);
}

export function assertInstanceProjectIsolation(instance, projectId) {
  if (!projectId || !instance?.project_id) {
    throw validationError("Project scope required.", { project_id: "required" });
  }
  if (instance.project_id !== projectId) {
    throw forbidden("Cross-project instance access denied.");
  }
  return true;
}
