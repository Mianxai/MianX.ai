/**
 * Read-only Founder Proof diagnostics (admin + project scoped).
 * Never mutates rows. Never fabricates empty success on query failure.
 */

import * as repo from "../repo.js";
import { assertUuid } from "../validate.js";
import { badRequest } from "../errors.js";
import {
  listPersistedIntegrationRunsResult,
  mapProofStatusFromRun,
  loadIntegrationRun,
} from "./persist.js";
import {
  isFounderProductionProofRun,
  isTerminalFounderProofRun,
  resolveCanonicalFounderProofRuns,
  formatIntegrationStageLabel,
} from "./founder-proof-canonical.js";
import { buildFounderProofStateFromRuns } from "./founder-proof-state.js";
import { listStageEvents } from "./store.js";

const KNOWN_CANONICAL_RUN_ID = "e8848aeb-388f-49b3-9b44-7ffbfa715110";

/**
 * @param {{ projectId: string, lookForRunId?: string|null }} args
 */
export async function buildProofDiagnostics({
  projectId,
  lookForRunId = KNOWN_CANONICAL_RUN_ID,
} = {}) {
  assertUuid(projectId, "project_id");

  let project;
  try {
    project = await repo.getProject(projectId);
  } catch (err) {
    if (err?.status === 404 || err?.code === "NOT_FOUND") {
      throw badRequest("Project not found, inaccessible, or archived.");
    }
    throw err;
  }

  const listed = await listPersistedIntegrationRunsResult({
    project_id: projectId,
    limit: 100,
  });

  const warnings = [];
  if (!listed.ok) {
    warnings.push(`integration_runs_query: ${listed.error || "failed"}`);
  }

  let lookedUpRun = null;
  let lookedUpError = null;
  if (
    lookForRunId &&
    typeof lookForRunId === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      lookForRunId
    )
  ) {
    try {
      lookedUpRun = await loadIntegrationRun(lookForRunId);
      if (lookedUpRun && lookedUpRun.project_id && lookedUpRun.project_id !== projectId) {
        warnings.push("looked_up_run_belongs_to_another_project");
        lookedUpRun = null;
        lookedUpError = "cross_project_run";
      }
    } catch (err) {
      lookedUpError = String(err?.message || "lookup_failed");
    }
  }

  const byId = new Map();
  for (const r of listed.runs || []) {
    if (r?.id) byId.set(r.id, r);
  }
  if (lookedUpRun?.id) byId.set(lookedUpRun.id, lookedUpRun);

  const allRuns = [...byId.values()];
  const proofRuns = allRuns.filter(isFounderProductionProofRun);
  const resolved = listed.ok
    ? resolveCanonicalFounderProofRuns(allRuns)
    : {
        canonical_run: null,
        duplicate_runs: [],
        canonical_reason: null,
        duplicate_count: null,
        duplicate_warning: false,
        active_founder_proof_run_count: null,
      };

  const uiState = buildFounderProofStateFromRuns({
    projectId,
    runs: listed.ok ? allRuns : [],
    queryError: listed.ok ? null : listed.error,
  });

  const runSummaries = proofRuns.map((run) => summarizeRun(run, resolved));

  let latestStageEvent = null;
  const focusId = resolved.canonical_run?.id || lookForRunId;
  if (focusId) {
    try {
      const events = listStageEvents(focusId) || [];
      latestStageEvent = events[events.length - 1] || null;
    } catch {
      latestStageEvent = null;
    }
  }

  return {
    ok: listed.ok,
    mutation: false,
    project: {
      id: project.id,
      name: project.name || project.title || null,
      status: project.status || null,
    },
    query: {
      source: listed.source,
      error: listed.error,
      run_count_returned: (listed.runs || []).length,
    },
    looked_up_run_id: lookForRunId || null,
    looked_up_run_found: Boolean(lookedUpRun),
    looked_up_run_error: lookedUpError,
    looked_up_run: lookedUpRun ? summarizeRun(lookedUpRun, resolved) : null,
    founder_proof_runs: runSummaries,
    canonical: {
      run_id: resolved.canonical_run?.id || null,
      reason: resolved.canonical_reason,
      eligibility: resolved.canonical_run
        ? "active_non_terminal"
        : listed.ok
          ? "none"
          : "unverified",
      selection_reason: resolved.canonical_reason,
    },
    active_proof_count: resolved.active_founder_proof_run_count,
    duplicate_count: resolved.duplicate_count,
    ui_state: {
      state: uiState.state,
      title: uiState.title,
      case_id: uiState.caseId,
      severity: uiState.severity,
    },
    latest_stage_event: latestStageEvent
      ? {
          stage: latestStageEvent.stage || latestStageEvent.to_stage || null,
          at: latestStageEvent.at || latestStageEvent.created_at || null,
          // No secrets / raw payloads
        }
      : null,
    latest_audit_event: null,
    resolver_warnings: warnings,
  };
}

function summarizeRun(run, resolved) {
  const terminal = isTerminalFounderProofRun(run);
  const proofStatus = mapProofStatusFromRun(run);
  return {
    run_id: run.id,
    created_at: run.started_at || run.created_at || null,
    updated_at: run.updated_at || null,
    current_stage: run.current_stage || null,
    current_stage_label: formatIntegrationStageLabel(run.current_stage),
    current_status: run.status || null,
    proof_status: proofStatus,
    execution_mode: run.execution_mode || run.objective?.execution_mode || null,
    terminal,
    terminal_classification: terminal ? "terminal" : "non_terminal",
    cancellation_reason:
      run.proof?.cancellation_reason ||
      run.payload?.cancellation_reason ||
      (run.proof?.cancelled_as_duplicate ? "cancelled_as_duplicate" : null),
    completion_reason: run.proof?.completion_reason || run.payload?.completion_reason || null,
    canonical_eligibility: !terminal && isFounderProductionProofRun(run),
    is_canonical: resolved.canonical_run?.id === run.id,
    objective_title: run.objective?.title || run.objective_title || null,
  };
}
