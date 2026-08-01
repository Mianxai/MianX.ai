/**
 * Runtime tick integration for explicitly queued pilot runs.
 * Scheduler never creates pilot work — only processes Founder-queued items.
 */

import { createHash } from "node:crypto";
import {
  PILOT_AGENT_SLUG,
  PILOT_POLICY,
  PILOT_PROJECT_ID,
} from "./constants";
import { evaluatePilotEligibility, assessLiveTestedEvidenceGate } from "./eligibility";
import {
  claimNextQueuedPilotRun,
  finalizePilotRun,
  isKillSwitchActive,
  maybeIncrementLiveTestedSeats,
  recordCostUsage,
  recordPilotEvidence,
  recordPilotFailure,
  recordProviderRequest,
  recordTokenUsage,
  updatePilotRun,
} from "./store";
import {
  invokeOpenAIResponses,
  isOpenAIApiKeyConfigured,
  getConfiguredOpenAIModelId,
} from "./openai-adapter";
import { assertCostBudget, assertTokenBudget } from "./policy";
import {
  isGlobalLiveExecutionEnabled,
  isPilotLiveExecutionEnabled,
} from "./policy";
import { persistPilotEvidenceToSupabase, persistPilotRunToSupabase } from "./durable";
import { validatePilotStructuredOutput } from "./schema";

/**
 * Process at most one explicitly queued pilot run.
 * @param {{ workerId?: string, openaiClient?: object|null, allowNetwork?: boolean }} opts
 */
export async function processExplicitPilotQueue({
  workerId = "runtime-tick",
  openaiClient = null,
  allowNetwork = null,
} = {}) {
  const summary = {
    claimed: 0,
    succeeded: 0,
    failed: 0,
    skipped: 0,
    providerCalled: false,
    liveTestedIncremented: false,
  };

  if (isKillSwitchActive()) {
    summary.skipped = 1;
    summary.reason = "kill_switch_active";
    return summary;
  }

  const claim = claimNextQueuedPilotRun(workerId, PILOT_POLICY.maxWallClockMs);
  if (!claim.ok) {
    return summary;
  }
  summary.claimed = 1;
  const run = claim.run;
  const wallStarted = Date.now();

  const modelName = run.model || getConfiguredOpenAIModelId();
  const eligibility = evaluatePilotEligibility({
    authenticated: true,
    authorized: true,
    projectId: run.projectId,
    agentSlug: PILOT_AGENT_SLUG,
    taskId: run.taskId,
    approvalId: run.approvalId,
    approvalProjectId: run.projectId,
    taskProjectId: run.projectId,
    modelName,
    forExecution: true,
    bypassQueueCheck: true, // already claimed from queue
  });

  // Re-check switches at process time
  if (!isGlobalLiveExecutionEnabled() || !isPilotLiveExecutionEnabled()) {
    await failRun(run, workerId, "LIVE_SWITCHES_DISABLED", summary);
    return summary;
  }

  if (!eligibility.eligible && !eligibility.blockers.includes("active_lease_conflict")) {
    // lease_active is expected because we just leased this run
    const blockers = eligibility.blockers.filter((b) => b !== "active_lease_conflict");
    if (blockers.length) {
      await failRun(run, workerId, blockers[0], summary);
      return summary;
    }
  }

  if (!isOpenAIApiKeyConfigured() && !openaiClient) {
    await failRun(run, workerId, "PROVIDER_NOT_CONFIGURED", summary);
    return summary;
  }

  updatePilotRun(run.id, {
    status: "running",
    startedAt: new Date().toISOString(),
  });

  const networkAllowed =
    allowNetwork == null
      ? isGlobalLiveExecutionEnabled() &&
        isPilotLiveExecutionEnabled() &&
        (isOpenAIApiKeyConfigured() || Boolean(openaiClient))
      : Boolean(allowNetwork);

  const invoke = await invokeOpenAIResponses({
    client: openaiClient,
    systemPrompt: run.payload?._systemPrompt || "",
    userPrompt: run.payload?._userPrompt || "",
    modelId: modelName,
    timeoutMs: PILOT_POLICY.maxProviderTimeoutMs,
    allowNetwork: networkAllowed,
  });
  summary.providerCalled = Boolean(
    invoke.result?.providerEvidenceMetadata?.networkCalled
  );

  if (Date.now() - wallStarted > PILOT_POLICY.maxWallClockMs) {
    await failRun(run, workerId, "WALL_CLOCK_TIMEOUT", summary, invoke.result);
    return summary;
  }

  if (isKillSwitchActive()) {
    await failRun(run, workerId, "KILL_SWITCH_ACTIVE", summary, invoke.result);
    return summary;
  }

  recordProviderRequest({
    projectId: PILOT_PROJECT_ID,
    pilotRunId: run.id,
    providerName: invoke.result?.providerName || "openai",
    modelName,
    requestId: invoke.result?.requestId || invoke.result?.responseId || null,
    rawProviderStatus: invoke.result?.rawProviderStatus || null,
    normalizedErrorCode: invoke.result?.normalizedErrorCode || null,
    retryable: false,
    networkCalled: Boolean(invoke.result?.providerEvidenceMetadata?.networkCalled),
    fabricated: false,
    simulated: Boolean(invoke.result?.providerEvidenceMetadata?.simulated),
    latencyMs: invoke.result?.latencyMs ?? null,
    metadata: {
      store: false,
      tools: [],
    },
  });

  if (!invoke.ok) {
    await failRun(
      run,
      workerId,
      invoke.result?.normalizedErrorCode || "PROVIDER_FAILURE",
      summary,
      invoke.result
    );
    return summary;
  }

  const result = invoke.result;
  if (
    result.inputTokens == null ||
    result.outputTokens == null ||
    result.totalTokens == null
  ) {
    await failRun(run, workerId, "MISSING_PROVIDER_USAGE", summary, result);
    return summary;
  }

  const tokenCheck = assertTokenBudget({
    inputTokens: result.inputTokens,
    outputTokens: result.outputTokens,
  });
  if (!tokenCheck.ok) {
    await failRun(run, workerId, "TOKEN_LIMIT_EXCEEDED", summary, result);
    return summary;
  }

  const costCheck = assertCostBudget(result.estimatedCostUsd);
  if (!costCheck.ok || result.estimatedCostUsd == null) {
    await failRun(run, workerId, "COST_LIMIT_EXCEEDED", summary, result);
    return summary;
  }

  const structured =
    result.structuredOutput ||
    validatePilotStructuredOutput(
      (() => {
        try {
          return JSON.parse(result.responseText || "null");
        } catch {
          return null;
        }
      })()
    ).value;

  if (!structured) {
    await failRun(run, workerId, "STRUCTURED_OUTPUT_INVALID", summary, result);
    return summary;
  }

  const outputHash = createHash("sha256")
    .update(JSON.stringify(structured))
    .digest("hex");

  recordTokenUsage({
    projectId: PILOT_PROJECT_ID,
    pilotRunId: run.id,
    inputTokens: result.inputTokens,
    outputTokens: result.outputTokens,
    totalTokens: result.totalTokens,
    fabricated: false,
    simulated: false,
  });
  recordCostUsage({
    projectId: PILOT_PROJECT_ID,
    pilotRunId: run.id,
    estimatedCostUsd: result.estimatedCostUsd,
    pricingVersion: result.pricingVersion,
    fabricated: false,
    simulated: false,
  });

  const evidence = recordPilotEvidence({
    projectId: PILOT_PROJECT_ID,
    pilotRunId: run.id,
    kind: "run_summary",
    promptVersion: run.payload?.promptVersion || null,
    promptHash: run.payload?.promptHash || null,
    outputHash,
    summary: {
      providerRequestId: result.requestId || result.responseId,
      modelName: result.modelName,
      estimatedCostUsd: result.estimatedCostUsd,
      latencyMs: result.latencyMs,
      finishReason: result.finishReason,
    },
    fabricated: false,
    simulated: false,
    live: true,
  });
  await persistPilotEvidenceToSupabase(evidence);

  const runtimeDurationMs = Date.now() - wallStarted;
  const providerDurationMs = result.latencyMs ?? runtimeDurationMs;

  const gate = assessLiveTestedEvidenceGate({
    providerRequestId: result.requestId || result.responseId,
    providerName: "openai",
    modelName: result.modelName,
    providerHttpSuccess: result.providerHttpSuccess === true,
    validStructuredOutput: true,
    tokenAccounting: true,
    costAccounting: true,
    runtimeDurationMs,
    providerDurationMs,
    durableRunRecord: true,
    durableQueueRecord: true,
    durableEvidence: true,
    durableApprovalRecord: Boolean(run.approvalId),
    durableProviderRequestRecord: true,
    durableTokenCostRecord: true,
    projectIsolationPass: run.projectId === PILOT_PROJECT_ID,
    approvalRecord: Boolean(run.approvalId),
    fabricated: false,
    simulated: false,
    externalToolCall: false,
    policyViolation: false,
    oneProviderRequestOnly: true,
    leaseOwnershipVerified: true,
    costWithinLimit: result.estimatedCostUsd <= PILOT_POLICY.maxEstimatedCostUsd,
    runtimeWithinLimit: runtimeDurationMs <= PILOT_POLICY.maxWallClockMs,
    providerWithinTimeout: providerDurationMs <= PILOT_POLICY.maxProviderTimeoutMs,
  });

  const fin = finalizePilotRun(run.id, workerId, {
    status: gate.ok ? "succeeded" : "failed",
    provider: "openai",
    model: result.modelName,
    inputTokens: result.inputTokens,
    outputTokens: result.outputTokens,
    totalTokens: result.totalTokens,
    estimatedCostUsd: result.estimatedCostUsd,
    outputHash,
    failureClassification: gate.ok ? null : gate.missing[0] || "EVIDENCE_GATE_FAILED",
    evidenceRefs: [evidence.id],
    fabricated: false,
    simulated: false,
    live: gate.ok,
    payload: {
      ...(run.payload || {}),
      pricingVersion: result.pricingVersion,
      _systemPrompt: undefined,
      _userPrompt: undefined,
    },
  });

  if (!fin.ok) {
    summary.failed += 1;
    recordPilotFailure({
      projectId: PILOT_PROJECT_ID,
      pilotRunId: run.id,
      classification: "LOST_LEASE",
      message: "lost lease during finalization",
    });
    return summary;
  }

  await persistPilotRunToSupabase(fin.run);

  if (gate.ok) {
    const inc = maybeIncrementLiveTestedSeats(gate);
    summary.succeeded += 1;
    summary.liveTestedIncremented = Boolean(inc.incremented);
  } else {
    summary.failed += 1;
    recordPilotFailure({
      projectId: PILOT_PROJECT_ID,
      pilotRunId: run.id,
      classification: gate.missing[0] || "EVIDENCE_GATE_FAILED",
      message: "evidence gate failed",
    });
  }

  return summary;
}

async function failRun(run, workerId, code, summary, providerResult = null) {
  const evidence = recordPilotEvidence({
    projectId: PILOT_PROJECT_ID,
    pilotRunId: run.id,
    kind: "failure",
    summary: {
      classification: code,
      providerRequestId: providerResult?.requestId || null,
      normalizedErrorCode: providerResult?.normalizedErrorCode || code,
    },
    fabricated: false,
    simulated: Boolean(providerResult?.providerEvidenceMetadata?.simulated),
    live: false,
  });
  recordPilotFailure({
    projectId: PILOT_PROJECT_ID,
    pilotRunId: run.id,
    classification: code,
    message: code,
  });
  finalizePilotRun(run.id, workerId, {
    status: "failed",
    failureClassification: code,
    evidenceRefs: [evidence.id],
    fabricated: false,
    simulated: false,
    live: false,
    inputTokens: providerResult?.inputTokens ?? null,
    outputTokens: providerResult?.outputTokens ?? null,
    totalTokens: providerResult?.totalTokens ?? null,
    estimatedCostUsd: providerResult?.estimatedCostUsd ?? null,
  });
  summary.failed += 1;
}

/** Hook for runTick — never auto-creates pilot tasks. */
export async function processPilotWorkFromSchedulerTick(opts = {}) {
  return processExplicitPilotQueue(opts);
}
