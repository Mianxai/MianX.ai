/**
 * Versioned OpenAI model registry for the live pilot.
 * Candidate registry entries are not official availability or pricing proof.
 * Fail closed for unknown models, missing pricing, or unverified pricing/model.
 */

import { PILOT_POLICY } from "./constants";

export const OPENAI_PILOT_MODEL_ID = "gpt-5.4-mini";

export const MODEL_AVAILABILITY_STATUS = Object.freeze({
  NOT_CHECKED: "not_checked",
  VERIFIED: "verified",
  UNAVAILABLE: "unavailable",
  MISMATCH: "mismatch",
});

export const PRICING_VERIFICATION_STATUS = Object.freeze({
  NOT_CHECKED: "not_checked",
  VERIFIED: "verified",
  UNAVAILABLE: "unavailable",
  MISMATCH: "mismatch",
  UNVERIFIED: "unverified",
});

/**
 * Candidate metadata only. Do not treat as current official OpenAI truth.
 * input $0.75/1M and output $4.50/1M remain Founder-era assumptions until verified.
 */
export const OPENAI_MODEL_REGISTRY = Object.freeze({
  [OPENAI_PILOT_MODEL_ID]: Object.freeze({
    provider: "openai",
    modelId: OPENAI_PILOT_MODEL_ID,
    status: "candidate",
    structuredOutputSupport: true,
    maxPilotOutputTokens: PILOT_POLICY.maxOutputTokens,
    inputPricePer1MTokensUsd: 0.75,
    outputPricePer1MTokensUsd: 4.5,
    pricingSourceDescription:
      "Unverified Founder-era Phase II.2 candidate pricing metadata for gpt-5.4-mini — not current official proof",
    pricingVerifiedDate: null,
    pricingVersion: "openai-gpt-5.4-mini-candidate-unverified",
    maximumEstimatedPilotCostUsd: PILOT_POLICY.maxEstimatedCostUsd,
  }),
});

/** @type {null|{ modelAvailability: string, pricingVerification: string, modelId?: string }} */
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

/**
 * Production default: model availability not_checked; pricing unverified.
 * Authenticated Models API verification is never performed here.
 */
export function getPilotModelVerification(modelId = OPENAI_PILOT_MODEL_ID) {
  if (testVerificationOverride) {
    return {
      modelId: testVerificationOverride.modelId || modelId || null,
      modelAvailability: testVerificationOverride.modelAvailability,
      pricingVerification: testVerificationOverride.pricingVerification,
      source: "test_override",
      officialModelsApiChecked: false,
      authenticatedModelsApiCalls: 0,
    };
  }

  const id = modelId || OPENAI_PILOT_MODEL_ID;
  const inRegistry = Boolean(OPENAI_MODEL_REGISTRY[id]);
  return {
    modelId: id,
    modelAvailability: inRegistry
      ? MODEL_AVAILABILITY_STATUS.NOT_CHECKED
      : MODEL_AVAILABILITY_STATUS.UNAVAILABLE,
    pricingVerification: inRegistry
      ? PRICING_VERIFICATION_STATUS.UNVERIFIED
      : PRICING_VERIFICATION_STATUS.UNAVAILABLE,
    source: "repository_candidate_registry",
    officialModelsApiChecked: false,
    authenticatedModelsApiCalls: 0,
    note:
      "Model and pricing require Founder review of current official OpenAI documentation and a separately authorized Models API check.",
  };
}

export function isPricingVerifiedForProviderCall(modelId) {
  return (
    getPilotModelVerification(modelId).pricingVerification ===
    PRICING_VERIFICATION_STATUS.VERIFIED
  );
}

export function isModelAvailabilityVerifiedForProviderCall(modelId) {
  return (
    getPilotModelVerification(modelId).modelAvailability ===
    MODEL_AVAILABILITY_STATUS.VERIFIED
  );
}

export function listOpenAIPilotModelIds() {
  return Object.keys(OPENAI_MODEL_REGISTRY);
}

export function getModelRegistryEntry(modelId) {
  if (!modelId) {
    return { ok: false, code: "MODEL_MISSING", entry: null };
  }
  const entry = OPENAI_MODEL_REGISTRY[String(modelId).trim()];
  if (!entry) {
    return { ok: false, code: "MODEL_NOT_ALLOWLISTED", entry: null };
  }
  if (
    !Number.isFinite(entry.inputPricePer1MTokensUsd) ||
    !Number.isFinite(entry.outputPricePer1MTokensUsd)
  ) {
    return { ok: false, code: "PRICING_MISSING", entry: null };
  }
  return { ok: true, code: null, entry };
}

export function calculateEstimatedCostUsd({
  modelId,
  inputTokens = 0,
  outputTokens = 0,
  requireVerifiedPricing = true,
} = {}) {
  if (requireVerifiedPricing && !isPricingVerifiedForProviderCall(modelId)) {
    return {
      ok: false,
      code: "PRICING_NOT_VERIFIED",
      estimatedCostUsd: null,
      pricingVersion: null,
      pricingVerification: getPilotModelVerification(modelId).pricingVerification,
    };
  }
  const reg = getModelRegistryEntry(modelId);
  if (!reg.ok) {
    return { ok: false, code: reg.code, estimatedCostUsd: null, pricingVersion: null };
  }
  const input = Number(inputTokens);
  const output = Number(outputTokens);
  if (!Number.isFinite(input) || !Number.isFinite(output) || input < 0 || output < 0) {
    return {
      ok: false,
      code: "USAGE_INVALID",
      estimatedCostUsd: null,
      pricingVersion: reg.entry.pricingVersion,
    };
  }
  const cost =
    (input / 1_000_000) * reg.entry.inputPricePer1MTokensUsd +
    (output / 1_000_000) * reg.entry.outputPricePer1MTokensUsd;
  return {
    ok: true,
    code: null,
    estimatedCostUsd: Number(cost.toFixed(8)),
    pricingVersion: reg.entry.pricingVersion,
    entry: reg.entry,
    pricingVerification: getPilotModelVerification(modelId).pricingVerification,
  };
}

/** Worst-case preflight using configured pilot token ceilings. Fail-closed without verified pricing. */
export function worstCasePreflightCost(modelId = OPENAI_PILOT_MODEL_ID) {
  return calculateEstimatedCostUsd({
    modelId,
    inputTokens: PILOT_POLICY.maxInputTokens,
    outputTokens: PILOT_POLICY.maxOutputTokens,
    requireVerifiedPricing: true,
  });
}

/** Candidate-only cost math for display when pricing is unverified — never authorizes a provider call. */
export function candidateWorstCaseCostPreview(modelId = OPENAI_PILOT_MODEL_ID) {
  return calculateEstimatedCostUsd({
    modelId,
    inputTokens: PILOT_POLICY.maxInputTokens,
    outputTokens: PILOT_POLICY.maxOutputTokens,
    requireVerifiedPricing: false,
  });
}
