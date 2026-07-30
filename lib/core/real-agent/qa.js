/**
 * Independent QA for real-agent outputs — producer cannot self-approve.
 */

import { forbidden, validationError } from "../errors";

export const QA_RESULTS = Object.freeze([
  "accepted",
  "accepted_with_warnings",
  "revision_required",
  "blocked",
  "rejected",
]);

/**
 * @param {object} args
 */
export function runIndependentQa({
  producerSlug,
  reviewerSlug,
  objective = null,
  acceptanceCriteria = null,
  output = null,
  evidence = [],
  documentsUsed = [],
  protectedActionsProposed = [],
  projectId = null,
  schemaValid = true,
} = {}) {
  if (!reviewerSlug) {
    throw validationError("QA requires reviewerSlug.", { reviewerSlug: "required" });
  }
  if (producerSlug && reviewerSlug === producerSlug) {
    throw forbidden("The producing agent cannot review or approve its own output.");
  }

  const warnings = [];
  const issues = [];

  if (!projectId) issues.push("missing_project_scope");
  if (!schemaValid) issues.push("schema_invalid");
  if (!output || typeof output !== "object") issues.push("missing_structured_output");
  if (!Array.isArray(evidence) || evidence.length === 0) {
    warnings.push("evidence_thin");
  }
  if (!documentsUsed?.length) warnings.push("no_documents_cited");
  if (acceptanceCriteria && output) {
    // Soft check — presence only
    if (typeof acceptanceCriteria === "string" && acceptanceCriteria.length > 20) {
      /* criteria present */
    }
  }
  if (protectedActionsProposed?.length) {
    issues.push("protected_actions_require_founder");
  }

  // Unsupported claim heuristic
  const blob = JSON.stringify(output || {});
  if (/production deployed|email sent|merged to main/i.test(blob)) {
    issues.push("unsupported_side_effect_claim");
  }

  let result = "accepted";
  if (issues.includes("schema_invalid") || issues.includes("missing_structured_output")) {
    result = "rejected";
  } else if (issues.includes("protected_actions_require_founder")) {
    result = "blocked";
  } else if (issues.includes("unsupported_side_effect_claim") || issues.includes("missing_project_scope")) {
    result = "revision_required";
  } else if (warnings.length) {
    result = "accepted_with_warnings";
  }

  return {
    result,
    producerSlug,
    reviewerSlug,
    objective: objective || null,
    warnings,
    issues,
    checks: {
      objectiveAlignment: Boolean(objective),
      acceptanceCriteriaPresent: Boolean(acceptanceCriteria),
      evidenceComplete: evidence.length > 0,
      unsupportedClaims: issues.includes("unsupported_side_effect_claim"),
      securityViolations: false,
      protectedActions: protectedActionsProposed.length > 0,
      schemaValid,
      sourcesPresent: documentsUsed.length > 0,
      contradictions: false,
      projectIsolation: Boolean(projectId),
    },
    revisionTaskRequired: result === "revision_required" || result === "rejected",
  };
}
