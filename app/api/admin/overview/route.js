import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { runtimeConfigStatus } from "@/lib/core/config";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import * as repo from "@/lib/core/repo";
import { notConfigured } from "@/lib/core/errors";

export const dynamic = "force-dynamic";

async function leadStatusCounts(admin) {
  const { data, error } = await admin
    .from("leads")
    .select("status")
    .is("archived_at", null);
  if (error) throw error;
  const counts = { total: 0, new: 0, contacted: 0, converted: 0, closed: 0 };
  for (const row of data || []) {
    counts.total += 1;
    const s = row.status || "new";
    if (counts[s] !== undefined) counts[s] += 1;
  }
  return counts;
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);

  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }

  const admin = getSupabaseAdmin();
  const config = runtimeConfigStatus();

  let submissions = { total: 0, new: 0, contacted: 0, converted: 0, closed: 0 };
  let projectsActive = 0;
  let tasks = { queued: 0, in_progress: 0, blocked: 0 };
  let approvalsPending = 0;
  let runsFailed = 0;
  let recentAudit = [];

  try {
    submissions = await leadStatusCounts(admin);
  } catch {
    // leads table should exist; keep zeros on transient failure
  }

  try {
    projectsActive = await repo.countActiveProjects();
    const taskDist = await repo.countByStatus("tasks");
    tasks = {
      queued: (taskDist.pending || 0) + (taskDist.validated || 0),
      in_progress: taskDist.running || 0,
      blocked: taskDist.awaiting_approval || 0,
    };
    const approvalDist = await repo.countByStatus("approval_requests");
    approvalsPending = approvalDist.pending || 0;
    const runDist = await repo.countByStatus("agent_runs");
    runsFailed = runDist.failed || 0;
    recentAudit = await repo.listRecentAudit(5);
  } catch {
    // Core tables may be missing if runtime migration not applied yet.
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    submissions,
    projects: { active: projectsActive },
    tasks,
    approvals: { pending: approvalsPending },
    runs: { failed: runsFailed },
    runtime: {
      ok: true,
      status: "Healthy",
      service: "mianx-core",
      config,
    },
    config,
    audit: {
      recent: recentAudit,
      count: recentAudit.length,
    },
  });
});
