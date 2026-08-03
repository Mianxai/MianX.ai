/**
 * Account model-access verification control (server-only).
 * Disabled by default. Separate from generation. Never calls OpenAI unless
 * an injected fetcher is provided under explicit test authorization.
 * Public catalog verification ≠ account access verification.
 */

import { randomUUID } from "node:crypto";
import { OPENAI_PILOT_MODEL_ID, OPENAI_PILOT_MODEL_SNAPSHOT } from "../model-registry";
import { consumeLiveRunAuthorizationAtomically, getLiveRunAuthorization } from "./authorization";
import { getApiKeyPresenceStatus } from "./key-presence";

/** @type {Map<string, object>} */
const verificationStore = new Map();

export function resetModelAccessVerificationFixtures() {
  verificationStore.clear();
}

export function getAccountAccessStatus() {
  return {
    accountAccessStatus: "not_checked",
    authenticatedModelsApiCalls: 0,
    capabilityEnabled: false,
    note: "Account access requires separate Founder authorization after secure key configuration.",
  };
}

/**
 * Readiness envelope for the future one-time Models API check.
 * Does not perform network I/O.
 */
export function buildModelAccessCheckEnvelope() {
  return {
    officialCatalogStatus: "verified",
    accountAccessStatus: "not_checked",
    authenticatedModelsApiCalls: 0,
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    serverOnly: true,
    requiresFounderAuthorization: true,
    requiresKeyPresence: true,
    maxAttempts: 1,
    timeoutMs: 60_000,
    separateFromGeneration: true,
    executed: false,
    calledOpenAI: false,
  };
}

/**
 * Perform at most one model-access verification per authorization.
 * Network only via injected fetchModels (tests). Production path stays disabled.
 *
 * @param {{
 *   authorizationId: string,
 *   enabled?: boolean,
 *   fetchModels?: Function|null,
 *   checkedModelId?: string,
 *   checkedSnapshotId?: string,
 *   timeoutMs?: number,
 *   idempotencyKey?: string,
 * }} opts
 */
export async function verifyAccountModelAccess(opts = {}) {
  const {
    authorizationId,
    enabled = false,
    fetchModels = null,
    checkedModelId = OPENAI_PILOT_MODEL_ID,
    checkedSnapshotId = OPENAI_PILOT_MODEL_SNAPSHOT,
    timeoutMs = 60_000,
    idempotencyKey = null,
  } = opts;

  if (!enabled) {
    return {
      ok: false,
      result: "failed",
      code: "MODEL_ACCESS_VERIFICATION_DISABLED",
      accountAccessStatus: "not_checked",
      authenticatedModelsApiCalls: 0,
      calledOpenAI: false,
    };
  }

  if (
    checkedModelId !== OPENAI_PILOT_MODEL_ID ||
    (checkedSnapshotId != null && checkedSnapshotId !== OPENAI_PILOT_MODEL_SNAPSHOT)
  ) {
    return {
      ok: false,
      result: "mismatch",
      code: "UNAPPROVED_MODEL_OR_SNAPSHOT",
      accountAccessStatus: "not_checked",
      authenticatedModelsApiCalls: 0,
      calledOpenAI: false,
    };
  }

  if (!authorizationId) {
    return {
      ok: false,
      result: "failed",
      code: "AUTHORIZATION_REQUIRED",
      accountAccessStatus: "not_checked",
      authenticatedModelsApiCalls: 0,
      calledOpenAI: false,
    };
  }

  if (idempotencyKey && verificationStore.has(`idem:${idempotencyKey}`)) {
    return {
      ok: true,
      ...verificationStore.get(`idem:${idempotencyKey}`),
      duplicate: true,
      authenticatedModelsApiCalls: 0,
      calledOpenAI: false,
    };
  }

  const auth = getLiveRunAuthorization(authorizationId);
  if (!auth || auth.status !== "authorized") {
    return {
      ok: false,
      result: "failed",
      code: "AUTHORIZATION_NOT_AUTHORIZED",
      accountAccessStatus: "not_checked",
      authenticatedModelsApiCalls: 0,
      calledOpenAI: false,
    };
  }

  const presence = getApiKeyPresenceStatus();
  if (!presence.apiKeyConfigured) {
    return {
      ok: false,
      result: "unavailable",
      code: "API_KEY_ABSENT",
      accountAccessStatus: "not_checked",
      authenticatedModelsApiCalls: 0,
      calledOpenAI: false,
    };
  }

  // Consume authorization before the protected attempt boundary.
  const consumed = consumeLiveRunAuthorizationAtomically(authorizationId);
  if (!consumed.ok) {
    return {
      ok: false,
      result: "failed",
      code: consumed.code || "CONSUME_FAILED",
      accountAccessStatus: "not_checked",
      authenticatedModelsApiCalls: 0,
      calledOpenAI: false,
    };
  }

  if (typeof fetchModels !== "function") {
    // No network fetcher — capability prepared but no genuine Models API call.
    const record = {
      verificationId: `mav_${randomUUID()}`,
      authorizationId,
      result: "failed",
      code: "FETCHER_NOT_INJECTED",
      checkedModelId,
      checkedSnapshotId,
      checkedAt: new Date().toISOString(),
      providerRequestId: null,
      accountAccessStatus: "not_checked",
      authenticatedModelsApiCalls: 0,
      calledOpenAI: false,
      timeoutMs,
      sanitizedError: "Model-access verification fetcher not provided; no OpenAI call performed",
    };
    verificationStore.set(record.verificationId, record);
    if (idempotencyKey) verificationStore.set(`idem:${idempotencyKey}`, record);
    return { ok: false, ...record };
  }

  let models;
  let providerRequestId = null;
  try {
    const outcome = await Promise.race([
      fetchModels({ modelId: checkedModelId, snapshotId: checkedSnapshotId }),
      new Promise((_, reject) =>
        setTimeout(() => reject(Object.assign(new Error("timeout"), { name: "TimeoutError" })), timeoutMs)
      ),
    ]);
    models = outcome?.models || outcome;
    providerRequestId = outcome?.providerRequestId || null;
  } catch (err) {
    const record = {
      verificationId: `mav_${randomUUID()}`,
      authorizationId,
      result: "failed",
      code: err?.name === "TimeoutError" ? "TIMEOUT" : "FETCH_FAILED",
      checkedModelId,
      checkedSnapshotId,
      checkedAt: new Date().toISOString(),
      providerRequestId: null,
      accountAccessStatus: "failed",
      authenticatedModelsApiCalls: 1,
      calledOpenAI: true,
      sanitizedError: "Model-access verification failed",
    };
    verificationStore.set(record.verificationId, record);
    if (idempotencyKey) verificationStore.set(`idem:${idempotencyKey}`, record);
    return { ok: false, ...record };
  }

  const list = Array.isArray(models) ? models : [];
  const ids = list.map((m) => (typeof m === "string" ? m : m?.id)).filter(Boolean);
  let result = "unavailable";
  if (ids.includes(checkedModelId) || ids.includes(checkedSnapshotId)) {
    result = "verified";
  } else if (ids.length > 0) {
    result = "mismatch";
  }

  const record = {
    verificationId: `mav_${randomUUID()}`,
    authorizationId,
    result,
    code: null,
    checkedModelId,
    checkedSnapshotId,
    checkedAt: new Date().toISOString(),
    providerRequestId,
    accountAccessStatus: result === "verified" ? "verified" : result,
    authenticatedModelsApiCalls: 1,
    calledOpenAI: true,
    sanitizedError: null,
  };
  verificationStore.set(record.verificationId, record);
  if (idempotencyKey) verificationStore.set(`idem:${idempotencyKey}`, record);
  return { ok: result === "verified", ...record };
}
