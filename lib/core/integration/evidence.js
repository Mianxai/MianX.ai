/**
 * Canonical evidence contracts + run manifests.
 */

import { uid, nowIso } from "./schemas.js";
import { saveEvidenceManifest, getEvidenceManifest } from "./store.js";

export const EVIDENCE_KINDS = Object.freeze([
  "generated_artefact_reference",
  "test_result",
  "validation_result",
  "approval_record",
  "decision_record",
  "output_checksum",
  "execution_log",
  "memory_write",
  "learning_proposal",
  "failure_evidence",
]);

export function makeEvidence({
  kind,
  integration_run_id,
  project_id,
  organization_id = null,
  subject_id = null,
  summary = "",
  payload = {},
  checksum = null,
} = {}) {
  if (!EVIDENCE_KINDS.includes(kind)) {
    throw new Error(`Unknown evidence kind: ${kind}`);
  }
  return {
    id: uid("ev"),
    kind,
    integration_run_id,
    project_id,
    organization_id,
    subject_id,
    summary,
    checksum: checksum || uid("sum"),
    fabricated: false,
    live_provider: false,
    created_at: nowIso(),
    payload,
  };
}

export function buildEvidenceManifest(run, items = []) {
  const manifest = {
    id: uid("evm"),
    integration_run_id: run.id,
    project_id: run.project_id,
    organization_id: run.organization_id,
    correlation_id: run.correlation_id,
    trace_id: run.trace_id,
    items,
    count: items.length,
    lineage: { ...run.lineage },
    fabricated_execution: false,
    provider_called: Boolean(run.provider_called),
    created_at: nowIso(),
  };
  saveEvidenceManifest(manifest);
  return manifest;
}

export function getOrBuildManifest(run) {
  return getEvidenceManifest(run.id) || buildEvidenceManifest(run, []);
}

/**
 * Verify task completion claims — unsupported completion is rejected.
 */
export function verifyTaskCompletion({
  claim = {},
  expected_output = null,
  success_criteria = [],
  evidence = [],
  reviewer_decision = null,
} = {}) {
  const reasons = [];
  if (!expected_output && !claim.expected_output) {
    reasons.push("missing_expected_output");
  }
  if (!success_criteria?.length && !claim.success_criteria_result) {
    reasons.push("missing_success_criteria_result");
  }
  if (!evidence?.length) reasons.push("missing_evidence");
  if (!reviewer_decision) reasons.push("missing_reviewer_decision");
  if (claim.unsupported || claim.fabricated) {
    reasons.push("unsupported_or_fabricated_claim");
  }

  if (reasons.length) {
    return {
      ok: false,
      status: claim.require_founder ? "founder_review_required" : "verification_failed",
      reasons,
      fabricated_execution: false,
    };
  }

  return {
    ok: true,
    status: "verified",
    reasons: [],
    fabricated_execution: false,
  };
}
