/**
 * Billing-path readiness contract for the one-agent OpenAI pilot.
 * Readiness only — does not call OpenAI, does not assume credits or standard
 * billing until Founder-verified for the configured account path.
 *
 * Key presence ≠ credit availability. Never infer funding from apiKeyConfigured.
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
 * Machine-verifiable billing *credit* readiness states.
 * Orthogonal to billingModeStatus (standard/priority/…).
 * Do not hard-code a Founder-observed OpenAI UI balance into Production logic.
 */
export const BILLING_CREDIT_STATUS = Object.freeze({
  NOT_CHECKED: "not_checked",
  AVAILABLE: "available",
  INSUFFICIENT: "insufficient",
  UNAVAILABLE: "unavailable",
  UNKNOWN: "unknown",
  FAILED: "failed",
});

export const BILLING_CREDIT_STATUSES = Object.freeze(
  Object.values(BILLING_CREDIT_STATUS)
);

/** Test-only / Founder-fixture override — never set from live OpenAI calls here. */
let billingCreditStatusOverride = null;

export function resetBillingCreditStatusOverride() {
  billingCreditStatusOverride = null;
}

/**
 * @param {keyof typeof BILLING_CREDIT_STATUS | string | null} status
 */
export function setBillingCreditStatusOverride(status) {
  if (status == null) {
    billingCreditStatusOverride = null;
    return;
  }
  const normalized = String(status).trim().toLowerCase();
  if (!BILLING_CREDIT_STATUSES.includes(normalized)) {
    throw new Error(`INVALID_BILLING_CREDIT_STATUS:${normalized}`);
  }
  billingCreditStatusOverride = normalized;
}

export function isBillingCreditReadyForProviderCall(status) {
  return status === BILLING_CREDIT_STATUS.AVAILABLE;
}

/**
 * Current Production-facing billing readiness (no network).
 * @returns {object}
 */
export function getBillingPathReadinessStatus() {
  const billingCreditStatus =
    billingCreditStatusOverride || BILLING_CREDIT_STATUS.NOT_CHECKED;
  return {
    officialPricingStatus: "verified",
    billingModeStatus: "unknown",
    billingCreditStatus,
    pricingReadyForProviderCall: false,
    creditReadyForProviderCall: isBillingCreditReadyForProviderCall(
      billingCreditStatus
    ),
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    ...PILOT_TOKEN_CAPS,
    ...PILOT_COST_BOUNDS,
    tools: [...PILOT_TOOLS_CONTRACT.tools],
    note: "Do not assume credits or standard billing until the configured account path is verified. Key presence does not imply funding.",
    calledOpenAI: false,
    generationAuthorized: false,
  };
}

/**
 * Fixture helper for tests only.
 * @param {"unknown"|"standard"|"enterprise_unknown"} mode
 * @param {{ billingCreditStatus?: string }} [opts]
 */
export function billingPathFixture(mode = "unknown", opts = {}) {
  const base = getBillingPathReadinessStatus();
  const credit =
    opts.billingCreditStatus != null
      ? String(opts.billingCreditStatus)
      : base.billingCreditStatus;
  const withCredit = {
    ...base,
    billingCreditStatus: credit,
    creditReadyForProviderCall: isBillingCreditReadyForProviderCall(credit),
  };
  if (mode === "standard") {
    return {
      ...withCredit,
      billingModeStatus: "standard",
      pricingReadyForProviderCall: true,
      note: "Test fixture only — not Production truth",
    };
  }
  if (mode === "enterprise_unknown") {
    return {
      ...withCredit,
      billingModeStatus: "unknown",
      pricingReadyForProviderCall: false,
      note: "Enterprise/custom path not verified",
    };
  }
  return withCredit;
}

/**
 * @param {"not_checked"|"available"|"insufficient"|"unavailable"|"unknown"|"failed"} creditStatus
 */
export function billingCreditFixture(creditStatus) {
  const normalized = String(creditStatus || "").trim().toLowerCase();
  if (!BILLING_CREDIT_STATUSES.includes(normalized)) {
    throw new Error(`INVALID_BILLING_CREDIT_STATUS:${normalized}`);
  }
  return billingPathFixture("unknown", { billingCreditStatus: normalized });
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
