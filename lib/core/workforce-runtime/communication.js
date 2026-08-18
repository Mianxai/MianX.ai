/**
 * Inter-agent communication — delegate / receive / reply / escalate / complete.
 */

import { MESSAGE_KINDS, nowIso, uid } from "./schemas.js";
import { getAgentDefinition, isAgentExecutable } from "../agents.js";
import {
  pushMessage,
  listMessages,
  pushDelegation,
  listDelegations,
  recordAudit,
  isWorkforcePaused,
  getAgentState,
} from "./store.js";
import { transitionAgent } from "./lifecycle.js";

function assertExecutable(slug) {
  const def = getAgentDefinition(slug);
  if (!def || !isAgentExecutable(def)) {
    throw new Error(`Non-executable or unknown agent: ${slug}`);
  }
  return def;
}

export function createThreadId() {
  return uid("thread");
}

/**
 * Delegate a task from one real agent to another.
 */
export function delegateWork({
  from_agent,
  to_agent,
  task_id,
  summary,
  project_id = null,
  context = null,
  simulation = false,
} = {}) {
  if (isWorkforcePaused()) {
    throw new Error("Workforce is paused by Founder — delegation blocked");
  }
  assertExecutable(from_agent);
  assertExecutable(to_agent);
  if (from_agent === to_agent) {
    throw new Error("Cannot delegate to self");
  }

  // Reject circular active-delegation chains before creating a new edge.
  const provisional = [
    ...listDelegations({ project_id }).filter((d) =>
      ["open", "replied"].includes(d.status)
    ),
    { from_agent, to_agent, status: "open" },
  ];
  const adj = new Map();
  for (const d of provisional) {
    if (!adj.has(d.from_agent)) adj.set(d.from_agent, []);
    adj.get(d.from_agent).push(d.to_agent);
  }
  const visiting = new Set();
  const visited = new Set();
  function dfs(n) {
    if (visiting.has(n)) return true;
    if (visited.has(n)) return false;
    visiting.add(n);
    for (const m of adj.get(n) || []) {
      if (dfs(m)) return true;
    }
    visiting.delete(n);
    visited.add(n);
    return false;
  }
  for (const n of adj.keys()) {
    if (dfs(n)) {
      recordAudit({
        action: "workforce.delegation.circular_rejected",
        from_agent,
        to_agent,
        task_id,
        project_id,
      });
      throw new Error(
        `Circular delegation rejected: ${from_agent} → ${to_agent} would form a cycle`
      );
    }
  }

  const thread_id = createThreadId();
  const msg = {
    id: uid("msg"),
    thread_id,
    from_agent,
    to_agent,
    kind: "delegate",
    task_id,
    project_id,
    status: "sent",
    summary: String(summary || "").slice(0, 2000),
    context,
    simulation: Boolean(simulation),
    created_at: nowIso(),
  };
  pushMessage(msg);
  const delegation = {
    id: uid("del"),
    thread_id,
    from_agent,
    to_agent,
    task_id,
    project_id,
    status: "open",
    ownership: { task: from_agent, result: null },
    simulation: Boolean(simulation),
    created_at: nowIso(),
  };
  pushDelegation(delegation);
  const fromStatus = getAgentState(from_agent, project_id)?.lifecycle_status;
  if (fromStatus !== "delegating") {
    if (fromStatus === "idle") {
      transitionAgent(from_agent, "assigned", { project_id, task_id, actor: from_agent });
    }
    transitionAgent(from_agent, "delegating", { project_id, task_id, actor: from_agent });
  }
  const toStatus = getAgentState(to_agent, project_id)?.lifecycle_status;
  if (toStatus !== "assigned") {
    try {
      transitionAgent(to_agent, "assigned", { project_id, task_id, actor: from_agent });
    } catch {
      if (toStatus === "delegating" || toStatus === "thinking") {
        transitionAgent(to_agent, "waiting", { project_id, task_id, actor: from_agent });
      }
      transitionAgent(to_agent, "assigned", { project_id, task_id, actor: from_agent });
    }
  }
  recordAudit({
    action: "workforce.delegate",
    from_agent,
    to_agent,
    task_id,
    project_id,
    simulation: Boolean(simulation),
  });
  return { message: msg, delegation };
}

export function receiveWork({
  agent_slug,
  thread_id,
  task_id,
  project_id = null,
  simulation = false,
} = {}) {
  assertExecutable(agent_slug);
  const msg = {
    id: uid("msg"),
    thread_id,
    from_agent: agent_slug,
    to_agent: agent_slug,
    kind: "receive",
    task_id,
    project_id,
    status: "acked",
    simulation: Boolean(simulation),
    created_at: nowIso(),
  };
  pushMessage(msg);
  transitionAgent(agent_slug, "thinking", { project_id, task_id, actor: agent_slug });
  return msg;
}

export function replyWork({
  from_agent,
  to_agent,
  thread_id,
  task_id,
  summary,
  project_id = null,
  result_ownership = null,
  simulation = false,
} = {}) {
  assertExecutable(from_agent);
  assertExecutable(to_agent);
  const msg = {
    id: uid("msg"),
    thread_id,
    from_agent,
    to_agent,
    kind: "reply",
    task_id,
    project_id,
    status: "sent",
    summary: String(summary || "").slice(0, 2000),
    result_ownership,
    simulation: Boolean(simulation),
    created_at: nowIso(),
  };
  pushMessage(msg);
  const open = listDelegations({ project_id }).find(
    (d) => d.thread_id === thread_id && d.status === "open"
  );
  if (open) {
    open.status = "replied";
    open.ownership = {
      ...open.ownership,
      result: result_ownership || from_agent,
    };
  }
  recordAudit({ action: "workforce.reply", from_agent, to_agent, thread_id, project_id });
  return msg;
}

export function escalateWork({
  from_agent,
  to_agent,
  thread_id,
  task_id,
  reason,
  project_id = null,
  simulation = false,
} = {}) {
  assertExecutable(from_agent);
  assertExecutable(to_agent);
  const msg = {
    id: uid("msg"),
    thread_id,
    from_agent,
    to_agent,
    kind: "escalate",
    task_id,
    project_id,
    status: "escalated",
    summary: String(reason || "Escalation").slice(0, 2000),
    simulation: Boolean(simulation),
    requires_founder: to_agent === "executive-ceo" || reason?.includes("founder"),
    created_at: nowIso(),
  };
  pushMessage(msg);
  transitionAgent(from_agent, "waiting", { project_id, task_id, actor: from_agent, reason });
  recordAudit({
    action: "workforce.escalate",
    from_agent,
    to_agent,
    reason,
    project_id,
  });
  return msg;
}

export function completeDelegation({
  thread_id,
  agent_slug,
  task_id,
  project_id = null,
  simulation = false,
} = {}) {
  assertExecutable(agent_slug);
  const msg = {
    id: uid("msg"),
    thread_id,
    from_agent: agent_slug,
    to_agent: agent_slug,
    kind: "complete",
    task_id,
    project_id,
    status: "completed",
    simulation: Boolean(simulation),
    created_at: nowIso(),
  };
  pushMessage(msg);
  const open = listDelegations({ project_id }).find((d) => d.thread_id === thread_id);
  if (open) open.status = "completed";
  return msg;
}

export function getThread(thread_id) {
  return listMessages({ thread_id });
}

export function detectCircularDelegation(project_id = null) {
  const edges = listDelegations({ project_id }).filter((d) =>
    ["open", "replied"].includes(d.status)
  );
  const adj = new Map();
  for (const d of edges) {
    if (!adj.has(d.from_agent)) adj.set(d.from_agent, []);
    adj.get(d.from_agent).push(d.to_agent);
  }
  const visiting = new Set();
  const visited = new Set();
  const cycles = [];
  function dfs(n, path) {
    if (visiting.has(n)) {
      cycles.push([...path, n]);
      return;
    }
    if (visited.has(n)) return;
    visiting.add(n);
    for (const m of adj.get(n) || []) dfs(m, [...path, n]);
    visiting.delete(n);
    visited.add(n);
  }
  for (const n of adj.keys()) dfs(n, []);
  return { cycles, ok: cycles.length === 0 };
}

export { MESSAGE_KINDS };
