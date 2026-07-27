import { NextResponse } from "next/server";
import { withErrorHandling, notFound, notConfigured } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/admin-auth";
import { assertUuid } from "@/lib/core/validate";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import * as repo from "@/lib/core/repo";
import { isObjectiveTask, toObjectiveDetail } from "@/lib/core/objectives";
import { explainApproval } from "@/lib/core/approvals/explain";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/objectives/[id]?project_id=
 */
export const GET = withErrorHandling(async (req, { params }) => {
  await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured("Supabase is not configured.");
  }

  const { id } = await params;
  assertUuid(id, "id");
  const url = new URL(req.url);
  const projectId = url.searchParams.get("project_id");
  if (!projectId) {
    throw notFound("project_id is required for objective detail.");
  }
  assertUuid(projectId, "project_id");

  const task = await repo.getTask(id, projectId);
  if (!isObjectiveTask(task)) {
    throw notFound("Objective not found.");
  }

  const [project, jobsPage, runs, approvals, audit] = await Promise.all([
    repo.getProject(projectId),
    repo.listJobs({ projectId, taskId: id, limit: 100, offset: 0 }),
    repo.listRuns({ projectId, taskId: id }),
    repo.listApprovals({ projectId }),
    repo.listAuditLogs({ projectId }),
  ]);

  const detail = toObjectiveDetail(task, {
    jobs: jobsPage.rows || [],
    runs,
    approvals: approvals.filter((a) => a.task_id === id),
    audit,
    project,
  });

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    objective: detail,
    approvalExplanations: (detail.approvals || []).map((a) => {
      const full = approvals.find((x) => x.id === a.id);
      return explainApproval(full || a);
    }),
  });
});
