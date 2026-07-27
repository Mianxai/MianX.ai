// Project activation model: workforce belongs to MianX; projects get instances.

export const ACTIVATION_MODEL = {
  principle:
    "The workforce registry belongs to MianX.ai. Projects receive scoped agent instances — never a full workforce copy.",
  flow: [
    "MianX Workforce Registry (definitions)",
    "Project requirements",
    "Agent Router / Workforce Planner",
    "Required agent instances",
    "Tasks / Queue",
    "Execution (temporary workers)",
    "Idle / paused / retired instance",
  ],
  classes: {
    shared: {
      description: "Enterprise definitions available to assign into many projects.",
      examples: ["mianx.ceo.v1", "mianx.ciso.v1", "security.architect"],
    },
    project_dedicated: {
      description: "Instance bound to one project tenant with isolated memory/tools.",
      examples: ["project product manager pod roles"],
    },
    ephemeral: {
      description: "Short-lived instance for a workflow/task; disposed after completion.",
      examples: ["runtime.research", "runtime.qa-review"],
    },
    persistent_operational: {
      description: "Long-lived instance for ongoing ops (still not 445 always-on processes).",
      examples: ["runtime.lead-intelligence"],
    },
    approval_only: {
      description: "May recommend only; protected actions always human-gated.",
      examples: ["mianx.cfo.v1", "mianx.clo.v1", "security.penetration-tester"],
    },
  },
  projectProfiles: {
    "mianx-core": {
      label: "MianX.ai Core",
      activationHint: "Control plane + engineering/product/QA minimum + existing runtime agents",
      preferredClasses: ["shared", "persistent_operational", "ephemeral"],
    },
    "restaurant-os": {
      label: "RestaurantOS / Telepizza (Powered by MianX.ai — later)",
      activationHint: "Project pod; do not clone full 445",
      preferredClasses: ["project_dedicated", "shared", "ephemeral"],
    },
    "poultry-os": {
      label: "PoultryOS / AHLT (Powered by MianX.ai — later)",
      activationHint: "Project pod with domain specialists as needed",
      preferredClasses: ["project_dedicated", "shared", "ephemeral"],
    },
    "hospital-os": {
      label: "future HospitalOS",
      activationHint: "Elevated data-access and legal gates",
      preferredClasses: ["project_dedicated", "approval_only"],
    },
    "school-os": {
      label: "future SchoolOS",
      activationHint: "Elevated privacy gates",
      preferredClasses: ["project_dedicated", "approval_only"],
    },
    "client-generic": {
      label: "future client projects",
      activationHint: "Minimal pod + shared control plane",
      preferredClasses: ["project_dedicated", "shared", "ephemeral"],
    },
  },
  forbidden: [
    "Copy entire 445-slot workforce into every project",
    "Treat capacity_reserve as instantiable personas",
    "Run one process per role slot continuously",
    "Allow agents to grant themselves project access",
  ],
};

export const SAFETY_POLICY = {
  agentsMustNot: [
    "grant themselves new permissions",
    "change their own approval policy",
    "approve their own protected action",
    "change production secrets",
    "change billing",
    "perform legal commitments",
    "perform financial transfers",
    "delete production data",
    "deploy production autonomously",
    "modify human ownership",
    "bypass audit",
    "disable security controls",
  ],
  protectedActionsRequire: [
    "human approval record",
    "audit entry",
    "project/org scope check",
  ],
};

export function isInstantiable(definition) {
  if (!definition) return false;
  if (definition.roleType === "capacity_reserve") return false;
  if (definition.lifecycleStatus === "planned_capacity") return false;
  if (definition.lifecycleStatus === "deprecated") return false;
  return true;
}
