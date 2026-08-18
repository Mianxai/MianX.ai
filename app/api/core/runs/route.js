import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import * as repo from "@/lib/core/repo";
import { requireProjectAccess } from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

// GET /api/core/runs?project_id=<uuid>&task_id=<uuid>&status=<status>
// project_id is required — never default to an unscoped global list.
export const GET = withErrorHandling(async (req) => {
  const params = req.nextUrl?.searchParams;
  const projectId = params?.get("project_id") || undefined;
  const taskId = params?.get("task_id") || undefined;
  const status = params?.get("status") || undefined;
  if (!projectId) {
    await requireAdmin(req);
    throw badRequest("project_id is required.");
  }
  assertUuid(projectId, "project_id");
  if (taskId) assertUuid(taskId, "task_id");
  await requireProjectAccess(req, projectId);
  const runs = await repo.listRuns({ projectId, taskId, status });
  return NextResponse.json({ runs });
});
