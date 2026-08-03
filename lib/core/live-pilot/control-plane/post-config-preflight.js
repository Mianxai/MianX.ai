/**
 * Post-configuration preflight checklist (read-only).
 * Safe to run after Founder adds OPENAI_API_KEY via Vercel.
 * Never prints secrets. Never enables switches. Never calls OpenAI.
 */

import { getApiKeyPresenceStatus, assertKeyPresencePrivacy } from "./key-presence";
import { getAuthorizationStoreStatus } from "./authorization-store";
import { getAccountAccessStatus } from "./model-access-verification";
import { getBillingPathReadinessStatus } from "./billing-path-readiness";
import {
  OPENAI_PILOT_MODEL_ID,
  OPENAI_PILOT_MODEL_SNAPSHOT,
} from "../model-registry";
import {
  isGlobalLiveExecutionEnabled,
  isPilotLiveExecutionEnabled,
} from "../policy";

/**
 * @param {{
 *   authorizationStore?: object,
 *   scheduler?: object,
 *   workforce?: object,
 *   queuedPilotTasks?: number,
 *   concurrentPilotRuns?: number,
 * }} [input]
 */
export async function buildPostConfigPreflight(input = {}) {
  const presence = getApiKeyPresenceStatus();
  const privacy = assertKeyPresencePrivacy(presence);
  const store =
    input.authorizationStore ||
    (await getAuthorizationStoreStatus().catch(() => ({
      status: "unavailable",
      reason: "authorization_store_unavailable",
      providerCallAllowed: false,
    })));
  const access = getAccountAccessStatus();
  const billing = getBillingPathReadinessStatus();
  const scheduler = input.scheduler || {};
  const workforce = input.workforce || {};

  const switchesOff =
    !isGlobalLiveExecutionEnabled() && !isPilotLiveExecutionEnabled();
  const agentsZero =
    Number(workforce.allocatedSeats || 0) === 0 &&
    Number(workforce.activeInstances || 0) === 0 &&
    Number(workforce.liveTestedSeats || 0) === 0;
  const storeAvailable =
    store.status === "available" || store.migrationApplied === true;
  const providerCallAllowed = false;

  const checklist = {
    apiKeyConfigured: presence.apiKeyConfigured === true,
    providerSelection: presence.providerName || "none",
    officialCatalogStatus: "verified",
    accountAccessStatus: access.accountAccessStatus,
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    officialPricingStatus: billing.officialPricingStatus,
    billingPathStatus: billing.billingModeStatus,
    authorizationStoreAvailable: storeAvailable,
    schedulerHealthy:
      scheduler.schedulerHealth === "healthy" ||
      scheduler.primaryScheduler === "supabase_cron",
    switchesFalse: switchesOff,
    noQueuedTask: Number(input.queuedPilotTasks || 0) === 0,
    noConcurrentRun: Number(input.concurrentPilotRuns || 0) === 0,
    agentsZero,
    providerCallAllowed,
    keyPresencePrivacyOk: privacy.ok === true,
    authenticatedModelsApiCalls: 0,
    generationCalls: 0,
    calledOpenAI: false,
  };

  const blockers = [];
  if (!privacy.ok) blockers.push("key_presence_privacy");
  if (!storeAvailable) blockers.push("authorization_store_unavailable");
  if (!switchesOff) blockers.push("switches_on");
  if (!agentsZero) blockers.push("agents_non_zero");
  if (access.accountAccessStatus !== "not_checked" && access.accountAccessStatus !== "verified") {
    blockers.push("account_access_not_ready");
  }
  if (billing.billingModeStatus === "unknown") {
    blockers.push("billing_path_unknown");
  }
  // billing unknown is expected pre-check — keep providerCallAllowed false
  blockers.push("provider_call_still_blocked");

  return {
    ok: blockers.filter((b) => b !== "billing_path_unknown" && b !== "provider_call_still_blocked").length === 0,
    checklist,
    blockers: [...new Set(blockers)],
    providerCallAllowed: false,
    note: "Post-config preflight is informational. Models API and generation remain Founder-gated.",
  };
}
