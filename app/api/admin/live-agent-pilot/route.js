import { NextResponse } from "next/server";
import { withErrorHandling, ApiError, ERROR_CODES } from "@/lib/core/errors";
import { requireAdmin, actorFromUser } from "@/lib/core/auth";
import {
  PILOT_AGENT_SLUG,
  PILOT_PROJECT_ID,
  buildLivePilotStatus,
  evaluatePilotEligibility,
  preparePilotProviderCall,
  createPilotApproval,
  createPilotRun,
  setKillSwitch,
  isKillSwitchActive,
  getPilotEvidence,
  assertPilotProjectIsolation,
  isGlobalLiveExecutionEnabled,
  isPilotLiveExecutionEnabled,
  recordPilotFailure,
} from "@/lib/core/live-pilot";

export const dynamic = "force-dynamic";

function sanitizeBody(body) {
  if (!body || typeof body !== "object") return {};
  const {
    projectId,
    taskId,
    agentSlug,
    approvalId,
    evidenceId,
    modelName,
    idempotencyKey,
    notes,
    killSwitchActive,
    reason,
  } = body;
  return {
    projectId: projectId == null ? undefined : String(projectId),
    taskId: taskId == null ? undefined : String(taskId).slice(0, 200),
    agentSlug: agentSlug == null ? undefined : String(agentSlug).slice(0, 120),
    approvalId: approvalId == null ? undefined : String(approvalId),
    evidenceId: evidenceId == null ? undefined : String(evidenceId),
    modelName: modelName == null ? undefined : String(modelName).slice(0, 120),
    idempotencyKey:
      idempotencyKey == null ? undefined : String(idempotencyKey).slice(0, 200),
    notes: notes == null ? undefined : String(notes).slice(0, 1000),
    killSwitchActive:
      typeof killSwitchActive === "boolean" ? killSwitchActive : undefined,
    reason: reason == null ? undefined : String(reason).slice(0, 500),
  };
}

/** GET — pilot status (read-only). Never starts execution. */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const url = new URL(req.url);
  const view = url.searchParams.get("view") || "status";

  if (view === "eligibility") {
    const projectId = url.searchParams.get("project_id") || PILOT_PROJECT_ID;
    const taskId = url.searchParams.get("task_id") || null;
    const eligibility = evaluatePilotEligibility({
      authenticated: true,
      authorized: true,
      projectId,
      agentSlug: PILOT_AGENT_SLUG,
      taskId,
    });
    return NextResponse.json({
      ok: true,
      view: "eligibility",
      eligibility,
      liveExecutionReady: false,
      networkCallAllowed: false,
    });
  }

  if (view === "evidence") {
    const evidenceId = url.searchParams.get("id");
    const projectId = url.searchParams.get("project_id") || PILOT_PROJECT_ID;
    if (!evidenceId) {
      throw new ApiError(422, ERROR_CODES.VALIDATION, "evidence id required");
    }
    const isolation = assertPilotProjectIsolation({ projectId });
    if (!isolation.ok) {
      throw new ApiError(403, ERROR_CODES.FORBIDDEN, "project isolation failed", {
        errors: isolation.errors,
      });
    }
    const evidence = getPilotEvidence(evidenceId, projectId);
    if (!evidence) {
      throw new ApiError(404, ERROR_CODES.NOT_FOUND, "evidence not found");
    }
    return NextResponse.json({
      ok: true,
      view: "evidence",
      evidence: {
        id: evidence.id,
        projectId: evidence.projectId,
        kind: evidence.kind,
        fabricated: evidence.fabricated,
        simulated: evidence.simulated,
        live: evidence.live === true,
        createdAt: evidence.createdAt,
        promptHash: evidence.promptHash || null,
        promptVersion: evidence.promptVersion || null,
      },
    });
  }

  const status = buildLivePilotStatus({ authenticated: true, authorized: true });
  return NextResponse.json({ ok: true, view: "status", ...status });
});

/**
 * POST — preparation / kill-switch only.
 * Never calls a provider in Phase II.1. No GET may start execution.
 */
export const POST = withErrorHandling(async (req) => {
  const admin = await requireAdmin(req);
  const actor = actorFromUser(admin);
  let raw = {};
  try {
    raw = await req.json();
  } catch {
    raw = {};
  }
  const body = sanitizeBody(raw);
  const action = String(raw.action || "").trim();

  if (action === "eligibility") {
    const eligibility = evaluatePilotEligibility({
      authenticated: true,
      authorized: true,
      projectId: body.projectId || PILOT_PROJECT_ID,
      agentSlug: body.agentSlug || PILOT_AGENT_SLUG,
      taskId: body.taskId || null,
      modelName: body.modelName || null,
      approvalId: body.approvalId || null,
      forExecution: true,
    });
    return NextResponse.json(
      {
        ok: eligibility.eligible,
        action,
        eligibility,
        networkCallAllowed: false,
      },
      { status: eligibility.httpStatus === 200 ? 200 : eligibility.httpStatus }
    );
  }

  if (action === "approval_prepare") {
    const projectId = body.projectId || PILOT_PROJECT_ID;
    const isolation = assertPilotProjectIsolation({
      projectId,
      agentSlug: body.agentSlug || PILOT_AGENT_SLUG,
    });
    if (!isolation.ok) {
      throw new ApiError(403, ERROR_CODES.FORBIDDEN, "project isolation failed", {
        errors: isolation.errors,
      });
    }
    if (!body.taskId) {
      throw new ApiError(422, ERROR_CODES.VALIDATION, "taskId required");
    }
    if ((body.agentSlug || PILOT_AGENT_SLUG) !== PILOT_AGENT_SLUG) {
      throw new ApiError(422, ERROR_CODES.VALIDATION, "agent must be canonical pilot");
    }
    const approval = createPilotApproval({
      projectId,
      taskId: body.taskId,
      agentSlug: PILOT_AGENT_SLUG,
      approvedBy: actor?.email || actor?.id || "admin",
      notes: body.notes || "Phase II.1 approval preparation (not live execution)",
    });
    return NextResponse.json({
      ok: true,
      action,
      approval: {
        id: approval.id,
        projectId: approval.projectId,
        taskId: approval.taskId,
        agentSlug: approval.agentSlug,
        status: approval.status,
        createdAt: approval.createdAt,
      },
      liveExecutionReady: false,
      note: "Approval record prepared. Provider call still blocked in Phase II.1.",
    });
  }

  if (action === "execution_prepare") {
    if (isKillSwitchActive()) {
      throw new ApiError(423, "KILL_SWITCH_ACTIVE", "Kill switch active");
    }
    const eligibility = evaluatePilotEligibility({
      authenticated: true,
      authorized: true,
      projectId: body.projectId || PILOT_PROJECT_ID,
      agentSlug: body.agentSlug || PILOT_AGENT_SLUG,
      taskId: body.taskId || null,
      modelName: body.modelName || null,
      approvalId: body.approvalId || null,
      forExecution: true,
    });
    if (!eligibility.eligible) {
      recordPilotFailure({
        projectId: body.projectId || PILOT_PROJECT_ID,
        classification: eligibility.blockers[0] || "not_eligible",
        message: "execution_prepare blocked",
      });
      return NextResponse.json(
        {
          ok: false,
          action,
          eligibility,
          networkCallAllowed: false,
          providerCalled: false,
        },
        { status: eligibility.httpStatus }
      );
    }

    const prepared = preparePilotProviderCall({
      modelName: body.modelName,
      globalEnabled: isGlobalLiveExecutionEnabled(),
      pilotEnabled: isPilotLiveExecutionEnabled(),
      killSwitchActive: false,
    });

    const { conflict, run } = createPilotRun({
      projectId: PILOT_PROJECT_ID,
      taskId: body.taskId,
      approvalId: body.approvalId || null,
      provider: "none",
      model: body.modelName || null,
      status: "blocked",
      idempotencyKey: body.idempotencyKey || null,
      failureClassification: prepared.result?.normalizedErrorCode || "foundation_block",
      simulated: false,
    });

    if (conflict) {
      throw new ApiError(409, ERROR_CODES.CONFLICT, "idempotency key already used", {
        runId: run?.id,
      });
    }

    return NextResponse.json(
      {
        ok: false,
        action,
        prepared: Boolean(prepared.prepared),
        providerCalled: false,
        networkCallAllowed: false,
        run: {
          id: run.id,
          status: run.status,
          provider: run.provider,
          fabricated: run.fabricated,
          simulated: run.simulated,
          live: run.live,
        },
        providerResult: {
          providerName: prepared.result.providerName,
          normalizedErrorCode: prepared.result.normalizedErrorCode,
          networkCalled: false,
        },
        note: "Phase II.1 foundation blocks provider network calls.",
      },
      { status: 503 }
    );
  }

  if (action === "kill_switch") {
    if (typeof body.killSwitchActive !== "boolean") {
      throw new ApiError(422, ERROR_CODES.VALIDATION, "killSwitchActive boolean required");
    }
    const event = setKillSwitch(body.killSwitchActive, {
      actor: actor?.email || actor?.id || "admin",
      reason: body.reason || "",
    });
    return NextResponse.json({
      ok: true,
      action,
      killSwitch: { active: isKillSwitchActive(), event },
      providerCalled: false,
    });
  }

  throw new ApiError(
    422,
    ERROR_CODES.VALIDATION,
    "action must be eligibility | approval_prepare | execution_prepare | kill_switch"
  );
});
