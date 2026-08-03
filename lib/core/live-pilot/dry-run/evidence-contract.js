/**
 * Durable evidence content-integrity contract for dry-run rehearsal.
 * Content integrity checksum — not a digital signature (no signing key).
 * Never stores secrets, Authorization headers, or environment dumps.
 */

import { createHash } from "node:crypto";

export const EVIDENCE_REQUIRED_FIELDS = Object.freeze([
  "pilotRunId",
  "projectId",
  "agentId",
  "taskId",
  "taskEnvelopeHash",
  "providerName",
  "configuredModel",
  "approvedModel",
  "accountVerifiedModelStatus",
  "providerRequestId",
  "requestStartedAt",
  "requestCompletedAt",
  "latencyMs",
  "inputTokens",
  "outputTokens",
  "totalTokens",
  "estimatedCostMicrousd",
  "maximumAuthorizedCostMicrousd",
  "pricingSource",
  "pricingVerifiedAt",
  "schemaValidationPassed",
  "providerCallCount",
  "attemptCount",
  "timeoutType",
  "terminalStatus",
  "blockedReason",
  "errorCategory",
  "evidenceEnvironment",
  "evidenceCreatedAt",
  "evidenceChecksum",
]);

export const EVIDENCE_FORBIDDEN_KEYS = Object.freeze([
  "apiKey",
  "authorization",
  "Authorization",
  "OPENAI_API_KEY",
  "env",
  "environment",
  "cookie",
  "serviceRole",
  "SUPABASE_SERVICE_ROLE_KEY",
  "sessionToken",
  "sb-access-token",
]);

export function buildPilotEvidenceRecord(input = {}) {
  for (const key of EVIDENCE_FORBIDDEN_KEYS) {
    if (Object.prototype.hasOwnProperty.call(input, key) && input[key] != null) {
      throw new Error(`EVIDENCE_FORBIDDEN_FIELD:${key}`);
    }
  }

  const estimatedCostMicrousd =
    input.estimatedCostMicrousd != null
      ? Number(input.estimatedCostMicrousd)
      : input.estimatedCostUsd != null
        ? Math.round(Number(input.estimatedCostUsd) * 1_000_000)
        : null;

  const record = {
    pilotRunId: input.pilotRunId || null,
    projectId: input.projectId || null,
    agentId: input.agentId || null,
    taskId: input.taskId || null,
    taskEnvelopeHash: input.taskEnvelopeHash || null,
    providerName: input.providerName || null,
    configuredModel: input.configuredModel || null,
    approvedModel: input.approvedModel || input.configuredModel || null,
    accountVerifiedModelStatus: input.accountVerifiedModelStatus || "not_checked",
    providerRequestId: input.providerRequestId || null,
    requestStartedAt: input.requestStartedAt || null,
    requestCompletedAt: input.requestCompletedAt || input.requestEndedAt || null,
    requestEndedAt: input.requestEndedAt || input.requestCompletedAt || null,
    latencyMs: input.latencyMs ?? null,
    inputTokens: input.inputTokens ?? null,
    outputTokens: input.outputTokens ?? null,
    totalTokens: input.totalTokens ?? null,
    estimatedCostUsd: input.estimatedCostUsd ?? null,
    estimatedCostMicrousd,
    maximumAuthorizedCostMicrousd: input.maximumAuthorizedCostMicrousd ?? null,
    pricingSource: input.pricingSource || input.officialPriceSourceVersion || null,
    officialPriceSourceVersion: input.officialPriceSourceVersion || input.pricingSource || null,
    pricingVerifiedAt: input.pricingVerifiedAt || null,
    schemaValidationOk: input.schemaValidationOk === true || input.schemaValidationPassed === true,
    schemaValidationPassed:
      input.schemaValidationPassed === true || input.schemaValidationOk === true,
    providerCallCount: Number(input.providerCallCount) || 0,
    attemptCount: Number(input.attemptCount) || 0,
    timeoutType: input.timeoutType || input.timeoutResult || "none",
    timeoutResult: input.timeoutResult || input.timeoutType || "none",
    terminalStatus: input.terminalStatus || null,
    blockedReason: input.blockedReason || null,
    errorCategory: input.errorCategory || null,
    evidenceEnvironment: input.evidenceEnvironment || "test",
    evidenceCreatedAt: input.evidenceCreatedAt || new Date().toISOString(),
    fabricated: false,
    simulated: input.simulated === true,
    live: false,
    rehearsal: input.rehearsal === true,
    notProduction: true,
    satisfiesGenuineLiveTestedCriteria: false,
    checksumKind: "content_integrity",
  };

  record.evidenceChecksum = computeEvidenceChecksum(record);
  return record;
}

/** Content-integrity checksum over critical fields (not a digital signature). */
export function computeEvidenceChecksum(record) {
  const canonical = {
    pilotRunId: record.pilotRunId,
    projectId: record.projectId,
    agentId: record.agentId,
    taskId: record.taskId,
    providerName: record.providerName,
    configuredModel: record.configuredModel,
    approvedModel: record.approvedModel,
    providerRequestId: record.providerRequestId,
    inputTokens: record.inputTokens,
    outputTokens: record.outputTokens,
    totalTokens: record.totalTokens,
    estimatedCostMicrousd: record.estimatedCostMicrousd,
    terminalStatus: record.terminalStatus,
    schemaValidationPassed: record.schemaValidationPassed,
    providerCallCount: record.providerCallCount,
    attemptCount: record.attemptCount,
    evidenceEnvironment: record.evidenceEnvironment,
  };
  return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}

export function verifyEvidenceChecksum(record) {
  if (!record || !record.evidenceChecksum) {
    return { ok: false, code: "CHECKSUM_MISSING", integrity: "unavailable" };
  }
  const expected = computeEvidenceChecksum(record);
  if (expected !== record.evidenceChecksum) {
    return {
      ok: false,
      code: "CHECKSUM_MISMATCH",
      integrity: "unverified",
      expected,
      actual: record.evidenceChecksum,
    };
  }
  return { ok: true, code: null, integrity: "content_match", checksumKind: "content_integrity" };
}

export function assertEvidenceHasNoSecrets(record) {
  const blob = JSON.stringify(record || {});
  if (/sk-[a-zA-Z0-9]{10,}/.test(blob)) {
    return { ok: false, code: "SECRET_PATTERN_DETECTED" };
  }
  if (/Bearer\s+[A-Za-z0-9._\-]+/i.test(blob)) {
    return { ok: false, code: "AUTH_HEADER_DETECTED" };
  }
  return { ok: true };
}

/** Test evidence must never promote live-tested. */
export function evidenceSatisfiesGenuineLiveTested(record) {
  if (!record) return false;
  if (record.evidenceEnvironment === "test") return false;
  if (record.simulated || record.rehearsal || record.notProduction) return false;
  if (record.providerName && String(record.providerName).includes("fake")) return false;
  if (record.satisfiesGenuineLiveTestedCriteria === false) return false;
  return false;
}
