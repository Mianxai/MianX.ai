/**
 * Read-only Admin live-run control-plane report.
 * No Run-now action. No secret values. No Production authorization creation.
 */

import { getPilotProviderStatus } from "../adapter";
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

export function buildLiveRunControlPlaneAdminReport(input = {}) {
  const presence = getApiKeyPresenceStatus();
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

  const blockers = [
    ...(preflight.blockingReasons || []),
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
    migrationApplied: false,
    productionDatabaseChanged: false,
    storageDecision: "B",
    providerConfigured: presence.providerName === "openai",
    apiKeyConfigured: presence.apiKeyConfigured,
    providerName: presence.providerName,
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
    manualSwitchOff: manualSwitchOffProcedure(),
    note:
      "Control plane is preparation-only. No genuine OpenAI generation. No real authorization is created in Production by this Admin page.",
  };
}
