/**
 * Canonical read-only project operational summary for Founder control plane.
 */

import * as repo from "../repo.js";
import { runtimeConfigStatus } from "../config.js";
import { productionReadinessStatusAsync } from "../production-readiness.js";
import { isObjectiveTask, toObjectiveSummary } from "../objectives/index.js";
import {
  listRuns as listIntegrationRunsInMemory,
  saveRun,
  getRun,
} from "../integration/store.js";
import {
  listPersistedIntegrationRuns,
  mapProofStatusFromRun,
} from "../integration/persist.js";
import {
  resolveCanonicalFounderProofRuns,
  isFounderProductionProofRun,
  formatIntegrationStageLabel,
  deriveNextFounderProofAction,
  isLiveProviderRunBlocked,
} from "../integration/founder-proof-canonical.js";
import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "../integration/proof.js";
import { assessProviderGate } from "../integration/provider-gate.js";
import { buildIntegrationReadinessAsync } from "../integration/readiness.js";

function mergeIntegrationRuns(projectId, persisted = []) {
  const memory = listIntegrationRunsInMemory({ project_id: projectId });
  const byId = new Map();
  for (const r of persisted) {
    if (r?.id) byId.set(r.id, r);
  }
  for (const r of memory) {
    if (r?.id) byId.set(r.id, r);
  }
  return [...byId.values()];
}

export function buildObjectiveRegistryEntries({
  projectId,
  tasks = [],
  integrationRuns = [],
  canonicalRun = null,
  approvals = [],
  jobs = [],
}) {
  const entries = [];
  const seen = new Set();

  for (const t of tasks.filter(isObjectiveTask)) {
    const summary = toObjectiveSummary(t, { approvals, jobs });
    entries.push({
      source_type: "founder_runtime",
      source_badge: "General Founder Objective",
      id: t.id,
      project_id: projectId,
      title: summary.title,
      status: summary.status,
      stage: summary.workflowStage || summary.status,
      associated_run_id: null,
      created_at: t.created_at,
      required_action: summary.status === "awaiting_approval" ? "Review objective" : null,
      href: `/admin/objectives?project_id=${encodeURIComponent(projectId)}&id=${encodeURIComponent(t.id)}`,
    });
    seen.add(`task:${t.id}`);
  }

  const proofRuns = integrationRuns.filter(isFounderProductionProofRun);
  for (const run of proofRuns) {
    const key = `irun:${run.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const ps = mapProofStatusFromRun(run);
    entries.push({
      source_type: "integration_proof",
      source_badge: "Production Proof Objective",
      id: run.objective?.id || run.lineage?.objective_id || run.id,
      project_id: projectId,
      title: run.objective?.title || FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title,
      status: run.status,
      stage: formatIntegrationStageLabel(run.current_stage),
      proof_status: ps,
      associated_run_id: run.id,
      is_canonical: canonicalRun?.id === run.id,
      created_at: run.started_at || run.created_at,
      required_action: deriveNextFounderProofAction({
        canonical_run: run.id === canonicalRun?.id ? run : null,
        proof_status: ps,
        run_stage: run.current_stage,
        duplicate_warning: false,
      }).label,
      href: `/admin/integration?project_id=${encodeURIComponent(projectId)}&run_id=${encodeURIComponent(run.id)}`,
    });
  }

  return entries;
}

/**
 * @param {{ projectId: string, organizationId?: string|null }} opts
 */
export async function buildProjectOperationalSummary({ projectId }) {
  if (!projectId) {
    return {
      ok: false,
      project_id: null,
      note: "Select a project for operational summary.",
    };
  }

  const [tasks, jobsPage, runs, approvals, readiness, integrationReadiness] =
    await Promise.all([
      repo.listTasks({ projectId }),
      repo.listJobs({ projectId, limit: 100, offset: 0 }),
      repo.listRuns({ projectId }),
      repo.listApprovals({ projectId }),
      productionReadinessStatusAsync(),
      buildIntegrationReadinessAsync({}),
    ]);

  const jobs = jobsPage?.rows || [];
  const config = runtimeConfigStatus();
  const persisted = await listPersistedIntegrationRuns({
    project_id: projectId,
    limit: 50,
  });
  for (const run of persisted) {
    if (run?.id && !getRun(run.id)) saveRun(run);
  }

  const integrationRuns = mergeIntegrationRuns(projectId, persisted);
  const canonicalResolution = resolveCanonicalFounderProofRuns(integrationRuns);
  const canonicalRun = canonicalResolution.canonical_run;

  const proofStatus = canonicalRun
    ? mapProofStatusFromRun(canonicalRun)
    : integrationReadiness.integrationProofStatus || "not_started";

  const nextAction = deriveNextFounderProofAction({
    duplicate_warning: canonicalResolution.duplicate_warning,
    canonical_run: canonicalRun,
    proof_status: proofStatus,
    run_stage: canonicalRun?.current_stage,
  });

  const objectives = buildObjectiveRegistryEntries({
    projectId,
    tasks,
    integrationRuns,
    canonicalRun,
    approvals,
    jobs,
  });

  const providerGate = assessProviderGate({
    execution_mode: "live_provider",
  });

  const integrationRunSummaries = integrationRuns.map((r) => ({
    id: r.id,
    project_id: r.project_id,
    stage: r.current_stage,
    stage_label: formatIntegrationStageLabel(r.current_stage),
    status: r.status,
    proof_status: mapProofStatusFromRun(r),
    mode: r.execution_mode,
    objective_title: r.objective?.title,
    is_production_proof: isFounderProductionProofRun(r),
    is_canonical_active: canonicalRun?.id === r.id,
    is_duplicate_active:
      canonicalResolution.duplicate_runs.some((d) => d.id === r.id),
    live_provider_blocked: isLiveProviderRunBlocked(r),
    started_at: r.started_at,
    updated_at: r.updated_at,
  }));

  return {
    ok: true,
    generated_at: new Date().toISOString(),
    project_id: projectId,
    canonical_integration_run: canonicalRun
      ? {
          id: canonicalRun.id,
          stage: canonicalRun.current_stage,
          stage_label: formatIntegrationStageLabel(canonicalRun.current_stage),
          status: canonicalRun.status,
          proof_status: proofStatus,
          execution_mode: canonicalRun.execution_mode,
          correlation_id: canonicalRun.correlation_id,
          trace_id: canonicalRun.trace_id,
          live_provider_blocked: isLiveProviderRunBlocked(canonicalRun),
          started_at: canonicalRun.started_at,
        }
      : null,
    integration: {
      runs: integrationRunSummaries,
      duplicate_runs: canonicalResolution.duplicate_runs.map((r) => ({
        id: r.id,
        stage: r.current_stage,
        stage_label: formatIntegrationStageLabel(r.current_stage),
        status: r.status,
        proof_status: mapProofStatusFromRun(r),
        execution_mode: r.execution_mode,
        mode: r.execution_mode,
        started_at: r.started_at,
        live_provider_blocked: isLiveProviderRunBlocked(r),
      })),
      canonical_reason: canonicalResolution.canonical_reason,
      duplicate_count: canonicalResolution.duplicate_count,
      duplicate_warning: canonicalResolution.duplicate_warning,
      active_founder_proof_run_count:
        canonicalResolution.active_founder_proof_run_count,
    },
    objectives,
    approvals_pending: approvals.filter((a) => a.status === "pending").length,
    runtime: {
      tasks_queued: tasks.filter((t) =>
        ["pending", "validated"].includes(t.status)
      ).length,
      tasks_failed: tasks.filter((t) => t.status === "failed").length,
      jobs_failed: jobs.filter((j) => j.status === "failed").length,
    },
    scheduler: config.scheduler,
    provider: {
      status: readiness?.provider || "unknown",
      live_execution_ready: providerGate.live_execution_ready,
      note: providerGate.live_execution_ready
        ? null
        : "Live provider execution is not ready — deterministic simulation only.",
    },
    integration_readiness: {
      simulationReady: integrationReadiness.simulationReady,
      integrationPersistenceReady: integrationReadiness.integrationPersistenceReady,
      integrationProofStatus: integrationReadiness.integrationProofStatus,
    },
    next_founder_action: nextAction,
    source_of_truth: "project_operational_summary_v1",
  };
}
