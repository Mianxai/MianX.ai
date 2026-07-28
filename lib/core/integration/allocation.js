/**
 * Allocate only agents required by the approved plan — not all 36.
 */

import { listActiveAgentDefinitions, isAgentExecutable } from "../agents.js";
import { uid, nowIso } from "./schemas.js";

export function allocateAgentsForPlan({
  planning_plan = null,
  template_plan = null,
  project_id = null,
  integration_run_id = null,
  max_agents = 12,
} = {}) {
  const executable = listActiveAgentDefinitions().filter(isAgentExecutable);
  const bySlug = new Map(executable.map((a) => [a.slug, a]));

  const candidates = new Set();
  const reasons = [];

  // Prefer agents from template/planning maps
  const mapped =
    template_plan?.agent_map?.agents ||
    template_plan?.agents ||
    planning_plan?.capability_plan?.agent_candidates ||
    [];

  for (const item of mapped) {
    const slug = typeof item === "string" ? item : item?.slug;
    if (slug && bySlug.has(slug)) {
      candidates.add(slug);
      reasons.push({
        slug,
        selected: true,
        reason: "capability_or_template_match",
      });
    }
  }

  // Always include CEO for hierarchical delegation proof
  if (bySlug.has("executive-ceo")) {
    candidates.add("executive-ceo");
    if (!reasons.find((r) => r.slug === "executive-ceo")) {
      reasons.push({
        slug: "executive-ceo",
        selected: true,
        reason: "hierarchical_delegation_anchor",
      });
    }
  }

  // Department heads from planning departments
  const depts =
    planning_plan?.capability_plan?.department_ownership ||
    planning_plan?.departments ||
    template_plan?.departments ||
    [];

  for (const d of depts) {
    const deptSlug = typeof d === "string" ? d : d?.slug || d?.department;
    const head = executable.find(
      (a) =>
        (a.department === deptSlug || a.department_slug === deptSlug) &&
        /head|lead|director|manager|ceo|cto|cfo|coo/i.test(
          `${a.slug} ${a.name || ""} ${a.role || ""}`
        )
    );
    if (head) {
      candidates.add(head.slug);
      reasons.push({
        slug: head.slug,
        selected: true,
        reason: `department_ownership:${deptSlug}`,
      });
    }
  }

  // Cap allocation — never auto-activate all 36
  let selected = [...candidates].slice(0, max_agents);
  if (selected.length < 3) {
    // Ensure minimal hierarchy: CEO + 2 specialists
    for (const a of executable) {
      if (selected.includes(a.slug)) continue;
      selected.push(a.slug);
      reasons.push({
        slug: a.slug,
        selected: true,
        reason: "minimum_simulation_coverage",
      });
      if (selected.length >= 5) break;
    }
  }

  const rejected = executable
    .filter((a) => !selected.includes(a.slug))
    .map((a) => ({
      slug: a.slug,
      selected: false,
      reason: "not_required_by_approved_plan",
    }));

  return {
    id: uid("alloc"),
    integration_run_id,
    project_id,
    selected_agents: selected.map((slug) => {
      const a = bySlug.get(slug);
      return {
        slug,
        department: a?.department || a?.department_slug || null,
        capabilities: a?.allowedCapabilities || [],
      };
    }),
    rejected_agents: rejected,
    selection_reasons: reasons.filter((r) => selected.includes(r.slug)),
    activated_all_36: false,
    count: selected.length,
    created_at: nowIso(),
  };
}
