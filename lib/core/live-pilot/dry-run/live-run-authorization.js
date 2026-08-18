/**
 * Founder live-run authorization contract (fixture-only).
 * Independent from Founder Final Review / Founder Proof.
 * Never creates Production records.
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

function assertFixtureRuntime() {
  if (process.env.VERCEL_ENV === "production" && !process.env.VITEST) {
    throw new Error("LIVE_RUN_AUTH_FIXTURE_FORBIDDEN_IN_PRODUCTION");
  }
  if (process.env.NODE_ENV === "production" && !process.env.VITEST) {
    throw new Error("LIVE_RUN_AUTH_FIXTURE_FORBIDDEN_IN_PRODUCTION");
  }
}

function taskEnvelopeHash(taskId) {
  return createHash("sha256")
    .update(String(taskId || ""), "utf8")
    .digest("hex");
}

function computeAuthIntegrity(auth) {
  const canonical = {
    authorizationId: auth.authorizationId,
    status: auth.status,
    projectId: auth.projectId,
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

/**
 * Create a fixture authorization record. Defaults to authorized for rehearsal.
 */
export function createLiveRunAuthorizationFixture(input = {}) {
  assertFixtureRuntime();
  const now = Date.now();
  const status = input.status || "authorized";
  const expiresAt =
    input.expiresAt ||
    new Date(now + (input.ttlMs != null ? Number(input.ttlMs) : 15 * 60_000)).toISOString();
  const taskId = input.taskId || null;
  const auth = {
    authorizationId: input.id || input.authorizationId || `lra_${randomUUID()}`,
    // legacy alias
    id: null,
    status,
    authorizedAt: status === "authorized" || status === "consumed" ? new Date(now).toISOString() : null,
    issuedAt: new Date(now).toISOString(),
    expiresAt,
    authorizedBy: input.authorizedBy || "fixture_founder_role",
    projectId: input.projectId || PILOT_PROJECT_ID,
    authorizedProjectId: input.projectId || PILOT_PROJECT_ID,
    agentId: input.agentSlug || input.agentId || PILOT_AGENT_SLUG,
    authorizedAgentSlug: input.agentSlug || PILOT_AGENT_SLUG,
    authorizedTaskId: taskId,
    taskEnvelopeHash: input.taskEnvelopeHash || (taskId ? taskEnvelopeHash(taskId) : null),
    providerName: input.providerName || "openai",
    approvedProvider: input.providerName || "openai",
    approvedModel: input.model || OPENAI_PILOT_MODEL_ID,
    authorizedModel: input.model || OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: input.snapshot || OPENAI_PILOT_MODEL_SNAPSHOT,
    authorizedSnapshot: input.snapshot || OPENAI_PILOT_MODEL_SNAPSHOT,
    maximumInputTokens: input.maxInputTokens ?? PILOT_POLICY.maxInputTokens,
    maximumOutputTokens: input.maxOutputTokens ?? PILOT_POLICY.maxOutputTokens,
    maximumTotalTokens: input.maxTotalTokens ?? PILOT_POLICY.maxTotalTokens,
    maximumCostMicrousd:
      input.maximumCostMicrousd ?? Math.round((input.maxCostUsd ?? PILOT_POLICY.maxEstimatedCostUsd) * 1_000_000),
    authorizedMaxCostUsd: input.maxCostUsd ?? PILOT_POLICY.maxEstimatedCostUsd,
    oneTimeUse: input.oneTimeUse !== false,
    consumedAt: status === "consumed" ? new Date(now).toISOString() : null,
    revokedAt: status === "revoked" ? new Date(now).toISOString() : null,
    revocationReason: input.revocationReason || null,
    founderFinalReviewIndependent: true,
    founderProofIndependent: true,
    notes: String(input.notes || "").slice(0, 200),
  };
  auth.id = auth.authorizationId;
  auth.authorizationIntegrityChecksum = computeAuthIntegrity(auth);
  return auth;
}

export function validateLiveRunAuthorization(auth, context = {}) {
  const missing = [];
  if (!auth || !(auth.authorizationId || auth.id)) missing.push("authorization_id");

  const status = auth?.status;
  if (status === "draft") missing.push("draft_cannot_authorize");
  if (status === "consumed") missing.push("already_consumed");
  if (status === "revoked") missing.push("revoked");
  if (status === "expired") missing.push("expired");
  if (auth?.expiresAt && Date.parse(auth.expiresAt) < Date.now()) {
    missing.push("expired");
  }

  const statusOk = status === "authorized" || status === "issued";
  if (!statusOk && status && !["draft", "consumed", "expired", "revoked"].includes(status)) {
    missing.push("not_authorized");
  }
  if (!statusOk && !status) missing.push("not_authorized");
  if (!auth?.authorizedAt && !auth?.issuedAt) missing.push("authorization_timestamp");

  const projectId = auth?.projectId || auth?.authorizedProjectId;
  if (projectId !== (context.projectId || PILOT_PROJECT_ID)) {
    missing.push("authorized_project");
  }
  const agentId = auth?.agentId || auth?.authorizedAgentSlug;
  if (agentId !== (context.agentSlug || context.agentId || PILOT_AGENT_SLUG)) {
    missing.push("authorized_pilot_agent");
  }
  if (context.taskId) {
    if (auth?.authorizedTaskId && auth.authorizedTaskId !== context.taskId) {
      missing.push("authorized_task_envelope");
    }
    if (auth?.taskEnvelopeHash && auth.taskEnvelopeHash !== taskEnvelopeHash(context.taskId)) {
      missing.push("authorized_task_envelope");
    }
  }
  if (context.model) {
    const okModel =
      context.model === auth?.approvedModel ||
      context.model === auth?.authorizedModel ||
      context.model === auth?.approvedSnapshot ||
      context.model === auth?.authorizedSnapshot;
    if (!okModel) missing.push("model_mismatch");
  }
  if (
    context.estimatedCostMicrousd != null &&
    auth?.maximumCostMicrousd != null &&
    Number(context.estimatedCostMicrousd) > Number(auth.maximumCostMicrousd)
  ) {
    missing.push("cost_mismatch");
  }
  if (auth?.authorizedMaxCostUsd == null && auth?.maximumCostMicrousd == null) {
    missing.push("authorized_maximum_cost");
  }
  if (
    auth?.authorizedMaxCostUsd != null &&
    Number(auth.authorizedMaxCostUsd) > PILOT_POLICY.maxEstimatedCostUsd
  ) {
    missing.push("authorized_maximum_cost");
  }
  if (!auth?.approvedModel && !auth?.authorizedModel && !auth?.approvedSnapshot) {
    missing.push("authorized_model_snapshot");
  }
  if (auth?.authorizationIntegrityChecksum) {
    const expected = computeAuthIntegrity({
      ...auth,
      authorizationId: auth.authorizationId || auth.id,
    });
    if (expected !== auth.authorizationIntegrityChecksum) {
      missing.push("authorization_checksum_mismatch");
    }
  }

  const unique = [...new Set(missing)];
  return {
    ok: statusOk && unique.length === 0,
    missing: unique,
    founderFinalReviewIndependent: true,
    founderProofIndependent: true,
  };
}

export function consumeLiveRunAuthorizationFixture(auth) {
  if (!auth) return { ok: false, code: "MISSING" };
  if (auth.status === "draft") return { ok: false, code: "DRAFT" };
  if (auth.status === "consumed") return { ok: false, code: "ALREADY_CONSUMED" };
  if (auth.status === "revoked") return { ok: false, code: "REVOKED" };
  if (auth.status === "expired" || (auth.expiresAt && Date.parse(auth.expiresAt) < Date.now())) {
    return { ok: false, code: "EXPIRED" };
  }
  if (auth.status !== "authorized" && auth.status !== "issued") {
    return { ok: false, code: "NOT_AUTHORIZED" };
  }
  if (auth.oneTimeUse) {
    auth.status = "consumed";
    auth.consumedAt = new Date().toISOString();
    auth.authorizationIntegrityChecksum = computeAuthIntegrity({
      ...auth,
      authorizationId: auth.authorizationId || auth.id,
    });
  }
  return { ok: true, auth };
}

export function revokeLiveRunAuthorizationFixture(auth, reason = "fixture_revoke") {
  if (!auth) return { ok: false, code: "MISSING" };
  auth.status = "revoked";
  auth.revokedAt = new Date().toISOString();
  auth.revocationReason = String(reason).slice(0, 200);
  auth.authorizationIntegrityChecksum = computeAuthIntegrity({
    ...auth,
    authorizationId: auth.authorizationId || auth.id,
  });
  return { ok: true, auth };
}

export { taskEnvelopeHash, computeAuthIntegrity };
