/**
 * Provider-neutral pilot adapter + OpenAI resolution (Phase II.2).
 * providerName=none → no network, no fabricated tokens/costs/responses.
 */

import { createHash, randomUUID } from "node:crypto";
import { isProviderConfigured, providerOperationalStatus } from "../config";
import { PROVIDER_ENV_NAMES, PILOT_POLICY } from "./constants";
import { isModelAllowlisted } from "./policy";
import {
  isOpenAIApiKeyConfigured,
  getConfiguredOpenAIModelId,
  resolveOpenAIPilotModel,
} from "./openai-adapter";
import { listOpenAIPilotModelIds, worstCasePreflightCost } from "./model-registry";

export function createEmptyProviderResult(overrides = {}) {
  return {
    providerName: "none",
    modelName: null,
    requestId: null,
    responseId: null,
    inputTokens: null,
    outputTokens: null,
    totalTokens: null,
    cachedInputTokens: null,
    reasoningTokens: null,
    estimatedCostUsd: null,
    pricingVersion: null,
    latencyMs: null,
    finishReason: null,
    rawProviderStatus: "not_configured",
    normalizedErrorCode: "PROVIDER_NOT_CONFIGURED",
    retryable: false,
    responseText: null,
    structuredOutput: null,
    providerHttpSuccess: false,
    providerEvidenceMetadata: {
      fabricated: false,
      simulated: false,
      networkCalled: false,
    },
    ...overrides,
  };
}

/** Pilot prefers OpenAI when key present; otherwise none (no silent fallback). */
export function resolveConfiguredProviderName() {
  if (isOpenAIApiKeyConfigured()) return "openai";
  return "none";
}

export function getPilotProviderStatus() {
  const providerName = resolveConfiguredProviderName();
  const modelResolution = resolveOpenAIPilotModel();
  const preflight = modelResolution.ok
    ? worstCasePreflightCost(modelResolution.modelId)
    : { ok: false, estimatedCostUsd: null, pricingVersion: null };
  return {
    providerName,
    configured: providerName === "openai",
    providerConfigured: providerName === "openai",
    openaiStatus: providerOperationalStatus("openai"),
    anthropicStatus: providerOperationalStatus("anthropic"),
    openrouterStatus: providerOperationalStatus("openrouter"),
    envVarNames: { ...PROVIDER_ENV_NAMES, model: "LIVE_AGENT_OPENAI_MODEL" },
    paidFallbackEnabled: false,
    modelAllowlist: [...PILOT_POLICY.allowlistedModels],
    selectedModel: getConfiguredOpenAIModelId(),
    modelAllowlisted: modelResolution.ok,
    modelStatus: modelResolution.ok
      ? "allowlisted"
      : getConfiguredOpenAIModelId()
        ? "not_allowlisted"
        : "none_selected",
    pricingVersion: modelResolution.entry?.pricingVersion || null,
    worstCaseCostUsd: preflight.ok ? preflight.estimatedCostUsd : null,
    registryModels: listOpenAIPilotModelIds(),
  };
}

/**
 * Prepare a provider call without invoking the network.
 * Phase II.2: returns prepared:true when OpenAI gates pass (still no network).
 */
export function preparePilotProviderCall({
  modelName = null,
  globalEnabled = false,
  pilotEnabled = false,
  killSwitchActive = false,
} = {}) {
  if (killSwitchActive) {
    return {
      ok: false,
      status: 423,
      result: createEmptyProviderResult({
        normalizedErrorCode: "KILL_SWITCH_ACTIVE",
        rawProviderStatus: "kill_switch",
      }),
    };
  }
  if (!globalEnabled || !pilotEnabled) {
    return {
      ok: false,
      status: 503,
      result: createEmptyProviderResult({
        normalizedErrorCode: "LIVE_SWITCHES_DISABLED",
        rawProviderStatus: "switches_off",
      }),
    };
  }

  const providerName = resolveConfiguredProviderName();
  if (providerName === "none") {
    return {
      ok: false,
      status: 503,
      result: createEmptyProviderResult(),
    };
  }

  const model = modelName || getConfiguredOpenAIModelId();
  if (!isModelAllowlisted(model)) {
    return {
      ok: false,
      status: 422,
      result: createEmptyProviderResult({
        providerName,
        modelName: model || null,
        normalizedErrorCode: "MODEL_NOT_ALLOWLISTED",
        rawProviderStatus: "model_blocked",
      }),
    };
  }

  const preflight = worstCasePreflightCost(model);
  if (!preflight.ok || preflight.estimatedCostUsd > PILOT_POLICY.maxEstimatedCostUsd) {
    return {
      ok: false,
      status: 422,
      result: createEmptyProviderResult({
        providerName,
        modelName: model,
        normalizedErrorCode: "COST_PREFLIGHT_FAILED",
        rawProviderStatus: "budget_blocked",
        estimatedCostUsd: preflight.estimatedCostUsd,
      }),
    };
  }

  return {
    ok: true,
    status: 200,
    prepared: true,
    result: createEmptyProviderResult({
      providerName: "openai",
      modelName: model,
      requestId: `prep-${randomUUID()}`,
      estimatedCostUsd: preflight.estimatedCostUsd,
      pricingVersion: preflight.pricingVersion,
      normalizedErrorCode: null,
      rawProviderStatus: "prepared_no_network",
      providerEvidenceMetadata: {
        fabricated: false,
        simulated: false,
        networkCalled: false,
        phase: "ii2_prepared",
        store: false,
      },
    }),
  };
}

/** Mock adapter for tests only — never used for Production live claims. */
export function createMockPilotProvider({
  responseText = "",
  structuredOutput = null,
  fail = false,
  inputTokens = 10,
  outputTokens = 20,
  estimatedCostUsd = 0.001,
  modelName = "gpt-5.4-mini",
  providerName = "mock",
} = {}) {
  return async function mockInvoke() {
    if (fail) {
      return createEmptyProviderResult({
        providerName,
        modelName,
        normalizedErrorCode: "MOCK_FAILURE",
        rawProviderStatus: "error",
        retryable: false,
        providerEvidenceMetadata: {
          fabricated: false,
          simulated: true,
          networkCalled: false,
        },
      });
    }
    return {
      providerName,
      modelName,
      requestId: `mock-${randomUUID()}`,
      responseId: `mock-${randomUUID()}`,
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      estimatedCostUsd,
      latencyMs: 12,
      finishReason: "completed",
      rawProviderStatus: "ok",
      normalizedErrorCode: null,
      retryable: false,
      responseText,
      structuredOutput,
      providerHttpSuccess: true,
      providerEvidenceMetadata: {
        fabricated: false,
        simulated: true,
        networkCalled: false,
        mock: true,
      },
    };
  };
}

export function hashPromptContent(text) {
  return createHash("sha256").update(String(text || ""), "utf8").digest("hex");
}

// Re-export for callers that only import adapter.
export { isProviderConfigured };
