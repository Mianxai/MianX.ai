// Learning candidates — verified improvement proposals (never auto-escalate capabilities).

import { validationError, forbidden } from "../errors";
import { clip } from "../validate";
import { containsSecretLikeContent } from "../memory/write";

export const LEARNING_STATUSES = [
  "proposed",
  "under_review",
  "validated",
  "rejected",
  "promoted",
  "superseded",
];

const UNSAFE_LESSON_PATTERNS = [
  /grant.*(capability|permission)/i,
  /bypass.*approval/i,
  /rewrite.*system\s*prompt/i,
  /change.*(provider|model)\s*policy/i,
  /disable.*(security|rls|csrf)/i,
  /self-?approv/i,
];

export function isUnsafeLearningProposal(text) {
  const s = String(text || "");
  return UNSAFE_LESSON_PATTERNS.some((re) => re.test(s));
}

export function buildLearningCandidate(raw = {}) {
  const problem = clip(raw.problem || "", 1000);
  const lesson = clip(raw.proposed_lesson || raw.lesson || "", 2000);
  if (!problem || !lesson) {
    throw validationError("Learning candidate requires problem and proposed_lesson.");
  }
  if (containsSecretLikeContent(problem) || containsSecretLikeContent(lesson)) {
    throw forbidden("Learning candidate rejected: secret-like content.");
  }
  if (isUnsafeLearningProposal(lesson) || isUnsafeLearningProposal(raw.proposed_change)) {
    throw forbidden(
      "Learning candidate rejected: proposes unsafe capability/policy self-modification."
    );
  }

  const confidence = Number(raw.confidence);
  return {
    organization_id: raw.organization_id || null,
    project_id: raw.project_id || null,
    source_run_id: raw.source_run_id || null,
    source_task_id: raw.source_task_id || null,
    source_workflow: raw.source_workflow ? clip(raw.source_workflow, 80) : null,
    agent_slug: raw.agent_slug ? clip(raw.agent_slug, 80) : null,
    department: raw.department ? clip(raw.department, 40) : null,
    problem,
    observed_evidence: Array.isArray(raw.observed_evidence)
      ? raw.observed_evidence.slice(0, 20)
      : [],
    proposed_lesson: lesson,
    proposed_change: raw.proposed_change ? clip(raw.proposed_change, 2000) : null,
    scope_type: ["organization", "project", "department", "agent", "workflow"].includes(
      raw.scope_type
    )
      ? raw.scope_type
      : "project",
    confidence:
      Number.isFinite(confidence) && confidence >= 0 && confidence <= 1
        ? confidence
        : 0.5,
    risk_class: ["R1", "R2", "R3", "R4"].includes(raw.risk_class) ? raw.risk_class : "R2",
    validation_requirements: Array.isArray(raw.validation_requirements)
      ? raw.validation_requirements.slice(0, 20)
      : ["evidence_review"],
    status: "proposed",
  };
}

/**
 * Validate promotion. Higher risk requires human admin/founder.
 */
export function assertLearningPromotion(candidate, { actorType = "system" } = {}) {
  if (!candidate || candidate.status !== "validated") {
    throw validationError("Only validated learning candidates can be promoted.");
  }
  if (isUnsafeLearningProposal(candidate.proposed_lesson)) {
    throw forbidden("Cannot promote unsafe learning candidate.");
  }
  const needsHuman = ["R3", "R4"].includes(candidate.risk_class) || candidate.confidence < 0.55;
  if (needsHuman && actorType !== "admin" && actorType !== "founder") {
    throw forbidden("Higher-risk learning requires Founder/admin approval.");
  }
  return true;
}

export function applyLearningDecision(candidate, decision, { reviewedBy = null, note = null } = {}) {
  const map = {
    review: "under_review",
    validate: "validated",
    reject: "rejected",
    promote: "promoted",
    supersede: "superseded",
  };
  const next = map[decision];
  if (!next) throw validationError("Unknown learning decision.");
  if (decision === "promote") {
    assertLearningPromotion({ ...candidate, status: "validated" }, { actorType: "admin" });
  }
  return {
    ...candidate,
    status: next,
    reviewed_by: reviewedBy || candidate.reviewed_by || null,
    review_note: note ? clip(note, 500) : candidate.review_note || null,
  };
}
