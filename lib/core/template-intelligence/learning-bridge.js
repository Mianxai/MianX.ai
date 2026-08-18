/**
 * Learning bridge — proposals only; never auto-modify active templates.
 */

import { ENGINE_VERSION, nowIso } from "./schemas";
import { recordTemplateAudit } from "./audit";

const UNSAFE_PATTERNS = [
  /escalat(e|ion).*capability/i,
  /bypass.*(approval|review)/i,
  /disable.*(rls|auth|audit)/i,
  /exfiltrat|secret|api[_-]?key/i,
  /auto.?activate.*all.*agents/i,
  /modify.*active.*template.*without.*review/i,
];

export function assessLearningProposal(proposal = {}) {
  const text = JSON.stringify(proposal);
  for (const re of UNSAFE_PATTERNS) {
    if (re.test(text)) {
      recordTemplateAudit({
        action: "template.learning_rejected_unsafe",
        reason: String(re),
        proposal_type: proposal.type,
      });
      return {
        ok: false,
        rejected: true,
        reason: "unsafe_learning_proposal",
        human_review_required: true,
      };
    }
  }
  if (!proposal.evidence || (Array.isArray(proposal.evidence) && !proposal.evidence.length)) {
    return {
      ok: false,
      rejected: true,
      reason: "evidence_required",
      human_review_required: true,
    };
  }
  if (typeof proposal.confidence !== "number" || proposal.confidence < 0.6) {
    return {
      ok: false,
      rejected: true,
      reason: "confidence_too_low",
      human_review_required: true,
    };
  }
  return {
    ok: true,
    rejected: false,
    status: "pending_human_review",
    applies_to_active_templates: false,
    note: "No automatic modification of active templates.",
    engine_version: ENGINE_VERSION,
    assessed_at: nowIso(),
  };
}

export function proposeTemplateImprovements(templatePlan) {
  const proposals = [];
  if (!templatePlan?.ok) return proposals;

  if ((templatePlan.workforce_gaps || []).length) {
    proposals.push({
      type: "missing_capability_pattern",
      summary: "Workforce gaps detected — consider catalog coverage review.",
      evidence: templatePlan.workforce_gaps,
      confidence: 0.65,
      human_review_required: true,
    });
  }
  if ((templatePlan.match?.confidence || 0) < 0.7) {
    proposals.push({
      type: "template_selection_improvement",
      summary: "Match confidence below 0.7 — improve matcher signals or ask clarifying questions.",
      evidence: [{ confidence: templatePlan.match.confidence }],
      confidence: 0.62,
      human_review_required: true,
    });
  }
  return proposals.map((p) => ({
    ...p,
    assessment: assessLearningProposal(p),
  }));
}
