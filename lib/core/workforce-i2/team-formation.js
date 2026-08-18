/**
 * Automatic project team formation from a Founder objective.
 */

import { allocateSeatToProject } from "./store";
import { auditRealAgentWorkflowCoverage } from "../real-agent/workflow-coverage";

const OBJECTIVE_ROUTES = [
  {
    match: /onboard|employee|hr/i,
    workflow: "employee-onboarding",
    departments: ["leadership", "hr", "security", "operations", "qa"],
  },
  {
    match: /incident|outage|ops/i,
    workflow: "operations-incident",
    departments: ["operations", "support", "analytics"],
  },
  {
    match: /lead|sales|qualif/i,
    workflow: "lead-qualification",
    departments: ["sales", "marketing", "qa"],
  },
  {
    match: /growth|campaign|seo|market/i,
    workflow: "business-growth",
    departments: ["marketing", "seo", "sales", "customer-success"],
  },
  {
    match: /security|ciso|vulnerab/i,
    workflow: "security-review",
    departments: ["security", "qa", "engineering"],
  },
  {
    match: /release|deploy|readiness/i,
    workflow: "release-readiness",
    departments: ["qa", "security", "devops", "engineering"],
  },
  {
    match: /executive|strategy|readiness/i,
    workflow: "executive-readiness",
    departments: ["leadership"],
  },
  {
    match: /enterprise|company|objective/i,
    workflow: "enterprise-objective",
    departments: ["leadership", "product", "engineering"],
  },
  {
    match: /product|requirement|architect|engineer|software|build|code/i,
    workflow: "software-delivery",
    departments: ["product", "engineering", "qa", "security", "devops"],
  },
];

export function classifyObjective(objectiveTitle = "") {
  for (const route of OBJECTIVE_ROUTES) {
    if (route.match.test(objectiveTitle)) return route;
  }
  return {
    match: /.*/,
    workflow: "software-delivery",
    departments: ["product", "engineering", "qa"],
  };
}

/**
 * Build an allocation plan — does not start work until Founder gate.
 */
export function planProjectTeam({
  projectId,
  organizationId = null,
  objectiveTitle,
  activate = false,
} = {}) {
  if (!projectId) throw new Error("projectId required");
  const route = classifyObjective(objectiveTitle);
  const coverage = auditRealAgentWorkflowCoverage();
  const family = coverage.families.find((f) => f.founderId === route.workflow);

  const plannedRoles = route.departments.map((department, idx) => ({
    order: idx + 1,
    department,
    reason: `Objective classified as ${route.workflow}; department ${department} required.`,
    qa: department === "qa" || department === "security",
  }));

  const allocations = [];
  if (activate) {
    for (const role of plannedRoles) {
      const result = allocateSeatToProject({
        department: role.department,
        projectId,
        organizationId,
        workflowId: family?.mappedWorkflowKey || route.workflow,
      });
      allocations.push({ ...role, allocation: result });
    }
  }

  return {
    projectId,
    objectiveTitle,
    workflow: route.workflow,
    mappedWorkflowKey: family?.mappedWorkflowKey || route.workflow,
    departments: route.departments,
    plannedRoles,
    allocations,
    founderApprovalRequired: true,
    activationNote:
      "Agents activate only after the required Founder/plan gate. This plan does not deploy or send email.",
    reasons: plannedRoles.map((r) => r.reason),
  };
}
