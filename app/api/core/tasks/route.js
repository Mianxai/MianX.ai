import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import {
  requireCapability,
  requireAdmin,
  actorFromUser,
  CAPABILITIES,
} from "@/lib/core/auth";
import { parseJsonBody, assertUuid } from "@/lib/core/validate";
import { validateTaskCreate } from "@/lib/core/tasks";
import { rateLimit } from "@/lib/core/ratelimit";
import * as repo from "@/lib/core/repo";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "@/lib/core/audit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { requireProjectAccess } from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

// GET /api/core/tasks?project_id=<uuid>&status=<status>
// project_id is required — never default to an unscoped global list.
export const GET = withErrorHandling(async (req) => {
  const params = req.nextUrl?.searchParams;
  const projectId = params?.get("project_id") || undefined;
  const status = params?.get("status") || undefined;
  if (!projectId) {
    await requireAdmin(req);
    throw badRequest("project_id is required.");
  }
  assertUuid(projectId, "project_id");
  await requireProjectAccess(req, projectId);
  const tasks = await repo.listTasks({ projectId, status });
  return NextResponse.json({ tasks });
});

// POST /api/core/tasks  { project_id, title, ... }
export const POST = withErrorHandling(async (req) => {
  const body = await parseJsonBody(req);
  const row = validateTaskCreate(body); // throws standardized validation error
  assertUuid(row.project_id, "project_id");

  const { authCtx } = await requireProjectAccess(req, row.project_id, {
    capability: CAPABILITIES.MANAGE_TASKS,
  });
  const actor = actorFromUser(authCtx.user);
  rateLimit(`task-create:${actor}`, { max: 30, windowMs: 60_000 });

  const { row: task, created } = await repo.createTask({
    ...row,
    created_by: actor,
  });

  if (created) {
    await recordAudit(
      getSupabaseAdmin(),
      buildAuditEntry({
        projectId: task.project_id,
        actor,
        action: AUDIT_ACTIONS.TASK_CREATED,
        resourceType: "task",
        resourceId: task.id,
      })
    );
  }

  return NextResponse.json({ task, idempotentReplay: !created }, {
    status: created ? 201 : 200,
  });
});
