// Per-department execution plans (deterministic).

import { BUILDER_DEPARTMENTS } from "./schemas";

const DEPT_TEMPLATES = {
  product: {
    mission: "Define product outcomes and prioritised capability slices",
    workstreams: ["outcome map", "MVP boundary", "acceptance criteria"],
  },
  engineering: {
    mission: "Architecture and delivery plan on MianX Core primitives",
    workstreams: ["service boundaries", "API contracts", "test strategy"],
  },
  design: {
    mission: "Experience principles and critical journey specs",
    workstreams: ["IA", "key flows", "accessibility checklist"],
  },
  research: {
    mission: "Evidence pack for industry constraints and competitors",
    workstreams: ["desk research", "assumption log", "open questions"],
  },
  qa: {
    mission: "Quality gates and regression strategy",
    workstreams: ["risk-based test plan", "acceptance matrix", "release checklist"],
  },
  security: {
    mission: "Threat model and control requirements",
    workstreams: ["data classification", "authz model", "secret handling"],
  },
  devops: {
    mission: "Environments, CI, and safe release path",
    workstreams: ["env topology", "observability", "rollback plan"],
  },
  marketing: {
    mission: "Positioning as Powered by MianX.ai (not Core diversion)",
    workstreams: ["narrative", "launch assets list", "channel plan"],
  },
  sales: {
    mission: "Discovery motions and commercial packaging outline",
    workstreams: ["ICP", "demo script outline", "objection map"],
  },
  support: {
    mission: "Support model and escalation paths",
    workstreams: ["SLAs draft", "runbooks list", "feedback loop"],
  },
  finance: {
    mission: "Cost envelope and billing constraints (advisory)",
    workstreams: ["cost drivers", "budget checkpoints", "approval triggers"],
  },
  legal: {
    mission: "Compliance and contractual constraints (advisory)",
    workstreams: ["data processing notes", "terms checklist", "risk register"],
  },
  operations: {
    mission: "Operating cadence and Founder control points",
    workstreams: ["RACI", "status rituals", "incident readiness"],
  },
};

/**
 * Build one plan per required department.
 */
export function buildDepartmentPlans(objective, ceoPlan) {
  const required = ceoPlan?.departments_required || BUILDER_DEPARTMENTS;
  return required.map((dept) => {
    const tpl = DEPT_TEMPLATES[dept] || {
      mission: `Contribute to ${objective.product_hint}`,
      workstreams: ["plan", "execute-later", "review"],
    };
    return {
      department: dept,
      mission: tpl.mission,
      workstreams: tpl.workstreams,
      depends_on_phases: (ceoPlan?.execution_phases || [])
        .filter((p) => (p.owners || []).includes(dept))
        .map((p) => p.id),
      status: "planned",
      execution_allowed: false,
      note: "Department plan is advisory until Founder approval of the company blueprint.",
    };
  });
}
