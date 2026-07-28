/**
 * Learning activation — proposals only. Never auto-approve.
 */

import { nowIso, uid } from "./schemas.js";
import { pushLearningProposal, listLearningProposals, recordAudit } from "./store.js";

export function proposeWorkforceLearning({
  agent_slug,
  project_id = null,
  task_id = null,
  simulation = false,
} = {}) {
  const proposals = [
    {
      id: uid("wlearn"),
      type: "improvement_proposal",
      agent_slug,
      project_id,
      task_id,
      status: "pending_review",
      auto_approved: false,
      simulation: Boolean(simulation),
      summary: "Improve task routing latency for this department",
      evidence: [{ kind: "pipeline", note: "post_task" }],
      confidence: 0.55,
      created_at: nowIso(),
    },
    {
      id: uid("wlearn"),
      type: "skill_proposal",
      agent_slug,
      project_id,
      task_id,
      status: "pending_review",
      auto_approved: false,
      summary: "Document specialist skill gap observed in simulation",
      evidence: [{ kind: "simulation", note: "skill_gap" }],
      confidence: 0.55,
      created_at: nowIso(),
    },
    {
      id: uid("wlearn"),
      type: "workflow_proposal",
      agent_slug,
      project_id,
      task_id,
      status: "pending_review",
      auto_approved: false,
      summary: "Tighten claim→verify stage checks",
      evidence: [{ kind: "pipeline", note: "verify" }],
      confidence: 0.6,
      created_at: nowIso(),
    },
    {
      id: uid("wlearn"),
      type: "template_proposal",
      agent_slug,
      project_id,
      task_id,
      status: "pending_review",
      auto_approved: false,
      summary: "Link recurring objective patterns to template match scores",
      evidence: [{ kind: "template", note: "match_feedback" }],
      confidence: 0.55,
      created_at: nowIso(),
    },
  ];
  for (const p of proposals) {
    if (p.auto_approved === true) {
      throw new Error("Learning proposals must never be auto-approved");
    }
    pushLearningProposal(p);
  }
  recordAudit({
    action: "workforce.learning.proposals",
    agent_slug,
    project_id,
    count: proposals.length,
    auto_approved: false,
  });
  return proposals;
}

export function assessLearningProposal(proposal = {}) {
  const reasons = [];
  if (proposal.auto_approved === true || proposal.auto_apply === true) {
    reasons.push("auto_approve_forbidden");
  }
  if (!proposal.evidence?.length) reasons.push("evidence_required");
  if (proposal.confidence == null || Number(proposal.confidence) < 0.5) {
    reasons.push("confidence_too_low");
  }
  return {
    safe: reasons.length === 0,
    reasons,
    requires_human_review: true,
    auto_approved: false,
  };
}

export { listLearningProposals };
