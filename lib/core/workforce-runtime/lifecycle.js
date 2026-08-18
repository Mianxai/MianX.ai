/**
 * Agent lifecycle — transition, persist, recover after restart via checkpoints.
 */

import {
  AGENT_LIFECYCLE,
  LIFECYCLE_TRANSITIONS,
  assertLifecycle,
  nowIso,
  uid,
} from "./schemas.js";
import {
  getAgentState,
  setAgentState,
  listAgentStates,
  pushCheckpoint,
  listCheckpoints,
  recordAudit,
} from "./store.js";
import {
  listActiveAgentDefinitions,
  isAgentExecutable,
  getAgentDefinition,
} from "../agents.js";

/**
 * Ensure all executable agents have an idle state for a project (or global).
 */
export function bootstrapWorkforce({ project_id = null, simulation = false } = {}) {
  const agents = listActiveAgentDefinitions().filter(isAgentExecutable);
  const created = [];
  for (const def of agents) {
    const existing = getAgentState(def.slug, project_id);
    if (existing) continue;
    const state = {
      id: uid("astate"),
      agent_slug: def.slug,
      name: def.name,
      department: def.department || null,
      lifecycle_status: "idle",
      project_id,
      organization_id: null,
      current_task_id: null,
      simulation: Boolean(simulation),
      attempt_count: 0,
      last_error: null,
      created_at: nowIso(),
      updated_at: nowIso(),
    };
    setAgentState(state);
    created.push(state);
  }
  pushCheckpoint({
    id: uid("cp"),
    kind: "workforce_bootstrapped",
    project_id,
    payload: { agent_count: agents.length, simulation: Boolean(simulation) },
    created_at: nowIso(),
  });
  recordAudit({
    action: "workforce.bootstrap",
    project_id,
    agent_count: agents.length,
    simulation: Boolean(simulation),
  });
  return { agents: agents.length, created: created.length, states: listAgentStates({ project_id }) };
}

export function transitionAgent(slug, nextStatus, {
  project_id = null,
  actor = "system",
  task_id = null,
  reason = "",
  error = null,
} = {}) {
  assertLifecycle(nextStatus);
  const def = getAgentDefinition(slug);
  if (!def || !isAgentExecutable(def)) {
    throw new Error(`Unknown or non-executable agent: ${slug}`);
  }
  let state = getAgentState(slug, project_id);
  if (!state) {
    bootstrapWorkforce({ project_id, simulation: false });
    state = getAgentState(slug, project_id);
  }
  const current = state.lifecycle_status;
  if (current === nextStatus) {
    return state; // idempotent no-op
  }
  const allowed = LIFECYCLE_TRANSITIONS[current] || [];
  if (!allowed.includes(nextStatus)) {
    throw new Error(`Invalid lifecycle transition ${current} → ${nextStatus} for ${slug}`);
  }
  const updated = setAgentState({
    ...state,
    lifecycle_status: nextStatus,
    current_task_id: task_id !== null ? task_id : state.current_task_id,
    last_error: error,
    attempt_count:
      nextStatus === "retry" ? (state.attempt_count || 0) + 1 : state.attempt_count || 0,
    audit_metadata: {
      ...(state.audit_metadata || {}),
      last_transition: { from: current, to: nextStatus, actor, reason, at: nowIso() },
    },
  });
  recordAudit({
    action: "workforce.lifecycle.transition",
    actor,
    agent_slug: slug,
    project_id,
    from: current,
    to: nextStatus,
    reason,
  });
  pushCheckpoint({
    id: uid("cp"),
    kind: "lifecycle_transition",
    project_id,
    agent_slug: slug,
    payload: { from: current, to: nextStatus, task_id: updated.current_task_id },
    created_at: nowIso(),
  });
  return updated;
}

/**
 * Recover agent states from latest checkpoints after restart (in-process replay).
 */
export function recoverWorkforce({ project_id = null } = {}) {
  const cps = listCheckpoints({ project_id }).filter(
    (c) => c.kind === "lifecycle_transition" || c.kind === "workforce_bootstrapped"
  );
  if (!getAgentState("executive-ceo", project_id) && !listAgentStates({ project_id }).length) {
    bootstrapWorkforce({ project_id });
  }
  // Re-apply last known lifecycle per agent from checkpoints (best-effort)
  const lastByAgent = new Map();
  for (const cp of cps) {
    if (cp.kind === "lifecycle_transition" && cp.agent_slug) {
      lastByAgent.set(cp.agent_slug, cp.payload);
    }
  }
  let restored = 0;
  for (const [slug, payload] of lastByAgent) {
    const state = getAgentState(slug, project_id);
    if (!state) continue;
    if (payload?.to && state.lifecycle_status !== payload.to) {
      // Direct set for recovery (bypass transition validation when recovering)
      setAgentState({
        ...state,
        lifecycle_status: AGENT_LIFECYCLE.includes(payload.to) ? payload.to : state.lifecycle_status,
        current_task_id: payload.task_id ?? state.current_task_id,
        recovered_at: nowIso(),
      });
      restored += 1;
    }
  }
  recordAudit({
    action: "workforce.recovery",
    project_id,
    restored,
    checkpoint_count: cps.length,
  });
  return {
    ok: true,
    restored,
    agents: listAgentStates({ project_id }),
    note: "Recovery is idempotent; duplicate task claims remain blocked.",
  };
}

export function listLifecycleStatuses() {
  return [...AGENT_LIFECYCLE];
}
