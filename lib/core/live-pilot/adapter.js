/**
 * Provider-neutral pilot adapter contract.
 * providerName=none → no network, no fabricated tokens/costs/responses.
 */

import { createHash, randomUUID } from "node:crypto";
import { isProviderConfigured, providerOperationalStatus } from "../config";
import { PROVIDER_ENV_NAMES, PILOT_POLICY } from "./constants";
import { isModelAllowlisted } from "./policy";

export function createEmptyProviderResult(overrides = {}) {
  return {
    providerName: "none",
    modelName: null,
    requestId: null,
    inputTokens: null,
    outputTokens: null,
    totalTokens: null,
    estimatedCostUsd: null,
    latencyMs: null,
    finishReason: null,
    rawProviderStatus: "not_configured",
    normalizedErrorCode: "PROVIDER_NOT_CONFIGURED",
    retryable: false,
    responseText: null,
    structuredOutput: null,
    providerEvidenceMetadata: {
      fabricated: false,
      simulated: false,
      networkCalled: false,
    },
    ...overrides,
  };
}

export function resolveConfiguredProviderName() {
  if (isProviderConfigured("anthropic")) return "anthropic";
  if (isProviderConfigured("openrouter")) return "openrouter";
  return "none";
}

export function getPilotProviderStatus() {
  const providerName = resolveConfiguredProviderName();
  const anthropic = providerOperationalStatus("anthropic");
  const openrouter = providerOperationalStatus("openrouter");
  return {
    providerName,
    configured: providerName !== "none",
    anthropicStatus: anthropic,
    openrouterStatus: openrouter,
    envVarNames: { ...PROVIDER_ENV_NAMES },
    paidFallbackEnabled: false,
    modelAllowlist: [...PILOT_POLICY.allowlistedModels],
  };
}

/**
 * Prepare a provider call. NEVER performs a network request in Phase II.1.
 * Returns blocked result when switches/provider/model are incomplete.
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

  if (!isModelAllowlisted(modelName)) {
    return {
      ok: false,
      status: 422,
      result: createEmptyProviderResult({
        providerName,
        modelName: modelName || null,
        normalizedErrorCode: "MODEL_NOT_ALLOWLISTED",
        rawProviderStatus: "model_blocked",
      }),
    };
  }

  // Phase II.1 foundation: eligibility can reach "prepared" but must not call.
  return {
    ok: false,
    status: 503,
    result: createEmptyProviderResult({
      providerName,
      modelName,
      requestId: `prep-${randomUUID()}`,
      normalizedErrorCode: "PROVIDER_CALL_NOT_ENABLED_IN_PHASE_II1",
      rawProviderStatus: "foundation_only_no_network",
      providerEvidenceMetadata: {
        fabricated: false,
        simulated: false,
        networkCalled: false,
        phase: "ii1_foundation",
      },
    }),
    prepared: true,
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
  modelName = "claude-haiku-4-5",
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
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      estimatedCostUsd,
      latencyMs: 12,
      finishReason: "stop",
      rawProviderStatus: "ok",
      normalizedErrorCode: null,
      retryable: false,
      responseText,
      structuredOutput,
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
