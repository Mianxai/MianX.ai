// CEO Strategic Planner — deterministic plan from structured objective.

import { BUILDER_DEPARTMENTS } from "./schemas";

/**
 * Generate Vision, Roadmap outline, departments, phases, risks, deliverables.
 */
export function buildCeoStrategicPlan(objective) {
  const product = objective.product_hint || "New Product";
  const industry = objective.industry || "general";

  const departmentsRequired = [...BUILDER_DEPARTMENTS];

  const executionPhases = [
    {
      id: "phase-discover",
      name: "Discover",
      goal: `Clarify ${product} problem space and MianX platform boundaries`,
      owners: ["product", "research", "legal"],
    },
    {
      id: "phase-foundation",
      name: "Foundation",
      goal: "Define architecture, security baseline, and operating model on MianX Core",
      owners: ["engineering", "security", "devops", "operations"],
    },
    {
      id: "phase-build",
      name: "Build",
      goal: "Deliver core capabilities as MianX-powered product modules (future cycle)",
      owners: ["engineering", "design", "qa", "product"],
    },
    {
      id: "phase-harden",
      name: "Harden",
      goal: "QA, security review, support readiness, finance/legal gates",
      owners: ["qa", "security", "support", "finance", "legal"],
    },
    {
      id: "phase-launch-ready",
      name: "Launch-ready",
      goal: "GTM packaging and Founder go/no-go — no silent production launch",
      owners: ["marketing", "sales", "operations", "product"],
    },
  ];

  return {
    vision: `Use MianX Core as the autonomous company engine to plan and, only after Founder approval, later deliver ${product} (${industry}) as a Powered-by-MianX product — never as a diversion of Core itself.`,
    roadmap_summary: executionPhases.map((p) => p.name),
    departments_required: departmentsRequired,
    execution_phases: executionPhases,
    risks: [
      {
        id: "risk-scope-creep",
        summary: "Industry product scope could divert Core engineering",
        mitigation: "Company Builder stays planning-only until Founder approval; Core remains platform-first",
      },
      {
        id: "risk-premature-execution",
        summary: "Agents might start building without approval",
        mitigation: "Hard approval gate — no agent runs or protected actions from this blueprint until approved",
      },
      {
        id: "risk-provider",
        summary: "Live AI provider may be unconfigured",
        mitigation: "Planning is deterministic; provider optional for later execution cycles",
      },
    ],
    deliverables: [
      "Structured Founder objective",
      "CEO strategic plan",
      "Per-department execution plans",
      "Unified enterprise backlog",
      "Cross-department dependency graph",
      "Execution roadmap",
      "Founder approval request",
    ],
    priority: objective.priority,
    risk_class: objective.risk_class,
    generated_at: new Date().toISOString(),
  };
}
