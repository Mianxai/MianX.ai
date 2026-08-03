/**
 * Founder live-run authorization contract (non-secret).
 * Independent from Founder Final Review. Fixtures only — no Production records.
 */

import { randomUUID } from "node:crypto";
import { PILOT_AGENT_SLUG, PILOT_PROJECT_ID, PILOT_POLICY } from "../constants";
import { OPENAI_PILOT_MODEL_ID, OPENAI_PILOT_MODEL_SNAPSHOT } from "../model-registry";

export const LIVE_RUN_AUTH_STATUSES = Object.freeze([
  "issued",
  "consumed",
  "expired",
  "revoked",
]);

/**
 * Create a fixture authorization record. Never call from Production routes.
 */
export function createLiveRunAuthorizationFixture(input = {}) {
  if (process.env.VERCEL_ENV === "production" && !process.env.VITEST) {
    throw new Error("LIVE_RUN_AUTH_FIXTURE_FORBIDDEN_IN_PRODUCTION");
  }
  const now = Date.now();
  const expiresAt = new Date(
    now + (input.ttlMs != null ? Number(input.ttlMs) : 15 * 60_000)
  ).toISOString();
  return {
    id: input.id || `lra_${randomUUID()}`,
    status: "issued",
    issuedAt: new Date(now).toISOString(),
    expiresAt,
    authorizedProjectId: input.projectId || PILOT_PROJECT_ID,
    authorizedAgentSlug: input.agentSlug || PILOT_AGENT_SLUG,
    authorizedTaskId: input.taskId || null,
    authorizedMaxCostUsd: input.maxCostUsd ?? PILOT_POLICY.maxEstimatedCostUsd,
    authorizedModel: input.model || OPENAI_PILOT_MODEL_ID,
    authorizedSnapshot: input.snapshot || OPENAI_PILOT_MODEL_SNAPSHOT,
    oneTimeUse: input.oneTimeUse !== false,
    consumedAt: null,
    founderFinalReviewIndependent: true,
    notes: String(input.notes || "").slice(0, 200),
  };
}

export function validateLiveRunAuthorization(auth, context = {}) {
  const missing = [];
  if (!auth || !auth.id) missing.push("authorization_id");
  if (!auth?.issuedAt) missing.push("authorization_timestamp");
  if (auth?.authorizedProjectId !== (context.projectId || PILOT_PROJECT_ID)) {
    missing.push("authorized_project");
  }
  if (auth?.authorizedAgentSlug !== (context.agentSlug || PILOT_AGENT_SLUG)) {
    missing.push("authorized_pilot_agent");
  }
  if (context.taskId && auth?.authorizedTaskId && auth.authorizedTaskId !== context.taskId) {
    missing.push("authorized_task_envelope");
  }
  if (
    auth?.authorizedMaxCostUsd == null ||
    Number(auth.authorizedMaxCostUsd) > PILOT_POLICY.maxEstimatedCostUsd
  ) {
    missing.push("authorized_maximum_cost");
  }
  if (!auth?.authorizedModel && !auth?.authorizedSnapshot) {
    missing.push("authorized_model_snapshot");
  }
  if (auth?.status === "consumed") missing.push("already_consumed");
  if (auth?.status === "revoked") missing.push("revoked");
  if (auth?.expiresAt && Date.parse(auth.expiresAt) < Date.now()) {
    missing.push("expired");
  }
  return {
    ok: missing.length === 0,
    missing,
    founderFinalReviewIndependent: true,
  };
}

export function consumeLiveRunAuthorizationFixture(auth) {
  if (!auth) return { ok: false, code: "MISSING" };
  if (auth.status === "consumed") return { ok: false, code: "ALREADY_CONSUMED" };
  if (auth.oneTimeUse) {
    auth.status = "consumed";
    auth.consumedAt = new Date().toISOString();
  }
  return { ok: true, auth };
}
