/**
 * Bridge durable queue jobs (worker.js) → invokeRealAgent.
 * OpenRouter jobs never succeed without a real invoke path; provider absence fails closed.
 */

import { ApiError, ERROR_CODES } from "../errors";
import { invokeRealAgent } from "./invoke";

/**
 * Map invokeRealAgent result into the shape processJob expects from runAgentPrompt.
 */
export function toWorkerProviderResult(invokeResult) {
  if (!invokeResult?.ok) {
    const err = new ApiError(
      invokeResult?.status === "provider_unavailable" ? 503 : 502,
      invokeResult?.status === "provider_unavailable"
        ? ERROR_CODES.PROVIDER_UNAVAILABLE
        : "REAL_AGENT_INVOCATION_FAILED",
      invokeResult?.reason ||
        invokeResult?.error ||
        `Real agent invocation failed (${invokeResult?.status || "unknown"}).`
    );
    err.transient = invokeResult?.status === "provider_unavailable";
    err.invokeResult = invokeResult;
    throw err;
  }
  return {
    output: invokeResult.output,
    usage: invokeResult.usage || null,
    estimatedCost: 0,
    latencyMs: invokeResult.latencyMs ?? null,
    provider: invokeResult.provider || "openrouter",
    model: invokeResult.modelUsed || null,
    meta: {
      correlationId: invokeResult.correlationId,
      traceId: invokeResult.traceId,
      instanceId: invokeResult.instanceId,
      qa: invokeResult.qa?.result || null,
      documentsUsed: invokeResult.documentsUsed || [],
      toolRounds: invokeResult.toolCalls?.rounds || 0,
    },
  };
}

/**
 * Provider adapter for openrouter jobs — uses live OpenRouter when configured.
 * Pass executionMode: "test_double" only from tests / harness (never CI network).
 */
export function createRealAgentProviderAdapter({
  executionMode = "provider",
  projectId,
  organizationId = null,
  taskId = null,
  workflowId = null,
  objectiveId = null,
  objectiveTitle = null,
  reviewerSlug = "qa-review",
  providerImpl = null,
} = {}) {
  return async function realAgentProviderAdapter({ slug, model, input }) {
    const result = await invokeRealAgent({
      organizationId,
      projectId,
      objectiveId,
      workflowId,
      taskId,
      agentDefinitionId: slug,
      executionMode,
      input: input || {},
      objectiveTitle: objectiveTitle || input?.objective || input?.question || null,
      acceptanceCriteria: input?.acceptance_criteria || null,
      reviewerSlug,
      providerImpl,
      allowTools: true,
    });
    const mapped = toWorkerProviderResult(result);
    if (model && !mapped.model) mapped.model = model;
    return mapped;
  };
}

/**
 * Resolve which provider function to run for a claimed job.
 * - Injected providerImpl always wins (tests / admin tick overrides).
 * - openrouter → invokeRealAgent (provider mode).
 * - anthropic / other → legacy runAgentPrompt fallback supplied by caller.
 */
export function resolveJobProviderImpl(job, { providerImpl, legacyProvider } = {}) {
  if (typeof providerImpl === "function") return providerImpl;
  if (job?.provider === "openrouter") {
    return createRealAgentProviderAdapter({
      executionMode: "provider",
      projectId: job.project_id,
      organizationId: job.organization_id || null,
      taskId: job.task_id || null,
      workflowId: job.workflow || null,
      objectiveId: job.input?.objective_id || null,
      objectiveTitle: job.input?.objective || job.input?.question || null,
    });
  }
  return legacyProvider;
}
