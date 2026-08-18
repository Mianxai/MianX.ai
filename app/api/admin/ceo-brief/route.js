import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/admin-auth";
import { assertUuid } from "@/lib/core/validate";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import * as repo from "@/lib/core/repo";
import { runtimeConfigStatus } from "@/lib/core/config";
import { productionReadinessStatusAsync } from "@/lib/core/production-readiness";
import { buildCeoBrief } from "@/lib/core/command-center/metrics";
import { isObjectiveTask, toObjectiveSummary } from "@/lib/core/objectives";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/ceo-brief?project_id=
 * Deterministic Founder brief — no Anthropic required.
 */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured("Supabase is not configured.");
  }

  const url = new URL(req.url);
  const projectIdRaw = url.searchParams.get("project_id");
  let projectId = null;
  if (projectIdRaw) {
    assertUuid(projectIdRaw, "project_id");
    projectId = projectIdRaw;
  }

  const config = runtimeConfigStatus();
  const productionReadiness = await productionReadinessStatusAsync();

  if (!projectId) {
    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      projectId: null,
      available: false,
      note: "Select a project for a scoped CEO Brief. Cross-project synthesis is not exposed.",
      brief: buildCeoBrief({
        scheduler: config.scheduler,
        productionReadiness,
      }),
      objectives: [],
      providerSynthesis: false,
    });
  }

  const [tasks, jobsPage, runs, approvals] = await Promise.all([
    repo.listTasks({ projectId }),
    repo.listJobs({ projectId, limit: 100, offset: 0 }),
    repo.listRuns({ projectId }),
    repo.listApprovals({ projectId }),
  ]);
  const jobs = jobsPage.rows || [];

  const brief = buildCeoBrief({
    tasks,
    approvals,
    jobs,
    runs,
    scheduler: config.scheduler,
    productionReadiness,
  });

  let operationalObjectives = [];
  if (projectId) {
    try {
      const { buildProjectOperationalSummary } = await import(
        "@/lib/core/founder-operations"
      );
      const summary = await buildProjectOperationalSummary({ projectId });
      operationalObjectives = summary?.objectives || [];
      if (operationalObjectives.length > 0) {
        brief.activeObjectives = operationalObjectives.map((o) => ({
          title: o.title,
          workflow: o.source_badge,
          status: o.status,
          stage: o.stage,
        }));
        brief.blockedObjectives = operationalObjectives.filter((o) =>
          ["awaiting_approval", "clarification_required", "failed"].includes(
            o.proof_status || o.status
          )
        );
      }
      if (summary?.integration?.duplicate_warning) {
        brief.duplicateProofWarning = {
          count: summary.integration.duplicate_count,
          canonical_run_id: summary.canonical_integration_run?.id,
        };
      }
    } catch {
      /* optional */
    }
  }

  const legacyObjectives = tasks
    .filter(isObjectiveTask)
    .map((t) => toObjectiveSummary(t, { jobs, approvals }));

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    projectId,
    available: true,
    brief,
    objectives: operationalObjectives.length ? operationalObjectives : legacyObjectives,
    legacy_objectives: legacyObjectives,
    providerSynthesis: false,
    productionReadiness,
    schedule: config.scheduler,
  });
});
