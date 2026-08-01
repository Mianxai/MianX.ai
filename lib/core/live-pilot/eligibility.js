/**
 * Founder approval + switch + isolation eligibility (no provider call).
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
} from "./policy";
import {
  countActivePilotLeases,
  countQueuedPilotTasks,
  findPilotApproval,
  isKillSwitchActive,
} from "./store";

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
 * Evaluate whether a future POST execution could proceed.
 * Phase II.1 always leaves networkCallAllowed=false (foundation blocks call).
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
  if (provider.providerName === "none") {
    blockers.push(PILOT_BLOCK_REASONS.PROVIDER_NONE);
  }

  if (input.modelName && !isModelAllowlisted(input.modelName)) {
    blockers.push(PILOT_BLOCK_REASONS.MODEL_NOT_ALLOWLISTED);
  }

  const approval =
    input.approval ||
    (input.taskId
      ? findPilotApproval({
          projectId: PILOT_PROJECT_ID,
          taskId: input.taskId,
          agentSlug: PILOT_AGENT_SLUG,
        })
      : null);
  if (!approval && !input.approvalId) {
    blockers.push(PILOT_BLOCK_REASONS.MISSING_APPROVAL);
  }

  if (countActivePilotLeases() >= PILOT_POLICY.maxConcurrentRequests) {
    blockers.push(PILOT_BLOCK_REASONS.LEASE_ACTIVE);
  }
  if (countQueuedPilotTasks() >= PILOT_POLICY.maxQueuedPilotTasks && !input.bypassQueueCheck) {
    // Allow status checks; execution prep may still report queue full.
    if (input.forExecution) blockers.push(PILOT_BLOCK_REASONS.QUEUE_FULL);
  }

  if (input.rateLimited) blockers.push(PILOT_BLOCK_REASONS.RATE_LIMITED);

  const eligibleGates = blockers.length === 0;
  // Foundation: even if gates clear, Phase II.1 forbids network calls.
  return {
    ...summarize(eligibleGates, blockers, reasons, eligibleGates ? 200 : statusFor(blockers)),
    providerName: provider.providerName,
    providerSetupRequired: provider.providerName === "none",
    globalEnabled: Boolean(globalOn),
    pilotEnabled: Boolean(pilotOn),
    networkCallAllowed: false,
    phaseIi1BlocksProviderCall: true,
    maxLiveAgents: PILOT_POLICY.maxLiveAgents,
    approvalPresent: Boolean(approval || input.approvalId),
  };
}

function statusFor(blockers) {
  if (blockers.includes(PILOT_BLOCK_REASONS.UNAUTHENTICATED)) return 401;
  if (blockers.includes(PILOT_BLOCK_REASONS.UNAUTHORIZED)) return 403;
  if (blockers.includes(PILOT_BLOCK_REASONS.WRONG_PROJECT)) return 403;
  if (blockers.includes(PILOT_BLOCK_REASONS.KILL_SWITCH)) return 423;
  if (blockers.includes(PILOT_BLOCK_REASONS.RATE_LIMITED)) return 429;
  if (blockers.includes(PILOT_BLOCK_REASONS.LEASE_ACTIVE)) return 409;
  if (blockers.includes(PILOT_BLOCK_REASONS.PROVIDER_NONE)) return 503;
  if (blockers.includes(PILOT_BLOCK_REASONS.GLOBAL_SWITCH_OFF)) return 503;
  if (blockers.includes(PILOT_BLOCK_REASONS.PILOT_SWITCH_OFF)) return 503;
  return 422;
}

function summarize(eligible, blockers, reasons, httpStatus) {
  return {
    eligible: Boolean(eligible),
    executionEligible: false, // truthful until Phase II.2+ enables calls
    blockers,
    reasons,
    httpStatus,
    liveExecutionReady: false,
  };
}

/**
 * Full genuine-evidence gate for a future live success (not applied in II.1).
 */
export function assessLiveTestedEvidenceGate(input = {}) {
  const missing = [];
  if (!input.providerRequestId) missing.push("provider_request_id");
  if (!input.providerName || input.providerName === "none") missing.push("provider_name");
  if (!input.modelName) missing.push("model_name");
  if (input.providerHttpSuccess !== true) missing.push("provider_http_success");
  if (input.validStructuredOutput !== true) missing.push("valid_structured_output");
  if (input.tokenAccounting !== true) missing.push("token_accounting");
  if (input.costAccounting !== true) missing.push("cost_accounting");
  if (input.runtimeDurationMs == null) missing.push("runtime_duration");
  if (!input.durableRunRecord) missing.push("durable_run_record");
  if (!input.durableEvidence) missing.push("durable_evidence");
  if (input.projectIsolationPass !== true) missing.push("project_isolation");
  if (!input.approvalRecord) missing.push("approval_record");
  if (input.fabricated !== false) missing.push("fabricated_must_be_false");
  if (input.simulated !== false) missing.push("simulated_must_be_false");
  if (input.externalToolCall === true) missing.push("external_tool_call");
  if (input.policyViolation === true) missing.push("policy_violation");

  return {
    ok: missing.length === 0,
    missing,
    fabricated: input.fabricated === true,
    simulated: input.simulated === true,
    providerName: input.providerName || "none",
  };
}
