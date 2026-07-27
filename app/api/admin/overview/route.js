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

function sourceOk(value) {
  return { available: true, value, errorCode: null };
}
function sourceFail(code) {
  return { available: false, value: null, errorCode: code || "SOURCE_ERROR" };
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
  const sources = {};
  let partial = false;

  try {
    sources.submissions = sourceOk(await leadStatusCounts(admin));
  } catch {
    partial = true;
    sources.submissions = sourceFail("LEADS_UNAVAILABLE");
  }

  try {
    const projectsActive = await repo.countActiveProjects();
    const taskDist = await repo.countByStatus("tasks");
    const approvalDist = await repo.countByStatus("approval_requests");
    const runDist = await repo.countByStatus("agent_runs");
    let jobCounts = {};
    try {
      jobCounts = await repo.countJobsByStatus();
    } catch {
      jobCounts = {};
    }
    const recentAudit = await repo.listRecentAudit(5);

    sources.projects = sourceOk({ active: projectsActive });
    sources.tasks = sourceOk({
      queued: (taskDist.pending || 0) + (taskDist.validated || 0),
      in_progress: taskDist.running || 0,
      blocked: taskDist.awaiting_approval || 0,
    });
    sources.approvals = sourceOk({ pending: approvalDist.pending || 0 });
    sources.runs = sourceOk({ failed: runDist.failed || 0 });
    sources.jobs = sourceOk(jobCounts);
    sources.audit = sourceOk({ recent: recentAudit, count: recentAudit.length });
  } catch {
    partial = true;
    sources.projects = sources.projects || sourceFail("CORE_UNAVAILABLE");
    sources.tasks = sources.tasks || sourceFail("CORE_UNAVAILABLE");
    sources.approvals = sources.approvals || sourceFail("CORE_UNAVAILABLE");
    sources.runs = sources.runs || sourceFail("CORE_UNAVAILABLE");
    sources.jobs = sources.jobs || sourceFail("CORE_UNAVAILABLE");
    sources.audit = sources.audit || sourceFail("CORE_UNAVAILABLE");
  }

  const submissions = sources.submissions?.available
    ? sources.submissions.value
    : null;
  const projects = sources.projects?.available ? sources.projects.value : null;
  const tasks = sources.tasks?.available ? sources.tasks.value : null;
  const approvals = sources.approvals?.available ? sources.approvals.value : null;
  const runs = sources.runs?.available ? sources.runs.value : null;
  const audit = sources.audit?.available ? sources.audit.value : null;

  // Additive truthful metrics from status-count maps only (no invented KPIs).
  const jobCountMap = sources.jobs?.available ? sources.jobs.value : null;
  const runtimeMetrics = {
    data_available: Boolean(jobCountMap),
    status: jobCountMap ? "ok" : "insufficient_data",
    job_status_counts: jobCountMap
      ? { data_available: true, status: "ok", value: jobCountMap }
      : { data_available: false, status: "insufficient_data", value: null },
    dead_letter: jobCountMap
      ? {
          data_available: true,
          status: "ok",
          value: Number(jobCountMap.dead_letter) || 0,
        }
      : { data_available: false, status: "insufficient_data", value: null },
    excluded_metrics: {
      csat: {
        data_available: false,
        status: "insufficient_data",
        value: null,
        note: "CSAT is not collected by this runtime",
      },
      uptime: {
        data_available: false,
        status: "insufficient_data",
        value: null,
        note: "uptime is not derived from job stats",
      },
      savings: {
        data_available: false,
        status: "insufficient_data",
        value: null,
        note: "savings are never invented",
      },
      revenue: {
        data_available: false,
        status: "insufficient_data",
        value: null,
        note: "revenue is never invented",
      },
    },
  };

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    partial,
    sources,
    // Convenience mirrors: null when unavailable (never a misleading zero).
    submissions,
    projects,
    tasks,
    approvals,
    runs,
    jobs: sources.jobs?.available ? sources.jobs.value : null,
    runtimeMetrics,
    runtime: {
      ok: !partial,
      status: partial ? "Degraded" : "Healthy",
      service: "mianx-core",
      config,
    },
    config,
    audit,
  });
});
