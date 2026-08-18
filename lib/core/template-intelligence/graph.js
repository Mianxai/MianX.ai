/**
 * Template relationship graph — validation, acyclicity, traversal, impact.
 */

import { ACYCLIC_RELATION_TYPES, RELATION_TYPES, nodeKey } from "./schemas";
import { listCatalogRelations } from "./catalog/relations";
import { recordTemplateAudit } from "./audit";

function edgeKey(e) {
  return `${e.from_type}:${e.from_id}>${e.relation_type}>${e.to_type}:${e.to_id}`;
}

export function buildRelationGraph(relations = listCatalogRelations()) {
  const nodes = new Set();
  const outbound = new Map();
  const inbound = new Map();
  const edges = [];

  for (const rel of relations) {
    if (!RELATION_TYPES.includes(rel.relation_type)) {
      throw new Error(`Invalid relation type: ${rel.relation_type}`);
    }
    const from = nodeKey(rel.from_type, rel.from_id);
    const to = nodeKey(rel.to_type, rel.to_id);
    nodes.add(from);
    nodes.add(to);
    edges.push(rel);
    if (!outbound.has(from)) outbound.set(from, []);
    if (!inbound.has(to)) inbound.set(to, []);
    outbound.get(from).push(rel);
    inbound.get(to).push(rel);
  }

  return { nodes, outbound, inbound, edges };
}

export function validateRelation(rel, { knownIds = null } = {}) {
  if (!rel?.from_type || !rel?.from_id || !rel?.to_type || !rel?.to_id || !rel?.relation_type) {
    return { ok: false, error: "Relation missing required fields" };
  }
  if (!RELATION_TYPES.includes(rel.relation_type)) {
    return { ok: false, error: `Unknown relation_type ${rel.relation_type}` };
  }
  if (knownIds) {
    const fk = nodeKey(rel.from_type, rel.from_id);
    const tk = nodeKey(rel.to_type, rel.to_id);
    if (!knownIds.has(fk) || !knownIds.has(tk)) {
      return { ok: false, error: `Invalid reference: ${fk} → ${tk}` };
    }
  }
  return { ok: true };
}

/**
 * Detect cycles among edges of acyclic relation types.
 */
export function detectCycles(relations = listCatalogRelations()) {
  const relevant = relations.filter((r) =>
    ACYCLIC_RELATION_TYPES.includes(r.relation_type)
  );
  const adj = new Map();
  for (const r of relevant) {
    const a = nodeKey(r.from_type, r.from_id);
    const b = nodeKey(r.to_type, r.to_id);
    if (!adj.has(a)) adj.set(a, []);
    adj.get(a).push(b);
  }
  const visiting = new Set();
  const visited = new Set();
  const cycles = [];

  function dfs(node, stack) {
    if (visiting.has(node)) {
      cycles.push([...stack, node]);
      return;
    }
    if (visited.has(node)) return;
    visiting.add(node);
    stack.push(node);
    for (const next of adj.get(node) || []) dfs(next, stack);
    stack.pop();
    visiting.delete(node);
    visited.add(node);
  }

  for (const node of adj.keys()) dfs(node, []);
  return cycles;
}

export function assertAcyclic(relations = listCatalogRelations(), { actor = "system" } = {}) {
  const cycles = detectCycles(relations);
  if (cycles.length) {
    recordTemplateAudit({
      action: "template.relation_cycle_rejected",
      actor,
      cycles,
    });
    throw new Error(`Invalid relation cycle detected: ${cycles[0].join(" -> ")}`);
  }
  return true;
}

export function traverseDependencies(startKind, startId, relations = listCatalogRelations()) {
  const graph = buildRelationGraph(relations);
  const start = nodeKey(startKind, startId);
  const seen = new Set();
  const order = [];
  function walk(node) {
    if (seen.has(node)) return;
    seen.add(node);
    order.push(node);
    for (const rel of graph.outbound.get(node) || []) {
      walk(nodeKey(rel.to_type, rel.to_id));
    }
  }
  walk(start);
  return order;
}

export function impactAnalysis(kind, id, relations = listCatalogRelations()) {
  const graph = buildRelationGraph(relations);
  const start = nodeKey(kind, id);
  const impacted = new Set();
  const queue = [start];
  const seen = new Set([start]);
  while (queue.length) {
    const node = queue.shift();
    for (const rel of graph.inbound.get(node) || []) {
      const parent = nodeKey(rel.from_type, rel.from_id);
      if (!seen.has(parent)) {
        seen.add(parent);
        impacted.add(parent);
        queue.push(parent);
      }
    }
    for (const rel of graph.outbound.get(node) || []) {
      const child = nodeKey(rel.to_type, rel.to_id);
      if (!seen.has(child)) {
        seen.add(child);
        impacted.add(child);
        queue.push(child);
      }
    }
  }
  return [...impacted];
}

export function lineageFromTemplateToBacklog(templateRef, backlogItems = []) {
  // Soft lineage helper — maps backlog items that declare template lineage.
  return (backlogItems || []).filter((item) => {
    const lin = item?.lineage || item?.template_lineage || {};
    return (
      lin.template_slug === templateRef.slug ||
      lin.capability === templateRef.slug ||
      lin.module === templateRef.slug
    );
  });
}

export { edgeKey };
