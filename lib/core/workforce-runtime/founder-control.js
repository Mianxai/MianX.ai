/**
 * Founder control — pause/resume workforce, stop/retry/cancel/reassign, approve/reject.
 * Never auto-completes Founder approvals.
 */

import { CONTROL_ACTIONS, nowIso, uid } from "./schemas.js";
import {
  setWorkforcePaused,
  isWorkforcePaused,
  pushControlEvent,
  listControlEvents,
  getAgentState,
  recordAudit,
} from "./store.js";
import { transitionAgent, bootstrapWorkforce } from "./lifecycle.js";
import { founderApprovePipeline } from "./pipeline.js";
import { getAgentDefinition, isAgentExecutable } from "../agents.js";

export function pauseWorkforce({ actor = "founder", project_id = null, reason = "" } = {}) {
  setWorkforcePaused(true);
  const ev = {
    id: uid("ctrl"),
    action: "pause_workforce",
    actor,
    project_id,
    payload: { reason },
    created_at: nowIso(),
  };
  pushControlEvent(ev);
  recordAudit({ action: "workforce.control.pause", actor, project_id, reason });
  return { ok: true, paused: true, event: ev };
}

export function resumeWorkforce({ actor = "founder", project_id = null } = {}) {
  setWorkforcePaused(false);
  const ev = {
    id: uid("ctrl"),
    action: "resume_workforce",
    actor,
    project_id,
    created_at: nowIso(),
  };
  pushControlEvent(ev);
  recordAudit({ action: "workforce.control.resume", actor, project_id });
  return { ok: true, paused: false, event: ev };
}

export function stopAgent(slug, { project_id = null, actor = "founder" } = {}) {
  const def = getAgentDefinition(slug);
  if (!def || !isAgentExecutable(def)) throw new Error(`Unknown executable agent: ${slug}`);
  bootstrapWorkforce({ project_id });
  const state = transitionAgent(slug, "cancelled", {
    project_id,
    actor,
    reason: "Founder stop",
  });
  pushControlEvent({
    id: uid("ctrl"),
    action: "stop_agent",
    actor,
    agent_slug: slug,
    project_id,
    created_at: nowIso(),
  });
  return state;
}

export function retryAgent(slug, { project_id = null, actor = "founder" } = {}) {
  const state = getAgentState(slug, project_id);
  if (!state) bootstrapWorkforce({ project_id });
  const from = getAgentState(slug, project_id);
  if (!["failed", "blocked", "cancelled"].includes(from.lifecycle_status)) {
    // move to failed first if needed is too aggressive; require failed/blocked
    if (from.lifecycle_status === "idle") {
      return transitionAgent(slug, "assigned", { project_id, actor, reason: "retry_from_idle" });
    }
  }
  let s = from;
  if (from.lifecycle_status === "cancelled") {
    s = transitionAgent(slug, "idle", { project_id, actor });
  }
  if (["failed", "blocked"].includes(s.lifecycle_status)) {
    s = transitionAgent(slug, "retry", { project_id, actor });
  }
  if (s.lifecycle_status === "retry") {
    s = transitionAgent(slug, "assigned", { project_id, actor });
  }
  pushControlEvent({
    id: uid("ctrl"),
    action: "retry",
    actor,
    agent_slug: slug,
    project_id,
    created_at: nowIso(),
  });
  return s;
}

export function cancelAgentTask(slug, { project_id = null, actor = "founder" } = {}) {
  return stopAgent(slug, { project_id, actor });
}

export function reassignTask({
  from_agent,
  to_agent,
  task_id,
  project_id = null,
  actor = "founder",
} = {}) {
  if (!isAgentExecutable(getAgentDefinition(to_agent))) {
    throw new Error("reassign target must be executable");
  }
  const from = getAgentState(from_agent, project_id);
  if (from && !["idle", "cancelled", "completed", "archived"].includes(from.lifecycle_status)) {
    transitionAgent(from_agent, "cancelled", {
      project_id,
      actor,
      reason: "reassigned",
      task_id,
    });
    transitionAgent(from_agent, "idle", { project_id, actor, task_id: null });
  }
  const to = transitionAgent(to_agent, "assigned", { project_id, actor, task_id });
  pushControlEvent({
    id: uid("ctrl"),
    action: "reassign",
    actor,
    agent_slug: to_agent,
    project_id,
    payload: { from_agent, task_id },
    created_at: nowIso(),
  });
  return to;
}

export function founderDecide({
  task_id,
  agent_slug,
  decision,
  project_id = null,
  actor = "founder",
} = {}) {
  if (!["approve", "reject"].includes(decision)) {
    throw new Error("Founder decision must be approve or reject");
  }
  // Never auto-complete — explicit decision required
  pushControlEvent({
    id: uid("ctrl"),
    action: decision,
    actor,
    agent_slug,
    project_id,
    payload: { task_id },
    created_at: nowIso(),
  });
  return founderApprovePipeline({
    task_id,
    agent_slug,
    project_id,
    actor,
    decision,
  });
}

export function getControlStatus() {
  return {
    paused: isWorkforcePaused(),
    recent: listControlEvents({ limit: 20 }),
    actions: CONTROL_ACTIONS,
  };
}
