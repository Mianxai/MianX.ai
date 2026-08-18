/**
 * Capability planner — objective → capabilities, gaps, ownership, memory/learning hooks.
 */

import { selectCapabilitiesFromObjective } from "../template-intelligence/capability-engine.js";
import {
  mapCapabilitiesToDepartments,
  mapDepartmentsToExecutableAgents,
} from "../template-intelligence/department-engine.js";
import { makePlanningBase, nowIso } from "./schemas.js";

/**
 * Plan capabilities from a Founder objective (deterministic).
 */
export function planCapabilities({
  objective = "",
  complianceSensitive = false,
  templatePlan = null,
  project_id = null,
  organization_id = null,
} = {}) {
  const caps = selectCapabilitiesFromObjective(objective, { complianceSensitive });
  const deptMap = mapCapabilitiesToDepartments(caps.capabilities);
  const agentMap = mapDepartmentsToExecutableAgents(deptMap.departments);

  const required = caps.capabilities.filter((c) => c.required !== false);
  const optional = caps.capabilities.filter((c) => c.required === false);

  const templateRefs = (templatePlan?.match?.selected_templates || []).map((t) => ({
    kind: t.kind,
    slug: t.slug,
    version: t.version,
  }));

  const knowledgeGaps = [
    ...caps.missing_information || [],
    ...(templatePlan?.unresolved_questions || []),
    ...deptMap.missing_department_coverage.map((g) => `department:${g.requested}`),
  ];

  const approvalRequirements = [
    {
      stage: "capability_selection",
      status: "pending",
      reason: "Founder must confirm capability set before WBS promotion",
    },
  ];
  if (complianceSensitive) {
    approvalRequirements.push({
      stage: "legal_compliance_review",
      status: "pending",
      reason: "Compliance-sensitive objective requires qualified human legal review",
      human_review_required: true,
    });
  }

  const memoryRequirements = [
    "store_verified_capability_selection",
    "store_founder_assumptions",
    "store_knowledge_gaps",
  ];

  const learningOpportunities = [
    "improve_capability_keyword_mapping",
    "improve_department_ownership_hints",
  ];

  const capabilityObjects = caps.capabilities.map((c) =>
    makePlanningBase({
      kind: "capability",
      slug: c.slug,
      name: c.name || c.slug,
      description: c.description || "",
      project_id,
      organization_id,
      confidence: c.confidence ?? 0.7,
      payload: {
        required: c.required !== false,
        priority: c.priority || "medium",
        owning_department: c.owning_department || null,
        template_refs: templateRefs,
        required_modules: c.required_modules || [],
        maturity_target: c.maturity_target || "defined",
        acceptance_criteria: c.acceptance_criteria || [],
      },
    })
  );

  return {
    ok: true,
    created_at: nowIso(),
    required_capabilities: required.map((c) => c.slug),
    optional_capabilities: optional.map((c) => c.slug),
    missing_capabilities: [
      ...deptMap.missing_department_coverage.map((g) => ({
        type: "department_coverage",
        detail: g,
      })),
      ...agentMap.workforce_gaps.map((g) => ({
        type: "workforce_gap",
        detail: g,
      })),
    ],
    department_ownership: deptMap.departments,
    executable_agents: agentMap.agents,
    workforce_gaps: agentMap.workforce_gaps,
    template_references: templateRefs,
    approval_requirements: approvalRequirements,
    knowledge_gaps: knowledgeGaps,
    memory_requirements: memoryRequirements,
    learning_opportunities: learningOpportunities,
    capability_objects: capabilityObjects,
    reserve_capacity: agentMap.reserve_capacity || [],
    note: "Capability plan is advisory. No agents activated. No industry product built.",
  };
}
