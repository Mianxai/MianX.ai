import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured, badRequest } from "@/lib/core/errors";
import { requireAdminUser, CAPABILITIES, hasCapability } from "@/lib/admin-auth";
import { isPlatformAdminRole } from "@/lib/admin-capabilities";
import { assertUuid } from "@/lib/core/validate";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import * as repo from "@/lib/core/repo";
import { buildProjectOperationalSummary } from "@/lib/core/founder-operations";
import { listPersistedIntegrationRuns } from "@/lib/core/integration/persist";
import { listRuns as listIntegrationRunsInMemory } from "@/lib/core/integration/store";
import { deriveFounderProofAnalytics } from "@/lib/admin-analytics-proof";
import {
  ANALYTICS_SCOPE_LEGEND,
  analyticsMetricOk as ok,
  analyticsMetricFail as fail,
} from "@/lib/admin-analytics-scope";
import { requireProjectAccess } from "@/lib/tenant/project-access";

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

function mergeIntegrationRuns(projectId, persisted = []) {
  const memory = listIntegrationRunsInMemory(
    projectId ? { project_id: projectId } : {}
  );
  const byId = new Map();
  for (const r of persisted) {
    if (r?.id) byId.set(r.id, r);
  }
  for (const r of memory) {
    if (r?.id) byId.set(r.id, r);
  }
  return [...byId.values()];
}

function sumStatusMap(map) {
  if (!map || typeof map !== "object") return 0;
  return Object.values(map).reduce(
    (acc, v) => acc + (typeof v === "number" && Number.isFinite(v) ? v : 0),
    0
  );
}

export const GET = withErrorHandling(async (req) => {
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    await requireAdminUser(req);
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }

  const url = new URL(req.url);
  const projectIdRaw = url.searchParams.get("project_id");
  let projectId = null;
  let platformAdmin = false;

  if (projectIdRaw) {
    assertUuid(projectIdRaw, "project_id");
    projectId = projectIdRaw;
    const { authCtx } = await requireProjectAccess(req, projectId);
    platformAdmin =
      isPlatformAdminRole(authCtx?.membership?.role, authCtx?.mode) ||
      hasCapability(authCtx?.capabilities || [], CAPABILITIES.PLATFORM_ADMIN);
  } else {
    const authCtx = await requireAdminUser(req);
    platformAdmin =
      isPlatformAdminRole(authCtx?.membership?.role, authCtx?.mode) ||
      hasCapability(authCtx?.capabilities || [], CAPABILITIES.PLATFORM_ADMIN);
    if (!platformAdmin) {
      throw badRequest(
        "project_id is required for tenant Admin analytics. Platform Admin may omit it for explicit organisation-wide metrics."
      );
    }
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

  let orgTasksByStatus = null;
  let orgRunsByStatus = null;

  try {
    if (platformAdmin && !projectId) {
      const tasksByStatus = await repo.countByStatus("tasks");
      const runsByStatus = await repo.countByStatus("agent_runs");
      const projectsByStatus = await repo.countByStatus("projects");
      const approvals = await repo.countByStatus("approval_requests");
      orgTasksByStatus = tasksByStatus;
      orgRunsByStatus = runsByStatus;
      sources.tasksByStatus = ok(tasksByStatus, "organisation");
      sources.runsByStatus = ok(runsByStatus, "organisation");
      sources.projectsByStatus = ok(projectsByStatus, "organisation");
      sources.pendingApprovals = ok(approvals.pending || 0, "organisation");

      // Org-wide listRuns only for explicit platform.admin (never tenant Admin).
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
    } else if (projectId) {
      const tasks = await repo.listTasks({ projectId });
      const runs = await repo.listRuns({ projectId });
      const tasksByStatus = {};
      const runsByStatus = {};
      for (const t of tasks || []) {
        const s = t.status || "unknown";
        tasksByStatus[s] = (tasksByStatus[s] || 0) + 1;
      }
      for (const r of runs || []) {
        const s = r.status || "unknown";
        runsByStatus[s] = (runsByStatus[s] || 0) + 1;
      }
      sources.tasksByStatus = ok(tasksByStatus, "selected_project");
      sources.runsByStatus = ok(runsByStatus, "selected_project");
      sources.projectsByStatus = ok({ active: 1 }, "selected_project");
      const pending = await repo.listApprovals({
        projectId,
        status: "pending",
      });
      sources.pendingApprovals = ok((pending || []).length, "selected_project");
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
        "selected_project"
      );
      sources.runSuccessFailure = ok(
        {
          succeeded: runsByStatus.succeeded || 0,
          failed: runsByStatus.failed || 0,
        },
        "selected_project"
      );
    }
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
      if (!sources[key]) {
        sources[key] = fail(
          "CORE_UNAVAILABLE",
          projectId ? "selected_project" : "organisation"
        );
      }
    }
  }

  let projectMetrics = null;
  let projectTasksByStatus = null;
  let founderProofMetrics = null;
  let runtimeTasksTotal = null;
  let runtimeAgentRunsTotal = null;

  // Founder Proof / Historical Runs — org-wide or project-scoped from real runs.
  try {
    const persisted = await listPersistedIntegrationRuns({
      project_id: projectId,
      limit: projectId ? 100 : 200,
    });
    const merged = mergeIntegrationRuns(projectId, persisted);
    const derived = deriveFounderProofAnalytics(merged);
    const scope = projectId ? "selected_project" : "organisation";
    founderProofMetrics = {
      scope,
      available: true,
      ...derived,
      labels: {
        historical_integration_runs: "Founder Proof / Historical Runs",
      },
    };
    sources.founderProofMetrics = ok(founderProofMetrics, scope);
  } catch {
    partial = true;
    founderProofMetrics = {
      scope: projectId ? "selected_project" : "organisation",
      available: false,
    };
    sources.founderProofMetrics = fail(
      "INTEGRATION_UNAVAILABLE",
      projectId ? "selected_project" : "organisation"
    );
  }

  if (projectId) {
    try {
      const summary = await buildProjectOperationalSummary({ projectId });
      const tasks = await repo.listTasks({ projectId });
      const agentRuns = await repo.listRuns({ projectId });
      const byStatus = {};
      for (const t of tasks || []) {
        const s = t.status || "unknown";
        byStatus[s] = (byStatus[s] || 0) + 1;
      }
      projectTasksByStatus = byStatus;
      runtimeTasksTotal = (tasks || []).length;
      runtimeAgentRunsTotal = (agentRuns || []).length;

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
        runtime_tasks: runtimeTasksTotal,
        runtime_agent_runs: runtimeAgentRunsTotal,
        runtime_tasks_by_status: byStatus,
        runtime_jobs_failed: summary.runtime?.jobs_failed || 0,
        approvals_pending: summary.approvals_pending || 0,
        evidence_hint: summary.integration?.runs?.length || 0,
        memory_note: summary.integration_readiness?.integrationProofStatus || null,
        active_founder_proofs:
          summary.integration?.active_founder_proof_run_count ??
          founderProofMetrics?.active_founder_proofs ??
          null,
        waiting_for_founder_action:
          founderProofMetrics?.waiting_for_founder_action ?? null,
        completed_proofs: founderProofMetrics?.completed_proofs ?? null,
        cancelled_proofs: founderProofMetrics?.cancelled_proofs ?? null,
      };
    } catch {
      partial = true;
      projectMetrics = { scope: "selected_project", available: false };
    }
  } else {
    runtimeTasksTotal = sumStatusMap(orgTasksByStatus);
    runtimeAgentRunsTotal = sumStatusMap(orgRunsByStatus);
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
    tasksScope: projectId ? "selected_project" : "organisation",
    projectTasksByStatus,
    projectTasksScope: projectId ? "selected_project" : null,
    runsByStatus: sources.runsByStatus?.available
      ? sources.runsByStatus.value
      : null,
    runsScope: projectId ? "selected_project" : "organisation",
    projectsByStatus: sources.projectsByStatus?.available
      ? sources.projectsByStatus.value
      : null,
    projectsScope: projectId ? "selected_project" : "organisation",
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
    founderProofMetrics,
    runtimeTasks: {
      scope: projectId ? "selected_project" : "organisation",
      value: runtimeTasksTotal,
      available: runtimeTasksTotal != null,
    },
    runtimeAgentRuns: {
      scope: projectId ? "selected_project" : "organisation",
      value: runtimeAgentRunsTotal,
      available: runtimeAgentRunsTotal != null,
    },
    platformAdminOrgWide: Boolean(platformAdmin && !projectId),
    reconciliation_note: projectId
      ? "Selected-project metrics are scoped to the authorized project. Cancelled Founder Proofs are historical and are not counted as active."
      : "Organisation-wide analytics require platform.admin. Tenant Admins must pass project_id.",
  });
});
