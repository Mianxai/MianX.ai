/**
 * Queue a Founder-approved pilot run (durable shape). Never calls OpenAI.
 */

import { createHash } from "node:crypto";
import {
  PILOT_AGENT_SLUG,
  PILOT_BLOCK_REASONS,
  PILOT_POLICY,
  PILOT_PROJECT_ID,
} from "./constants";
import { evaluatePilotEligibility } from "./eligibility";
import {
  createPilotRun,
  getPilotApproval,
  markApprovalConsumed,
  recordPilotFailure,
  listPilotRuns,
} from "./store";
import { getConfiguredOpenAIModelId } from "./openai-adapter";
import { worstCasePreflightCost } from "./model-registry";
import { buildPilotPromptPackage } from "./prompts";
import { persistPilotRunToSupabase } from "./durable";

export async function queuePilotExecution({
  authenticated = false,
  authorized = false,
  projectId,
  agentSlug,
  taskId,
  approvalId,
  idempotencyKey,
  taskTitle = "",
  taskBody = "",
  estimatedInputTokens = null,
} = {}) {
  if (!idempotencyKey) {
    return {
      ok: false,
      httpStatus: 400,
      code: "MISSING_IDEMPOTENCY_KEY",
      message: "idempotencyKey required",
    };
  }
  if (!projectId || !agentSlug || !taskId || !approvalId) {
    return {
      ok: false,
      httpStatus: 400,
      code: "MALFORMED_REQUEST",
      message: "projectId, agentSlug, taskId, and approvalId are required",
    };
  }

  const approval = getPilotApproval(approvalId, projectId);
  if (!approval) {
    return {
      ok: false,
      httpStatus: 403,
      code: PILOT_BLOCK_REASONS.WRONG_PROJECT,
      message: "approval not found for project",
    };
  }
  if (approval.status === "consumed") {
    return {
      ok: false,
      httpStatus: 409,
      code: "APPROVAL_REUSED",
      message: "approval already consumed",
    };
  }
  if (approval.taskId !== taskId || approval.agentSlug !== agentSlug) {
    return {
      ok: false,
      httpStatus: 422,
      code: PILOT_BLOCK_REASONS.WRONG_TASK,
      message: "approval does not match task/agent",
    };
  }

  const modelName = getConfiguredOpenAIModelId();
  const eligibility = evaluatePilotEligibility({
    authenticated,
    authorized,
    projectId,
    agentSlug,
    taskId,
    approvalId,
    approval,
    approvalProjectId: approval.projectId,
    taskProjectId: projectId,
    modelName,
    forExecution: true,
    estimatedInputTokens:
      estimatedInputTokens == null ? PILOT_POLICY.maxInputTokens : estimatedInputTokens,
    requestedOutputTokens: PILOT_POLICY.maxOutputTokens,
  });

  if (!eligibility.eligible) {
    recordPilotFailure({
      projectId,
      classification: eligibility.blockers[0] || "not_eligible",
      message: "queuePilotExecution blocked",
    });
    return {
      ok: false,
      httpStatus: eligibility.httpStatus,
      code: eligibility.blockers[0] || "NOT_ELIGIBLE",
      eligibility,
      providerCalled: false,
    };
  }

  const prompt = buildPilotPromptPackage({
    projectId,
    taskId,
    taskTitle,
    taskBody,
  });
  const inputHash = createHash("sha256")
    .update(prompt.promptHash)
    .update(idempotencyKey)
    .digest("hex");

  const { conflict, run } = createPilotRun({
    projectId: PILOT_PROJECT_ID,
    taskId,
    approvalId,
    agentDefinitionId: PILOT_AGENT_SLUG,
    provider: "openai",
    model: modelName,
    status: "queued",
    idempotencyKey,
    inputHash,
    simulated: false,
  });

  if (conflict) {
    return {
      ok: false,
      httpStatus: 409,
      code: PILOT_BLOCK_REASONS.IDEMPOTENCY_CONFLICT,
      message: "idempotency key already used",
      run: run
        ? {
            id: run.id,
            status: run.status,
            provider: run.provider,
          }
        : null,
      providerCalled: false,
    };
  }

  run.payload = {
    promptVersion: prompt.promptVersion,
    promptHash: prompt.promptHash,
    systemPromptPresent: true,
    userPromptPresent: true,
    // Prompts kept server-side on the run object for the worker; never returned to clients.
    _systemPrompt: prompt.systemPrompt,
    _userPrompt: prompt.userPrompt,
    preflightCostUsd: worstCasePreflightCost(modelName).estimatedCostUsd,
    queueSource: "founder_execute_post",
    schedulerCreated: false,
  };

  markApprovalConsumed(approvalId);

  const durable = await persistPilotRunToSupabase(run);
  if (durable.required && !durable.ok) {
    run.status = "failed";
    run.failureClassification = "DURABLE_PERSIST_FAILED";
    recordPilotFailure({
      projectId,
      pilotRunId: run.id,
      classification: "DURABLE_PERSIST_FAILED",
      message: "Supabase persist failed",
    });
    return {
      ok: false,
      httpStatus: 500,
      code: "DURABLE_PERSIST_FAILED",
      message: "Could not persist durable pilot run",
      providerCalled: false,
    };
  }

  return {
    ok: true,
    httpStatus: 202,
    queued: true,
    providerCalled: false,
    networkCallAllowed: false,
    run: {
      id: run.id,
      status: run.status,
      projectId: run.projectId,
      taskId: run.taskId,
      agentDefinitionId: run.agentDefinitionId,
      approvalId: run.approvalId,
      provider: run.provider,
      model: run.model,
      idempotencyKey: run.idempotencyKey,
      fabricated: run.fabricated,
      simulated: run.simulated,
      live: run.live,
    },
    queueDepth: listPilotRuns({ projectId: PILOT_PROJECT_ID }).filter(
      (r) => r.status === "queued"
    ).length,
    note: "Durable pilot run queued. Runtime tick may process only after all gates still pass. No provider call performed by this endpoint.",
  };
}

export function getQueuedPilotRunByIdempotency(idempotencyKey) {
  if (!idempotencyKey) return null;
  return listPilotRuns().find((r) => r.idempotencyKey === idempotencyKey) || null;
}
