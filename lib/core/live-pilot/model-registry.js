/**
 * OpenAI model + pricing verification for the one-agent pilot.
 *
 * Dimensions are separate:
 * - officialCatalogStatus / officialPricingStatus (public docs; no account proof)
 * - accountAccessStatus / billingModeStatus (require Founder-authorized checks)
 *
 * modelReadyForProviderCall and pricingReadyForProviderCall stay false until
 * account access + billing path are verified. No Models API call here.
 */

import { PILOT_POLICY } from "./constants";

/** Alias used in policy allowlist / env configuration. */
export const OPENAI_PILOT_MODEL_ID = "gpt-5.4-mini";

/** Official pinned snapshot (2026-08-03 catalog). Prefer when account access confirms it. */
export const OPENAI_PILOT_MODEL_SNAPSHOT = "gpt-5.4-mini-2026-03-17";

export const VERIFICATION_STATUS = Object.freeze({
  NOT_CHECKED: "not_checked",
  VERIFIED: "verified",
  UNAVAILABLE: "unavailable",
  MISMATCH: "mismatch",
});

export const BILLING_MODE_STATUS = Object.freeze({
  STANDARD: "standard",
  PRIORITY: "priority",
  BATCH: "batch",
  REGIONAL: "regional",
  UNKNOWN: "unknown",
});

/** @deprecated Prefer VERIFICATION_STATUS — kept for transitional imports. */
export const MODEL_AVAILABILITY_STATUS = VERIFICATION_STATUS;
/** @deprecated Prefer officialPricingStatus dimensions. */
export const PRICING_VERIFICATION_STATUS = Object.freeze({
  ...VERIFICATION_STATUS,
  UNVERIFIED: "unverified",
});

/**
 * Official catalog + standard pricing (retrieval 2026-08-03).
 * Prices stored as integer microdollars per 1M tokens for integer-safe math.
 * 0.75 USD = 750_000 µUSD/1M; 4.50 USD = 4_500_000 µUSD/1M; cached 0.075 = 75_000.
 */
export const OPENAI_OFFICIAL_PRICE_SOURCE = Object.freeze({
  retrievalDate: "2026-08-03",
  pricingVersion: "openai-gpt-5.4-mini-standard-2026-08-03",
  modelId: OPENAI_PILOT_MODEL_ID,
  officialSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
  supportedEndpoint: "/v1/responses",
  structuredOutputs: true,
  inputMicroUsdPer1M: 750_000,
  cachedInputMicroUsdPer1M: 75_000,
  outputMicroUsdPer1M: 4_500_000,
  regionalUpliftPercent: 10,
  note: "Official standard token prices from OpenAI model catalog as of retrieval date.",
});

export const OPENAI_MODEL_REGISTRY = Object.freeze({
  [OPENAI_PILOT_MODEL_ID]: Object.freeze({
    provider: "openai",
    modelId: OPENAI_PILOT_MODEL_ID,
    officialSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    status: "official_catalog",
    structuredOutputSupport: true,
    supportedEndpoint: "/v1/responses",
    maxPilotOutputTokens: PILOT_POLICY.maxOutputTokens,
    inputPricePer1MTokensUsd: 0.75,
    cachedInputPricePer1MTokensUsd: 0.075,
    outputPricePer1MTokensUsd: 4.5,
    inputMicroUsdPer1M: OPENAI_OFFICIAL_PRICE_SOURCE.inputMicroUsdPer1M,
    cachedInputMicroUsdPer1M: OPENAI_OFFICIAL_PRICE_SOURCE.cachedInputMicroUsdPer1M,
    outputMicroUsdPer1M: OPENAI_OFFICIAL_PRICE_SOURCE.outputMicroUsdPer1M,
    pricingSourceDescription:
      "Official standard gpt-5.4-mini token prices (retrieval 2026-08-03). Account billing path still required.",
    pricingVerifiedDate: "2026-08-03",
    pricingVersion: OPENAI_OFFICIAL_PRICE_SOURCE.pricingVersion,
    officialCatalogStatus: VERIFICATION_STATUS.VERIFIED,
    officialPricingStatus: VERIFICATION_STATUS.VERIFIED,
    maximumEstimatedPilotCostUsd: PILOT_POLICY.maxEstimatedCostUsd,
  }),
  [OPENAI_PILOT_MODEL_SNAPSHOT]: Object.freeze({
    provider: "openai",
    modelId: OPENAI_PILOT_MODEL_SNAPSHOT,
    officialSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    aliasOf: OPENAI_PILOT_MODEL_ID,
    status: "official_snapshot",
    structuredOutputSupport: true,
    supportedEndpoint: "/v1/responses",
    maxPilotOutputTokens: PILOT_POLICY.maxOutputTokens,
    inputPricePer1MTokensUsd: 0.75,
    cachedInputPricePer1MTokensUsd: 0.075,
    outputPricePer1MTokensUsd: 4.5,
    inputMicroUsdPer1M: OPENAI_OFFICIAL_PRICE_SOURCE.inputMicroUsdPer1M,
    cachedInputMicroUsdPer1M: OPENAI_OFFICIAL_PRICE_SOURCE.cachedInputMicroUsdPer1M,
    outputMicroUsdPer1M: OPENAI_OFFICIAL_PRICE_SOURCE.outputMicroUsdPer1M,
    pricingSourceDescription:
      "Official pinned snapshot gpt-5.4-mini-2026-03-17 (retrieval 2026-08-03).",
    pricingVerifiedDate: "2026-08-03",
    pricingVersion: OPENAI_OFFICIAL_PRICE_SOURCE.pricingVersion,
    officialCatalogStatus: VERIFICATION_STATUS.VERIFIED,
    officialPricingStatus: VERIFICATION_STATUS.VERIFIED,
    maximumEstimatedPilotCostUsd: PILOT_POLICY.maxEstimatedCostUsd,
  }),
});

/**
 * @type {null|{
 *   officialCatalogStatus?: string,
 *   accountAccessStatus?: string,
 *   officialPricingStatus?: string,
 *   billingModeStatus?: string,
 *   accountVerifiedModel?: string|null,
 *   modelId?: string,
 *   // legacy aliases for older tests
 *   modelAvailability?: string,
 *   pricingVerification?: string,
 * }}
 */
let testVerificationOverride = null;

export function __setPilotModelVerificationForTests(override) {
  const allowed =
    process.env.VITEST === "true" ||
    process.env.NODE_ENV === "test" ||
    Boolean(process.env.VITEST);
  if (!allowed) {
    throw new Error("Pilot model verification override is test-only");
  }
  testVerificationOverride = override ? { ...override } : null;
}

export function __resetPilotModelVerificationForTests() {
  testVerificationOverride = null;
}

function resolveRegistryKey(modelId) {
  const id = String(modelId || "").trim();
  if (!id) return null;
  if (OPENAI_MODEL_REGISTRY[id]) return id;
  return null;
}

/**
 * Full verification posture. Production defaults:
 * official catalog/pricing verified from docs; account access + billing not checked.
 */
export function getPilotModelVerification(modelId = OPENAI_PILOT_MODEL_ID) {
  const configured = modelId || OPENAI_PILOT_MODEL_ID;
  const registryKey = resolveRegistryKey(configured);
  const entry = registryKey ? OPENAI_MODEL_REGISTRY[registryKey] : null;

  if (testVerificationOverride) {
    const o = testVerificationOverride;
    const officialCatalogStatus =
      o.officialCatalogStatus ||
      VERIFICATION_STATUS.VERIFIED;
    const accountAccessStatus =
      o.accountAccessStatus ||
      o.modelAvailability ||
      VERIFICATION_STATUS.NOT_CHECKED;
    let officialPricingStatus =
      o.officialPricingStatus || VERIFICATION_STATUS.VERIFIED;
    let billingModeStatus = o.billingModeStatus || BILLING_MODE_STATUS.UNKNOWN;
    if (o.pricingVerification === "verified" && !o.billingModeStatus) {
      officialPricingStatus = VERIFICATION_STATUS.VERIFIED;
      billingModeStatus = BILLING_MODE_STATUS.STANDARD;
    } else if (o.pricingVerification === "unverified" && !o.billingModeStatus) {
      officialPricingStatus = VERIFICATION_STATUS.VERIFIED;
      billingModeStatus = BILLING_MODE_STATUS.UNKNOWN;
    } else if (o.pricingVerification === "not_checked" && !o.officialPricingStatus) {
      officialPricingStatus = VERIFICATION_STATUS.NOT_CHECKED;
      billingModeStatus = BILLING_MODE_STATUS.UNKNOWN;
    }
    const accountVerifiedModel =
      o.accountVerifiedModel !== undefined
        ? o.accountVerifiedModel
        : accountAccessStatus === VERIFICATION_STATUS.VERIFIED
          ? o.modelId || configured
          : null;

    return buildVerificationResult({
      configuredModel: configured,
      approvedModel: OPENAI_PILOT_MODEL_ID,
      approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
      accountVerifiedModel,
      officialCatalogStatus,
      accountAccessStatus,
      officialPricingStatus,
      billingModeStatus,
      source: "test_override",
      entry,
    });
  }

  const officialCatalogStatus = entry
    ? entry.officialCatalogStatus
    : configured
      ? VERIFICATION_STATUS.MISMATCH
      : VERIFICATION_STATUS.NOT_CHECKED;

  return buildVerificationResult({
    configuredModel: configured || null,
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    accountVerifiedModel: null,
    officialCatalogStatus,
    accountAccessStatus: VERIFICATION_STATUS.NOT_CHECKED,
    officialPricingStatus: entry
      ? entry.officialPricingStatus
      : VERIFICATION_STATUS.NOT_CHECKED,
    billingModeStatus: BILLING_MODE_STATUS.UNKNOWN,
    source: "official_catalog_docs_2026-08-03",
    entry,
  });
}

function buildVerificationResult({
  configuredModel,
  approvedModel,
  approvedSnapshot,
  accountVerifiedModel,
  officialCatalogStatus,
  accountAccessStatus,
  officialPricingStatus,
  billingModeStatus,
  source,
  entry,
}) {
  const selectedMatchesPolicy =
    Boolean(configuredModel) &&
    (configuredModel === approvedModel ||
      configuredModel === approvedSnapshot ||
      (accountVerifiedModel != null && configuredModel === accountVerifiedModel));

  const selectedModelStatus =
    !configuredModel
      ? VERIFICATION_STATUS.NOT_CHECKED
      : !selectedMatchesPolicy
        ? VERIFICATION_STATUS.MISMATCH
        : officialCatalogStatus === VERIFICATION_STATUS.VERIFIED &&
            accountAccessStatus === VERIFICATION_STATUS.VERIFIED
          ? VERIFICATION_STATUS.VERIFIED
          : accountAccessStatus === VERIFICATION_STATUS.UNAVAILABLE
            ? VERIFICATION_STATUS.UNAVAILABLE
            : VERIFICATION_STATUS.NOT_CHECKED;

  const modelReadyForProviderCall =
    officialCatalogStatus === VERIFICATION_STATUS.VERIFIED &&
    accountAccessStatus === VERIFICATION_STATUS.VERIFIED &&
    selectedModelStatus === VERIFICATION_STATUS.VERIFIED &&
    Boolean(accountVerifiedModel) &&
    selectedMatchesPolicy;

  const pricingReadyForProviderCall =
    officialPricingStatus === VERIFICATION_STATUS.VERIFIED &&
    billingModeStatus === BILLING_MODE_STATUS.STANDARD;

  return {
    configuredModel,
    approvedModel,
    approvedSnapshot,
    accountVerifiedModel,
    officialCatalogStatus,
    accountAccessStatus,
    selectedModelStatus,
    officialPricingStatus,
    billingModeStatus,
    modelReadyForProviderCall,
    pricingReadyForProviderCall,
    // Legacy aliases (map to new dimensions for older callers)
    modelAvailability: accountAccessStatus,
    pricingVerification: pricingReadyForProviderCall
      ? VERIFICATION_STATUS.VERIFIED
      : officialPricingStatus === VERIFICATION_STATUS.VERIFIED
        ? "unverified" // official known but billing path not ready
        : officialPricingStatus,
    source,
    officialModelsApiChecked: false,
    authenticatedModelsApiCalls: 0,
    responseStorageEnabled: false,
    zeroDataRetentionVerified: false,
    abuseMonitoringMode: VERIFICATION_STATUS.NOT_CHECKED,
    entry,
    note:
      "Official catalog/pricing from docs (2026-08-03). Account Models API access and billing path remain not_checked until Founder-authorized verification.",
  };
}

/** Provider call requires account-verified model + standard billing path. */
export function isModelAvailabilityVerifiedForProviderCall(modelId) {
  return getPilotModelVerification(modelId).modelReadyForProviderCall === true;
}

export function isPricingVerifiedForProviderCall(modelId) {
  return getPilotModelVerification(modelId).pricingReadyForProviderCall === true;
}

export function listOpenAIPilotModelIds() {
  return [OPENAI_PILOT_MODEL_ID, OPENAI_PILOT_MODEL_SNAPSHOT];
}

export function getModelRegistryEntry(modelId) {
  if (!modelId) {
    return { ok: false, code: "MODEL_MISSING", entry: null };
  }
  const key = resolveRegistryKey(modelId);
  if (!key) {
    return { ok: false, code: "MODEL_NOT_ALLOWLISTED", entry: null };
  }
  const entry = OPENAI_MODEL_REGISTRY[key];
  if (
    !Number.isFinite(entry.inputMicroUsdPer1M) ||
    !Number.isFinite(entry.outputMicroUsdPer1M)
  ) {
    return { ok: false, code: "PRICING_MISSING", entry: null };
  }
  return { ok: true, code: null, entry };
}

/**
 * Integer-safe cost: microdollars = (tokens * µUSD_per_1M) / 1_000_000
 * Returns USD with 8 decimal places via integer division (no float equality).
 */
export function calculateEstimatedCostUsd({
  modelId,
  inputTokens = 0,
  outputTokens = 0,
  cachedInputTokens = 0,
  requireVerifiedPricing = true,
  applyRegionalUplift = false,
} = {}) {
  if (requireVerifiedPricing && !isPricingVerifiedForProviderCall(modelId)) {
    return {
      ok: false,
      code: "PRICING_NOT_VERIFIED",
      estimatedCostUsd: null,
      estimatedCostMicroUsd: null,
      pricingVersion: null,
      pricingVerification: getPilotModelVerification(modelId).pricingVerification,
      officialPricingStatus: getPilotModelVerification(modelId).officialPricingStatus,
      billingModeStatus: getPilotModelVerification(modelId).billingModeStatus,
    };
  }
  const reg = getModelRegistryEntry(modelId);
  if (!reg.ok) {
    return { ok: false, code: reg.code, estimatedCostUsd: null, pricingVersion: null };
  }
  const input = Number(inputTokens);
  const output = Number(outputTokens);
  const cached = Number(cachedInputTokens) || 0;
  if (
    !Number.isFinite(input) ||
    !Number.isFinite(output) ||
    !Number.isFinite(cached) ||
    input < 0 ||
    output < 0 ||
    cached < 0 ||
    !Number.isInteger(input) ||
    !Number.isInteger(output) ||
    !Number.isInteger(cached)
  ) {
    return {
      ok: false,
      code: "USAGE_INVALID",
      estimatedCostUsd: null,
      pricingVersion: reg.entry.pricingVersion,
    };
  }

  const billableInput = Math.max(0, input - cached);
  const micro =
    (BigInt(billableInput) * BigInt(reg.entry.inputMicroUsdPer1M) +
      BigInt(cached) * BigInt(reg.entry.cachedInputMicroUsdPer1M) +
      BigInt(output) * BigInt(reg.entry.outputMicroUsdPer1M)) /
    1_000_000n;

  let microUsd = micro;
  if (applyRegionalUplift) {
    microUsd =
      (microUsd * BigInt(100 + OPENAI_OFFICIAL_PRICE_SOURCE.regionalUpliftPercent)) /
      100n;
  }

  const estimatedCostUsd = Number(microUsd) / 1_000_000;
  return {
    ok: true,
    code: null,
    estimatedCostUsd,
    estimatedCostMicroUsd: Number(microUsd),
    pricingVersion: reg.entry.pricingVersion,
    entry: reg.entry,
    officialPricingStatus: getPilotModelVerification(modelId).officialPricingStatus,
    billingModeStatus: getPilotModelVerification(modelId).billingModeStatus,
    pricingVerification: getPilotModelVerification(modelId).pricingVerification,
  };
}

/** Standard uncached worst-case at pilot caps: $0.0084 when billing path ready. */
export function worstCasePreflightCost(modelId = OPENAI_PILOT_MODEL_ID) {
  return calculateEstimatedCostUsd({
    modelId,
    inputTokens: PILOT_POLICY.maxInputTokens,
    outputTokens: PILOT_POLICY.maxOutputTokens,
    requireVerifiedPricing: true,
  });
}

/**
 * Official standard bound for display / docs (does not authorize a provider call).
 * Always uses integer-safe math against official prices.
 */
export function officialStandardWorstCaseCost(modelId = OPENAI_PILOT_MODEL_ID) {
  return calculateEstimatedCostUsd({
    modelId: resolveRegistryKey(modelId) || OPENAI_PILOT_MODEL_ID,
    inputTokens: PILOT_POLICY.maxInputTokens,
    outputTokens: PILOT_POLICY.maxOutputTokens,
    requireVerifiedPricing: false,
  });
}

/** @deprecated Use officialStandardWorstCaseCost */
export function candidateWorstCaseCostPreview(modelId = OPENAI_PILOT_MODEL_ID) {
  return officialStandardWorstCaseCost(modelId);
}

/** Exact expected standard cost at pilot caps in microdollars: 8400 µUSD = $0.0084 */
export const OFFICIAL_STANDARD_WORST_CASE_MICRO_USD = 8400;
