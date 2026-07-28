/**
 * Learning bridge — propose planning improvements. Never auto-modify approved plans.
 */

import { nowIso, uid } from "./schemas.js";
import { recordPlanningAudit } from "./audit.js";

const proposals = [];

export function __resetPlanningLearning() {
  proposals.length = 0;
}

export function listPlanningLearningProposals({ limit = 50 } = {}) {
  return proposals.slice(-limit);
}

/**
 * Assess whether a learning proposal is safe.
 */
export function assessPlanningLearningProposal(proposal = {}) {
  const reasons = [];
  if (proposal.auto_apply === true) {
    reasons.push("auto_apply_forbidden");
  }
  if (proposal.modifies_approved_plan === true) {
    reasons.push("cannot_modify_approved_plan");
  }
  if (proposal.escalates_capabilities === true) {
    reasons.push("capability_escalation_forbidden");
  }
  if (proposal.fabricates_execution === true) {
    reasons.push("fabricated_execution_forbidden");
  }
  if (!proposal.evidence || (Array.isArray(proposal.evidence) && !proposal.evidence.length)) {
    reasons.push("evidence_required");
  }
  if (proposal.confidence == null || Number(proposal.confidence) < 0.5) {
    reasons.push("confidence_too_low");
  }

  const safe = reasons.length === 0;
  recordPlanningAudit({
    action: safe ? "planning.learning.accepted_candidate" : "planning.learning.rejected",
    reasons,
    proposal_id: proposal.id || null,
  });

  return {
    ok: safe,
    safe,
    reasons,
    requires_human_review: true,
    auto_apply: false,
  };
}

/**
 * Suggest roadmap / dependency / capability improvements (candidates only).
 */
export function proposePlanningImprovements(plan, { actor = "system" } = {}) {
  if (!plan) return [];
  const suggestions = [
    {
      id: uid("plearn"),
      type: "better_roadmap",
      summary: "Consider aligning milestone density with capability count",
      evidence: [{ kind: "heuristic", note: "milestone_count vs capability_count" }],
      confidence: 0.55,
      auto_apply: false,
      modifies_approved_plan: false,
      plan_id: plan.id,
      created_at: nowIso(),
      actor,
    },
    {
      id: uid("plearn"),
      type: "better_dependency",
      summary: "Review wave_after edges between epics for unnecessary serialization",
      evidence: [{ kind: "graph", note: "epic_sequence" }],
      confidence: 0.55,
      auto_apply: false,
      modifies_approved_plan: false,
      plan_id: plan.id,
      created_at: nowIso(),
      actor,
    },
    {
      id: uid("plearn"),
      type: "better_capability_mapping",
      summary: "Revisit optional vs required capabilities after Founder clarification",
      evidence: [{ kind: "capability_plan", note: "optional_capabilities" }],
      confidence: 0.6,
      auto_apply: false,
      modifies_approved_plan: false,
      plan_id: plan.id,
      created_at: nowIso(),
      actor,
    },
  ];

  const out = [];
  for (const s of suggestions) {
    const assessment = assessPlanningLearningProposal(s);
    const row = { ...s, assessment };
    proposals.push(row);
    out.push(row);
  }

  recordPlanningAudit({
    action: "planning.learning.proposals_created",
    actor,
    plan_id: plan.id,
    count: out.length,
  });

  return out;
}
