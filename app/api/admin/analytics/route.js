import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import * as repo from "@/lib/core/repo";

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

function ok(value) {
  return { available: true, value, errorCode: null };
}
function fail(code) {
  return { available: false, value: null, errorCode: code };
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);

  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }

  const admin = getSupabaseAdmin();
  const sources = {};
  let partial = false;

  try {
    sources.leadsByStatus = ok(await leadsByStatus(admin));
  } catch {
    partial = true;
    sources.leadsByStatus = fail("LEADS_UNAVAILABLE");
  }

  try {
    const tasksByStatus = await repo.countByStatus("tasks");
    const runsByStatus = await repo.countByStatus("agent_runs");
    const projectsByStatus = await repo.countByStatus("projects");
    const approvals = await repo.countByStatus("approval_requests");
    sources.tasksByStatus = ok(tasksByStatus);
    sources.runsByStatus = ok(runsByStatus);
    sources.projectsByStatus = ok(projectsByStatus);
    sources.pendingApprovals = ok(approvals.pending || 0);

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
        : { sampleSize: 0, averageMs: null }
    );
    sources.runSuccessFailure = ok({
      succeeded: runsByStatus.succeeded || 0,
      failed: runsByStatus.failed || 0,
    });
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
      if (!sources[key]) sources[key] = fail("CORE_UNAVAILABLE");
    }
  }

  // Convenience mirrors: null when the source failed (never a fake empty object
  // that looks like "zero rows").
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    partial,
    sources,
    leadsByStatus: sources.leadsByStatus?.available
      ? sources.leadsByStatus.value
      : null,
    tasksByStatus: sources.tasksByStatus?.available
      ? sources.tasksByStatus.value
      : null,
    runsByStatus: sources.runsByStatus?.available
      ? sources.runsByStatus.value
      : null,
    projectsByStatus: sources.projectsByStatus?.available
      ? sources.projectsByStatus.value
      : null,
    pendingApprovals: sources.pendingApprovals?.available
      ? sources.pendingApprovals.value
      : null,
    runSuccessFailure: sources.runSuccessFailure?.available
      ? sources.runSuccessFailure.value
      : null,
    averageRunDuration: sources.averageRunDuration?.available
      ? sources.averageRunDuration.value
      : null,
  });
});
