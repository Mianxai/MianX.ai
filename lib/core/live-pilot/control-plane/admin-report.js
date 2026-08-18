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
import { getBillingPathReadinessStatus } from "./billing-path-readiness";
import { listLiveRunAuthorizationFixtures } from "./authorization";
import { manualSwitchOffProcedure } from "./post-run-lockout";
import { getAuthorizationStoreStatus } from "./authorization-store";
import { buildFirstLiveRunFounderChecklist } from "./first-live-run-readiness";

/**
 * Sync Admin snapshot. Defaults to fail-closed store status so Production
 * without the migration never looks authorized. Callers may pass a probed
 * authorizationStore override (e.g. from async GET).
 */
export function buildLiveRunControlPlaneAdminReport(input = {}) {
  const presence = getApiKeyPresenceStatus();
  const providerName = resolveConfiguredProviderName();
  const account = getAccountAccessStatus();
  const billing = getBillingPathReadinessStatus();
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

  const keyPresentButBlocked =
    presence.apiKeyConfigured === true &&
    (account.accountAccessStatus !== "verified" ||
      billing.billingCreditStatus !== "available" ||
      billing.billingModeStatus === "unknown");

  const blockers = [
    ...(preflight.blockingReasons || []),
    authorizationStore.status !== "available"
      ? "authorization_store_unavailable"
      : null,
    !presence.apiKeyConfigured ? "api_key_not_configured" : null,
    account.accountAccessStatus !== "verified" ? "account_access_not_checked" : null,
    billing.billingCreditStatus !== "available"
      ? "billing_credits_not_verified"
      : null,
    billing.billingModeStatus === "unknown" ? "billing_path_unknown" : null,
    keyPresentButBlocked
      ? "account_access_and_billing_readiness_not_verified"
      : null,
    !latestAuth || latestAuth.status !== "authorized"
      ? "founder_live_run_authorization_missing"
      : null,
    !isGlobalLiveExecutionEnabled() ? "execution_switch_off" : null,
    !isPilotLiveExecutionEnabled() ? "pilot_switch_off" : null,
  ].filter(Boolean);

  const authorizationRowCount =
    input.authorizationRowCount != null
      ? Number(input.authorizationRowCount)
      : auths.filter((a) => a.status === "authorized" || a.status === "consumed").length;

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
    authorizationRowCount,
    realAuthorization: latestAuth?.status || "none",
    providerConfigured: providerName === "openai" && presence.apiKeyConfigured === true,
    providerConfiguredDisplay: keyPresentButBlocked
      ? "configuration_present_execution_blocked"
      : providerName === "openai" && presence.apiKeyConfigured
        ? "configured"
        : "not_configured",
    apiKeyConfigured: presence.apiKeyConfigured,
    providerName,
    officialCatalogStatus: verification.officialCatalogStatus,
    accountAccessStatus: account.accountAccessStatus,
    approvedModel: latestAuth?.approvedModel || OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: latestAuth?.approvedSnapshot || OPENAI_PILOT_MODEL_SNAPSHOT,
    officialPricingStatus: verification.officialPricingStatus || billing.officialPricingStatus,
    billingPathStatus: verification.billingModeStatus || billing.billingModeStatus || "unknown",
    billingModeStatus: billing.billingModeStatus,
    billingCreditStatus: billing.billingCreditStatus,
    creditReadyForProviderCall: billing.creditReadyForProviderCall === true,
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
    allocatedAgents: Number(input.workforce?.allocatedSeats || 0),
    activeAgents: Number(input.workforce?.activeInstances || 0),
    liveTestedAgents: Number(input.workforce?.liveTestedSeats || 0),
    schedulerHealth: preflight.schedulerHealth,
    evidenceStore: Array.isArray(store?.evidence) ? "available" : "unavailable",
    providerCallAllowed: false,
    liveExecutionReady: false,
    primaryBlockingReason:
      "account access and billing readiness have not been verified",
    remainingBlockers: [...new Set(blockers)],
    authenticatedModelsApiCalls: 0,
    genuineGenerationCalls: 0,
    founderProofChanged: false,
    founderFinalReviewChanged: false,
    failClosedWithoutMigration: true,
    manualSwitchOff: manualSwitchOffProcedure(),
    firstLiveRunFounderChecklist: buildFirstLiveRunFounderChecklist({
      authorizationStoreStatus: authorizationStore.status,
      authorizationRowCount,
      schedulerHealth: preflight.schedulerHealth,
      queuedPilotTasks: countQueuedPilotTasks(),
      concurrentPilotRuns: countActivePilotLeases(),
      workforce: {
        allocatedSeats: Number(input.workforce?.allocatedSeats || 0),
        activeInstances: Number(input.workforce?.activeInstances || 0),
        liveTestedSeats: Number(input.workforce?.liveTestedSeats || 0),
      },
    }),
    note:
      authorizationStore.status === "available"
        ? "Authorization store is available. No real authorization rows are created by this Admin page. Provider calls remain blocked until Founder gates pass. Key presence does not imply credits. No genuine OpenAI generation."
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
