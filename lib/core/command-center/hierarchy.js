// Command Center hierarchy — maps executable agents into Founder → CEO → C-suite → depts.

import { listActiveAgentDefinitions } from "@/lib/core/agents";
import { DEPARTMENTS } from "@/lib/workforce/departments";

/** Legacy base agents without department metadata. */
export const BASE_AGENT_DEPARTMENT = {
  "lead-intelligence": "sales",
  research: "research",
  "qa-review": "qa",
};

/** Reasonable hierarchy parents for base agents. */
export const BASE_AGENT_REPORTS_TO = {
  "lead-intelligence": "executive-cso",
  research: "executive-chief-scientist",
  "qa-review": "executive-cto",
};

export const AGENT_STATUSES = [
  "working",
  "idle",
  "waiting",
  "blocked",
  "approval_required",
  "failed",
  "paused",
  "unavailable",
];

/**
 * Normalize an active agent definition for the command center.
 */
export function normalizeAgentNode(def) {
  const department =
    def.department || BASE_AGENT_DEPARTMENT[def.slug] || "leadership";
  const reportsTo =
    def.reportsTo || BASE_AGENT_REPORTS_TO[def.slug] || "executive-ceo";
  return {
    slug: def.slug,
    name: def.name,
    purpose: def.purpose,
    department,
    hierarchyLevel: def.hierarchyLevel || null,
    reportsTo,
    workforceSlug: def.workforceSlug || null,
    allowedCapabilities: [...(def.allowedCapabilities || [])],
    prohibitedCapabilities: [...(def.prohibitedCapabilities || [])],
    lifecycleStatus: def.lifecycleStatus,
    defaultProvider: def.defaultProvider || null,
    defaultModel: def.defaultModel || null,
    requiresHumanApproval: Boolean(def.requiresHumanApproval),
    riskClass: def.riskClass || null,
    autonomyLevel: def.autonomyLevel || null,
  };
}

/**
 * Build company → department → team → agent hierarchy from live catalog.
 * Teams are derived from department registry when available; agents without a
 * team key land in `default`.
 */
export function buildAgentHierarchy(agents = listActiveAgentDefinitions()) {
  const nodes = agents.map(normalizeAgentNode);
  const bySlug = new Map(nodes.map((n) => [n.slug, n]));

  const edges = [];
  // Founder → CEO
  edges.push({ from: "founder", to: "executive-ceo", kind: "authority" });

  for (const node of nodes) {
    const parent = node.reportsTo;
    if (!parent || parent === node.slug) continue;
    if (parent === "founder") {
      edges.push({ from: "founder", to: node.slug, kind: "authority" });
      continue;
    }
    if (bySlug.has(parent) || parent.startsWith("executive-")) {
      edges.push({ from: parent, to: node.slug, kind: "reports_to" });
    }
  }

  const departments = DEPARTMENTS.map((dept) => {
    const deptAgents = nodes.filter((n) => n.department === dept.slug);
    const teams = (dept.teams || ["default"]).map((teamSlug) => ({
      slug: teamSlug,
      name: teamSlug.replace(/-/g, " "),
      agents: deptAgents
        // Prefer agents whose domain/team hint matches; otherwise share all
        .filter((a) => {
          if (dept.teams.length <= 1) return true;
          // Without explicit team assignment, put all under first team for drill-down
          return teamSlug === dept.teams[0];
        })
        .map((a) => a.slug),
    }));

    // Ensure every agent appears once: put leftovers into last team if needed
    const assigned = new Set(teams.flatMap((t) => t.agents));
    const leftovers = deptAgents.filter((a) => !assigned.has(a.slug)).map((a) => a.slug);
    if (leftovers.length && teams.length) {
      teams[teams.length - 1].agents.push(...leftovers);
    }

    return {
      slug: dept.slug,
      name: dept.name,
      plannedRoleSlots: dept.plannedRoleSlots,
      executiveAgentSlug: dept.executiveAgentSlug,
      agentCount: deptAgents.length,
      agentSlugs: deptAgents.map((a) => a.slug),
      teams,
    };
  });

  return {
    root: {
      id: "founder",
      label: "Founder / Human Authority",
      kind: "human",
    },
    orchestrator: {
      id: "executive-ceo",
      label: "Executive Orchestrator / CEO",
      kind: "executive",
    },
    agents: nodes,
    departments,
    edges,
    executableCount: nodes.length,
  };
}

/**
 * Filter hierarchy agent list to a department.
 */
export function filterHierarchyByDepartment(hierarchy, departmentSlug) {
  if (!departmentSlug || departmentSlug === "all") return hierarchy;
  const agents = hierarchy.agents.filter((a) => a.department === departmentSlug);
  const slugs = new Set(agents.map((a) => a.slug));
  return {
    ...hierarchy,
    agents,
    departments: hierarchy.departments.filter((d) => d.slug === departmentSlug),
    edges: hierarchy.edges.filter(
      (e) =>
        e.from === "founder" ||
        slugs.has(e.from) ||
        slugs.has(e.to) ||
        e.to === "executive-ceo"
    ),
    executableCount: agents.length,
  };
}
