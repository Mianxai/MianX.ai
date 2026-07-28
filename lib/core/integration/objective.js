/**
 * Founder objective intake for Phase H integration.
 * Does not invent missing critical information.
 */

import { uid, nowIso } from "./schemas.js";

const CRITICAL_FIELDS = [
  "title",
  "business_purpose",
  "expected_deliverables",
  "success_criteria",
  "project_id",
];

/**
 * Normalize and validate Founder objective intake.
 */
export function intakeObjective(raw = {}, { actor = "founder" } = {}) {
  const objective = {
    id: raw.id || uid("obj"),
    title: String(raw.title || raw.objective || "").trim(),
    business_purpose: String(raw.business_purpose || raw.purpose || "").trim(),
    expected_deliverables: normalizeList(raw.expected_deliverables || raw.deliverables),
    success_criteria: normalizeList(raw.success_criteria),
    constraints: normalizeList(raw.constraints),
    project_id: raw.project_id || null,
    organization_id: raw.organization_id || null,
    priority: raw.priority || "P2",
    risk_tolerance: raw.risk_tolerance || "moderate",
    budget_mode: raw.budget_mode || "simulation_only",
    execution_mode: raw.execution_mode || "deterministic_simulation",
    deadline_preference: raw.deadline_preference || null,
    required_approvals: normalizeList(raw.required_approvals || ["founder_simulation"]),
    protected_actions: normalizeList(raw.protected_actions),
    known_assumptions: normalizeList(raw.known_assumptions || raw.assumptions),
    unresolved_questions: normalizeList(raw.unresolved_questions || raw.questions),
    industry: raw.industry || null,
    business_model: raw.business_model || null,
    compliance_sensitivity: Boolean(raw.compliance_sensitivity),
    clarification_answers: raw.clarification_answers || {},
    created_by: actor,
    created_at: nowIso(),
  };

  // Surface free-text objective as title/purpose when provided alone
  if (!objective.title && raw.objective) {
    objective.title = String(raw.objective).trim().slice(0, 120);
  }
  if (!objective.business_purpose && raw.objective) {
    objective.business_purpose = String(raw.objective).trim();
  }

  const missing = CRITICAL_FIELDS.filter((f) => {
    const v = objective[f];
    if (Array.isArray(v)) return v.length === 0;
    return !v;
  });

  // Clarification only when critical fields are missing or Founder left questions open.
  // Do not invent missing critical information; do not over-block complete objectives.
  const clarification_required =
    missing.length > 0 || objective.unresolved_questions.length > 0;

  return {
    objective,
    clarification_required,
    missing_fields: missing,
    confidence: clarification_required
      ? Math.max(0.2, 0.85 - missing.length * 0.15)
      : objective.business_purpose.length < 24
        ? 0.75
        : 0.9,
    fabricated: false,
  };
}

export function applyClarification(objective, answers = {}) {
  const next = {
    ...objective,
    clarification_answers: {
      ...(objective.clarification_answers || {}),
      ...answers,
    },
  };

  if (answers.title) next.title = String(answers.title).trim();
  if (answers.business_purpose) next.business_purpose = String(answers.business_purpose).trim();
  if (answers.expected_deliverables) {
    next.expected_deliverables = normalizeList(answers.expected_deliverables);
  }
  if (answers.success_criteria) {
    next.success_criteria = normalizeList(answers.success_criteria);
  }
  if (answers.constraints) next.constraints = normalizeList(answers.constraints);
  if (answers.unresolved_questions === "" || answers.clear_questions) {
    next.unresolved_questions = [];
  }
  if (Array.isArray(answers.unresolved_questions)) {
    next.unresolved_questions = normalizeList(answers.unresolved_questions);
  }
  if (answers.known_assumptions) {
    next.known_assumptions = normalizeList(answers.known_assumptions);
  }

  return intakeObjective(next, { actor: objective.created_by || "founder" });
}

function normalizeList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(/[\n,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [String(value)];
}
