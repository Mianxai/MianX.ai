/**
 * Official OpenAI SDK Responses API adapter (server-only).
 * Injectable client for tests — zero network in Vitest.
 */

import OpenAI from "openai";
import { createHash, randomUUID } from "node:crypto";
import { PILOT_POLICY, PROVIDER_ENV_NAMES } from "./constants";
import { PILOT_OUTPUT_JSON_SCHEMA, validatePilotStructuredOutput } from "./schema";
import {
  OPENAI_PILOT_MODEL_ID,
  calculateEstimatedCostUsd,
  getModelRegistryEntry,
  isModelAvailabilityVerifiedForProviderCall,
  isPricingVerifiedForProviderCall,
} from "./model-registry";
import { createEmptyProviderResult } from "./adapter";
import { categorizeProviderError } from "./control-plane/provider-error-categories";

export const OPENAI_SDK_VERSION = "5.23.2";

export function isOpenAIApiKeyConfigured() {
  return Boolean(String(process.env.OPENAI_API_KEY || "").trim());
}

export function getConfiguredOpenAIModelId() {
  const raw = String(process.env.LIVE_AGENT_OPENAI_MODEL || "").trim();
  return raw || null;
}

export function resolveOpenAIPilotModel() {
  const modelId = getConfiguredOpenAIModelId();
  if (!modelId) {
    return { ok: false, code: "MODEL_MISSING", modelId: null, entry: null };
  }
  const reg = getModelRegistryEntry(modelId);
  if (!reg.ok) {
    return { ok: false, code: reg.code, modelId, entry: null };
  }
  return { ok: true, code: null, modelId, entry: reg.entry };
}

/** Construct client only when key present. Never log the key. */
export function createOpenAIClient({ apiKey } = {}) {
  const key = apiKey ?? String(process.env.OPENAI_API_KEY || "").trim();
  if (!key) return null;
  const opts = { apiKey: key };
  const org = String(process.env.OPENAI_ORGANIZATION || "").trim();
  const project = String(process.env.OPENAI_PROJECT || "").trim();
  if (org) opts.organization = org;
  if (project) opts.project = project;
  return new OpenAI(opts);
}

export function buildOpenAIResponsesRequest({
  modelId,
  systemPrompt,
  userPrompt,
} = {}) {
  const model = modelId || OPENAI_PILOT_MODEL_ID;
  return {
    model,
    store: false,
    stream: false,
    background: false,
    max_output_tokens: PILOT_POLICY.maxOutputTokens,
    tools: [],
    // No previous_response_id — one-shot only
    input: [
      { role: "system", content: String(systemPrompt || "") },
      { role: "user", content: String(userPrompt || "") },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "mianx_architecture_review",
        strict: true,
        schema: PILOT_OUTPUT_JSON_SCHEMA,
      },
    },
  };
}

export function assertSafeOpenAIRequest(request) {
  const errors = [];
  if (request.store !== false) errors.push("store_must_be_false");
  if (request.stream === true) errors.push("stream_forbidden");
  if (request.background === true) errors.push("background_forbidden");
  if (request.previous_response_id) errors.push("continuation_forbidden");
  if (Array.isArray(request.tools) && request.tools.length > 0) {
    errors.push("tools_forbidden");
  }
  if (
    request.max_output_tokens == null ||
    request.max_output_tokens > PILOT_POLICY.maxOutputTokens
  ) {
    errors.push("max_output_tokens_invalid");
  }
  return { ok: errors.length === 0, errors };
}

function extractOutputText(response) {
  if (!response) return "";
  if (typeof response.output_text === "string") return response.output_text;
  const parts = [];
  for (const item of response.output || []) {
    if (item?.type === "message") {
      for (const c of item.content || []) {
        if (c?.type === "output_text" && typeof c.text === "string") {
          parts.push(c.text);
        }
      }
    }
  }
  return parts.join("");
}

export function normalizeOpenAIResponse(response, { modelId, latencyMs } = {}) {
  if (!response) {
    return createEmptyProviderResult({
      providerName: "openai",
      modelName: modelId || null,
      normalizedErrorCode: "EMPTY_PROVIDER_RESPONSE",
      rawProviderStatus: "empty",
    });
  }

  const usage = response.usage || {};
  const inputTokens =
    usage.input_tokens ?? usage.prompt_tokens ?? null;
  const outputTokens =
    usage.output_tokens ?? usage.completion_tokens ?? null;
  const cachedInputTokens =
    usage.input_tokens_details?.cached_tokens ??
    usage.prompt_tokens_details?.cached_tokens ??
    null;
  const reasoningTokens =
    usage.output_tokens_details?.reasoning_tokens ?? null;

  let totalTokens = usage.total_tokens ?? null;
  if (
    totalTokens == null &&
    Number.isFinite(inputTokens) &&
    Number.isFinite(outputTokens)
  ) {
    totalTokens = inputTokens + outputTokens;
  }

  const responseText = extractOutputText(response);
  const parsed = validatePilotStructuredOutput(
    (() => {
      try {
        const start = responseText.indexOf("{");
        const end = responseText.lastIndexOf("}");
        if (start < 0 || end <= start) return null;
        return JSON.parse(responseText.slice(start, end + 1));
      } catch {
        return null;
      }
    })()
  );

  let cost = { ok: false, estimatedCostUsd: null, pricingVersion: null };
  if (Number.isFinite(inputTokens) && Number.isFinite(outputTokens)) {
    cost = calculateEstimatedCostUsd({
      modelId: modelId || response.model,
      inputTokens,
      outputTokens,
    });
  }

  const httpOk =
    response.status === "completed" ||
    response.status === "incomplete" ||
    Boolean(response.id);

  return {
    providerName: "openai",
    modelName: modelId || response.model || null,
    requestId: response.id || null,
    responseId: response.id || null,
    inputTokens: Number.isFinite(inputTokens) ? inputTokens : null,
    outputTokens: Number.isFinite(outputTokens) ? outputTokens : null,
    totalTokens: Number.isFinite(totalTokens) ? totalTokens : null,
    cachedInputTokens: Number.isFinite(cachedInputTokens) ? cachedInputTokens : null,
    reasoningTokens: Number.isFinite(reasoningTokens) ? reasoningTokens : null,
    estimatedCostUsd: cost.ok ? cost.estimatedCostUsd : null,
    pricingVersion: cost.pricingVersion || null,
    latencyMs: latencyMs ?? null,
    finishReason: response.status || response.incomplete_details?.reason || null,
    rawProviderStatus: response.status || "ok",
    normalizedErrorCode: parsed.ok
      ? cost.ok
        ? null
        : "COST_CALCULATION_FAILED"
      : "STRUCTURED_OUTPUT_INVALID",
    retryable: false,
    responseText,
    structuredOutput: parsed.ok ? parsed.value : null,
    structuredOutputErrors: parsed.ok ? [] : parsed.errors,
    providerHttpSuccess: Boolean(httpOk),
    providerEvidenceMetadata: {
      fabricated: false,
      simulated: false,
      networkCalled: true,
      store: false,
      stream: false,
      tools: [],
      pricingVersion: cost.pricingVersion || null,
    },
  };
}

export function normalizeOpenAIError(err, { modelId } = {}) {
  const status = err?.status || err?.statusCode || err?.response?.status || null;
  const categorized = categorizeProviderError(err);

  return createEmptyProviderResult({
    providerName: "openai",
    modelName: modelId || null,
    rawProviderStatus: status ? `http_${status}` : "error",
    normalizedErrorCode: categorized.normalizedErrorCode,
    retryable: false, // first pilot: never auto-retry (incl. billing / rate-limit)
    failureCategory: categorized.category,
    operatorBlocker: categorized.operatorBlocker,
    billingRelatedFailure: categorized.billingRelated,
    providerEvidenceMetadata: {
      fabricated: false,
      simulated: false,
      networkCalled: true,
      httpStatus: status,
      // Never attach raw provider body / headers (may contain sensitive metadata).
      rawBodyIncluded: false,
      failureCategory: categorized.category,
    },
  });
}

/**
 * Invoke Responses API once with AbortController timeout.
 * Pass `client` in tests (mock). Never logs secrets.
 */
export async function invokeOpenAIResponses({
  client = null,
  systemPrompt,
  userPrompt,
  modelId,
  timeoutMs = PILOT_POLICY.maxProviderTimeoutMs,
  allowNetwork = false,
} = {}) {
  const resolved = resolveOpenAIPilotModel();
  const model = modelId || resolved.modelId;
  if (!resolved.ok && !modelId) {
    return {
      ok: false,
      result: createEmptyProviderResult({
        normalizedErrorCode: resolved.code || "MODEL_NOT_ALLOWLISTED",
        rawProviderStatus: "model_blocked",
      }),
    };
  }
  const reg = getModelRegistryEntry(model);
  if (!reg.ok) {
    return {
      ok: false,
      result: createEmptyProviderResult({
        providerName: "openai",
        modelName: model,
        normalizedErrorCode: reg.code,
        rawProviderStatus: "model_blocked",
      }),
    };
  }

  if (!allowNetwork) {
    return {
      ok: false,
      result: createEmptyProviderResult({
        providerName: "openai",
        modelName: model,
        normalizedErrorCode: "NETWORK_NOT_ALLOWED",
        rawProviderStatus: "blocked",
        providerEvidenceMetadata: {
          fabricated: false,
          simulated: false,
          networkCalled: false,
        },
      }),
    };
  }

  // Fail closed before any generation when model/pricing are not Founder-verified.
  // Injected test clients still require verification overrides (never silent unverified cost).
  if (!isModelAvailabilityVerifiedForProviderCall(model)) {
    return {
      ok: false,
      result: createEmptyProviderResult({
        providerName: "openai",
        modelName: model,
        normalizedErrorCode: "MODEL_NOT_VERIFIED",
        rawProviderStatus: "verification_blocked",
        providerEvidenceMetadata: {
          fabricated: false,
          simulated: false,
          networkCalled: false,
        },
      }),
    };
  }
  if (!isPricingVerifiedForProviderCall(model)) {
    return {
      ok: false,
      result: createEmptyProviderResult({
        providerName: "openai",
        modelName: model,
        normalizedErrorCode: "PRICING_NOT_VERIFIED",
        rawProviderStatus: "verification_blocked",
        providerEvidenceMetadata: {
          fabricated: false,
          simulated: false,
          networkCalled: false,
        },
      }),
    };
  }

  if (!isOpenAIApiKeyConfigured() && !client) {
    return {
      ok: false,
      result: createEmptyProviderResult({
        normalizedErrorCode: "PROVIDER_NOT_CONFIGURED",
      }),
    };
  }

  const request = buildOpenAIResponsesRequest({
    modelId: model,
    systemPrompt,
    userPrompt,
  });
  const safety = assertSafeOpenAIRequest(request);
  if (!safety.ok) {
    return {
      ok: false,
      result: createEmptyProviderResult({
        providerName: "openai",
        modelName: model,
        normalizedErrorCode: "UNSAFE_REQUEST",
        rawProviderStatus: safety.errors.join(","),
      }),
    };
  }

  const openai = client || createOpenAIClient();
  if (!openai) {
    return {
      ok: false,
      result: createEmptyProviderResult({
        normalizedErrorCode: "PROVIDER_NOT_CONFIGURED",
      }),
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const response = await openai.responses.create(request, {
      signal: controller.signal,
    });
    const normalized = normalizeOpenAIResponse(response, {
      modelId: model,
      latencyMs: Date.now() - started,
    });
    const ok =
      Boolean(normalized.providerHttpSuccess) &&
      Boolean(normalized.structuredOutput) &&
      normalized.estimatedCostUsd != null &&
      !normalized.normalizedErrorCode;
    return { ok, result: normalized };
  } catch (err) {
    return {
      ok: false,
      result: {
        ...normalizeOpenAIError(err, { modelId: model }),
        latencyMs: Date.now() - started,
      },
    };
  } finally {
    clearTimeout(timer);
  }
}

/** Test double — never contacts api.openai.com */
export function createMockOpenAIClient({
  response = null,
  error = null,
  delayMs = 0,
} = {}) {
  return {
    responses: {
      create: async (_req, _opts) => {
        if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
        if (error) throw error;
        return (
          response || {
            id: `resp_mock_${randomUUID()}`,
            status: "completed",
            model: OPENAI_PILOT_MODEL_ID,
            output_text: "{}",
            usage: { input_tokens: 10, output_tokens: 20, total_tokens: 30 },
          }
        );
      },
    },
  };
}

export function hashSafePrompt(text) {
  return createHash("sha256").update(String(text || ""), "utf8").digest("hex");
}

export function openaiEnvVarNames() {
  return {
    apiKey: PROVIDER_ENV_NAMES.openai,
    model: "LIVE_AGENT_OPENAI_MODEL",
    project: "OPENAI_PROJECT",
    organization: "OPENAI_ORGANIZATION",
  };
}
