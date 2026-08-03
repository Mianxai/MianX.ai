import { NextResponse } from "next/server";
import { withErrorHandling, ApiError, ERROR_CODES } from "@/lib/core/errors";
import {
  requireCapability,
  actorFromUser,
  CAPABILITIES,
} from "@/lib/core/auth";
import {
  PILOT_AGENT_SLUG,
  PILOT_PROJECT_ID,
  queuePilotExecution,
} from "@/lib/core/live-pilot";

export const dynamic = "force-dynamic";

/** GET must never start execution. */
export const GET = withErrorHandling(async () => {
  throw new ApiError(
    405,
    ERROR_CODES.BAD_REQUEST,
    "GET is not allowed for pilot execution. Use POST."
  );
});

/**
 * POST — create durable queued pilot work only.
 * Never calls OpenAI from this route.
 */
export const POST = withErrorHandling(async (req) => {
  const authCtx = await requireCapability(req, CAPABILITIES.LIVE_PILOT_AUTHORIZE);
  const admin = authCtx.user;
  actorFromUser(admin);

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new ApiError(400, ERROR_CODES.BAD_REQUEST, "JSON content type required");
  }

  let body;
  try {
    body = await req.json();
  } catch {
    throw new ApiError(400, ERROR_CODES.INVALID_JSON, "Malformed JSON body");
  }

  const projectId = body?.projectId == null ? null : String(body.projectId);
  const agentSlug = body?.agentSlug == null ? null : String(body.agentSlug);
  const taskId = body?.taskId == null ? null : String(body.taskId);
  const approvalId = body?.approvalId == null ? null : String(body.approvalId);
  const idempotencyKey =
    body?.idempotencyKey == null ? null : String(body.idempotencyKey).slice(0, 200);

  if (!projectId || !agentSlug || !taskId || !approvalId || !idempotencyKey) {
    throw new ApiError(
      400,
      ERROR_CODES.BAD_REQUEST,
      "projectId, agentSlug, taskId, approvalId, and idempotencyKey are required"
    );
  }

  if (agentSlug !== PILOT_AGENT_SLUG) {
    throw new ApiError(422, ERROR_CODES.VALIDATION, "agentSlug must be canonical pilot");
  }
  if (projectId !== PILOT_PROJECT_ID) {
    throw new ApiError(403, ERROR_CODES.FORBIDDEN, "project isolation failed");
  }

  const result = await queuePilotExecution({
    authenticated: true,
    authorized: true,
    projectId,
    agentSlug,
    taskId,
    approvalId,
    idempotencyKey,
    taskTitle: body?.taskTitle ? String(body.taskTitle).slice(0, 500) : "",
    taskBody: body?.taskBody ? String(body.taskBody).slice(0, 8000) : "",
  });

  // Never echo prompts or secrets
  return NextResponse.json(
    {
      ok: result.ok,
      queued: Boolean(result.queued),
      providerCalled: false,
      networkCallAllowed: false,
      run: result.run || null,
      code: result.code || null,
      message: result.message || result.note || null,
      eligibility: result.eligibility || null,
      queueDepth: result.queueDepth ?? null,
    },
    { status: result.httpStatus || (result.ok ? 202 : 503) }
  );
});
