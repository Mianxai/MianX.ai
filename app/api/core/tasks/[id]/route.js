import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import { requireAdmin, requireCapability, actorFromUser, CAPABILITIES } from "@/lib/core/auth";
import { parseJsonBody, assertUuid, clip } from "@/lib/core/validate";
import { buildTaskPatch } from "@/lib/core/tasks";
import * as repo from "@/lib/core/repo";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "@/lib/core/audit";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/core/tasks/[id]?project_id=
export const GET = withErrorHandling(async (req, { params }) => {
  await requireAdmin(req);
  const { id } = await params;
  assertUuid(id, "id");
  const projectId = clip(req.nextUrl?.searchParams?.get("project_id") || "", 64);
  if (!projectId) throw badRequest("project_id is required.");
  assertUuid(projectId, "project_id");
  const task = await repo.getTask(id, projectId);
  const runs = await repo.listRuns({ taskId: id, projectId });
  return NextResponse.json({ task, runs });
});

// PATCH /api/core/tasks/[id]  { status?, priority?, description?, acceptance_criteria?, project_id? }
// Only allowlisted fields; status changes must be legal transitions.
// project_id is required (body or query) for project isolation.
export const PATCH = withErrorHandling(async (req, { params }) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_TASKS);
  const { id } = await params;
  assertUuid(id, "id");

  const body = await parseJsonBody(req);
  const q = clip(req.nextUrl?.searchParams?.get("project_id") || "", 64);
  const projectId = clip(body.project_id || q || "", 64);
  if (!projectId) throw badRequest("project_id is required.");
  assertUuid(projectId, "project_id");

  const task = await repo.getTask(id, projectId);
  const patch = buildTaskPatch(task.status, body); // throws on illegal/empty

  const updated = await repo.updateTask(id, patch);

  await recordAudit(
    getSupabaseAdmin(),
    buildAuditEntry({
      projectId: updated.project_id,
      actor: actorFromUser(user),
      action: AUDIT_ACTIONS.TASK_UPDATED,
      resourceType: "task",
      resourceId: id,
      metadata: { patch },
    })
  );

  return NextResponse.json({ task: updated });
});
