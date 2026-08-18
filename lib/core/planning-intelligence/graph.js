/**
 * Planning dependency graph — topo order, cycles, critical path, waves, impact.
 * Planning only; never executes work.
 */

import { ACYCLIC_DEPENDENCY_KINDS, uid, nowIso } from "./schemas.js";

const auditLog = [];

export function __resetPlanningGraphAudit() {
  auditLog.length = 0;
}

export function listPlanningGraphAudit() {
  return [...auditLog];
}

function record(entry) {
  auditLog.push({ ...entry, at: nowIso() });
}

/**
 * @typedef {{ id: string, from: string, to: string, kind: string, meta?: object }} PlanningEdge
 * @typedef {{ id: string, kind?: string, name?: string, effort?: number }} PlanningNode
 */

export function makeEdge(from, to, kind = "requires", meta = {}) {
  return { id: uid("dep"), from, to, kind, meta };
}

/**
 * Detect cycles among acyclic edge kinds. Throws + audits on cycle.
 */
export function assertAcyclic(edges = [], { actor = "system" } = {}) {
  const filtered = (edges || []).filter((e) =>
    ACYCLIC_DEPENDENCY_KINDS.includes(e.kind)
  );
  const adj = new Map();
  for (const e of filtered) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from).push(e.to);
  }
  const visiting = new Set();
  const visited = new Set();
  const stack = [];

  function dfs(node) {
    if (visiting.has(node)) {
      const cycle = [...stack, node];
      record({
        action: "planning.graph.cycle_rejected",
        actor,
        cycle,
      });
      throw new Error(`Planning graph cycle detected: ${cycle.join(" → ")}`);
    }
    if (visited.has(node)) return;
    visiting.add(node);
    stack.push(node);
    for (const next of adj.get(node) || []) dfs(next);
    stack.pop();
    visiting.delete(node);
    visited.add(node);
  }

  for (const node of adj.keys()) dfs(node);
  return true;
}

/**
 * Kahn topological order. Returns { order, blocked } or throws if cycle.
 */
export function topologicalOrder(nodes = [], edges = []) {
  assertAcyclic(edges);
  const ids = nodes.map((n) => (typeof n === "string" ? n : n.id));
  const idSet = new Set(ids);
  const indeg = new Map(ids.map((id) => [id, 0]));
  const adj = new Map(ids.map((id) => [id, []]));

  for (const e of edges || []) {
    if (!idSet.has(e.from) || !idSet.has(e.to)) continue;
    if (!ACYCLIC_DEPENDENCY_KINDS.includes(e.kind)) continue;
    adj.get(e.from).push(e.to);
    indeg.set(e.to, (indeg.get(e.to) || 0) + 1);
  }

  const queue = ids.filter((id) => indeg.get(id) === 0);
  const order = [];
  while (queue.length) {
    const n = queue.shift();
    order.push(n);
    for (const m of adj.get(n) || []) {
      indeg.set(m, indeg.get(m) - 1);
      if (indeg.get(m) === 0) queue.push(m);
    }
  }
  if (order.length !== ids.length) {
    throw new Error("Planning graph incomplete topo order (cycle or missing nodes)");
  }
  return { order, node_count: ids.length, edge_count: (edges || []).length };
}

/**
 * Longest-path critical path by effort (default 1 per node).
 */
export function criticalPath(nodes = [], edges = []) {
  const { order } = topologicalOrder(nodes, edges);
  const effort = new Map();
  for (const n of nodes) {
    const id = typeof n === "string" ? n : n.id;
    const e = typeof n === "string" ? 1 : Number(n.effort) || 1;
    effort.set(id, e);
  }
  const preds = new Map(order.map((id) => [id, []]));
  for (const e of edges || []) {
    if (!ACYCLIC_DEPENDENCY_KINDS.includes(e.kind)) continue;
    if (!preds.has(e.to)) continue;
    preds.get(e.to).push(e.from);
  }
  const dist = new Map();
  const parent = new Map();
  for (const id of order) {
    let best = 0;
    let bestPred = null;
    for (const p of preds.get(id) || []) {
      const d = (dist.get(p) || 0) + (effort.get(p) || 1);
      if (d >= best) {
        best = d;
        bestPred = p;
      }
    }
    dist.set(id, best + (effort.get(id) || 1));
    if (bestPred) parent.set(id, bestPred);
  }
  let end = order[0];
  let max = 0;
  for (const id of order) {
    if ((dist.get(id) || 0) >= max) {
      max = dist.get(id);
      end = id;
    }
  }
  const path = [];
  let cur = end;
  while (cur) {
    path.unshift(cur);
    cur = parent.get(cur);
  }
  return { path, length: max, end };
}

/**
 * Nodes blocked by unresolved dependencies (ids not in completed set).
 */
export function blockingAnalysis(nodes = [], edges = [], completed = []) {
  const done = new Set(completed);
  const ids = nodes.map((n) => (typeof n === "string" ? n : n.id));
  const blockers = new Map(ids.map((id) => [id, []]));
  for (const e of edges || []) {
    if (!["blocks", "requires", "wave_after"].includes(e.kind)) continue;
    if (!done.has(e.from)) {
      if (blockers.has(e.to)) blockers.get(e.to).push(e.from);
    }
  }
  const blocked = [];
  const ready = [];
  for (const id of ids) {
    if (done.has(id)) continue;
    const b = blockers.get(id) || [];
    if (b.length) blocked.push({ id, blocked_by: b });
    else ready.push(id);
  }
  return { blocked, ready, completed: [...done] };
}

/**
 * Partition into execution waves by dependency layers (planning preview only).
 */
export function executionWaves(nodes = [], edges = []) {
  const { order } = topologicalOrder(nodes, edges);
  const level = new Map();
  const preds = new Map(order.map((id) => [id, []]));
  for (const e of edges || []) {
    if (!ACYCLIC_DEPENDENCY_KINDS.includes(e.kind)) continue;
    if (preds.has(e.to)) preds.get(e.to).push(e.from);
  }
  for (const id of order) {
    const ps = preds.get(id) || [];
    const lvl = ps.length ? Math.max(...ps.map((p) => level.get(p) || 0)) + 1 : 1;
    level.set(id, lvl);
  }
  const byWave = new Map();
  for (const id of order) {
    const w = level.get(id);
    if (!byWave.has(w)) byWave.set(w, []);
    byWave.get(w).push(id);
  }
  return [...byWave.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([wave, node_ids]) => ({
      wave,
      node_ids,
      status: "preview_only",
      note: "Wave is planning-only — nothing executes until Founder approval and Phase G.",
    }));
}

/**
 * Downstream impact of changing a node.
 */
export function impactAnalysis(nodeId, edges = []) {
  const downstream = new Set();
  const stack = [nodeId];
  while (stack.length) {
    const cur = stack.pop();
    for (const e of edges || []) {
      if (e.from === cur && !downstream.has(e.to)) {
        downstream.add(e.to);
        stack.push(e.to);
      }
    }
  }
  const upstream = new Set();
  const up = [nodeId];
  while (up.length) {
    const cur = up.pop();
    for (const e of edges || []) {
      if (e.to === cur && !upstream.has(e.from)) {
        upstream.add(e.from);
        up.push(e.from);
      }
    }
  }
  return {
    node_id: nodeId,
    impacts: [...downstream],
    depends_on: [...upstream],
  };
}

/**
 * Rollback dependency edges (what must reverse if a node is rolled back).
 */
export function rollbackDependencies(nodeId, edges = []) {
  const related = (edges || []).filter(
    (e) =>
      (e.from === nodeId || e.to === nodeId) &&
      (e.kind === "rollback_of" || e.kind === "requires" || e.kind === "blocks")
  );
  return {
    node_id: nodeId,
    rollback_edges: related,
    note: "Rollback guidance is planning metadata only — no automatic reverse execution.",
  };
}

/**
 * Validate edge references against known node ids.
 */
export function validateReferences(nodes = [], edges = []) {
  const ids = new Set(nodes.map((n) => (typeof n === "string" ? n : n.id)));
  const invalid = [];
  for (const e of edges || []) {
    if (!ids.has(e.from) || !ids.has(e.to)) {
      invalid.push(e);
    }
  }
  if (invalid.length) {
    record({
      action: "planning.graph.invalid_references",
      count: invalid.length,
      invalid_ids: invalid.map((e) => e.id),
    });
    throw new Error(
      `Invalid planning dependency references: ${invalid.map((e) => e.id).join(", ")}`
    );
  }
  return true;
}
