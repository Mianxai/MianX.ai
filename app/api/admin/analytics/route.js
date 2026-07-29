import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import * as repo from "@/lib/core/repo";
import { buildProjectOperationalSummary } from "@/lib/core/founder-operations";
import {
  ANALYTICS_SCOPE_LEGEND,
  analyticsMetricOk as ok,
  analyticsMetricFail as fail,
} from "@/lib/admin-analytics-scope";

export const dynamic = "force-dynamic";

async function leadsByStatus(admin) {
  const { data, error } = await admin
    .from("leads")
    .select("status")
    .is("archived_at", null);
  if (error) throw error;
  const out = {};
  for (const row of data || []) {
    const s = row.status || "new";
    out[s] = (out[s] || 0) + 1;
  }
  return out;
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);

  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }

  const url = new URL(req.url);
  const projectIdRaw = url.searchParams.get("project_id");
  let projectId = null;
  if (projectIdRaw) {
    assertUuid(projectIdRaw, "project_id");
    projectId = projectIdRaw;
  }

  const admin = getSupabaseAdmin();
  const sources = {};
  let partial = false;

  try {
    sources.leadsByStatus = ok(await leadsByStatus(admin), "organisation");
  } catch {
    partial = true;
    sources.leadsByStatus = fail("LEADS_UNAVAILABLE", "organisation");
  }

  try {
    const tasksByStatus = await repo.countByStatus("tasks");
    const runsByStatus = await repo.countByStatus("agent_runs");
    const projectsByStatus = await repo.countByStatus("projects");
    const approvals = await repo.countByStatus("approval_requests");
    sources.tasksByStatus = ok(tasksByStatus, "organisation");
    sources.runsByStatus = ok(runsByStatus, "organisation");
    sources.projectsByStatus = ok(projectsByStatus, "organisation");
    sources.pendingApprovals = ok(approvals.pending || 0, "organisation");

    const runs = await repo.listRuns({});
    const durations = [];
    for (const r of runs || []) {
      if (r.started_at && r.finished_at) {
        const ms = new Date(r.finished_at) - new Date(r.started_at);
        if (Number.isFinite(ms) && ms >= 0) durations.push(ms);
      }
    }
    sources.averageRunDuration = ok(
      durations.length > 0
        ? {
            sampleSize: durations.length,
            averageMs: Math.round(
              durations.reduce((a, b) => a + b, 0) / durations.length
            ),
          }
        : { sampleSize: 0, averageMs: null },
      "organisation"
    );
    sources.runSuccessFailure = ok(
      {
        succeeded: runsByStatus.succeeded || 0,
        failed: runsByStatus.failed || 0,
      },
      "organisation"
    );
  } catch {
    partial = true;
    for (const key of [
      "tasksByStatus",
      "runsByStatus",
      "projectsByStatus",
      "pendingApprovals",
      "averageRunDuration",
      "runSuccessFailure",
    ]) {
      if (!sources[key]) sources[key] = fail("CORE_UNAVAILABLE", "organisation");
    }
  }

  let projectMetrics = null;
  let projectTasksByStatus = null;
  if (projectId) {
    try {
      const summary = await buildProjectOperationalSummary({ projectId });
      const tasks = await repo.listTasks({ projectId });
      const byStatus = {};
      for (const t of tasks || []) {
        const s = t.status || "unknown";
        byStatus[s] = (byStatus[s] || 0) + 1;
      }
      projectTasksByStatus = byStatus;
      projectMetrics = {
        scope: "selected_project",
        project_id: projectId,
        canonical_objectives: summary.objectives?.length || 0,
        integration_runs: summary.integration?.runs?.length || 0,
        current_stage: summary.canonical_integration_run?.stage_label || null,
        duplicate_run_count: summary.integration?.duplicate_count || 0,
        pending_founder_actions:
          summary.next_founder_action?.severity === "action_required" ? 1 : 0,
        next_founder_action: summary.next_founder_action || null,
        runtime_tasks: (tasks || []).length,
        runtime_tasks_by_status: byStatus,
        runtime_jobs_failed: summary.runtime?.jobs_failed || 0,
        approvals_pending: summary.approvals_pending || 0,
        evidence_hint: summary.integration?.runs?.length || 0,
        memory_note: summary.integration_readiness?.integrationProofStatus || null,
      };
    } catch {
      partial = true;
      projectMetrics = { scope: "selected_project", available: false };
    }
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    projectId,
    partial,
    sources,
    scope_legend: ANALYTICS_SCOPE_LEGEND,
    leadsByStatus: sources.leadsByStatus?.available
      ? sources.leadsByStatus.value
      : null,
    leadsScope: "organisation",
    tasksByStatus: sources.tasksByStatus?.available
      ? sources.tasksByStatus.value
      : null,
    tasksScope: "organisation",
    projectTasksByStatus,
    projectTasksScope: projectId ? "selected_project" : null,
    runsByStatus: sources.runsByStatus?.available
      ? sources.runsByStatus.value
      : null,
    runsScope: "organisation",
    projectsByStatus: sources.projectsByStatus?.available
      ? sources.projectsByStatus.value
      : null,
    projectsScope: "organisation",
    pendingApprovals: sources.pendingApprovals?.available
      ? sources.pendingApprovals.value
      : null,
    runSuccessFailure: sources.runSuccessFailure?.available
      ? sources.runSuccessFailure.value
      : null,
    averageRunDuration: sources.averageRunDuration?.available
      ? sources.averageRunDuration.value
      : null,
    projectMetrics,
    reconciliation_note: projectId
      ? "Organisation task counts include all projects. Selected-project Runtime Tasks may be zero while organisation completed tasks are non-zero."
      : "Select a project to see selected-project metrics.",
  });
});
