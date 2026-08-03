/**
 * One-agent provider activation preflight + fail-closed activation gate.
 * Reports safe booleans/statuses only — never secrets or key material.
 */

import {
  PILOT_BLOCK_REASONS,
  PILOT_POLICY,
  PILOT_PROJECT_ID,
  PILOT_AGENT_SLUG,
} from "./constants";
import { getPilotProviderStatus } from "./adapter";
import {
  isGlobalLiveExecutionEnabled,
  isPilotLiveExecutionEnabled,
  isModelAllowlisted,
} from "./policy";
import {
  countActivePilotLeases,
  countQueuedPilotTasks,
  getLiveTestedSeats,
  isKillSwitchActive,
  getLivePilotStoreSnapshot,
} from "./store";
import {
  getConfiguredOpenAIModelId,
  isOpenAIApiKeyConfigured,
} from "./openai-adapter";
import {
  getPilotModelVerification,
  isModelAvailabilityVerifiedForProviderCall,
  isPricingVerifiedForProviderCall,
  VERIFICATION_STATUS,
  BILLING_MODE_STATUS,
  officialStandardWorstCaseCost,
  worstCasePreflightCost,
  OFFICIAL_STANDARD_WORST_CASE_MICRO_USD,
  OPENAI_PILOT_MODEL_ID,
  OPENAI_PILOT_MODEL_SNAPSHOT,
} from "./model-registry";
import { assertPilotProjectIsolation } from "./eligibility";
import { runtimeConfigStatus } from "../config";

const EXPECTED_LIMITS = Object.freeze({
  maxConcurrentRequests: 1,
  maxQueuedPilotTasks: 1,
  maxAttempts: 1,
  maxInputTokens: 4000,
  maxOutputTokens: 1200,
  maxTotalTokens: 5200,
  maxEstimatedCostUsd: 0.1,
  maxProviderTimeoutMs: 60_000,
  maxWallClockMs: 90_000,
});

function yesNo(v) {
  return v === true ? "Yes" : "No";
}

function onOff(v) {
  return v === true ? "On" : "Off";
}

function statusLabel(status) {
  if (status === VERIFICATION_STATUS.VERIFIED) return "Verified";
  if (status === VERIFICATION_STATUS.NOT_CHECKED) return "Not checked";
  if (status === VERIFICATION_STATUS.UNAVAILABLE) return "Unavailable";
  if (status === VERIFICATION_STATUS.MISMATCH) return "Mismatch";
  if (status === BILLING_MODE_STATUS.STANDARD) return "Standard (verified)";
  if (status === BILLING_MODE_STATUS.UNKNOWN) return "Not checked";
  return String(status || "Not checked");
}

function unique(arr) {
  return [...new Set(arr)];
}

/**
 * Safe preflight snapshot for Admin / API. Never includes secret values.
 */
export function buildProviderActivationPreflight(input = {}) {
  const provider = getPilotProviderStatus();
  const modelId = input.modelId || getConfiguredOpenAIModelId();
  const verification = getPilotModelVerification(modelId || undefined);
  const globalOn = input.globalEnabled ?? isGlobalLiveExecutionEnabled();
  const pilotOn = input.pilotEnabled ?? isPilotLiveExecutionEnabled();
  const killOn = input.killSwitchActive ?? isKillSwitchActive();
  const apiKeyConfigured = isOpenAIApiKeyConfigured();
  const providerSelected = provider.providerName === "openai";
  const modelConfigured = Boolean(modelId);
  const modelAllowlisted = modelId ? isModelAllowlisted(modelId) : false;

  const concurrencyOk =
    PILOT_POLICY.maxConcurrentRequests === EXPECTED_LIMITS.maxConcurrentRequests;
  const queueLimitOk =
    PILOT_POLICY.maxQueuedPilotTasks === EXPECTED_LIMITS.maxQueuedPilotTasks;
  const attemptLimitOk = PILOT_POLICY.maxAttempts === EXPECTED_LIMITS.maxAttempts;
  const inputLimitOk =
    PILOT_POLICY.maxInputTokens === EXPECTED_LIMITS.maxInputTokens;
  const outputLimitOk =
    PILOT_POLICY.maxOutputTokens === EXPECTED_LIMITS.maxOutputTokens;
  const totalLimitOk =
    PILOT_POLICY.maxTotalTokens === EXPECTED_LIMITS.maxTotalTokens;
  const costLimitOk =
    PILOT_POLICY.maxEstimatedCostUsd === EXPECTED_LIMITS.maxEstimatedCostUsd;
  const providerTimeoutOk =
    PILOT_POLICY.maxProviderTimeoutMs === EXPECTED_LIMITS.maxProviderTimeoutMs;
  const wallTimeoutOk =
    PILOT_POLICY.maxWallClockMs === EXPECTED_LIMITS.maxWallClockMs;

  const queued = countQueuedPilotTasks();
  const leases = countActivePilotLeases();
  const liveTested = getLiveTestedSeats();
  const store = getLivePilotStoreSnapshot();
  const evidenceStoreAvailable = Boolean(store) && Array.isArray(store.evidence);
  const durableQueueAvailable = Boolean(store) && Array.isArray(store.runs);

  let schedulerHealthy = false;
  let schedulerTransitionState = "unknown";
  let schedulerHealth = "unknown";
  try {
    const rt = runtimeConfigStatus(input.runtimeOpts || {});
    schedulerTransitionState =
      rt?.scheduler?.transitionState ||
      rt?.scheduler?.mode ||
      schedulerTransitionState;
    schedulerHealth = rt?.scheduler?.health || schedulerHealth;
    schedulerHealthy =
      input.schedulerHealthy === true ||
      rt?.scheduler?.health === "healthy" ||
      String(schedulerTransitionState).includes("supabase_primary_active");
  } catch {
    schedulerHealthy = input.schedulerHealthy === true;
  }
  if (typeof input.schedulerHealthy === "boolean") {
    schedulerHealthy = input.schedulerHealthy;
  }

  const isolation = assertPilotProjectIsolation({
    projectId: input.projectId || PILOT_PROJECT_ID,
    agentSlug: input.agentSlug || PILOT_AGENT_SLUG,
    taskProjectId: input.taskProjectId,
    approvalProjectId: input.approvalProjectId,
    evidenceProjectId: input.evidenceProjectId,
    queueProjectId: input.queueProjectId,
    memoryProjectId: input.memoryProjectId,
  });

  const founderFinalReviewIndependent = true;
  const founderLiveAuthRecorded = Boolean(input.founderLiveAuthorization);
  const pilotAgentAllowlisted =
    (input.agentSlug || PILOT_AGENT_SLUG) === PILOT_AGENT_SLUG;
  const exactlyOnePilotAgentAllowed = PILOT_POLICY.maxLiveAgents === 1;

  const modelReady = isModelAvailabilityVerifiedForProviderCall(modelId);
  const pricingReady = isPricingVerifiedForProviderCall(modelId);
  const costBound = worstCasePreflightCost(modelId || undefined);
  const officialCost = officialStandardWorstCaseCost(modelId || OPENAI_PILOT_MODEL_ID);

  const blockers = [];
  if (!providerSelected || !apiKeyConfigured) {
    blockers.push(PILOT_BLOCK_REASONS.PROVIDER_NONE);
  }
  if (!modelConfigured || !modelAllowlisted) {
    blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_ALLOWLISTED);
  }
  if (verification.officialCatalogStatus !== VERIFICATION_STATUS.VERIFIED) {
    blockers.push(PILOT_BLOCK_REASONS.MODEL_CATALOG_NOT_VERIFIED);
  }
  if (verification.accountAccessStatus !== VERIFICATION_STATUS.VERIFIED) {
    blockers.push(PILOT_BLOCK_REASONS.ACCOUNT_ACCESS_NOT_VERIFIED);
    blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_VERIFIED);
  }
  if (verification.officialPricingStatus !== VERIFICATION_STATUS.VERIFIED) {
    blockers.push(PILOT_BLOCK_REASONS.PRICING_NOT_VERIFIED);
  }
  if (verification.billingModeStatus !== BILLING_MODE_STATUS.STANDARD) {
    blockers.push(PILOT_BLOCK_REASONS.BILLING_PATH_UNKNOWN);
    blockers.push(PILOT_BLOCK_REASONS.PRICING_NOT_VERIFIED);
  }
  if (!modelReady) {
    blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_VERIFIED);
  }
  if (!pricingReady || !costBound.ok) {
    blockers.push(PILOT_BLOCK_REASONS.PRICING_NOT_VERIFIED);
  }
  if (!globalOn) blockers.push(PILOT_BLOCK_REASONS.GLOBAL_SWITCH_OFF);
  if (!pilotOn) blockers.push(PILOT_BLOCK_REASONS.PILOT_SWITCH_OFF);
  if (killOn) blockers.push(PILOT_BLOCK_REASONS.KILL_SWITCH);
  if (!exactlyOnePilotAgentAllowed || !pilotAgentAllowlisted) {
    blockers.push(PILOT_BLOCK_REASONS.WRONG_AGENT);
  }
  if (!concurrencyOk || !queueLimitOk || !attemptLimitOk) {
    blockers.push(PILOT_BLOCK_REASONS.POLICY_LIMIT_MISMATCH);
  }
  if (!inputLimitOk || !outputLimitOk || !totalLimitOk || !costLimitOk) {
    blockers.push(PILOT_BLOCK_REASONS.POLICY_LIMIT_MISMATCH);
  }
  if (!providerTimeoutOk || !wallTimeoutOk) {
    blockers.push(PILOT_BLOCK_REASONS.POLICY_LIMIT_MISMATCH);
  }
  if (!durableQueueAvailable) {
    blockers.push(PILOT_BLOCK_REASONS.DURABLE_QUEUE_UNAVAILABLE);
  }
  if (!evidenceStoreAvailable) {
    blockers.push(PILOT_BLOCK_REASONS.EVIDENCE_STORE_UNAVAILABLE);
  }
  if (!schedulerHealthy) {
    blockers.push(PILOT_BLOCK_REASONS.SCHEDULER_UNHEALTHY);
  }
  if (!isolation.ok) {
    blockers.push(PILOT_BLOCK_REASONS.WRONG_PROJECT);
  }
  if (!founderLiveAuthRecorded && input.requireFounderLiveAuth === true) {
    blockers.push(PILOT_BLOCK_REASONS.MISSING_FOUNDER_LIVE_AUTH);
  }

  const uniqueBlockers = unique(blockers);
  const computedAllowed = uniqueBlockers.length === 0;

  return {
    ok: true,
    secretsIncluded: false,
    providerConfigured: providerSelected && apiKeyConfigured,
    providerName: provider.providerName || "none",
    apiKeyConfigured: apiKeyConfigured ? "yes" : "no",
    apiKeyConfiguredBool: apiKeyConfigured,
    modelConfigured: yesNo(modelConfigured),
    modelId: modelId || null,
    configuredModel: verification.configuredModel,
    approvedModel: verification.approvedModel || OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: verification.approvedSnapshot || OPENAI_PILOT_MODEL_SNAPSHOT,
    accountVerifiedModel: verification.accountVerifiedModel,
    officialCatalogStatus: verification.officialCatalogStatus,
    accountAccessStatus: verification.accountAccessStatus,
    selectedModelStatus: verification.selectedModelStatus,
    officialPricingStatus: verification.officialPricingStatus,
    billingModeStatus: verification.billingModeStatus,
    modelReadyForProviderCall: verification.modelReadyForProviderCall,
    pricingReadyForProviderCall: verification.pricingReadyForProviderCall,
    // Legacy mirrors
    modelAvailability: verification.accountAccessStatus,
    pricingVerification: verification.pricingVerification,
    modelAvailabilityStatus: verification.accountAccessStatus,
    pricingVerificationStatus: verification.pricingVerification,
    responseStorageEnabled: false,
    zeroDataRetentionVerified: false,
    abuseMonitoringMode: VERIFICATION_STATUS.NOT_CHECKED,
    officialModelsApiChecked: false,
    authenticatedModelsApiCalls: 0,
    executionSwitch: onOff(globalOn),
    executionSwitchEnabled: globalOn,
    pilotSwitch: onOff(pilotOn),
    pilotSwitchEnabled: pilotOn,
    killSwitchActive: killOn,
    exactlyOnePilotAgentAllowed,
    pilotAgentAllowlisted,
    concurrencyLimit: PILOT_POLICY.maxConcurrentRequests,
    concurrencyLimitEquals1: concurrencyOk,
    queuedTaskLimit: PILOT_POLICY.maxQueuedPilotTasks,
    queuedTaskLimitEquals1: queueLimitOk,
    attemptLimit: PILOT_POLICY.maxAttempts,
    attemptLimitEquals1: attemptLimitOk,
    inputLimit: PILOT_POLICY.maxInputTokens,
    inputLimitEquals4000: inputLimitOk,
    outputLimit: PILOT_POLICY.maxOutputTokens,
    outputLimitEquals1200: outputLimitOk,
    totalTokenLimit: PILOT_POLICY.maxTotalTokens,
    totalTokenLimitEquals5200: totalLimitOk,
    maximumCostUsd: PILOT_POLICY.maxEstimatedCostUsd,
    maximumCostEquals010: costLimitOk,
    providerTimeoutMs: PILOT_POLICY.maxProviderTimeoutMs,
    providerTimeoutEquals60s: providerTimeoutOk,
    wallTimeoutMs: PILOT_POLICY.maxWallClockMs,
    wallTimeoutEquals90s: wallTimeoutOk,
    durableQueueAvailable,
    runtimeSchedulerHealthy: schedulerHealthy,
    schedulerHealth,
    schedulerTransitionState,
    evidenceStoreAvailable,
    isolationChecksPass: isolation.ok,
    isolationErrors: isolation.errors,
    founderFinalReviewIndependent,
    founderLiveAuthorizationRecorded: founderLiveAuthRecorded,
    agentAllocated: false,
    agentActive: false,
    agentLiveTested: liveTested > 0,
    providerCalls: 0,
    queuedTasks: queued,
    activeLeases: leases,
    officialStandardWorstCaseCostUsd: officialCost.ok
      ? officialCost.estimatedCostUsd
      : null,
    officialStandardWorstCaseMicroUsd: officialCost.ok
      ? officialCost.estimatedCostMicroUsd
      : null,
    expectedOfficialStandardMicroUsd: OFFICIAL_STANDARD_WORST_CASE_MICRO_USD,
    verifiedWorstCaseCostUsd: costBound.ok ? costBound.estimatedCostUsd : null,
    candidateWorstCaseCostUsd: officialCost.ok ? officialCost.estimatedCostUsd : null,
    providerCallAllowed: false,
    liveExecutionReady: false,
    blockingReasons: uniqueBlockers,
    display: {
      provider: providerSelected && apiKeyConfigured ? "OpenAI" : "Not configured",
      providerConfigured: yesNo(providerSelected && apiKeyConfigured),
      apiKeyConfigured: yesNo(apiKeyConfigured),
      configuredModel: modelId || "none",
      officialCatalog: statusLabel(verification.officialCatalogStatus),
      accountModelAccess: statusLabel(verification.accountAccessStatus),
      officialPricing: statusLabel(verification.officialPricingStatus),
      billingPath:
        verification.billingModeStatus === BILLING_MODE_STATUS.STANDARD
          ? "Standard (verified)"
          : "Not checked",
      responseStorage: "Disabled",
      zeroDataRetention: "Not verified",
      executionSwitch: onOff(globalOn),
      pilotSwitch: onOff(pilotOn),
      pilotAgent: PILOT_AGENT_SLUG,
      queueCount: String(queued),
      concurrentRuns: String(leases),
      schedulerHealth: schedulerHealthy ? "Healthy" : "Not healthy / unknown",
      evidenceStore: evidenceStoreAvailable ? "Available" : "Unavailable",
      providerCallAllowed: "No",
      liveExecutionReady: "No",
      providerCalls: "0",
      allocated: "0",
      active: "0",
      liveTested: String(liveTested),
      // legacy keys used by earlier UI
      modelVerification: statusLabel(verification.accountAccessStatus),
      pricingVerification:
        verification.billingModeStatus === BILLING_MODE_STATUS.STANDARD
          ? "Verified"
          : verification.officialPricingStatus === VERIFICATION_STATUS.VERIFIED
            ? "Official verified; billing path not checked"
            : statusLabel(verification.officialPricingStatus),
      agentAllocated: "No",
      agentActive: "No",
      agentLiveTested: liveTested > 0 ? "Yes" : "No",
    },
    requiredToday: {
      providerConfigured: false,
      providerName: "none",
      officialCatalogStatus: "verified",
      accountAccessStatus: "not_checked",
      officialPricingStatus: "verified",
      billingModeStatus: "unknown",
      modelReadyForProviderCall: false,
      pricingReadyForProviderCall: false,
      executionSwitch: false,
      pilotSwitch: false,
      providerCallAllowed: false,
      liveExecutionReady: false,
      responseStorageEnabled: false,
      zeroDataRetentionVerified: false,
    },
    vercelSecretRunbook:
      "Enter OPENAI_API_KEY only via Vercel Production sensitive environment UI. Never paste secrets into Admin, chat, PR descriptions, or logs.",
    storeFalseNote:
      "store:false disables persistent Responses resource storage. It does not by itself establish Zero Data Retention; default abuse-monitoring retention may still apply.",
    computedProviderCallAllowedIfConfigured: computedAllowed,
  };
}

/**
 * Fail-closed gate before any provider generation call.
 */
export function assertActivationGate(input = {}) {
  const blockers = [];
  const preflight = buildProviderActivationPreflight({
    ...input,
    requireFounderLiveAuth: true,
    schedulerHealthy: input.schedulerHealthy,
  });

  const provider = getPilotProviderStatus();
  const modelId = input.modelId || getConfiguredOpenAIModelId();
  const apiKeyConfigured = isOpenAIApiKeyConfigured();
  const globalOn = input.globalEnabled ?? isGlobalLiveExecutionEnabled();
  const pilotOn = input.pilotEnabled ?? isPilotLiveExecutionEnabled();
  const verification = getPilotModelVerification(modelId || undefined);

  if (!(provider.providerName === "openai" && apiKeyConfigured)) {
    blockers.push(PILOT_BLOCK_REASONS.PROVIDER_NONE);
  }
  if (!modelId || !isModelAllowlisted(modelId)) {
    blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_ALLOWLISTED);
  }
  if (verification.officialCatalogStatus !== VERIFICATION_STATUS.VERIFIED) {
    blockers.push(PILOT_BLOCK_REASONS.MODEL_CATALOG_NOT_VERIFIED);
  }
  if (verification.accountAccessStatus !== VERIFICATION_STATUS.VERIFIED) {
    blockers.push(PILOT_BLOCK_REASONS.ACCOUNT_ACCESS_NOT_VERIFIED);
  }
  if (!isModelAvailabilityVerifiedForProviderCall(modelId)) {
    blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_VERIFIED);
  }
  if (verification.officialPricingStatus !== VERIFICATION_STATUS.VERIFIED) {
    blockers.push(PILOT_BLOCK_REASONS.PRICING_NOT_VERIFIED);
  }
  if (verification.billingModeStatus !== BILLING_MODE_STATUS.STANDARD) {
    blockers.push(PILOT_BLOCK_REASONS.BILLING_PATH_UNKNOWN);
  }
  if (!isPricingVerifiedForProviderCall(modelId)) {
    blockers.push(PILOT_BLOCK_REASONS.PRICING_NOT_VERIFIED);
  } else {
    const cost = worstCasePreflightCost(modelId);
    if (!cost.ok || cost.estimatedCostUsd > PILOT_POLICY.maxEstimatedCostUsd) {
      blockers.push(PILOT_BLOCK_REASONS.BUDGET_EXCEEDED);
    }
  }
  if (!globalOn) blockers.push(PILOT_BLOCK_REASONS.GLOBAL_SWITCH_OFF);
  if (!pilotOn) blockers.push(PILOT_BLOCK_REASONS.PILOT_SWITCH_OFF);
  if (isKillSwitchActive() || input.killSwitchActive) {
    blockers.push(PILOT_BLOCK_REASONS.KILL_SWITCH);
  }
  if ((input.agentSlug || PILOT_AGENT_SLUG) !== PILOT_AGENT_SLUG) {
    blockers.push(PILOT_BLOCK_REASONS.WRONG_AGENT);
  }
  const queued = countQueuedPilotTasks();
  if (input.requireExactlyOneQueuedTask === true && queued !== 1) {
    blockers.push(PILOT_BLOCK_REASONS.QUEUE_FULL);
  }
  if (countActivePilotLeases() >= PILOT_POLICY.maxConcurrentRequests) {
    blockers.push(PILOT_BLOCK_REASONS.CONCURRENCY_EXCEEDED);
  }
  if (input.schedulerHealthy === false) {
    blockers.push(PILOT_BLOCK_REASONS.SCHEDULER_UNHEALTHY);
  } else if (input.schedulerHealthy !== true && !preflight.runtimeSchedulerHealthy) {
    blockers.push(PILOT_BLOCK_REASONS.SCHEDULER_UNHEALTHY);
  }
  if (!preflight.durableQueueAvailable) {
    blockers.push(PILOT_BLOCK_REASONS.DURABLE_QUEUE_UNAVAILABLE);
  }
  if (!preflight.evidenceStoreAvailable) {
    blockers.push(PILOT_BLOCK_REASONS.EVIDENCE_STORE_UNAVAILABLE);
  }
  const isolation = assertPilotProjectIsolation({
    projectId: input.projectId || PILOT_PROJECT_ID,
    agentSlug: input.agentSlug || PILOT_AGENT_SLUG,
    taskProjectId: input.taskProjectId,
    approvalProjectId: input.approvalProjectId,
  });
  if (!isolation.ok) blockers.push(PILOT_BLOCK_REASONS.WRONG_PROJECT);
  if (!input.founderLiveAuthorization) {
    blockers.push(PILOT_BLOCK_REASONS.MISSING_FOUNDER_LIVE_AUTH);
  }

  const uniqueBlockers = unique(blockers);
  return {
    ok: uniqueBlockers.length === 0,
    blockers: uniqueBlockers,
    blockedReason: uniqueBlockers[0] || null,
    providerCallCountIncrement: 0,
    markAgentActive: false,
    markAgentLiveTested: false,
    modifyFounderProof: false,
    preflightSummary: {
      providerConfigured: preflight.providerConfigured,
      officialCatalogStatus: preflight.officialCatalogStatus,
      accountAccessStatus: preflight.accountAccessStatus,
      officialPricingStatus: preflight.officialPricingStatus,
      billingModeStatus: preflight.billingModeStatus,
      modelReadyForProviderCall: preflight.modelReadyForProviderCall,
      pricingReadyForProviderCall: preflight.pricingReadyForProviderCall,
      liveExecutionReady: false,
    },
  };
}
