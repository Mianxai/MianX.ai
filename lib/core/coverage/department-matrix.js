// Automated 20-department functional coverage matrix.
// Capacity slots (445) ≠ always-on agents. This asserts each department has
// at least one honest canonical + runtime path.

import { DEPARTMENTS } from "@/lib/workforce/departments";
import {
  WORKFORCE_DEFINITIONS,
  namedDefinitionCount,
  capacityReserveSlotTotal,
  plannedSlotContribution,
} from "@/lib/workforce/definitions";
import { PLANNED_ROLE_SLOT_TOTAL } from "@/lib/workforce/constants";
import { listActiveAgentDefinitions } from "@/lib/core/agents";
import { isInstantiable } from "@/lib/workforce/activation";

/** @typedef {"FUNCTIONAL"|"ADVISORY_ONLY"|"HUMAN_GATED"} CoverageClass */

/** Expected coverage class per department (honest, not aspirational). */
export const DEPARTMENT_COVERAGE_EXPECTATIONS = {
  leadership: "HUMAN_GATED",
  engineering: "FUNCTIONAL",
  devops: "FUNCTIONAL",
  security: "FUNCTIONAL",
  infrastructure: "FUNCTIONAL",
  "data-ai": "FUNCTIONAL",
  product: "FUNCTIONAL",
  design: "FUNCTIONAL",
  marketing: "FUNCTIONAL",
  seo: "FUNCTIONAL",
  sales: "FUNCTIONAL",
  finance: "ADVISORY_ONLY",
  hr: "ADVISORY_ONLY",
  legal: "ADVISORY_ONLY",
  operations: "FUNCTIONAL",
  support: "FUNCTIONAL",
  "customer-success": "FUNCTIONAL",
  research: "FUNCTIONAL",
  qa: "FUNCTIONAL",
  analytics: "FUNCTIONAL",
};

function namedForDept(slug) {
  return WORKFORCE_DEFINITIONS.filter(
    (d) =>
      d.department === slug &&
      d.roleType !== "capacity_reserve" &&
      !d.runtimeSlug
  );
}

function runtimeLinksForDept(slug) {
  return WORKFORCE_DEFINITIONS.filter(
    (d) => d.department === slug && d.runtimeSlug
  );
}

function activeRuntimeForDept(slug) {
  const active = listActiveAgentDefinitions();
  const named = namedForDept(slug);
  const links = runtimeLinksForDept(slug);
  const workforceSlugs = new Set(named.map((d) => d.slug));
  const runtimeSlugs = new Set([
    ...named.map((d) => {
      // Prefer explicit note mapping via active agent workforceSlug
      const hit = active.find((a) => a.workforceSlug === d.slug);
      return hit?.slug;
    }).filter(Boolean),
    ...links.map((d) => d.runtimeSlug).filter(Boolean),
    ...active.filter((a) => a.department === slug).map((a) => a.slug),
  ]);
  return {
    named,
    workforceSlugs: [...workforceSlugs],
    runtimeSlugs: [...runtimeSlugs],
    instantiableNamed: named.filter(isInstantiable),
  };
}

/**
 * Build the coverage matrix for all 20 departments.
 */
export function buildDepartmentCoverageMatrix() {
  const rows = DEPARTMENTS.map((dept) => {
    const expected = DEPARTMENT_COVERAGE_EXPECTATIONS[dept.slug];
    const detail = activeRuntimeForDept(dept.slug);
    const hasNamed = detail.instantiableNamed.length > 0 || detail.runtimeSlugs.length > 0;
    const isCapacityOnly = dept.inventoryCompleteness === "capacity_only";
    const coverageClass = expected;
    const ok =
      Boolean(expected) &&
      !isCapacityOnly &&
      hasNamed &&
      detail.runtimeSlugs.length > 0;

    return {
      department: dept.slug,
      inventoryCompleteness: dept.inventoryCompleteness,
      coverageClass,
      namedDefinitions: detail.workforceSlugs,
      runtimeAgents: detail.runtimeSlugs,
      ok,
      reason: ok
        ? "has_named_and_runtime_path"
        : isCapacityOnly
          ? "still_capacity_only"
          : !hasNamed
            ? "missing_named_or_runtime"
            : "missing_runtime_agent",
    };
  });

  const active = listActiveAgentDefinitions();
  return {
    departments: rows,
    allCovered: rows.every((r) => r.ok),
    unexplainedCapacityOnly: rows.filter((r) => r.inventoryCompleteness === "capacity_only"),
    figures: {
      maximumCapacity: PLANNED_ROLE_SLOT_TOTAL,
      namedDefinitions: namedDefinitionCount(),
      executableDefinitions: active.length,
      activeMinimum: 3,
      reserveCapacity: capacityReserveSlotTotal(),
      slotContribution: plannedSlotContribution(),
    },
  };
}
