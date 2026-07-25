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

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);

  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }

  const admin = getSupabaseAdmin();
  let leadsByStatusMap = {};
  let tasksByStatus = {};
  let runsByStatus = {};
  let projectsByStatus = {};
  let pendingApprovals = 0;
  let runDurations = { sampleSize: 0, averageMs: null };

  try {
    leadsByStatusMap = await leadsByStatus(admin);
  } catch {
    leadsByStatusMap = {};
  }

  try {
    tasksByStatus = await repo.countByStatus("tasks");
    runsByStatus = await repo.countByStatus("agent_runs");
    projectsByStatus = await repo.countByStatus("projects");
    const approvals = await repo.countByStatus("approval_requests");
    pendingApprovals = approvals.pending || 0;

    // Average duration only when started_at and finished_at are present.
    const runs = await repo.listRuns({});
    const durations = [];
    for (const r of runs || []) {
      if (r.started_at && r.finished_at) {
        const ms = new Date(r.finished_at) - new Date(r.started_at);
        if (Number.isFinite(ms) && ms >= 0) durations.push(ms);
      }
    }
    if (durations.length > 0) {
      runDurations = {
        sampleSize: durations.length,
        averageMs: Math.round(
          durations.reduce((a, b) => a + b, 0) / durations.length
        ),
      };
    }
  } catch {
    // Runtime tables optional until migration applied.
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    leadsByStatus: leadsByStatusMap,
    tasksByStatus,
    runsByStatus,
    projectsByStatus,
    pendingApprovals,
    runSuccessFailure: {
      succeeded: runsByStatus.succeeded || 0,
      failed: runsByStatus.failed || 0,
    },
    averageRunDuration: runDurations,
  });
});
