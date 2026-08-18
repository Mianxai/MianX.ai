/**
 * Durable persistence helper for pilot_runs (Phase II.1 schema).
 * No new migration. Uses memory always; dual-writes to Supabase when configured.
 */

import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

function toRow(run) {
  return {
    id: run.id,
    project_id: run.projectId,
    task_id: run.taskId,
    agent_definition_id: run.agentDefinitionId,
    agent_instance_id: run.agentInstanceId,
    approval_id: run.approvalId,
    provider: run.provider,
    model: run.model,
    status: run.status,
    attempt: run.attempt,
    lease_owner: run.leaseOwner,
    lease_expires_at: run.leaseExpiresAt,
    idempotency_key: run.idempotencyKey,
    input_hash: run.inputHash,
    output_hash: run.outputHash,
    input_tokens: run.inputTokens,
    output_tokens: run.outputTokens,
    total_tokens: run.totalTokens,
    estimated_cost_usd: run.estimatedCostUsd,
    started_at: run.startedAt,
    ended_at: run.endedAt,
    failure_classification: run.failureClassification,
    evidence_refs: run.evidenceRefs || [],
    fabricated: Boolean(run.fabricated),
    simulated: Boolean(run.simulated),
    live: Boolean(run.live),
    // Never persist full prompts to JSON payload in DB evidence surface —
    // store hashes/metadata only.
    payload: {
      promptVersion: run.payload?.promptVersion || null,
      promptHash: run.payload?.promptHash || null,
      preflightCostUsd: run.payload?.preflightCostUsd ?? null,
      queueSource: run.payload?.queueSource || null,
      schedulerCreated: false,
      pricingVersion: run.payload?.pricingVersion || null,
    },
  };
}

/**
 * Persist a pilot run. When Supabase is configured, DB write is required
 * (not memory-only). When not configured (local/tests), memory store alone is OK.
 */
export async function persistPilotRunToSupabase(run) {
  if (!isSupabaseConfigured()) {
    return { ok: true, required: false, backend: "memory" };
  }
  try {
    const admin = getSupabaseAdmin();
    if (!admin) return { ok: false, required: true, backend: "supabase" };
    const { error } = await admin.from("pilot_runs").upsert(toRow(run), {
      onConflict: "id",
    });
    if (error) {
      return { ok: false, required: true, backend: "supabase", error: error.message };
    }
    return { ok: true, required: true, backend: "supabase" };
  } catch (err) {
    return {
      ok: false,
      required: true,
      backend: "supabase",
      error: err?.message || "persist_failed",
    };
  }
}

export async function persistPilotEvidenceToSupabase(evidence) {
  if (!isSupabaseConfigured()) {
    return { ok: true, required: false, backend: "memory" };
  }
  try {
    const admin = getSupabaseAdmin();
    if (!admin) return { ok: false, required: true, backend: "supabase" };
    const { error } = await admin.from("pilot_evidence").insert({
      id: evidence.id,
      project_id: evidence.projectId,
      pilot_run_id: evidence.pilotRunId || null,
      kind: evidence.kind || "run_summary",
      prompt_version: evidence.promptVersion || null,
      prompt_hash: evidence.promptHash || null,
      output_hash: evidence.outputHash || null,
      summary: evidence.summary || {},
      fabricated: Boolean(evidence.fabricated),
      simulated: Boolean(evidence.simulated),
      live: Boolean(evidence.live),
    });
    if (error) {
      return { ok: false, required: true, error: error.message };
    }
    return { ok: true, required: true, backend: "supabase" };
  } catch (err) {
    return { ok: false, required: true, error: err?.message || "persist_failed" };
  }
}

/** Scheduler must never invent pilot work — helper for tests/docs. */
export function schedulerMayCreatePilotTasks() {
  return false;
}
