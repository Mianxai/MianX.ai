/**
 * Versioned OpenAI model registry for the live pilot.
 * Fail closed for unknown models or missing pricing.
 */

import { PILOT_POLICY } from "./constants";

export const OPENAI_PILOT_MODEL_ID = "gpt-5.4-mini";

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
      "Founder-provided Phase II.2 implementation pricing metadata for gpt-5.4-mini",
    pricingVerifiedDate: "2026-08-01",
    pricingVersion: "openai-gpt-5.4-mini-2026-08-01",
    maximumEstimatedPilotCostUsd: PILOT_POLICY.maxEstimatedCostUsd,
  }),
});

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
} = {}) {
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
  };
}

/** Worst-case preflight using configured pilot token ceilings. */
export function worstCasePreflightCost(modelId = OPENAI_PILOT_MODEL_ID) {
  return calculateEstimatedCostUsd({
    modelId,
    inputTokens: PILOT_POLICY.maxInputTokens,
    outputTokens: PILOT_POLICY.maxOutputTokens,
  });
}
