// Hierarchy helpers: reporting graph, cycle detection, Founder supremacy.

import { AI_HIERARCHY_LEVELS, HIERARCHY_LEVELS } from "./constants";
import { WORKFORCE_DEFINITIONS } from "./definitions";

export const FOUNDER_NODE = {
  slug: "founder",
  name: "Founder / Human Authority",
  hierarchyLevel: "L0",
  isHuman: true,
};

/**
 * Build adjacency: reportsTo → children slugs (AI definitions only).
 * `founder` is a virtual parent, never an AI definition.
 */
export function buildReportingGraph(definitions = WORKFORCE_DEFINITIONS) {
  const nodes = new Map();
  nodes.set(FOUNDER_NODE.slug, { ...FOUNDER_NODE, children: [] });

  for (const d of definitions) {
    if (d.roleType === "capacity_reserve") continue;
    if (d.runtimeSlug && d.capacitySlots === 0) {
      // runtime-linked still participate in reporting for governance checks
    }
    nodes.set(d.slug, {
      slug: d.slug,
      name: d.name,
      hierarchyLevel: d.hierarchyLevel,
      reportsTo: d.reportsTo,
      isHuman: false,
      children: [],
    });
  }

  for (const d of definitions) {
    if (d.roleType === "capacity_reserve") continue;
    const parent = d.reportsTo || "founder";
    if (!nodes.has(parent)) {
      throw new Error(`Unknown reportsTo "${parent}" for ${d.slug}`);
    }
    if (parent === d.slug) {
      throw new Error(`Self-reporting forbidden: ${d.slug}`);
    }
    nodes.get(parent).children.push(d.slug);
  }

  return nodes;
}

export function detectHierarchyCycles(definitions = WORKFORCE_DEFINITIONS) {
  const graph = buildReportingGraph(definitions);
  const visiting = new Set();
  const visited = new Set();
  const cycles = [];

  function dfs(slug, path) {
    if (visiting.has(slug)) {
      cycles.push([...path, slug]);
      return;
    }
    if (visited.has(slug)) return;
    visiting.add(slug);
    const node = graph.get(slug);
    for (const child of node?.children || []) {
      dfs(child, [...path, slug]);
    }
    visiting.delete(slug);
    visited.add(slug);
  }

  dfs("founder", []);
  return cycles;
}

export function assertValidHierarchy(definitions = WORKFORCE_DEFINITIONS) {
  for (const d of definitions) {
    if (d.roleType === "capacity_reserve") continue;
    if (!HIERARCHY_LEVELS.includes(d.hierarchyLevel)) {
      throw new Error(`Invalid hierarchyLevel on ${d.slug}`);
    }
    if (d.hierarchyLevel === "L0") {
      throw new Error(`AI definition cannot be L0: ${d.slug}`);
    }
    if (!AI_HIERARCHY_LEVELS.includes(d.hierarchyLevel)) {
      throw new Error(`Invalid AI hierarchyLevel on ${d.slug}`);
    }
    if (d.reportsTo === d.slug) {
      throw new Error(`Self-reporting: ${d.slug}`);
    }
    if (d.canSelfApprove === true && d.riskClass === "R4") {
      throw new Error(`R4 role cannot self-approve: ${d.slug}`);
    }
    if (d.canSelfApprove === true) {
      throw new Error(`canSelfApprove must be false for all registry roles: ${d.slug}`);
    }
  }
  const cycles = detectHierarchyCycles(definitions);
  if (cycles.length) {
    throw new Error(`Hierarchy cycles detected: ${JSON.stringify(cycles)}`);
  }
  return true;
}

export function hierarchySummary() {
  return {
    levels: HIERARCHY_LEVELS,
    rule: "Every AI role has exactly one reportsTo; Founder (L0) is human-only; no cycles; no self-approve.",
    layers: {
      L0: "Founder / Human Authority",
      L1: "Executive orchestration (AI CEO)",
      L2: "C-Suite agents",
      L3: "Department Directors (mostly capacity pending)",
      L4: "Managers / Team Leads",
      L5: "Specialist / Execution Agents",
    },
  };
}
