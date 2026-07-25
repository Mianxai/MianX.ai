import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin, actorFromUser } from "@/lib/core/auth";
import { parseJsonBody, assertUuid } from "@/lib/core/validate";
import { validateTaskCreate } from "@/lib/core/tasks";
import { rateLimit } from "@/lib/core/ratelimit";
import * as repo from "@/lib/core/repo";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "@/lib/core/audit";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/core/tasks?project_id=<uuid>&status=<status>
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const params = req.nextUrl?.searchParams;
  const projectId = params?.get("project_id") || undefined;
  const status = params?.get("status") || undefined;
  if (projectId) assertUuid(projectId, "project_id");
  const tasks = await repo.listTasks({ projectId, status });
  return NextResponse.json({ tasks });
});

// POST /api/core/tasks  { project_id, title, ... }
export const POST = withErrorHandling(async (req) => {
  const user = await requireAdmin(req);
  const actor = actorFromUser(user);
  rateLimit(`task-create:${actor}`, { max: 30, windowMs: 60_000 });

  const body = await parseJsonBody(req);
  const row = validateTaskCreate(body); // throws standardized validation error
  assertUuid(row.project_id, "project_id");

  await repo.getProject(row.project_id); // project scoping + existence

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
