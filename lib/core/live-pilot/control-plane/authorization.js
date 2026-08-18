/**
 * One-time Founder live-run authorization contract.
 * In-memory fixture store for tests / Preview preparation only.
 * Does not create Production DB rows from this module.
 * Independent from Founder Final Review and Founder Proof.
 */

import { createHash, randomUUID } from "node:crypto";
import { PILOT_AGENT_SLUG, PILOT_PROJECT_ID, PILOT_POLICY } from "../constants";
import { OPENAI_PILOT_MODEL_ID, OPENAI_PILOT_MODEL_SNAPSHOT } from "../model-registry";

export const LIVE_RUN_AUTH_STATUSES = Object.freeze([
  "draft",
  "authorized",
  "consumed",
  "expired",
  "revoked",
]);

/** @type {Map<string, object>} */
const fixtureStore = new Map();

export function resetLiveRunAuthorizationFixtures() {
  fixtureStore.clear();
}

export function taskEnvelopeHash(taskId) {
  return createHash("sha256")
    .update(String(taskId || ""), "utf8")
    .digest("hex");
}

export function computeAuthorizationIntegrity(auth) {
  const canonical = {
    authorizationId: auth.authorizationId,
    authorizationVersion: auth.authorizationVersion,
    status: auth.status,
    projectId: auth.projectId,
    pilotRunId: auth.pilotRunId,
    agentId: auth.agentId,
    taskEnvelopeHash: auth.taskEnvelopeHash,
    providerName: auth.providerName,
    approvedModel: auth.approvedModel,
    approvedSnapshot: auth.approvedSnapshot,
    maximumInputTokens: auth.maximumInputTokens,
    maximumOutputTokens: auth.maximumOutputTokens,
    maximumTotalTokens: auth.maximumTotalTokens,
    maximumCostMicrousd: auth.maximumCostMicrousd,
    authorizedAt: auth.authorizedAt,
    expiresAt: auth.expiresAt,
    oneTimeUse: auth.oneTimeUse,
  };
  return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}

function assertNotProductionWrite() {
  if (process.env.VERCEL_ENV === "production" && !process.env.VITEST) {
    throw new Error("LIVE_RUN_AUTH_FIXTURE_WRITE_FORBIDDEN_IN_PRODUCTION");
  }
}

/**
 * Create a fixture authorization. Never persists to Production DB.
 * Defaults to draft unless status overridden (tests often use authorized).
 */
export function createLiveRunAuthorizationRecord(input = {}) {
  assertNotProductionWrite();
  const now = Date.now();
  const status = input.status || "draft";
  const taskId = input.taskId || null;
  const auth = {
    authorizationId: input.authorizationId || `lra_${randomUUID()}`,
    authorizationVersion: input.authorizationVersion || 1,
    projectId: input.projectId || PILOT_PROJECT_ID,
    pilotRunId: input.pilotRunId || null,
    agentId: input.agentId || input.agentSlug || PILOT_AGENT_SLUG,
    taskId,
    taskEnvelopeHash: input.taskEnvelopeHash || (taskId ? taskEnvelopeHash(taskId) : null),
    providerName: input.providerName || "openai",
    approvedModel: input.approvedModel || input.model || OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: input.approvedSnapshot || input.snapshot || OPENAI_PILOT_MODEL_SNAPSHOT,
    maximumInputTokens: input.maximumInputTokens ?? PILOT_POLICY.maxInputTokens,
    maximumOutputTokens: input.maximumOutputTokens ?? PILOT_POLICY.maxOutputTokens,
    maximumTotalTokens: input.maximumTotalTokens ?? PILOT_POLICY.maxTotalTokens,
    maximumCostMicrousd:
      input.maximumCostMicrousd ??
      Math.round((input.maxCostUsd ?? PILOT_POLICY.maxEstimatedCostUsd) * 1_000_000),
    authorizedAt:
      status === "authorized" || status === "consumed"
        ? input.authorizedAt || new Date(now).toISOString()
        : null,
    expiresAt:
      input.expiresAt ||
      new Date(now + (input.ttlMs != null ? Number(input.ttlMs) : 15 * 60_000)).toISOString(),
    authorizedBy: input.authorizedBy || "fixture_founder_role",
    authorizationReason: input.authorizationReason || "fixture_only",
    status,
    consumedAt: status === "consumed" ? new Date(now).toISOString() : null,
    revokedAt: status === "revoked" ? new Date(now).toISOString() : null,
    revocationReason: input.revocationReason || null,
    oneTimeUse: input.oneTimeUse !== false,
    issuanceIdempotencyKey: input.issuanceIdempotencyKey || null,
    createdAt: new Date(now).toISOString(),
    updatedAt: new Date(now).toISOString(),
    founderFinalReviewIndependent: true,
    founderProofIndependent: true,
    storageDecision: "B",
    fixtureOnly: true,
    productionRecordCreated: false,
  };
  auth.integrityChecksum = computeAuthorizationIntegrity(auth);
  fixtureStore.set(auth.authorizationId, auth);
  return auth;
}

export function getLiveRunAuthorization(authorizationId) {
  return fixtureStore.get(authorizationId) || null;
}

export function listLiveRunAuthorizationFixtures() {
  return [...fixtureStore.values()];
}

export function authorizeLiveRunAuthorization(authorizationId) {
  assertNotProductionWrite();
  const auth = fixtureStore.get(authorizationId);
  if (!auth) return { ok: false, code: "MISSING" };
  if (auth.status !== "draft") return { ok: false, code: "NOT_DRAFT" };
  auth.status = "authorized";
  auth.authorizedAt = new Date().toISOString();
  auth.updatedAt = auth.authorizedAt;
  auth.integrityChecksum = computeAuthorizationIntegrity(auth);
  return { ok: true, auth };
}

export function revokeLiveRunAuthorization(authorizationId, reason = "revoked") {
  assertNotProductionWrite();
  const auth = fixtureStore.get(authorizationId);
  if (!auth) return { ok: false, code: "MISSING" };
  auth.status = "revoked";
  auth.revokedAt = new Date().toISOString();
  auth.revocationReason = String(reason).slice(0, 200);
  auth.updatedAt = auth.revokedAt;
  auth.integrityChecksum = computeAuthorizationIntegrity(auth);
  return { ok: true, auth };
}

/**
 * Atomic one-time consume. Crash after consume must not allow a second call.
 */
export function consumeLiveRunAuthorizationAtomically(authorizationId) {
  assertNotProductionWrite();
  const auth = fixtureStore.get(authorizationId);
  if (!auth) return { ok: false, code: "MISSING" };
  if (auth.status === "draft") return { ok: false, code: "DRAFT" };
  if (auth.status === "consumed") return { ok: false, code: "ALREADY_CONSUMED" };
  if (auth.status === "revoked") return { ok: false, code: "REVOKED" };
  if (auth.status === "expired" || (auth.expiresAt && Date.parse(auth.expiresAt) < Date.now())) {
    auth.status = "expired";
    auth.updatedAt = new Date().toISOString();
    auth.integrityChecksum = computeAuthorizationIntegrity(auth);
    return { ok: false, code: "EXPIRED" };
  }
  if (auth.status !== "authorized") return { ok: false, code: "NOT_AUTHORIZED" };

  // Simulate atomic compare-and-set
  if (auth.status !== "authorized") return { ok: false, code: "RACE_LOST" };
  auth.status = "consumed";
  auth.consumedAt = new Date().toISOString();
  auth.updatedAt = auth.consumedAt;
  auth.integrityChecksum = computeAuthorizationIntegrity(auth);
  return { ok: true, auth, consumedAt: auth.consumedAt };
}

export function validateLiveRunAuthorizationMatch(auth, context = {}) {
  const missing = [];
  if (!auth) return { ok: false, missing: ["authorization_missing"] };

  if (auth.status === "draft") missing.push("draft_cannot_authorize");
  if (auth.status === "consumed") missing.push("already_consumed");
  if (auth.status === "revoked") missing.push("revoked");
  if (auth.status === "expired") missing.push("expired");
  if (auth.expiresAt && Date.parse(auth.expiresAt) < Date.now()) missing.push("expired");
  if (auth.status !== "authorized") {
    if (!["draft", "consumed", "expired", "revoked"].includes(auth.status)) {
      missing.push("not_authorized");
    }
  }

  if (auth.projectId !== (context.projectId || PILOT_PROJECT_ID)) {
    missing.push("project_mismatch");
  }
  if (auth.agentId !== (context.agentId || context.agentSlug || PILOT_AGENT_SLUG)) {
    missing.push("agent_mismatch");
  }
  if (context.taskId && auth.taskEnvelopeHash !== taskEnvelopeHash(context.taskId)) {
    missing.push("task_mismatch");
  }
  if (context.taskEnvelopeHash && auth.taskEnvelopeHash !== context.taskEnvelopeHash) {
    missing.push("task_mismatch");
  }
  if (context.providerName && auth.providerName !== context.providerName) {
    missing.push("provider_mismatch");
  }
  if (context.model && context.model !== auth.approvedModel && context.model !== auth.approvedSnapshot) {
    missing.push("model_mismatch");
  }
  if (context.snapshot && context.snapshot !== auth.approvedSnapshot) {
    missing.push("snapshot_mismatch");
  }
  if (
    context.maximumInputTokens != null &&
    Number(context.maximumInputTokens) !== Number(auth.maximumInputTokens)
  ) {
    missing.push("input_limit_mismatch");
  }
  if (
    context.maximumOutputTokens != null &&
    Number(context.maximumOutputTokens) !== Number(auth.maximumOutputTokens)
  ) {
    missing.push("output_limit_mismatch");
  }
  if (
    context.maximumTotalTokens != null &&
    Number(context.maximumTotalTokens) !== Number(auth.maximumTotalTokens)
  ) {
    missing.push("total_limit_mismatch");
  }
  if (
    context.estimatedCostMicrousd != null &&
    Number(context.estimatedCostMicrousd) > Number(auth.maximumCostMicrousd)
  ) {
    missing.push("cost_mismatch");
  }
  if (auth.integrityChecksum) {
    const expected = computeAuthorizationIntegrity(auth);
    if (expected !== auth.integrityChecksum) missing.push("checksum_mismatch");
  }

  const unique = [...new Set(missing)];
  return {
    ok: auth.status === "authorized" && unique.length === 0,
    missing: unique,
    founderFinalReviewIndependent: true,
    founderProofIndependent: true,
  };
}

/**
 * Recovery note when authorization was consumed without completed provider response.
 */
export function authorizationCrashRecoveryProcedure() {
  return {
    status: "consumed_without_completed_response",
    procedure: [
      "Do not re-issue or un-consume the same authorizationId.",
      "Inspect durable pilot_runs / evidence for partial attempt.",
      "Treat providerCallCount for that authorization as exhausted (at-most-one).",
      "Founder may create a NEW authorization only after explicit review.",
      "Keep live switches off until recovery evidence is reviewed.",
    ],
    secondProviderCallAllowed: false,
  };
}
