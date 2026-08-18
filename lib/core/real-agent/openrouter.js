/**
 * OpenRouter provider adapter — free-route only, fail closed.
 * Never silently falls back to paid models.
 * CI/Preview must use test doubles; this module never auto-calls without key.
 */

import { isProviderConfigured } from "../config";
import { ApiError, ERROR_CODES, notConfigured } from "../errors";
import {
  assertCircuitClosed,
  recordCircuitSuccess,
  recordCircuitFailure,
} from "../circuit";

export const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
export const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";
export const OPENROUTER_DEFAULT_ROUTE = "openrouter/free";

export function openRouterConfig() {
  const key = process.env.OPENROUTER_API_KEY?.trim() || "";
  const paidFallback =
    String(process.env.OPENROUTER_PAID_FALLBACK_ENABLED || "false").toLowerCase() ===
    "true";
  return {
    apiKeyConfigured: Boolean(key),
    // Never return the key
    defaultModel: process.env.OPENROUTER_DEFAULT_MODEL?.trim() || OPENROUTER_DEFAULT_ROUTE,
    paidFallbackEnabled: false, // hard-disabled for Phase I.1 regardless of env truth claim
    envPaidFallbackFlag: paidFallback,
    siteUrl: process.env.OPENROUTER_SITE_URL?.trim() || "",
    appName: process.env.OPENROUTER_APP_NAME?.trim() || "MianX.ai",
  };
}

export function isOpenRouterConfigured() {
  return isProviderConfigured("openrouter");
}

function classifyProviderError(status, bodyText = "") {
  if (status === 401 || status === 403) return "auth";
  if (status === 402) return "payment_required";
  if (status === 429) return "rate_limit";
  if (status >= 500) return "transient";
  if (status >= 400) return "permanent";
  if (/timeout|abort/i.test(bodyText)) return "timeout";
  return "unknown";
}

function isLikelyPaid(modelId = "") {
  const id = String(modelId).toLowerCase();
  if (id.includes("openrouter/free") || id.endsWith(":free") || id.includes("/free")) {
    return false;
  }
  // Treat unknown routes as paid unless explicitly free-tagged
  return !id.includes("free");
}

/**
 * Discover models from OpenRouter (injectable fetch). Never logs secrets.
 */
export async function discoverOpenRouterModels({
  fetchImpl = fetch,
  requireTools = false,
  requireStructured = false,
} = {}) {
  if (!isOpenRouterConfigured()) {
    throw notConfigured("OpenRouter API key is not configured.", ERROR_CODES.NOT_CONFIGURED);
  }
  const cfg = openRouterConfig();
  const key = process.env.OPENROUTER_API_KEY;
  const res = await fetchImpl(OPENROUTER_MODELS_URL, {
    headers: {
      Authorization: `Bearer ${key}`,
      "HTTP-Referer": cfg.siteUrl || "https://mianx.ai",
      "X-Title": cfg.appName,
    },
  });
  if (!res.ok) {
    const kind = classifyProviderError(res.status);
    throw new ApiError(
      502,
      ERROR_CODES.PROVIDER_ERROR,
      `OpenRouter models discovery failed (${kind}).`
    );
  }
  const json = await res.json();
  const models = Array.isArray(json?.data) ? json.data : [];
  return models
    .map((m) => {
      const id = m.id || m.name;
      const pricing = m.pricing || {};
      const free =
        !isLikelyPaid(id) ||
        (Number(pricing.prompt || 1) === 0 && Number(pricing.completion || 1) === 0);
      const supportsTools = Boolean(
        m.architecture?.modality?.includes?.("text") ||
          m.supported_parameters?.includes?.("tools") ||
          m.supported_parameters?.includes?.("tool_choice")
      );
      const supportsStructured = Boolean(
        m.supported_parameters?.includes?.("response_format") ||
          m.supported_parameters?.includes?.("structured_outputs")
      );
      return {
        id,
        free,
        supportsTools,
        supportsStructured,
        raw: { id, free },
      };
    })
    .filter((m) => m.free)
    .filter((m) => (requireTools ? m.supportsTools : true))
    .filter((m) => (requireStructured ? m.supportsStructured : true));
}

/**
 * Select a free route that satisfies capability needs. Fail closed — never paid.
 */
export async function selectFreeOpenRouterModel({
  preferred = null,
  requireTools = false,
  requireStructured = false,
  fetchImpl = fetch,
  modelsCache = null,
} = {}) {
  const cfg = openRouterConfig();
  if (cfg.envPaidFallbackFlag) {
    // Soft warn via return metadata only — never enable
  }
  const preferredModel = preferred || cfg.defaultModel;
  if (isLikelyPaid(preferredModel) && preferredModel !== OPENROUTER_DEFAULT_ROUTE) {
    return {
      ok: false,
      status: "provider_unavailable",
      reason: "requested_model_not_free",
      model: null,
    };
  }

  let freeModels = modelsCache;
  if (!freeModels) {
    try {
      freeModels = await discoverOpenRouterModels({
        fetchImpl,
        requireTools,
        requireStructured,
      });
    } catch (err) {
      // If discovery fails but preferred is free route, allow attempt
      if (!isLikelyPaid(preferredModel)) {
        return { ok: true, model: preferredModel, discoveryFailed: true };
      }
      return {
        ok: false,
        status: "provider_unavailable",
        reason: err?.message || "discovery_failed",
        model: null,
      };
    }
  }

  if (preferredModel === OPENROUTER_DEFAULT_ROUTE || preferredModel.endsWith(":free")) {
    return { ok: true, model: preferredModel, discoveryCount: freeModels.length };
  }

  const hit = freeModels.find((m) => m.id === preferredModel);
  if (hit) return { ok: true, model: hit.id, discoveryCount: freeModels.length };

  const fallback = freeModels[0];
  if (!fallback) {
    return {
      ok: false,
      status: "provider_unavailable",
      reason: "no_compatible_free_model",
      model: null,
      founderExplanation:
        "No suitable free OpenRouter model currently advertises the required capabilities. " +
        "Paid fallback is disabled. Configure a free route or retry later.",
    };
  }
  return { ok: true, model: fallback.id, discoveryCount: freeModels.length };
}

/**
 * Non-streaming chat completion via OpenRouter (OpenAI-compatible).
 */
export async function runOpenRouterChat({
  messages,
  tools = null,
  model = null,
  temperature = 0.2,
  maxTokens = 4096,
  timeoutMs = 45000,
  correlationId = null,
  requestId = null,
  fetchImpl = fetch,
  sleep = (ms) => new Promise((r) => setTimeout(r, ms)),
  maxAttempts = 3,
  requireTools = false,
  requireStructured = true,
} = {}) {
  if (!isOpenRouterConfigured()) {
    throw notConfigured(
      "OpenRouter is not configured. Set OPENROUTER_API_KEY for live calls.",
      ERROR_CODES.NOT_CONFIGURED
    );
  }
  assertCircuitClosed();

  const selection = await selectFreeOpenRouterModel({
    preferred: model,
    requireTools: Boolean(tools?.length) || requireTools,
    requireStructured,
    fetchImpl,
  });
  if (!selection.ok) {
    recordCircuitFailure();
    return {
      ok: false,
      status: "provider_unavailable",
      reason: selection.reason,
      founderExplanation: selection.founderExplanation || null,
      model: null,
      usage: null,
      latencyMs: 0,
      correlationId,
      requestId,
    };
  }

  const cfg = openRouterConfig();
  const key = process.env.OPENROUTER_API_KEY;
  const useModel = selection.model;
  let lastError = null;
  const started = Date.now();

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const body = {
        model: useModel,
        messages,
        temperature,
        max_tokens: maxTokens,
      };
      if (tools?.length) {
        body.tools = tools;
        body.tool_choice = "auto";
      }
      if (requireStructured && !tools?.length) {
        body.response_format = { type: "json_object" };
      }

      const res = await fetchImpl(OPENROUTER_CHAT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": cfg.siteUrl || "https://mianx.ai",
          "X-Title": cfg.appName,
          ...(correlationId ? { "X-Correlation-Id": correlationId } : {}),
          ...(requestId ? { "X-Request-Id": requestId } : {}),
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const latencyMs = Date.now() - started;
      const text = await res.text();
      if (!res.ok) {
        const kind = classifyProviderError(res.status, text);
        if (kind === "payment_required" || kind === "auth") {
          recordCircuitFailure();
          return {
            ok: false,
            status: "provider_unavailable",
            reason: kind,
            latencyMs,
            model: useModel,
            correlationId,
            requestId,
          };
        }
        if ((kind === "rate_limit" || kind === "transient") && attempt < maxAttempts) {
          await sleep(200 * 2 ** (attempt - 1) + Math.floor(Math.random() * 50));
          continue;
        }
        recordCircuitFailure();
        throw new ApiError(
          502,
          ERROR_CODES.PROVIDER_ERROR,
          `OpenRouter request failed (${kind}).`
        );
      }

      let json;
      try {
        json = JSON.parse(text);
      } catch {
        recordCircuitFailure();
        throw new ApiError(
          502,
          ERROR_CODES.PROVIDER_ERROR,
          "OpenRouter returned non-JSON."
        );
      }

      const choice = json.choices?.[0] || {};
      const message = choice.message || {};
      const selectedModel = json.model || useModel;
      if (isLikelyPaid(selectedModel) && !String(selectedModel).includes("free")) {
        recordCircuitFailure();
        return {
          ok: false,
          status: "provider_unavailable",
          reason: "provider_returned_paid_model",
          model: selectedModel,
          latencyMs,
          founderExplanation:
            "OpenRouter selected a non-free model. Paid fallback is disabled; run aborted.",
          correlationId,
          requestId,
        };
      }

      recordCircuitSuccess();
      return {
        ok: true,
        status: "succeeded",
        model: selectedModel,
        content: message.content || null,
        toolCalls: message.tool_calls || null,
        finishReason: choice.finish_reason || null,
        usage: {
          promptTokens: json.usage?.prompt_tokens ?? null,
          completionTokens: json.usage?.completion_tokens ?? null,
          totalTokens: json.usage?.total_tokens ?? null,
        },
        latencyMs,
        provider: "openrouter",
        correlationId,
        requestId,
        rawId: json.id || null,
      };
    } catch (err) {
      lastError = err;
      if (err?.name === "AbortError" && attempt < maxAttempts) {
        await sleep(200 * 2 ** (attempt - 1));
        continue;
      }
      if (attempt >= maxAttempts) {
        recordCircuitFailure();
        throw err;
      }
    } finally {
      clearTimeout(timer);
    }
  }

  recordCircuitFailure();
  throw lastError || new Error("OpenRouter exhausted retries");
}

export function openRouterHealthCheck() {
  const cfg = openRouterConfig();
  return {
    provider: "openrouter",
    configured: cfg.apiKeyConfigured,
    defaultModel: cfg.defaultModel,
    paidFallbackEnabled: false,
    envPaidFallbackFlagIgnored: cfg.envPaidFallbackFlag,
    siteUrlConfigured: Boolean(cfg.siteUrl),
    appName: cfg.appName,
  };
}
