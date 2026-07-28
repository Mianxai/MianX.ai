/**
 * Department + agent mapping from capabilities using real workforce catalog only.
 * Never fabricates departments or agents. Does not activate all 36 agents.
 */

import { listDepartmentTemplates } from "./catalog/departments";
import { listActiveAgentDefinitions } from "@/lib/core/agents";

export function mapCapabilitiesToDepartments(capabilities = []) {
  const deptCatalog = new Map(listDepartmentTemplates().map((d) => [d.slug, d]));
  const departments = [];
  const missing = [];
  const reviewRequirements = new Set();

  for (const cap of capabilities) {
    const slug = cap.owning_department;
    if (!slug) continue;
    if (!deptCatalog.has(slug)) {
      missing.push({
        type: "department",
        capability: cap.slug,
        requested: slug,
        message: "Department not present in workforce catalog — gap reported, not fabricated.",
      });
      continue;
    }
    if (!departments.find((d) => d.slug === slug)) {
      const tpl = deptCatalog.get(slug);
      departments.push({
        slug,
        name: tpl.name,
        version: tpl.version,
        template_id: tpl.id,
        workforce_department_slug: tpl.payload.workforce_department_slug,
        review_requirements: tpl.payload.review_requirements || [],
        security_involvement: Boolean(tpl.payload.security_involvement),
        legal_involvement: Boolean(tpl.payload.legal_involvement),
        reserve_capacity: Boolean(tpl.payload.reserve_capacity),
        capabilities: [cap.slug],
      });
      for (const r of tpl.payload.review_requirements || []) reviewRequirements.add(r);
    } else {
      const row = departments.find((d) => d.slug === slug);
      if (!row.capabilities.includes(cap.slug)) row.capabilities.push(cap.slug);
    }
  }

  return {
    departments,
    missing_department_coverage: missing,
    review_requirements: [...reviewRequirements],
  };
}

/**
 * Map departments to executable agents from the real catalog.
 * Does NOT auto-activate all agents — returns candidates only.
 */
export function mapDepartmentsToExecutableAgents(departments = [], { maxPerDepartment = 3 } = {}) {
  const definitions = listActiveAgentDefinitions?.() || [];
  const agents = Array.isArray(definitions) ? definitions : [];
  const byDept = [];
  const gaps = [];

  for (const dept of departments) {
    const matches = agents.filter((a) => {
      const d =
        a.department ||
        a.departmentSlug ||
        a.workforceSlug?.split?.(".")?.[0] ||
        "";
      return String(d).toLowerCase() === String(dept.slug).toLowerCase() ||
        String(a.workforceSlug || "").toLowerCase().startsWith(`${dept.slug}.`);
    });
    const executable = matches
      .filter((a) => a.roleType !== "capacity_reserve")
      .slice(0, maxPerDepartment)
      .map((a) => ({
        slug: a.slug || a.id,
        name: a.name,
        department: dept.slug,
        executable: true,
      }));

    if (!executable.length) {
      gaps.push({
        department: dept.slug,
        message: "No executable agent matched in catalog for department — gap reported.",
      });
    }
    byDept.push({
      department: dept.slug,
      executable_agents: executable,
      reserve_noted: matches.some((a) => a.roleType === "capacity_reserve"),
      catalog_match_count: matches.length,
    });
  }

  return {
    department_agents: byDept,
    workforce_gaps: gaps,
    activation_policy: "candidates_only_no_auto_activation",
  };
}
