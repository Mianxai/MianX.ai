import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import {
  ENGINE_VERSION,
  getIntegrationDashboard,
  getRun,
  listRuns,
  listStageEvents,
  listMemoryEntries,
  listLearningProposals,
  getEvidenceManifest,
  createIntegrationRun,
  submitClarification,
  generateIntegrationPlan,
  decideFounderApproval,
  startIntegrationSimulation,
  decideFinalReview,
  pauseIntegrationRun,
  resumeIntegrationRun,
  cancelIntegrationRun,
  recoverIntegrationRun,
  buildProofPack,
  auditRoutableWorkforce,
  assessProviderGate,
  measureConcurrencyProof,
  saveRun,
  buildProductionProofObjective,
  assertExplicitFounderConfirmation,
  integrationPersistenceStatus,
  persistIntegrationRun,
  persistIntegrationRunInsertOnly,
  loadIntegrationRun,
  listPersistedIntegrationRuns,
  mapProofStatusFromRun,
  buildIntegrationReadinessAsync,
  FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
  requireActiveProjectForProof,
} from "@/lib/core/integration";

import {
  expectedFounderProofIdempotencyBase,
  deterministicFounderProofCorrelationTrace,
  deterministicFounderProofEngineRunId,
} from "@/lib/core/integration/founder-proof-idempotency.js";

export const dynamic = "force-dynamic";

async function assertDurableOrAllowTest() {
  const status = await integrationPersistenceStatus();
  if (status.failClosed && !status.durable) {
    const err = new Error(
      "Integration persistence unavailable — production is fail-closed for in-process fallback."
    );
    err.status = 503;
    err.code = "INTEGRATION_PERSISTENCE_REQUIRED";
    throw err;
  }
  return status;
}

async function hydrateRun(runId) {
  if (!runId) return null;
  let run = getRun(runId);
  if (run) return run;
  run = await loadIntegrationRun(runId);
  return run;
}

async function persistSafe(run) {
  if (!run) return { ok: false };
  const result = await persistIntegrationRun(run);
  if (result.failClosed && !result.ok) {
    const err = new Error(
      result.message ||
        "Failed to persist integration run — refusing in-process-only production write."
    );
    err.status = 503;
    err.code = "INTEGRATION_PERSIST_FAILED";
    throw err;
  }
  return result;
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "dashboard";
  const projectId = url.searchParams.get("project_id");
  const runId = url.searchParams.get("run_id") || url.searchParams.get("id");

  // Hydrate durable runs into process cache for inspectability after refresh.
  if (projectId || action === "dashboard" || action === "runs" || action === "proof_status") {
    const persisted = await listPersistedIntegrationRuns({
      project_id: projectId || null,
      limit: 40,
    });
    for (const run of persisted) {
      if (run?.id && !getRun(run.id)) saveRun(run);
    }
  }

  if (action === "dashboard" || action === "overview") {
    const readiness = await buildIntegrationReadinessAsync({});
    const dash = getIntegrationDashboard({ project_id: projectId || null });
    return NextResponse.json({
      ...dash,
      readiness,
      proof_template: FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
      persistence: readiness.persistence,
    });
  }
  if (action === "proof_status") {
    const readiness = await buildIntegrationReadinessAsync({});
    const runs = listRuns({ project_id: projectId || null });
    const proofRun =
      runs.find((r) => r.proof?.is_production_proof || r.payload?.is_production_proof) ||
      runs[0] ||
      null;
    return NextResponse.json({
      ok: true,
      proof_status: proofRun
        ? mapProofStatusFromRun(proofRun)
        : readiness.integrationProofStatus || "not_started",
      run: proofRun
        ? {
            id: proofRun.id,
            stage: proofRun.current_stage,
            status: proofRun.status,
            selected_agents: proofRun.allocation?.selected_agents || [],
            task_count: proofRun.payload?.tasks?.length || 0,
            evidence_count: proofRun.evidence?.count || 0,
            memory_count: proofRun.memory?.count || 0,
            learning_count: proofRun.learning?.count || 0,
            recovery_count: proofRun.recovery_count || 0,
          }
        : null,
      readiness,
      proof_template: FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
    });
  }
  if (action === "runs") {
    return NextResponse.json({
      ok: true,
      runs: listRuns({
        project_id: projectId || null,
        status: url.searchParams.get("status") || null,
        stage: url.searchParams.get("stage") || null,
      }),
    });
  }
  if (action === "run" && runId) {
    const run = await hydrateRun(runId);
    if (!run) {
      return NextResponse.json({ ok: false, error: { message: "not found" } }, { status: 404 });
    }
    if (projectId && run.project_id && run.project_id !== projectId) {
      return NextResponse.json(
        { ok: false, error: { message: "cross-project access denied" } },
        { status: 403 }
      );
    }
    saveRun(run);
    return NextResponse.json({ ok: true, run, proof_status: mapProofStatusFromRun(run) });
  }
  if (action === "stages" && runId) {
    await hydrateRun(runId);
    return NextResponse.json({
      ok: true,
      events: listStageEvents({ integration_run_id: runId, project_id: projectId || null }),
    });
  }
  if (action === "evidence" && runId) {
    await hydrateRun(runId);
    return NextResponse.json({
      ok: true,
      manifest: getEvidenceManifest(runId),
    });
  }
  if (action === "memory" && runId) {
    await hydrateRun(runId);
    return NextResponse.json({
      ok: true,
      entries: listMemoryEntries({
        integration_run_id: runId,
        project_id: projectId || null,
      }),
    });
  }
  if (action === "learning" && runId) {
    await hydrateRun(runId);
    return NextResponse.json({
      ok: true,
      proposals: listLearningProposals({
        integration_run_id: runId,
        project_id: projectId || null,
      }),
    });
  }
  if (action === "proof" && runId) {
    const run = await hydrateRun(runId);
    if (!run) {
      return NextResponse.json({ ok: false, error: { message: "not found" } }, { status: 404 });
    }
    return NextResponse.json({
      ok: true,
      proof_pack: run.proof_pack || buildProofPack(run),
      proof_level: "LEVEL_1_DETERMINISTIC_SIMULATION",
      proof_status: mapProofStatusFromRun(run),
    });
  }
  if (action === "agents") {
    return NextResponse.json({ ok: true, audit: auditRoutableWorkforce() });
  }
  if (action === "provider") {
    return NextResponse.json({
      ok: true,
      gate: assessProviderGate({
        execution_mode: url.searchParams.get("mode") || "deterministic_simulation",
      }),
    });
  }
  if (action === "readiness") {
    return NextResponse.json({
      ok: true,
      readiness: await buildIntegrationReadinessAsync({}),
      persistence: await integrationPersistenceStatus(),
    });
  }
  return NextResponse.json({
    ok: true,
    engine_version: ENGINE_VERSION,
    ...getIntegrationDashboard({ project_id: projectId || null }),
  });
});

export const POST = withErrorHandling(async (req) => {
  await requireAdmin(req);
  await assertDurableOrAllowTest();
  const body = await req.json().catch(() => ({}));
  const action = body.action || "create";
  const actor = body.actor || "founder";

  async function finish(runOrResult) {
    const run = runOrResult?.run || runOrResult;
    if (run?.id) {
      run.proof_status = mapProofStatusFromRun(run);
      saveRun(run);
      await persistSafe(run);
    }
    return runOrResult;
  }

  if (action === "start_founder_proof") {
    assertExplicitFounderConfirmation(body.confirmation);
    const project = await requireActiveProjectForProof(body.project_id);

    const idempotencyBase = expectedFounderProofIdempotencyBase({
      organizationId: project.organization_id,
      projectId: project.id,
    });
    if (body.idempotency_key && body.idempotency_key !== idempotencyBase) {
      throw badRequest("Invalid idempotency_key for this project and proof template.");
    }

    // Fetch existing durable runs for project, then canonicalize an active proof run.
    // This also prevents the "duplicate Active run" production defect.
    const persisted = await listPersistedIntegrationRuns({
      project_id: project.id,
      limit: 50,
    });

    const isFounderProductionProof = (run) =>
      Boolean(
        run?.proof?.is_production_proof ||
          run?.payload?.is_production_proof ||
          run?.proof?.is_production_proof === true
      ) && (run?.objective?.title || run?.objective_title || "") ===
        FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title;

    const isTerminalProof = (run) => {
      const ps = mapProofStatusFromRun(run);
      return ["completed", "rejected", "failed"].includes(ps);
    };

    const proofScore = (run) =>
      (run?.evidence?.count || 0) + (run?.memory?.count || 0) + (run?.learning?.count || 0);

    const selectCanonicalActive = (runs) => {
      const active = runs.filter((r) => !isTerminalProof(r));
      if (!active.length) return null;
      // Prefer earliest started run; tie-break by "completeness" score.
      active.sort((a, b) => {
        const at = String(a.started_at || a.updated_at || "");
        const bt = String(b.started_at || b.updated_at || "");
        const t = at.localeCompare(bt);
        if (t !== 0) return t;
        return proofScore(b) - proofScore(a);
      });
      return active[0] || null;
    };

    const proofCandidates = (persisted || []).filter(isFounderProductionProof);
    const canonicalActive = selectCanonicalActive(proofCandidates);
    if (canonicalActive) {
      canonicalActive.proof_status = mapProofStatusFromRun(canonicalActive);
      saveRun(canonicalActive);
      return NextResponse.json({
        ok: true,
        run: canonicalActive,
        proof_status: canonicalActive.proof_status,
        resumed_existing_run: true,
        canonical_founder_proof_run_id: canonicalActive.id,
        idempotency_base: idempotencyBase,
        note: "Returning existing active production Founder proof run (idempotent resume).",
      });
    }

    const terminalRuns = proofCandidates.filter((r) => isTerminalProof(r));
    terminalRuns.sort((a, b) => {
      const aa = String(a.updated_at || a.started_at || "");
      const bb = String(b.updated_at || b.started_at || "");
      // Newest first
      return bb.localeCompare(aa);
    });
    const latestTerminalRunId = terminalRuns[0]?.id || "none";

    const engineRunId = deterministicFounderProofEngineRunId({
      idempotencyBase,
      latestTerminalRunId,
    });
    const { correlation_id, trace_id } = deterministicFounderProofCorrelationTrace({
      idempotencyBase,
    });

    const objective = buildProductionProofObjective({
      project_id: project.id,
      organization_id: body.organization_id || project.organization_id || null,
    });

    const result = createIntegrationRun(objective, {
      actor,
      // In-memory idempotency should be keyed by the deterministic engine run id,
      // not by the base proof idempotency (which must allow future proofs after terminal).
      idempotency_key: engineRunId,
      integration_run_id: engineRunId,
      correlation_id,
      trace_id,
    });

    result.run.proof = {
      is_production_proof: true,
      started_by: actor,
      started_at: new Date().toISOString(),
    };
    result.run.payload = {
      ...(result.run.payload || {}),
      is_production_proof: true,
    };

    // Insert-only to prevent overwriting timestamps on concurrency conflicts.
    const insertResult = await persistIntegrationRunInsertOnly(result.run);
    if (insertResult?.failClosed && !insertResult.ok) {
      const err = new Error(
        insertResult.message || "Failed to persist production Founder proof run."
      );
      err.status = 503;
      err.code = "INTEGRATION_PERSIST_FAILED";
      throw err;
    }

    const finalRun = insertResult?.inserted === false && insertResult.run
      ? insertResult.run
      : result.run;
    if (finalRun?.id) {
      finalRun.proof_status = mapProofStatusFromRun(finalRun);
      saveRun(finalRun);
    }

    return NextResponse.json({
      ok: true,
      run: finalRun,
      idempotent_hit: Boolean(result.idempotent_hit),
      resumed_existing_run: insertResult?.inserted === false,
      proof_status: finalRun ? mapProofStatusFromRun(finalRun) : "not_started",
      canonical_founder_proof_run_id: finalRun?.id || null,
      idempotency_base: idempotencyBase,
      note: "Production Founder proof start is idempotent and concurrency-safe.",
    });
  }

  if (action === "create" || action === "create_objective") {
    const rawObjective = body.objective || body;
    const projectId = rawObjective.project_id || body.project_id;
    if (projectId) {
      await requireActiveProjectForProof(projectId);
    } else {
      throw badRequest("project_id required");
    }
    const result = createIntegrationRun(rawObjective, {
      actor,
      idempotency_key: body.idempotency_key || null,
      force_cycle: Boolean(body.force_cycle),
    });
    await finish(result.run);
    return NextResponse.json({ ok: true, ...result });
  }
  if (action === "clarify" || action === "submit_clarification") {
    const result = submitClarification(body.run_id, body.answers || body, { actor });
    await finish(result.run);
    return NextResponse.json({ ok: true, ...result });
  }
  if (action === "plan" || action === "generate_plan") {
    const run = generateIntegrationPlan(body.run_id, { actor });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "approve_simulation") {
    const run = decideFounderApproval(body.run_id, "approve_simulation", {
      actor,
      note: body.note || "",
      auto_approve: false,
    });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "reject") {
    const run = decideFounderApproval(body.run_id, "reject", {
      actor,
      note: body.note || "",
    });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "return_for_changes") {
    const run = decideFounderApproval(body.run_id, "return_for_changes", {
      actor,
      note: body.note || "",
    });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "start_simulation") {
    const run = startIntegrationSimulation(body.run_id, { actor });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "pause") {
    const run = pauseIntegrationRun(body.run_id, { actor });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "resume") {
    const run = resumeIntegrationRun(body.run_id, { actor });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "cancel") {
    const run = cancelIntegrationRun(body.run_id, { actor });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "recover" || action === "deterministic_recovery_test") {
    const run = recoverIntegrationRun(body.run_id, { actor });
    run.payload = {
      ...(run.payload || {}),
      deterministic_recovery_test: action === "deterministic_recovery_test",
    };
    await finish(run);
    return NextResponse.json({
      ok: true,
      run,
      note:
        action === "deterministic_recovery_test"
          ? "Deterministic recovery testing — not a live outage."
          : undefined,
    });
  }
  if (action === "final_review") {
    const run = decideFinalReview(body.run_id, body.decision || "approve", {
      actor,
      auto_approve: false,
    });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "concurrency_proof") {
    return NextResponse.json({ ok: true, metrics: measureConcurrencyProof() });
  }
  return NextResponse.json(
    { ok: false, error: { message: `Unknown action: ${action}` } },
    { status: 400 }
  );
});
