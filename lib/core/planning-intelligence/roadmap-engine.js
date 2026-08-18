/**
 * Roadmap engine — structure only. Never executes.
 */

import {
  ROADMAP_HORIZONS,
  makePlanningBase,
  uid,
} from "./schemas.js";

const HORIZON_META = {
  "30_day": { days: 30, milestone_count: 2, label: "30-day" },
  "90_day": { days: 90, milestone_count: 3, label: "90-day" },
  "180_day": { days: 180, milestone_count: 4, label: "180-day" },
  "1_year": { days: 365, milestone_count: 5, label: "1-year" },
  multi_year: { days: 730, milestone_count: 6, label: "multi-year" },
};

/**
 * Generate a planning roadmap (inert).
 */
export function generateRoadmap({
  objective = "",
  horizon = "90_day",
  capabilities = [],
  departments = [],
  goals = [],
  project_id = null,
  organization_id = null,
  estimated_agent_effort = null,
} = {}) {
  if (!ROADMAP_HORIZONS.includes(horizon)) {
    throw new Error(`Unsupported roadmap horizon: ${horizon}`);
  }
  const meta = HORIZON_META[horizon];
  const defaultGoals =
    goals.length > 0
      ? goals
      : [
          "Clarify Founder objective and constraints",
          "Select templates and capabilities",
          "Establish department ownership and approval gates",
          "Produce execution-ready backlog structure (no auto-run)",
        ];

  const milestones = [];
  for (let i = 0; i < meta.milestone_count; i++) {
    const day = Math.round(((i + 1) / meta.milestone_count) * meta.days);
    milestones.push(
      makePlanningBase({
        kind: "milestone",
        slug: `m${i + 1}-${horizon}`,
        name: `Milestone ${i + 1} (day ~${day})`,
        description: defaultGoals[i] || `Progress checkpoint ${i + 1}`,
        project_id,
        organization_id,
        payload: {
          day_target: day,
          horizon,
          approval_required: true,
          executes: false,
        },
      })
    );
  }

  const approval_gates = milestones.map((m, idx) => ({
    id: uid("agate"),
    milestone_id: m.id,
    name: `Founder gate after ${m.name}`,
    status: "pending",
    required: idx === 0 || idx === milestones.length - 1,
  }));

  const effort =
    estimated_agent_effort ||
    Math.max(4, capabilities.length * 2 + departments.length);

  const roadmap = makePlanningBase({
    kind: "roadmap",
    slug: `roadmap-${horizon}-${uid("r").slice(-5)}`,
    name: `${meta.label} planning roadmap`,
    description: `Deterministic planning roadmap for: ${String(objective).slice(0, 120)}`,
    project_id,
    organization_id,
    confidence: 0.75,
    payload: {
      horizon,
      days: meta.days,
      goals: defaultGoals,
      milestones: milestones.map((m) => m.id),
      milestone_objects: milestones,
      dependencies: milestones.slice(1).map((m, i) => ({
        from: milestones[i].id,
        to: m.id,
        kind: "wave_after",
      })),
      required_capabilities: capabilities.map((c) =>
        typeof c === "string" ? c : c.slug || c.id
      ),
      departments: departments.map((d) =>
        typeof d === "string" ? d : d.slug || d.id
      ),
      estimated_agent_effort: effort,
      approval_gates,
      execution_frozen: true,
      note: "Roadmap is planning structure only — Phase G consumes it; nothing runs here.",
    },
  });

  return roadmap;
}

export function listSupportedHorizons() {
  return ROADMAP_HORIZONS.map((h) => ({ horizon: h, ...HORIZON_META[h] }));
}
