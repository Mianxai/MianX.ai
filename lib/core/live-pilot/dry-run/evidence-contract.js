/**
 * Durable evidence integrity contract for one-agent pilot dry-run rehearsal.
 * Never stores secrets, Authorization headers, or full environment dumps.
 */

import { createHash } from "node:crypto";

export const EVIDENCE_REQUIRED_FIELDS = Object.freeze([
  "pilotRunId",
  "projectId",
  "agentId",
  "taskId",
  "providerName",
  "configuredModel",
  "accountVerifiedModelStatus",
  "providerRequestId",
  "requestStartedAt",
  "requestEndedAt",
  "latencyMs",
  "inputTokens",
  "outputTokens",
  "totalTokens",
  "estimatedCostUsd",
  "officialPriceSourceVersion",
  "schemaValidationOk",
  "providerCallCount",
  "attemptCount",
  "timeoutResult",
  "terminalStatus",
  "blockedReason",
  "errorCategory",
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
]);

export function buildPilotEvidenceRecord(input = {}) {
  for (const key of EVIDENCE_FORBIDDEN_KEYS) {
    if (Object.prototype.hasOwnProperty.call(input, key) && input[key] != null) {
      throw new Error(`EVIDENCE_FORBIDDEN_FIELD:${key}`);
    }
  }

  const record = {
    pilotRunId: input.pilotRunId || null,
    projectId: input.projectId || null,
    agentId: input.agentId || null,
    taskId: input.taskId || null,
    providerName: input.providerName || null,
    configuredModel: input.configuredModel || null,
    accountVerifiedModelStatus: input.accountVerifiedModelStatus || "not_checked",
    providerRequestId: input.providerRequestId || null,
    requestStartedAt: input.requestStartedAt || null,
    requestEndedAt: input.requestEndedAt || null,
    latencyMs: input.latencyMs ?? null,
    inputTokens: input.inputTokens ?? null,
    outputTokens: input.outputTokens ?? null,
    totalTokens: input.totalTokens ?? null,
    estimatedCostUsd: input.estimatedCostUsd ?? null,
    officialPriceSourceVersion: input.officialPriceSourceVersion || null,
    schemaValidationOk: input.schemaValidationOk === true,
    providerCallCount: Number(input.providerCallCount) || 0,
    attemptCount: Number(input.attemptCount) || 0,
    timeoutResult: input.timeoutResult || "none",
    terminalStatus: input.terminalStatus || null,
    blockedReason: input.blockedReason || null,
    errorCategory: input.errorCategory || null,
    evidenceCreatedAt: input.evidenceCreatedAt || new Date().toISOString(),
    fabricated: false,
    simulated: input.simulated === true,
    live: false,
    rehearsal: input.rehearsal === true,
    notProduction: true,
  };

  record.evidenceChecksum = computeEvidenceChecksum(record);
  return record;
}

export function computeEvidenceChecksum(record) {
  const canonical = {
    pilotRunId: record.pilotRunId,
    projectId: record.projectId,
    agentId: record.agentId,
    taskId: record.taskId,
    providerName: record.providerName,
    configuredModel: record.configuredModel,
    providerRequestId: record.providerRequestId,
    inputTokens: record.inputTokens,
    outputTokens: record.outputTokens,
    totalTokens: record.totalTokens,
    estimatedCostUsd: record.estimatedCostUsd,
    terminalStatus: record.terminalStatus,
    schemaValidationOk: record.schemaValidationOk,
    providerCallCount: record.providerCallCount,
    attemptCount: record.attemptCount,
  };
  return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}

export function verifyEvidenceChecksum(record) {
  if (!record || !record.evidenceChecksum) {
    return { ok: false, code: "CHECKSUM_MISSING" };
  }
  const expected = computeEvidenceChecksum(record);
  if (expected !== record.evidenceChecksum) {
    return { ok: false, code: "CHECKSUM_MISMATCH", expected, actual: record.evidenceChecksum };
  }
  return { ok: true, code: null };
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
