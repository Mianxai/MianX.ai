/**
 * Founder approval + switch + isolation + OpenAI eligibility.
 */

import {
  PILOT_AGENT_SLUG,
  PILOT_BLOCK_REASONS,
  PILOT_POLICY,
  PILOT_PROJECT_ID,
} from "./constants";
import { getPilotProviderStatus } from "./adapter";
import {
  isGlobalLiveExecutionEnabled,
  isPilotLiveExecutionEnabled,
  isModelAllowlisted,
  assertTokenBudget,
} from "./policy";
import {
  countActivePilotLeases,
  countQueuedPilotTasks,
  findPilotApproval,
  getPilotApproval,
  isKillSwitchActive,
} from "./store";
import {
  getConfiguredOpenAIModelId,
  isOpenAIApiKeyConfigured,
} from "./openai-adapter";
import {
  getModelRegistryEntry,
  getPilotModelVerification,
  isModelAvailabilityVerifiedForProviderCall,
  isPricingVerifiedForProviderCall,
  worstCasePreflightCost,
} from "./model-registry";

export function assertPilotProjectIsolation({
  projectId,
  agentSlug,
  taskProjectId,
  approvalProjectId,
  evidenceProjectId,
  queueProjectId,
  memoryProjectId,
} = {}) {
  const errors = [];
  if (!projectId) errors.push("missing_project_id");
  if (projectId && projectId !== PILOT_PROJECT_ID) errors.push("wrong_project_id");
  if (agentSlug && agentSlug !== PILOT_AGENT_SLUG) errors.push("wrong_agent_slug");
  if (taskProjectId && taskProjectId !== PILOT_PROJECT_ID) {
    errors.push("task_cross_project");
  }
  if (approvalProjectId && approvalProjectId !== PILOT_PROJECT_ID) {
    errors.push("approval_cross_project");
  }
  if (evidenceProjectId && evidenceProjectId !== PILOT_PROJECT_ID) {
    errors.push("evidence_cross_project");
  }
  if (queueProjectId && queueProjectId !== PILOT_PROJECT_ID) {
    errors.push("queue_cross_project");
  }
  if (memoryProjectId && memoryProjectId !== PILOT_PROJECT_ID) {
    errors.push("memory_cross_project");
  }
  return { ok: errors.length === 0, errors };
}

/**
 * Evaluate whether a future POST execution / provider invoke could proceed.
 */
export function evaluatePilotEligibility(input = {}) {
  const blockers = [];
  const reasons = [];

  if (!input.authenticated) {
    blockers.push(PILOT_BLOCK_REASONS.UNAUTHENTICATED);
    return summarize(false, blockers, reasons, 401);
  }
  if (!input.authorized) {
    blockers.push(PILOT_BLOCK_REASONS.UNAUTHORIZED);
    return summarize(false, blockers, reasons, 403);
  }

  const isolation = assertPilotProjectIsolation({
    projectId: input.projectId,
    agentSlug: input.agentSlug || PILOT_AGENT_SLUG,
    taskProjectId: input.taskProjectId,
    approvalProjectId: input.approvalProjectId,
    evidenceProjectId: input.evidenceProjectId,
    queueProjectId: input.queueProjectId,
    memoryProjectId: input.memoryProjectId,
  });
  if (!isolation.ok) {
    blockers.push(PILOT_BLOCK_REASONS.WRONG_PROJECT);
    reasons.push(...isolation.errors);
    return summarize(false, blockers, reasons, 403);
  }

  if ((input.agentSlug || PILOT_AGENT_SLUG) !== PILOT_AGENT_SLUG) {
    blockers.push(PILOT_BLOCK_REASONS.WRONG_AGENT);
  }
  if (!input.taskId) {
    blockers.push(PILOT_BLOCK_REASONS.WRONG_TASK);
  }

  if (isKillSwitchActive() || input.killSwitchActive) {
    blockers.push(PILOT_BLOCK_REASONS.KILL_SWITCH);
    return summarize(false, blockers, reasons, 423);
  }

  const globalOn = input.globalEnabled ?? isGlobalLiveExecutionEnabled();
  const pilotOn = input.pilotEnabled ?? isPilotLiveExecutionEnabled();
  if (!globalOn) blockers.push(PILOT_BLOCK_REASONS.GLOBAL_SWITCH_OFF);
  if (!pilotOn) blockers.push(PILOT_BLOCK_REASONS.PILOT_SWITCH_OFF);

  const provider = getPilotProviderStatus();
  if (!isOpenAIApiKeyConfigured() || provider.providerName !== "openai") {
    blockers.push(PILOT_BLOCK_REASONS.PROVIDER_NONE);
  }

  const modelName = input.modelName || getConfiguredOpenAIModelId();
  if (!modelName) {
    blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_ALLOWLISTED);
    reasons.push("model_missing");
  } else if (!isModelAllowlisted(modelName)) {
    blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_ALLOWLISTED);
  } else {
    const reg = getModelRegistryEntry(modelName);
    if (!reg.ok) {
      blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_ALLOWLISTED);
      reasons.push(reg.code);
    }
  }

  if (modelName && isModelAllowlisted(modelName)) {
    const verification = getPilotModelVerification(modelName);
    if (verification.officialCatalogStatus !== "verified") {
      blockers.push(PILOT_BLOCK_REASONS.MODEL_CATALOG_NOT_VERIFIED);
      reasons.push(verification.officialCatalogStatus);
    }
    if (verification.accountAccessStatus !== "verified") {
      blockers.push(PILOT_BLOCK_REASONS.ACCOUNT_ACCESS_NOT_VERIFIED);
      reasons.push(verification.accountAccessStatus);
    }
    if (!isModelAvailabilityVerifiedForProviderCall(modelName)) {
      blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_VERIFIED);
      reasons.push("model_not_ready_for_provider_call");
    }
    if (verification.officialPricingStatus !== "verified") {
      blockers.push(PILOT_BLOCK_REASONS.PRICING_NOT_VERIFIED);
      reasons.push(verification.officialPricingStatus);
    }
    if (verification.billingModeStatus !== "standard") {
      blockers.push(PILOT_BLOCK_REASONS.BILLING_PATH_UNKNOWN);
      reasons.push(verification.billingModeStatus);
    }
    if (!isPricingVerifiedForProviderCall(modelName)) {
      blockers.push(PILOT_BLOCK_REASONS.PRICING_NOT_VERIFIED);
      reasons.push("pricing_path_not_ready");
    } else {
      const preflight = worstCasePreflightCost(modelName);
      if (!preflight.ok) {
        blockers.push(PILOT_BLOCK_REASONS.BUDGET_EXCEEDED);
        reasons.push(preflight.code || "pricing_missing");
      } else if (preflight.estimatedCostUsd > PILOT_POLICY.maxEstimatedCostUsd) {
        blockers.push(PILOT_BLOCK_REASONS.BUDGET_EXCEEDED);
        reasons.push("cost_preflight_exceeded");
      }
    }
  }

  const inputTok =
    input.estimatedInputTokens == null
      ? PILOT_POLICY.maxInputTokens
      : Number(input.estimatedInputTokens);
  const outTok =
    input.requestedOutputTokens == null
      ? PILOT_POLICY.maxOutputTokens
      : Number(input.requestedOutputTokens);
  const tokenCheck = assertTokenBudget({
    inputTokens: inputTok,
    outputTokens: outTok,
  });
  if (!tokenCheck.ok) {
    blockers.push(PILOT_BLOCK_REASONS.BUDGET_EXCEEDED);
    reasons.push(...tokenCheck.violations);
  }

  let approval =
    input.approval ||
    (input.approvalId
      ? getPilotApproval(input.approvalId, input.projectId || PILOT_PROJECT_ID)
      : null) ||
    (input.taskId
      ? findPilotApproval({
          projectId: PILOT_PROJECT_ID,
          taskId: input.taskId,
          agentSlug: PILOT_AGENT_SLUG,
        })
      : null);

  if (!approval) {
    blockers.push(PILOT_BLOCK_REASONS.MISSING_APPROVAL);
  } else if (approval.status === "consumed" && input.forExecution) {
    blockers.push(PILOT_BLOCK_REASONS.IDEMPOTENCY_CONFLICT);
    reasons.push("approval_reused");
  }

  if (countActivePilotLeases() >= PILOT_POLICY.maxConcurrentRequests) {
    blockers.push(PILOT_BLOCK_REASONS.LEASE_ACTIVE);
  }
  if (
    countQueuedPilotTasks() >= PILOT_POLICY.maxQueuedPilotTasks &&
    input.forExecution &&
    !input.bypassQueueCheck
  ) {
    blockers.push(PILOT_BLOCK_REASONS.QUEUE_FULL);
  }

  if (input.rateLimited) blockers.push(PILOT_BLOCK_REASONS.RATE_LIMITED);

  const eligibleGates = blockers.length === 0;
  const networkCallAllowed =
    eligibleGates &&
    globalOn &&
    pilotOn &&
    isOpenAIApiKeyConfigured() &&
    isModelAllowlisted(modelName) &&
    isModelAvailabilityVerifiedForProviderCall(modelName) &&
    isPricingVerifiedForProviderCall(modelName);

  const costBound = modelName ? worstCasePreflightCost(modelName) : { ok: false, estimatedCostUsd: null };
  const verification = getPilotModelVerification(modelName || undefined);

  return {
    ...summarize(eligibleGates, blockers, reasons, eligibleGates ? 200 : statusFor(blockers)),
    providerName: provider.providerName,
    providerSetupRequired: provider.providerName === "none",
    globalEnabled: Boolean(globalOn),
    pilotEnabled: Boolean(pilotOn),
    networkCallAllowed,
    phaseIi1BlocksProviderCall: false,
    phase: "ii2_openai_path",
    maxLiveAgents: PILOT_POLICY.maxLiveAgents,
    approvalPresent: Boolean(approval),
    modelName: modelName || null,
    modelAvailability: verification.accountAccessStatus,
    officialCatalogStatus: verification.officialCatalogStatus,
    accountAccessStatus: verification.accountAccessStatus,
    officialPricingStatus: verification.officialPricingStatus,
    billingModeStatus: verification.billingModeStatus,
    modelReadyForProviderCall: verification.modelReadyForProviderCall,
    pricingReadyForProviderCall: verification.pricingReadyForProviderCall,
    pricingVerification: verification.pricingVerification,
    worstCaseCostUsd: costBound.ok ? costBound.estimatedCostUsd : null,
    executionEligible: networkCallAllowed,
    liveExecutionReady: false,
    providerCallAllowed: networkCallAllowed,
    responseStorageEnabled: false,
    zeroDataRetentionVerified: false,
  };
}

function statusFor(blockers) {
  if (blockers.includes(PILOT_BLOCK_REASONS.UNAUTHENTICATED)) return 401;
  if (blockers.includes(PILOT_BLOCK_REASONS.UNAUTHORIZED)) return 403;
  if (blockers.includes(PILOT_BLOCK_REASONS.WRONG_PROJECT)) return 403;
  if (blockers.includes(PILOT_BLOCK_REASONS.KILL_SWITCH)) return 423;
  if (blockers.includes(PILOT_BLOCK_REASONS.RATE_LIMITED)) return 429;
  if (blockers.includes(PILOT_BLOCK_REASONS.LEASE_ACTIVE)) return 409;
  if (blockers.includes(PILOT_BLOCK_REASONS.IDEMPOTENCY_CONFLICT)) return 409;
  if (blockers.includes(PILOT_BLOCK_REASONS.QUEUE_FULL)) return 409;
  if (blockers.includes(PILOT_BLOCK_REASONS.PROVIDER_NONE)) return 503;
  if (blockers.includes(PILOT_BLOCK_REASONS.GLOBAL_SWITCH_OFF)) return 503;
  if (blockers.includes(PILOT_BLOCK_REASONS.PILOT_SWITCH_OFF)) return 503;
  if (blockers.includes(PILOT_BLOCK_REASONS.MODEL_NOT_VERIFIED)) return 503;
  if (blockers.includes(PILOT_BLOCK_REASONS.PRICING_NOT_VERIFIED)) return 503;
  return 422;
}

function summarize(eligible, blockers, reasons, httpStatus) {
  return {
    eligible: Boolean(eligible),
    executionEligible: false,
    blockers,
    reasons,
    httpStatus,
    liveExecutionReady: false,
  };
}

/**
 * Full genuine-evidence gate for a live success (OpenAI pilot).
 * Optional II.2 flags only fail when explicitly false.
 */
export function assessLiveTestedEvidenceGate(input = {}) {
  const missing = [];
  if (!input.providerRequestId) missing.push("provider_request_id");
  if (input.providerName !== "openai") missing.push("provider_name_openai");
  if (!input.modelName || !isModelAllowlisted(input.modelName)) {
    missing.push("model_name");
  }
  if (input.providerHttpSuccess !== true) missing.push("provider_http_success");
  if (input.validStructuredOutput !== true) missing.push("valid_structured_output");
  if (input.tokenAccounting !== true) missing.push("token_accounting");
  if (input.costAccounting !== true) missing.push("cost_accounting");
  if (input.costWithinLimit === false) missing.push("cost_within_limit");
  if (input.runtimeDurationMs == null) missing.push("runtime_duration");
  if (input.runtimeWithinLimit === false) missing.push("runtime_exceeded");
  if (input.providerWithinTimeout === false) missing.push("provider_timeout_exceeded");
  if (!input.durableRunRecord) missing.push("durable_run_record");
  if (!input.durableEvidence) missing.push("durable_evidence");
  if (input.durableQueueRecord === false) missing.push("durable_queue_record");
  if (input.durableApprovalRecord === false) missing.push("durable_approval_record");
  if (input.durableProviderRequestRecord === false) {
    missing.push("durable_provider_request");
  }
  if (input.durableTokenCostRecord === false) missing.push("durable_token_cost");
  if (input.projectIsolationPass !== true) missing.push("project_isolation");
  if (!input.approvalRecord) missing.push("approval_record");
  if (input.fabricated !== false) missing.push("fabricated_must_be_false");
  if (input.simulated !== false) missing.push("simulated_must_be_false");
  if (input.externalToolCall === true) missing.push("external_tool_call");
  if (input.policyViolation === true) missing.push("policy_violation");
  if (input.oneProviderRequestOnly === false) missing.push("multiple_provider_requests");
  if (input.leaseOwnershipVerified === false) missing.push("lease_ownership");

  return {
    ok: missing.length === 0,
    missing,
    fabricated: input.fabricated === true,
    simulated: input.simulated === true,
    providerName: input.providerName || "none",
  };
}
