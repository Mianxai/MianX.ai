/**
 * Read-only Admin live-run control-plane report.
 * No Run-now action. No secret values. No Production authorization creation.
 */

import { getPilotProviderStatus, resolveConfiguredProviderName } from "../adapter";
import { getPilotModelVerification, OPENAI_PILOT_MODEL_ID, OPENAI_PILOT_MODEL_SNAPSHOT } from "../model-registry";
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
import { buildProviderActivationPreflight } from "../activation-preflight";
import { getApiKeyPresenceStatus } from "./key-presence";
import { getAccountAccessStatus } from "./model-access-verification";
import { listLiveRunAuthorizationFixtures } from "./authorization";
import { manualSwitchOffProcedure } from "./post-run-lockout";
import { getAuthorizationStoreStatus } from "./authorization-store";

/**
 * Sync Admin snapshot. Defaults to fail-closed store status so Production
 * without the migration never looks authorized. Callers may pass a probed
 * authorizationStore override (e.g. from async GET).
 */
export function buildLiveRunControlPlaneAdminReport(input = {}) {
  const presence = getApiKeyPresenceStatus();
  const providerName = resolveConfiguredProviderName();
  const account = getAccountAccessStatus();
  const provider = getPilotProviderStatus();
  const modelId = provider.selectedModel || OPENAI_PILOT_MODEL_ID;
  const verification = getPilotModelVerification(modelId || undefined);
  const preflight = buildProviderActivationPreflight({
    schedulerHealthy: input.schedulerHealthy,
  });
  const auths = listLiveRunAuthorizationFixtures();
  const latestAuth = auths.length ? auths[auths.length - 1] : null;
  const store = getLivePilotStoreSnapshot();

  const authorizationStore = input.authorizationStore || {
    status: "not_applied",
    reason: "authorization_store_unavailable",
    migrationApplied: false,
    providerCallAllowed: false,
    liveExecutionReady: false,
    table: "pilot_live_run_authorizations",
  };

  const blockers = [
    ...(preflight.blockingReasons || []),
    authorizationStore.status !== "available"
      ? "authorization_store_unavailable"
      : null,
    !presence.apiKeyConfigured ? "api_key_not_configured" : null,
    account.accountAccessStatus !== "verified" ? "account_access_not_checked" : null,
    !latestAuth || latestAuth.status !== "authorized"
      ? "founder_live_run_authorization_missing"
      : null,
    !isGlobalLiveExecutionEnabled() ? "execution_switch_off" : null,
    !isPilotLiveExecutionEnabled() ? "pilot_switch_off" : null,
  ].filter(Boolean);

  return {
    heading: "One-agent live-run control plane",
    preparationOnly: true,
    runNowActionPresent: false,
    secretInputPresent: false,
    apiKeyFieldPresent: false,
    productionAuthorizationCreated: false,
    migrationRequired: true,
    migrationIncluded: true,
    migrationApplied: authorizationStore.migrationApplied === true,
    productionDatabaseChanged: false,
    storageDecision: "B",
    authorizationStoreStatus: authorizationStore.status,
    authorizationStoreReason: authorizationStore.reason || "authorization_store_unavailable",
    realAuthorization: latestAuth?.status || "none",
    providerConfigured: providerName === "openai" && presence.apiKeyConfigured === true,
    apiKeyConfigured: presence.apiKeyConfigured,
    providerName,
    officialCatalogStatus: verification.officialCatalogStatus,
    accountAccessStatus: account.accountAccessStatus,
    approvedModel: latestAuth?.approvedModel || OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: latestAuth?.approvedSnapshot || OPENAI_PILOT_MODEL_SNAPSHOT,
    officialPricingStatus: verification.officialPricingStatus,
    billingPathStatus: verification.billingModeStatus || "unknown",
    authorizationStatus: latestAuth?.status || "none",
    authorizationExpiry: latestAuth?.expiresAt || null,
    authorizationConsumed: latestAuth?.status === "consumed",
    taskEnvelopeMatch: null,
    costEnvelopeMatch: null,
    executionSwitch: isGlobalLiveExecutionEnabled(),
    pilotSwitch: isPilotLiveExecutionEnabled(),
    killSwitchActive: isKillSwitchActive(),
    queueCount: countQueuedPilotTasks(),
    concurrentRuns: countActivePilotLeases(),
    schedulerHealth: preflight.schedulerHealth,
    evidenceStore: Array.isArray(store?.evidence) ? "available" : "unavailable",
    providerCallAllowed: false,
    liveExecutionReady: false,
    remainingBlockers: [...new Set(blockers)],
    authenticatedModelsApiCalls: 0,
    genuineGenerationCalls: 0,
    founderProofChanged: false,
    founderFinalReviewChanged: false,
    failClosedWithoutMigration: true,
    manualSwitchOff: manualSwitchOffProcedure(),
    note:
      authorizationStore.status === "available"
        ? "Authorization store is available. No real authorization rows are created by this Admin page. Provider calls remain blocked until Founder gates pass. No genuine OpenAI generation."
        : "Control plane is preparation-only. Without the applied migration, authorization store is unavailable and provider calls remain blocked. No genuine OpenAI generation.",
  };
}

/** Async Admin report with live table probe (fail-closed; never throws). */
export async function buildLiveRunControlPlaneAdminReportAsync(input = {}) {
  let authorizationStore;
  try {
    authorizationStore = await getAuthorizationStoreStatus({
      forceMissing: input.forceMissing === true,
    });
  } catch {
    authorizationStore = {
      status: "unavailable",
      reason: "authorization_store_unavailable",
      migrationApplied: false,
      providerCallAllowed: false,
      liveExecutionReady: false,
      table: "pilot_live_run_authorizations",
    };
  }
  return buildLiveRunControlPlaneAdminReport({
    ...input,
    authorizationStore,
  });
}
