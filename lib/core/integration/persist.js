/**
 * Durable Supabase persistence for Phase H integration runs.
 * Full run body lives in payload JSONB; never stores secrets.
 */

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { probeTablePresent } from "../schema-probes.js";

const REQUIRED_TABLES = [
  "integration_runs",
  "integration_stage_events",
  "integration_checkpoints",
  "integration_evidence_manifests",
  "integration_failure_events",
];

function isUuid(value) {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    )
  );
}

/**
 * Capability booleans only — no row data, no secrets.
 */
export async function probeIntegrationSchemaCapabilities() {
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    return {
      supabaseConfigured: false,
      tables: Object.fromEntries(REQUIRED_TABLES.map((t) => [t, false])),
      allPresent: false,
      anyUnknown: false,
    };
  }

  const results = await Promise.all(
    REQUIRED_TABLES.map(async (table) => [table, await probeTablePresent(table)])
  );
  const tables = {};
  let allPresent = true;
  let anyUnknown = false;
  for (const [table, state] of results) {
    tables[table] = state === "present";
    if (state !== "present") allPresent = false;
    if (state === "unknown") anyUnknown = true;
  }
  return {
    supabaseConfigured: true,
    tables,
    allPresent,
    anyUnknown,
  };
}

export async function integrationPersistenceStatus() {
  const caps = await probeIntegrationSchemaCapabilities();
  if (!caps.supabaseConfigured) {
    return {
      durable: false,
      backend: "unavailable",
      reason: "supabase_unconfigured",
      failClosed: isProductionLike(),
      capabilities: caps.tables,
    };
  }
  if (caps.anyUnknown) {
    return {
      durable: false,
      backend: "unknown",
      reason: "schema_probe_unknown",
      failClosed: isProductionLike(),
      capabilities: caps.tables,
    };
  }
  if (!caps.allPresent) {
    return {
      durable: false,
      backend: "in-memory-fallback",
      reason: "integration_tables_missing",
      failClosed: isProductionLike(),
      capabilities: caps.tables,
    };
  }
  return {
    durable: true,
    backend: "supabase",
    reason: null,
    failClosed: false,
    capabilities: caps.tables,
  };
}

export function isProductionLike() {
  return (
    process.env.VERCEL === "1" ||
    process.env.NODE_ENV === "production" ||
    process.env.MIANX_REQUIRE_DURABLE_INTEGRATION === "1"
  );
}

/**
 * Persist a run snapshot. Returns { ok, durable, reason }.
 */
export async function persistIntegrationRun(run) {
  if (!run?.id) return { ok: false, durable: false, reason: "missing_run" };
  const status = await integrationPersistenceStatus();
  if (!status.durable) {
    if (status.failClosed) {
      return { ok: false, durable: false, reason: status.reason, failClosed: true };
    }
    return { ok: true, durable: false, reason: status.reason || "in_memory_only" };
  }

  const admin = getSupabaseAdmin();
  const rowId = isUuid(run.id) ? run.id : undefined;
  const row = {
    ...(rowId ? { id: rowId } : {}),
    organization_id: isUuid(run.organization_id) ? run.organization_id : null,
    project_id: isUuid(run.project_id) ? run.project_id : null,
    objective_id: run.lineage?.objective_id || run.objective_id || run.objective?.id || null,
    template_selection_id: run.lineage?.template_selection_id || null,
    planning_plan_id: run.lineage?.planning_plan_id || null,
    execution_preview_id: run.lineage?.execution_preview_id || null,
    execution_run_id: run.lineage?.execution_run_id || run.simulation_id || null,
    approval_gate_id: run.lineage?.approval_gate_id || null,
    current_stage: run.current_stage,
    execution_mode: run.execution_mode || "deterministic_simulation",
    status: run.status,
    started_at: run.started_at || new Date().toISOString(),
    updated_at: run.updated_at || new Date().toISOString(),
    completed_at: run.completed_at || null,
    failure_reason: run.failure_reason || null,
    retry_count: run.retry_count || 0,
    recovery_count: run.recovery_count || 0,
    correlation_id: run.correlation_id,
    trace_id: run.trace_id,
    payload: {
      run,
      engine_run_id: run.id,
      proof_status: run.proof_status || null,
      secrets_included: false,
    },
    audit_metadata: {
      fabricated_execution: Boolean(run.fabricated_execution),
      provider_called: Boolean(run.provider_called),
    },
  };

  try {
    if (rowId) {
      const { error } = await admin.from("integration_runs").upsert(row, { onConflict: "id" });
      if (error) throw error;
    } else {
      // Non-UUID engine ids: upsert by scanning payload is unsafe; insert new row keyed in payload.
      const { data: existing } = await admin
        .from("integration_runs")
        .select("id")
        .eq("correlation_id", run.correlation_id)
        .limit(1)
        .maybeSingle();
      if (existing?.id) {
        const { error } = await admin
          .from("integration_runs")
          .update(row)
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await admin.from("integration_runs").insert([row]);
        if (error) throw error;
      }
    }
    return { ok: true, durable: true, reason: null };
  } catch (err) {
    return {
      ok: false,
      durable: false,
      reason: "persist_failed",
      failClosed: status.failClosed,
      message: String(err?.message || "persist_failed").slice(0, 120),
    };
  }
}

/**
 * Insert-only persistence for deterministic run ids.
 * - Prevents overwriting existing integration_runs rows on conflict.
 * - Returns the existing run when a unique insert conflict happens.
 */
export async function persistIntegrationRunInsertOnly(run) {
  if (!run?.id) return { ok: false, durable: false, reason: "missing_run" };
  const status = await integrationPersistenceStatus();
  if (!status.durable) {
    if (status.failClosed) {
      return { ok: false, durable: false, reason: status.reason, failClosed: true };
    }
    return { ok: true, durable: false, reason: status.reason || "in_memory_only" };
  }

  const admin = getSupabaseAdmin();
  const rowId = isUuid(run.id) ? run.id : undefined;
  if (!rowId) {
    return {
      ok: false,
      durable: false,
      reason: "run_id_not_uuid",
      failClosed: status.failClosed,
    };
  }

  const row = {
    id: rowId,
    organization_id: isUuid(run.organization_id) ? run.organization_id : null,
    project_id: isUuid(run.project_id) ? run.project_id : null,
    objective_id: run.lineage?.objective_id || run.objective_id || run.objective?.id || null,
    template_selection_id: run.lineage?.template_selection_id || null,
    planning_plan_id: run.lineage?.planning_plan_id || null,
    execution_preview_id: run.lineage?.execution_preview_id || null,
    execution_run_id: run.lineage?.execution_run_id || run.simulation_id || null,
    approval_gate_id: run.lineage?.approval_gate_id || null,
    current_stage: run.current_stage,
    execution_mode: run.execution_mode || "deterministic_simulation",
    status: run.status,
    started_at: run.started_at || new Date().toISOString(),
    updated_at: run.updated_at || new Date().toISOString(),
    completed_at: run.completed_at || null,
    failure_reason: run.failure_reason || null,
    retry_count: run.retry_count || 0,
    recovery_count: run.recovery_count || 0,
    correlation_id: run.correlation_id,
    trace_id: run.trace_id,
    payload: {
      run,
      engine_run_id: run.id,
      proof_status: run.proof_status || null,
      secrets_included: false,
    },
    audit_metadata: {
      fabricated_execution: Boolean(run.fabricated_execution),
      provider_called: Boolean(run.provider_called),
    },
  };

  try {
    const { error } = await admin.from("integration_runs").insert([row]);
    if (!error) {
      return { ok: true, durable: true, reason: null, inserted: true, run };
    }

    if (error.code === "23505") {
      const { data: existing, error: selErr } = await admin
        .from("integration_runs")
        .select("payload")
        .eq("id", rowId)
        .maybeSingle();
      if (selErr) throw selErr;
      return {
        ok: true,
        durable: true,
        reason: null,
        inserted: false,
        run: existing?.payload?.run || null,
        conflict: true,
      };
    }

    throw error;
  } catch (err) {
    return {
      ok: false,
      durable: false,
      reason: "insert_failed",
      failClosed: status.failClosed,
      message: String(err?.message || "insert_failed").slice(0, 120),
    };
  }
}

export async function loadIntegrationRun(engineRunId) {
  const status = await integrationPersistenceStatus();
  if (!status.durable) return null;
  const admin = getSupabaseAdmin();
  if (isUuid(engineRunId)) {
    const { data, error } = await admin
      .from("integration_runs")
      .select("payload")
      .eq("id", engineRunId)
      .maybeSingle();
    if (error || !data) return null;
    return data.payload?.run || null;
  }
  const { data, error } = await admin
    .from("integration_runs")
    .select("payload")
    .filter("payload->>engine_run_id", "eq", engineRunId)
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return data.payload?.run || null;
}

/**
 * List persisted integration runs.
 * Prefer {@link listPersistedIntegrationRunsResult} when callers must distinguish
 * query failure from an empty result set.
 */
export async function listPersistedIntegrationRuns({ project_id = null, limit = 50 } = {}) {
  const result = await listPersistedIntegrationRunsResult({ project_id, limit });
  return result.runs;
}

/**
 * @returns {Promise<{
 *   ok: boolean,
 *   runs: object[],
 *   error: string|null,
 *   source: string,
 * }>}
 */
export async function listPersistedIntegrationRunsResult({
  project_id = null,
  limit = 50,
} = {}) {
  const status = await integrationPersistenceStatus();
  if (!status.durable) {
    return {
      ok: false,
      runs: [],
      error: status.reason || "Integration persistence unavailable",
      source: "unavailable",
    };
  }
  const admin = getSupabaseAdmin();
  if (!admin) {
    return {
      ok: false,
      runs: [],
      error: "Supabase admin client unavailable",
      source: "unavailable",
    };
  }
  let q = admin
    .from("integration_runs")
    .select("id, project_id, payload, updated_at, current_stage, status, started_at, completed_at")
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (isUuid(project_id)) q = q.eq("project_id", project_id);
  const { data, error } = await q;
  if (error) {
    return {
      ok: false,
      runs: [],
      error: String(error.message || error.code || "integration_runs_query_failed"),
      source: "query_failed",
    };
  }
  const runs = (data || [])
    .map((row) => hydratePersistedRunRow(row))
    .filter(Boolean);
  return { ok: true, runs, error: null, source: "persisted_integration_runs" };
}

function hydratePersistedRunRow(row) {
  if (!row) return null;
  const payloadRun = row.payload?.run || {};
  if (!payloadRun?.id && !row.id) return null;
  return {
    ...payloadRun,
    id: payloadRun.id || row.id,
    project_id: payloadRun.project_id || row.project_id,
    current_stage: row.current_stage || payloadRun.current_stage,
    status: row.status || payloadRun.status,
    started_at: payloadRun.started_at || row.started_at,
    completed_at: payloadRun.completed_at || row.completed_at,
    updated_at: row.updated_at || payloadRun.updated_at,
    proof: payloadRun.proof || row.payload?.proof,
    payload: payloadRun.payload || row.payload,
  };
}

export async function loadProofTimestamps() {
  // Lazy import avoids circular init with founder-proof-canonical.
  const { resolveCanonicalFounderProofRuns, isFounderProductionProofRun } =
    await import("./founder-proof-canonical.js");

  const emptyCounts = {
    lastSuccessfulSimulationAt: null,
    lastFailedSimulationAt: null,
    lastProofStartedAt: null,
    lastProofCompletedAt: null,
    integrationProofStatus: "not_started",
    canonicalActiveProofStatus: null,
    canonicalActiveProofStage: null,
    activeProofCount: null,
    duplicateActiveProofCount: null,
    proofQueryError: null,
    proofResolverOk: false,
  };

  const status = await integrationPersistenceStatus();
  if (!status.durable) {
    return {
      ...emptyCounts,
      integrationProofStatus: "unknown",
      proofQueryError: status.reason || "persistence_unavailable",
      source: "unavailable",
    };
  }
  const admin = getSupabaseAdmin();
  if (!admin) {
    return {
      ...emptyCounts,
      integrationProofStatus: "unknown",
      proofQueryError: "supabase_admin_unavailable",
      source: "unavailable",
    };
  }
  const { data, error } = await admin
    .from("integration_runs")
    .select("id, project_id, payload, status, current_stage, started_at, completed_at, updated_at")
    .order("updated_at", { ascending: false })
    .limit(100);
  if (error) {
    return {
      ...emptyCounts,
      integrationProofStatus: "unknown",
      // Never coerce query failure into activeProofCount: 0.
      proofQueryError: String(error.message || error.code || "integration_runs_query_failed"),
      source: "query_failed",
    };
  }

  const runs = (data || []).map((row) => hydratePersistedRunRow(row)).filter(Boolean);
  const proofRuns = runs.filter(isFounderProductionProofRun);
  const resolved = resolveCanonicalFounderProofRuns(runs);

  let lastSuccessfulSimulationAt = null;
  let lastFailedSimulationAt = null;
  let lastProofStartedAt = null;
  let lastProofCompletedAt = null;
  let integrationProofStatus = "not_started";

  for (const run of proofRuns) {
    if (!lastProofStartedAt) {
      lastProofStartedAt = run.started_at || null;
    }
    if (run.current_stage === "completed" || run.status === "completed") {
      if (!lastSuccessfulSimulationAt) {
        lastSuccessfulSimulationAt = run.completed_at || run.updated_at;
      }
      if (!lastProofCompletedAt) {
        lastProofCompletedAt = run.completed_at || run.updated_at;
      }
    }
    if (run.current_stage === "failed" || run.status === "failed") {
      if (!lastFailedSimulationAt) {
        lastFailedSimulationAt = run.completed_at || run.updated_at;
      }
    }
    if (integrationProofStatus === "not_started") {
      integrationProofStatus = mapProofStatusFromRun(run);
    }
  }

  const canonical = resolved.canonical_run;
  const canonicalActiveProofStatus = canonical ? mapProofStatusFromRun(canonical) : null;
  const canonicalActiveProofStage = canonical?.current_stage || null;
  const activeProofCount = resolved.active_founder_proof_run_count;
  const duplicateActiveProofCount = resolved.duplicate_count;

  if (canonicalActiveProofStatus) {
    integrationProofStatus = canonicalActiveProofStatus;
  } else if (lastProofCompletedAt && integrationProofStatus === "not_started") {
    integrationProofStatus = "completed";
  } else if (!proofRuns.length) {
    integrationProofStatus = "not_started";
  }

  return {
    lastSuccessfulSimulationAt,
    lastFailedSimulationAt,
    lastProofStartedAt,
    lastProofCompletedAt,
    integrationProofStatus,
    canonicalActiveProofStatus,
    canonicalActiveProofStage,
    activeProofCount,
    duplicateActiveProofCount,
    proofQueryError: null,
    proofResolverOk: true,
    // No project ids / titles — public health only.
    source: "persisted_integration_runs",
  };
}

export function mapProofStatusFromRun(run) {
  if (!run) return "not_started";
  const stage = run.current_stage;
  const status = run.status;
  if (stage === "completed" || status === "completed") return "completed";
  if (stage === "rejected" || status === "rejected") return "rejected";
  if (stage === "failed" || status === "failed") return "failed";
  if (
    stage === "cancelled" ||
    stage === "cancelled_duplicate" ||
    stage === "archived_duplicate" ||
    status === "cancelled" ||
    run?.proof?.cancelled_as_duplicate
  ) {
    return "cancelled";
  }
  if (stage === "paused" || status === "paused") return "paused";
  if (stage === "founder_final_review") return "awaiting_final_review";
  if (stage === "clarification_required") return "clarification_required";
  if (stage === "founder_approval_required") return "awaiting_plan_approval";
  if (stage === "simulation_approval_required") return "awaiting_simulation_approval";
  if (stage === "approved_for_simulation") return "simulation_approved";
  if (
    [
      "workforce_allocated",
      "tasks_claimed",
      "collaboration_running",
      "verification_running",
      "memory_writing",
      "learning_proposals_created",
    ].includes(stage)
  ) {
    return "simulation_running";
  }
  if (run.recovery_count > 0 && status === "active") return "recovering";
  if (stage === "objective_received" || stage === "objective_validated") {
    return "objective_created";
  }
  return "objective_created";
}

export { REQUIRED_TABLES };
