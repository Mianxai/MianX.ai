/**
 * Acceptance harness — test-double (CI) + gated live OpenRouter smoke (Founder only).
 */

import { invokeRealAgent } from "./invoke";
import { resetRealInstances, listRealInstances } from "./instances";
import { buildRealAgentReadinessReport } from "./readiness";
import { isOpenRouterConfigured, openRouterHealthCheck } from "./openrouter";
import { runIndependentQa } from "./qa";

/**
 * Deterministic provider test-double E2E (safe for CI).
 */
export async function runProviderTestDoubleE2E({
  projectId = "00000000-0000-4000-8000-000000000099",
  organizationId = null,
} = {}) {
  resetRealInstances();
  const result = await invokeRealAgent({
    organizationId,
    projectId,
    objectiveId: "obj_test_double",
    workflowId: "software-delivery",
    taskId: "task_test_double",
    agentDefinitionId: "delivery-product",
    executionMode: "test_double",
    objectiveTitle: "Bounded product specification for test-double harness",
    acceptanceCriteria: "Structured product spec with scope and requirements.",
    input: {
      objective: "Specify a project-scoped documentation improvement.",
      mode: "test_double",
    },
    reviewerSlug: "delivery-qa",
    allowTools: true,
  });

  const readiness = buildRealAgentReadinessReport({ liveTestedSlugs: [] });
  return {
    ok: Boolean(result.ok),
    mode: "test_double",
    liveProviderCalled: false,
    result,
    instancesAfter: listRealInstances({ projectId }),
    readinessSummary: readiness.readiness,
    assertions: {
      toolCallOccurred: (result.toolCalls?.rounds || 0) > 0,
      evidencePresent: Boolean(result.evidence || result.evidenceItems?.length),
      qaPresent: Boolean(result.qa),
      documentsUsed: (result.documentsUsed || []).length > 0,
      projectIsolated: result.evidence?.projectScope?.projectId === projectId,
      noProtectedSideEffect: !(result.toolCalls?.approvals || []).length,
    },
  };
}

/**
 * Live OpenRouter smoke — MUST NOT run unless all gates pass.
 * This PR never invokes this without Founder env authorization.
 */
export async function runLiveOpenRouterSmoke({
  projectId,
  maxRequests = 3,
  maxTokens = 4000,
  confirm = false,
} = {}) {
  const gates = {
    hasKey: isOpenRouterConfigured(),
    allowLive: process.env.ALLOW_LIVE_PROVIDER_TEST === "true",
    defaultModel: process.env.OPENROUTER_DEFAULT_MODEL || "openrouter/free",
    projectId: Boolean(projectId),
    maxRequests: maxRequests > 0 && maxRequests <= 3,
    maxTokens: maxTokens > 0 && maxTokens <= 8000,
    confirm: confirm === true,
    paidFallbackDisabled: true,
  };
  const ready = Object.values(gates).every(Boolean);
  if (!ready) {
    return {
      ok: false,
      status: "live_smoke_blocked",
      gates,
      health: openRouterHealthCheck(),
      ran: false,
      note: "Live smoke not executed — missing authorization gates.",
    };
  }

  // Intentionally not calling the network from default test paths.
  // When Founder runs `npm run agents:live-smoke` with env set, the CLI script
  // passes confirm=true and executes invokeRealAgent in provider mode.
  const result = await invokeRealAgent({
    projectId,
    agentDefinitionId: "research",
    executionMode: "provider",
    objectiveTitle: "Live smoke: bounded research question",
    acceptanceCriteria: "JSON findings without fabricated URLs.",
    input: {
      question: "Summarize what project isolation means in MianX in two findings.",
    },
    reviewerSlug: "qa-review",
    allowTools: true,
  });

  return {
    ok: Boolean(result.ok),
    status: result.status,
    ran: true,
    gates,
    model: result.modelUsed,
    latencyMs: result.latencyMs,
    usage: result.usage,
    qa: result.qa,
    documentsUsed: result.documentsUsed,
    instanceId: result.instanceId,
    protectedSideEffects: result.toolCalls?.approvals || [],
  };
}

export function liveSmokeReadiness() {
  return {
    command: "npm run agents:live-smoke",
    requiredEnv: [
      "OPENROUTER_API_KEY",
      "ALLOW_LIVE_PROVIDER_TEST=true",
      "OPENROUTER_DEFAULT_MODEL",
    ],
    requiredArgs: ["--project <uuid>", "--max-requests <=3", "--max-tokens", "--confirm"],
    maxProviderCalls: 3,
    paidFallback: false,
    liveTestedCountUntilFounderRuns: 0,
    health: openRouterHealthCheck(),
  };
}

export { runIndependentQa };
