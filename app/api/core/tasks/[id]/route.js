import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin, requireCapability, actorFromUser, CAPABILITIES } from "@/lib/core/auth";
import { parseJsonBody, assertUuid } from "@/lib/core/validate";
import { buildTaskPatch } from "@/lib/core/tasks";
import * as repo from "@/lib/core/repo";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "@/lib/core/audit";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/core/tasks/[id]
export const GET = withErrorHandling(async (req, { params }) => {
  await requireAdmin(req);
  const { id } = await params;
  assertUuid(id, "id");
  const task = await repo.getTask(id);
  const runs = await repo.listRuns({ taskId: id });
  return NextResponse.json({ task, runs });
});

// PATCH /api/core/tasks/[id]  { status?, priority?, description?, acceptance_criteria? }
// Only allowlisted fields; status changes must be legal transitions.
export const PATCH = withErrorHandling(async (req, { params }) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_TASKS);
  const { id } = await params;
  assertUuid(id, "id");

  const task = await repo.getTask(id);
  const body = await parseJsonBody(req);
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
