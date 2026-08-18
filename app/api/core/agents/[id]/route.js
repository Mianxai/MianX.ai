import { NextResponse } from "next/server";
import { withErrorHandling, badRequest, invalidTransition } from "@/lib/core/errors";
import { actorFromUser, CAPABILITIES } from "@/lib/core/auth";
import { parseJsonBody, assertUuid, clip } from "@/lib/core/validate";
import { AGENT_INSTANCE_STATUSES } from "@/lib/core/constants";
import * as repo from "@/lib/core/repo";
import { recordAudit, buildAuditEntry } from "@/lib/core/audit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/core/ratelimit";
import { requireProjectAccess } from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

const INSTANCE_TRANSITIONS = {
  active: ["paused", "retired"],
  paused: ["active", "retired"],
  retired: [],
};

// PATCH /api/core/agents/:id  { status, project_id }
export const PATCH = withErrorHandling(async (req, { params }) => {
  const { id } = await params;
  assertUuid(id, "id");

  const body = await parseJsonBody(req);
  const q = clip(req.nextUrl?.searchParams?.get("project_id") || "", 64);
  const projectId = clip(body.project_id || q || "", 64);
  if (!projectId) throw badRequest("project_id is required.");
  assertUuid(projectId, "project_id");

  const { authCtx } = await requireProjectAccess(req, projectId, {
    capability: CAPABILITIES.MANAGE_AGENTS,
  });
  const actor = actorFromUser(authCtx.user);
  rateLimit(`agent-patch:${actor}`, { max: 60, windowMs: 60_000 });

  const status = typeof body.status === "string" ? body.status.trim() : "";
  if (!AGENT_INSTANCE_STATUSES.includes(status)) {
    throw badRequest("Invalid agent instance status.", {
      status: `Must be one of: ${AGENT_INSTANCE_STATUSES.join(", ")}`,
    });
  }

  const existing = await repo.getAgentInstance(id, projectId);
  const allowed = INSTANCE_TRANSITIONS[existing.status] || [];
  if (!allowed.includes(status)) {
    throw invalidTransition(
      `Cannot transition agent instance from ${existing.status} to ${status}.`,
      { from: existing.status, to: status, allowed }
    );
  }

  const patch = { status };
  if (status === "retired") {
    patch.archived_at = new Date().toISOString();
  }

  const instance = await repo.updateAgentInstance(id, patch, projectId);

  await recordAudit(
    getSupabaseAdmin(),
    buildAuditEntry({
      projectId,
      actor,
      action: "agent_instance.status_changed",
      resourceType: "agent_instance",
      resourceId: id,
      metadata: { from: existing.status, to: status },
    })
  );

  return NextResponse.json({ instance });
});
