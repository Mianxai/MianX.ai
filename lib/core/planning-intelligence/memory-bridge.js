/**
 * Memory bridge — persist planning decisions as candidates (Phase B compatible shape).
 * Does not auto-write to durable store without caller; in-process until migration applied.
 */

import { nowIso, uid } from "./schemas.js";
import { recordPlanningAudit } from "./audit.js";

const memoryEntries = [];

export function __resetPlanningMemory() {
  memoryEntries.length = 0;
}

export function listPlanningMemory({ project_id = null, limit = 100 } = {}) {
  let rows = [...memoryEntries];
  if (project_id) rows = rows.filter((r) => r.project_id === project_id);
  return rows.slice(-limit);
}

/**
 * Build memory candidates from a plan package.
 */
export function buildPlanningMemoryCandidates(plan, { actor = "system" } = {}) {
  if (!plan?.id) return [];
  const base = {
    project_id: plan.project_id || null,
    organization_id: plan.organization_id || null,
    plan_id: plan.id,
    source: "planning-intelligence",
    created_at: nowIso(),
    requires_human_review: true,
  };

  const candidates = [
    {
      ...base,
      id: uid("pmem"),
      type: "planning_decision",
      content: {
        summary: "Planning package created",
        status: plan.status,
        horizon: plan.roadmap?.payload?.horizon,
      },
    },
    {
      ...base,
      id: uid("pmem"),
      type: "assumptions",
      content: { assumptions: plan.assumptions || [] },
    },
    {
      ...base,
      id: uid("pmem"),
      type: "clarifications",
      content: { clarifications: plan.clarifications || [] },
    },
    {
      ...base,
      id: uid("pmem"),
      type: "founder_decisions",
      content: {
        approval_status: plan.approval_gate?.status || "pending",
        decisions: plan.founder_decisions || [],
      },
    },
    {
      ...base,
      id: uid("pmem"),
      type: "rejected_ideas",
      content: { rejected: plan.rejected_ideas || [] },
    },
    {
      ...base,
      id: uid("pmem"),
      type: "knowledge_gaps",
      content: { gaps: plan.capability_plan?.knowledge_gaps || [] },
    },
  ];

  recordPlanningAudit({
    action: "planning.memory.candidates",
    actor,
    plan_id: plan.id,
    count: candidates.length,
  });

  return candidates;
}

export function persistPlanningMemoryCandidates(candidates = []) {
  for (const c of candidates) memoryEntries.push(c);
  return { stored: candidates.length, durable: false };
}
