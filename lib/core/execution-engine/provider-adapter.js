// Provider-independent execution adapter status + runner interface.

import { providerOperationalStatus, isProviderConfigured } from "../config";
import { getCircuitBreakerStatus } from "../circuit";
import { ERROR_CODES } from "../errors";

/**
 * Truthful provider adapter snapshot for health/admin.
 */
export function getExecutionProviderStatus() {
  const operational = providerOperationalStatus("anthropic");
  const circuit = getCircuitBreakerStatus();
  const configured = isProviderConfigured("anthropic");
  let availability = "unavailable";
  if (configured && circuit?.state === "open") availability = "circuit_open";
  else if (configured && operational === "configured") availability = "available";
  else if (configured && operational === "degraded") availability = "available";
  else if (!configured) availability = "unavailable";

  return {
    configured: configured ? "configured" : "unconfigured",
    available: availability === "available" ? "available" : "unavailable",
    status: operational,
    circuit: circuit?.state || "closed",
    detail: availability,
  };
}

/**
 * Default adapter — never invents success without a providerImpl.
 */
export async function defaultProviderAdapter({ agentSlug, input }) {
  const status = getExecutionProviderStatus();
  if (status.configured === "unconfigured" || status.available === "unavailable") {
    const err = new Error("AI provider is not configured.");
    err.code = ERROR_CODES.PROVIDER_UNAVAILABLE || "PROVIDER_UNAVAILABLE";
    err.transient = false;
    throw err;
  }
  if (status.detail === "circuit_open") {
    const err = new Error("Provider circuit is open.");
    err.code = "PROVIDER_CIRCUIT_OPEN";
    err.transient = true;
    throw err;
  }
  // Real provider path not invoked here — Phase D foundation keeps optional.
  const err = new Error("Live provider invocation is not enabled in Phase D foundation.");
  err.code = ERROR_CODES.PROVIDER_UNAVAILABLE || "PROVIDER_UNAVAILABLE";
  err.transient = false;
  throw err;
}

/** Deterministic fake provider for tests only. */
export function createExecutionFakeProvider(handlers = {}) {
  return async function fakeProvider({ agentSlug, input, item }) {
    if (typeof handlers[agentSlug] === "function") {
      return handlers[agentSlug]({ agentSlug, input, item });
    }
    if (typeof handlers.default === "function") {
      return handlers.default({ agentSlug, input, item });
    }
    return {
      status: "succeeded",
      output: {
        summary: `Deterministic result for ${agentSlug}`,
        findings: ["ok"],
        evidence: [{ type: "fixture", ref: item?.id }],
      },
      usage: { input_tokens: 1, output_tokens: 1 },
    };
  };
}
