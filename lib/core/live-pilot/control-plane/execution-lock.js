/**
 * Live-run execution lock — all gates before a genuine generation call.
 * Fake-provider may be invoked once only in fully valid fixture rehearsals.
 */

import { PILOT_AGENT_SLUG, PILOT_PROJECT_ID, PILOT_POLICY } from "../constants";
import {
  isGlobalLiveExecutionEnabled,
  isPilotLiveExecutionEnabled,
} from "../policy";
import {
  countActivePilotLeases,
  countQueuedPilotTasks,
  isKillSwitchActive,
  getLivePilotStoreSnapshot,
} from "../store";
import { getPilotProviderStatus } from "../adapter";
import { getPilotModelVerification, OPENAI_PILOT_MODEL_ID } from "../model-registry";
import { buildProviderActivationPreflight } from "../activation-preflight";
import {
  getLiveRunAuthorization,
  validateLiveRunAuthorizationMatch,
  consumeLiveRunAuthorizationAtomically,
  authorizationCrashRecoveryProcedure,
} from "./authorization";
import { getApiKeyPresenceStatus } from "./key-presence";
import { getAccountAccessStatus } from "./model-access-verification";

function rejectFakeProviderNameSelection(providerName) {
  const name = String(providerName || "").trim().toLowerCase();
  if (!name) return { ok: true };
  if (name.includes("fake") || name === "mock" || name === "fake_openai_test_only") {
    return { ok: false, code: "FAKE_PROVIDER_SELECTION_REJECTED" };
  }
  return { ok: true };
}

/** @type {Set<string>} */
const providerAttemptLocks = new Set();

export function resetExecutionLockFixtures() {
  providerAttemptLocks.clear();
}

/**
 * Evaluate whether a live provider generation attempt is allowed.
 * Does not call OpenAI. Does not create authorizations.
 */
export function evaluateLiveRunExecutionLock(input = {}) {
  const blockers = [];
  const authorizationId = input.authorizationId || null;
  const auth = authorizationId ? getLiveRunAuthorization(authorizationId) : null;
  const projectId = input.projectId || PILOT_PROJECT_ID;
  const agentId = input.agentId || input.agentSlug || PILOT_AGENT_SLUG;
  const taskId = input.taskId || null;
  const model = input.model || OPENAI_PILOT_MODEL_ID;
  const providerName = input.providerName || "openai";
  const estimatedCostMicrousd = input.estimatedCostMicrousd ?? null;

  if (!auth) blockers.push("founder_live_run_authorization_missing");
  else {
    const match = validateLiveRunAuthorizationMatch(auth, {
      projectId,
      agentId,
      taskId,
      providerName,
      model,
      snapshot: input.snapshot,
      maximumInputTokens: input.maximumInputTokens ?? PILOT_POLICY.maxInputTokens,
      maximumOutputTokens: input.maximumOutputTokens ?? PILOT_POLICY.maxOutputTokens,
      maximumTotalTokens: input.maximumTotalTokens ?? PILOT_POLICY.maxTotalTokens,
      estimatedCostMicrousd,
    });
    for (const m of match.missing) blockers.push(m);
  }

  const fakeReject = rejectFakeProviderNameSelection(providerName);
  if (!fakeReject.ok) blockers.push("fake_provider_selection_rejected");

  const presence = getApiKeyPresenceStatus();
  if (!presence.apiKeyConfigured) blockers.push("api_key_absent");
  if (presence.providerName === "none") blockers.push("provider_none");

  const account = input.accountAccessStatus || getAccountAccessStatus().accountAccessStatus;
  if (account !== "verified") blockers.push("account_access_not_checked");

  const verification = getPilotModelVerification(model);
  if (verification.billingModeStatus === "unknown" || !verification.billingModeStatus) {
    blockers.push("billing_path_unknown");
  }
  if (verification.officialPricingStatus !== "verified") {
    blockers.push("official_pricing_not_verified");
  }

  const globalOn = input.globalEnabled ?? isGlobalLiveExecutionEnabled();
  const pilotOn = input.pilotEnabled ?? isPilotLiveExecutionEnabled();
  if (!globalOn) blockers.push("execution_switch_off");
  if (!pilotOn) blockers.push("pilot_switch_off");
  if (input.killSwitchActive ?? isKillSwitchActive()) blockers.push("kill_switch_active");

  const queued = input.queuedCount ?? countQueuedPilotTasks();
  if (queued === 0) blockers.push("zero_queued_tasks");
  if (queued > 1) blockers.push("two_queued_tasks");

  const concurrent = input.concurrentRuns ?? countActivePilotLeases();
  if (concurrent > 0 && input.requireNoConcurrent !== false) {
    blockers.push("concurrent_run");
  }

  const preflight = buildProviderActivationPreflight({
    schedulerHealthy: input.schedulerHealthy,
    founderLiveAuthorization: Boolean(auth && auth.status === "authorized"),
  });
  if (input.schedulerHealthy === false || preflight.schedulerHealth === "unhealthy") {
    blockers.push("scheduler_unhealthy");
  }

  const store = getLivePilotStoreSnapshot();
  const evidenceOk = Boolean(store) && Array.isArray(store.evidence);
  if (input.evidenceStoreAvailable === false || !evidenceOk) {
    if (input.evidenceStoreAvailable === false) blockers.push("evidence_store_unavailable");
  }

  const attemptKey = input.idempotencyKey || authorizationId;
  if (attemptKey && providerAttemptLocks.has(attemptKey)) {
    blockers.push("provider_attempt_already_locked");
  }

  const provider = getPilotProviderStatus();
  const unique = [...new Set(blockers)];
  return {
    ok: unique.length === 0,
    providerCallAllowed: unique.length === 0,
    liveExecutionReady: false,
    blockers: unique,
    authorizationStatus: auth?.status || "missing",
    authorizationConsumed: auth?.status === "consumed",
    authorizationExpiresAt: auth?.expiresAt || null,
    apiKeyConfigured: presence.apiKeyConfigured,
    providerName: presence.providerName,
    accountAccessStatus: account,
    officialCatalogStatus: verification.officialCatalogStatus,
    officialPricingStatus: verification.officialPricingStatus,
    billingModeStatus: verification.billingModeStatus,
    executionSwitch: globalOn,
    pilotSwitch: pilotOn,
    queueCount: queued,
    concurrentRuns: concurrent,
    schedulerHealth: preflight.schedulerHealth,
    evidenceStore: evidenceOk ? "available" : "unavailable",
    taskEnvelopeMatch: auth && taskId ? !unique.includes("task_mismatch") : null,
    costEnvelopeMatch: !unique.includes("cost_mismatch"),
    crashRecovery: authorizationCrashRecoveryProcedure(),
    genuineGenerationCalls: 0,
    authenticatedModelsApiCalls: 0,
    providerConfigured: provider.configured === true,
  };
}

/**
 * Acquire idempotency lock and atomically consume authorization at the
 * protected provider-attempt boundary. Does not call OpenAI.
 */
export function acquireLiveRunProviderAttempt(input = {}) {
  const evalResult = evaluateLiveRunExecutionLock(input);
  if (!evalResult.ok) {
    return { ok: false, ...evalResult, fakeProviderInvocations: 0, genuineOpenAICalls: 0 };
  }

  const authorizationId = input.authorizationId;
  const attemptKey = input.idempotencyKey || authorizationId;
  if (providerAttemptLocks.has(attemptKey)) {
    return {
      ok: false,
      blockers: ["provider_attempt_already_locked"],
      fakeProviderInvocations: 0,
      genuineOpenAICalls: 0,
    };
  }

  const consumed = consumeLiveRunAuthorizationAtomically(authorizationId);
  if (!consumed.ok) {
    return {
      ok: false,
      blockers: [consumed.code || "consume_failed"],
      fakeProviderInvocations: 0,
      genuineOpenAICalls: 0,
      crashRecovery: authorizationCrashRecoveryProcedure(),
    };
  }

  providerAttemptLocks.add(attemptKey);
  return {
    ok: true,
    authorizationConsumed: true,
    attemptLocked: true,
    attemptKey,
    fakeProviderInvocations: 0,
    genuineOpenAICalls: 0,
    note: "Authorization consumed; provider call still requires separate execute path",
    crashRecovery: authorizationCrashRecoveryProcedure(),
  };
}
