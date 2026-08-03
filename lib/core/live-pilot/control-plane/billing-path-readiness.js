/**
 * Billing-path readiness contract for the one-agent OpenAI pilot.
 * Readiness only — does not call OpenAI, does not assume standard billing
 * until Founder-verified for the configured account path.
 */

import {
  OFFICIAL_STANDARD_WORST_CASE_MICRO_USD,
  OPENAI_PILOT_MODEL_ID,
  OPENAI_PILOT_MODEL_SNAPSHOT,
} from "../model-registry";

export const PILOT_TOKEN_CAPS = Object.freeze({
  maximumInputTokens: 4000,
  maximumOutputTokens: 1200,
  maximumTotalTokens: 5200,
});

export const PILOT_COST_BOUNDS = Object.freeze({
  standardUncachedEstimateMicroUsd: OFFICIAL_STANDARD_WORST_CASE_MICRO_USD, // 8400
  maximumFounderCeilingMicroUsd: 100_000,
});

export const PILOT_TOOLS_CONTRACT = Object.freeze({
  tools: Object.freeze([]),
});

/**
 * Current Production-facing billing readiness (no network).
 * @returns {object}
 */
export function getBillingPathReadinessStatus() {
  return {
    officialPricingStatus: "verified",
    billingModeStatus: "unknown",
    pricingReadyForProviderCall: false,
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    ...PILOT_TOKEN_CAPS,
    ...PILOT_COST_BOUNDS,
    tools: [...PILOT_TOOLS_CONTRACT.tools],
    note: "Do not assume standard billing until the configured account path is verified.",
    calledOpenAI: false,
    generationAuthorized: false,
  };
}

/**
 * Fixture helper for tests only.
 * @param {"unknown"|"standard"|"enterprise_unknown"} mode
 */
export function billingPathFixture(mode = "unknown") {
  const base = getBillingPathReadinessStatus();
  if (mode === "standard") {
    return {
      ...base,
      billingModeStatus: "standard",
      pricingReadyForProviderCall: true,
      note: "Test fixture only — not Production truth",
    };
  }
  if (mode === "enterprise_unknown") {
    return {
      ...base,
      billingModeStatus: "unknown",
      pricingReadyForProviderCall: false,
      note: "Enterprise/custom path not verified",
    };
  }
  return base;
}

export function assertPricingCeiling(estimateMicroUsd, ceilingMicroUsd = PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd) {
  const estimate = Number(estimateMicroUsd);
  const ceiling = Number(ceilingMicroUsd);
  if (!Number.isFinite(estimate) || estimate < 0) {
    return { ok: false, code: "INVALID_ESTIMATE" };
  }
  if (estimate > ceiling) {
    return { ok: false, code: "CEILING_EXCEEDED", estimateMicroUsd: estimate, ceilingMicroUsd: ceiling };
  }
  return { ok: true, estimateMicroUsd: estimate, ceilingMicroUsd: ceiling };
}
