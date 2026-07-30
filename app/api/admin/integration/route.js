import { NextResponse } from "next/server";
import { createHash } from "crypto";
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
  decideSimulationApproval,
  returnPlanForCorrections,
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
  recordAudit,
} from "@/lib/core/integration";

import {
  expectedFounderProofIdempotencyBase,
  deterministicFounderProofCorrelationTrace,
  deterministicFounderProofEngineRunId,
} from "@/lib/core/integration/founder-proof-idempotency.js";
import {
  resolveCanonicalFounderProofRuns,
  isFounderProductionProofRun,
  isTerminalFounderProofRun,
} from "@/lib/core/integration/founder-proof-canonical.js";

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
    for (const r of persisted || []) {
      if (r?.id) saveRun(r);
    }
    const mergedMap = new Map();
    for (const r of listRuns({ project_id: project.id })) {
      if (r?.id) mergedMap.set(r.id, r);
    }
    for (const r of persisted || []) {
      if (r?.id) mergedMap.set(r.id, r);
    }
    const mergedRuns = [...mergedMap.values()];
    const resolution = resolveCanonicalFounderProofRuns(mergedRuns);
    const canonicalActive = resolution.canonical_run;
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
        duplicate_warning: resolution.duplicate_warning,
        note: "Returning existing active production Founder proof run (idempotent resume).",
      });
    }

    const proofCandidates = mergedRuns.filter(isFounderProductionProofRun);
    const terminalRuns = proofCandidates.filter(isTerminalFounderProofRun);
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
    // Block accidental second proof/objective while a canonical Founder proof is active.
    const persistedExisting = await listPersistedIntegrationRuns({
      project_id: projectId,
      limit: 50,
    });
    for (const r of persistedExisting || []) {
      if (r?.id) saveRun(r);
    }
    const existingMap = new Map();
    for (const r of listRuns({ project_id: projectId })) {
      if (r?.id) existingMap.set(r.id, r);
    }
    for (const r of persistedExisting || []) {
      if (r?.id) existingMap.set(r.id, r);
    }
    const activeProof = resolveCanonicalFounderProofRuns([...existingMap.values()]);
    if (activeProof.canonical_run && !body.force_separate_objective) {
      throw badRequest(
        "An active Founder Production Proof already exists for this project. Continue that run instead of creating another objective."
      );
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
    const project = await requireActiveProjectForProof(body.project_id);
    const runId = body.run_id;
    if (!runId) throw badRequest("run_id required");

    const answerText = String(
      body.answer ||
        body.answers?.founder_answer ||
        body.answers?.answer ||
        body.answers?.clarification_answer ||
        ""
    ).trim();
    if (!answerText) {
      throw badRequest("Founder clarification answer is required.");
    }

    const persisted = await listPersistedIntegrationRuns({
      project_id: project.id,
      limit: 50,
    });
    for (const r of persisted || []) {
      if (r?.id) saveRun(r);
    }
    const mergedMap = new Map();
    for (const r of listRuns({ project_id: project.id })) {
      if (r?.id) mergedMap.set(r.id, r);
    }
    for (const r of persisted || []) {
      if (r?.id) mergedMap.set(r.id, r);
    }
    const resolution = resolveCanonicalFounderProofRuns([...mergedMap.values()]);
    const canonical = resolution.canonical_run;
    if (!canonical) {
      throw badRequest("No active canonical production Founder proof run found.");
    }
    if (canonical.id !== runId) {
      throw badRequest(
        "run_id is not the canonical active Founder proof run for this project."
      );
    }
    if (canonical.project_id && canonical.project_id !== project.id) {
      throw badRequest("Cross-project clarification is rejected.");
    }
    if (resolution.duplicate_warning) {
      throw badRequest(
        "Duplicate active Founder proof runs exist — resolve duplicates before clarification."
      );
    }

    const idempotencyKey =
      body.idempotency_key ||
      `clarify:${project.id}:${canonical.id}:${createHash("sha256")
        .update(answerText)
        .digest("hex")
        .slice(0, 16)}`;

    const alreadyAnswered = (canonical.clarifications || []).some(
      (c) =>
        c?.idempotency_key === idempotencyKey ||
        String(c?.answers?.founder_answer || c?.answers?.answer || "").trim() ===
          answerText
    );

    // Idempotent resume when clarification already applied (double-submit safe).
    if (canonical.current_stage !== "clarification_required") {
      if (alreadyAnswered) {
        return NextResponse.json({
          ok: true,
          run: canonical,
          resumed_existing_clarification: true,
          proof_status: mapProofStatusFromRun(canonical),
          plan_auto_approved: false,
          simulation_started: false,
          provider_called: false,
          idempotency_key: idempotencyKey,
        });
      }
      throw badRequest(
        `Clarification rejected: current stage is ${canonical.current_stage}, not clarification_required.`
      );
    }

    const answers = {
      ...(body.answers && typeof body.answers === "object" ? body.answers : {}),
      founder_answer: answerText,
      known_assumptions: [
        ...((canonical.objective?.known_assumptions || []).length
          ? canonical.objective.known_assumptions
          : []),
        `Founder clarification: ${answerText}`,
      ],
      clear_questions: true,
      unresolved_questions: [],
    };

    const result = submitClarification(canonical.id, answers, { actor });
    if (result.run) {
      result.run.clarifications = (result.run.clarifications || []).map((c, idx, arr) =>
        idx === arr.length - 1 ? { ...c, idempotency_key: idempotencyKey } : c
      );
      saveRun(result.run);
    }

    if (result.still_needs_clarification) {
      await finish(result.run);
      return NextResponse.json({
        ok: true,
        ...result,
        still_needs_clarification: true,
        plan_auto_approved: false,
        simulation_started: false,
        provider_called: false,
      });
    }

    // Deterministic plan generation — never auto-approve, never call provider.
    let planned = result.run;
    if (planned?.current_stage === "objective_validated") {
      planned = generateIntegrationPlan(planned.id, { actor });
    }
    await finish(planned);

    return NextResponse.json({
      ok: true,
      run: planned,
      still_needs_clarification: false,
      proof_status: mapProofStatusFromRun(planned),
      plan_generated: planned?.current_stage === "founder_approval_required",
      plan_auto_approved: false,
      simulation_started: false,
      provider_called: false,
      idempotency_key: idempotencyKey,
      note: "Clarification accepted. Deterministic plan generated for Founder review — not approved.",
    });
  }
  if (action === "plan" || action === "generate_plan") {
    const run = generateIntegrationPlan(body.run_id, { actor });
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (action === "approve_simulation" || action === "approve_plan") {
    const run = decideFounderApproval(body.run_id, "approve_simulation", {
      actor,
      note: body.note || "",
      auto_approve: false,
    });
    await finish(run);
    return NextResponse.json({
      ok: true,
      run,
      simulation_started: false,
      provider_called: false,
      note: "Plan approved. Simulation was not started.",
    });
  }
  if (
    action === "approve_deterministic_simulation" ||
    action === "confirm_simulation"
  ) {
    try {
      const run = decideSimulationApproval(body.run_id, body.decision || "approve", {
        actor,
        note: body.note || "",
        auto_approve: false,
        idempotency_key: body.idempotency_key || null,
        expected_stage: body.expected_stage || null,
        expected_status: body.expected_status || null,
        expected_version: body.expected_version ?? null,
      });
      await finish(run);
      return NextResponse.json({
        ok: true,
        run,
        simulation_started: false,
        provider_called: false,
        note: "Deterministic simulation approved. Start remains a separate Founder action.",
      });
    } catch (err) {
      if (err?.code === "PLAN_NOT_READY") {
        return NextResponse.json(
          {
            ok: false,
            code: "PLAN_NOT_READY",
            error: err.message,
            readiness: err.readiness || null,
            primary_cta: "return_plan_for_corrections",
          },
          { status: 409 }
        );
      }
      if (err?.code === "CONFLICT") {
        return NextResponse.json(
          { ok: false, code: "CONFLICT", error: err.message },
          { status: 409 }
        );
      }
      throw err;
    }
  }
  if (action === "reject") {
    const stage = (await hydrateRun(body.run_id))?.current_stage;
    let run;
    if (stage === "simulation_approval_required") {
      run = decideSimulationApproval(body.run_id, "reject", {
        actor,
        note: body.note || "",
      });
    } else {
      run = decideFounderApproval(body.run_id, "reject", {
        actor,
        note: body.note || "",
      });
    }
    await finish(run);
    return NextResponse.json({ ok: true, run });
  }
  if (
    action === "return_plan_for_corrections" ||
    action === "return_for_changes"
  ) {
    const stage = (await hydrateRun(body.run_id))?.current_stage;
    try {
      let run;
      if (
        action === "return_plan_for_corrections" ||
        stage === "simulation_approval_required"
      ) {
        if (
          action === "return_plan_for_corrections" ||
          body.regenerate_plan !== false
        ) {
          run = returnPlanForCorrections(body.run_id, {
            actor,
            note: body.note || body.reason || undefined,
            idempotency_key: body.idempotency_key || null,
            expected_stage: body.expected_stage || "simulation_approval_required",
            expected_status: body.expected_status || null,
            expected_version: body.expected_version ?? null,
            project_id: body.project_id || null,
          });
        } else {
          run = decideSimulationApproval(body.run_id, "return_for_changes", {
            actor,
            note: body.note || "",
          });
        }
      } else {
        run = decideFounderApproval(body.run_id, "return_for_changes", {
          actor,
          note: body.note || "",
        });
      }
      await finish(run);
      return NextResponse.json({
        ok: true,
        run,
        duplicate_created: false,
        provider_called: false,
        simulation_approved: false,
        simulation_started: false,
        preserved_run_id: run.id,
        preserved_project_id: run.project_id,
        proof_status: mapProofStatusFromRun(run),
        note:
          "Plan corrected and durable task ownership saved. Review the corrected plan before approval. Simulation has not started.",
      });
    } catch (err) {
      if (err?.code === "CONFLICT") {
        return NextResponse.json(
          { ok: false, code: "CONFLICT", error: err.message },
          { status: 409 }
        );
      }
      if (err?.code === "NOT_FOUND") {
        return NextResponse.json(
          { ok: false, code: "NOT_FOUND", error: err.message },
          { status: 404 }
        );
      }
      throw err;
    }
  }
  if (action === "start_simulation") {
    const run = startIntegrationSimulation(body.run_id, { actor });
    await finish(run);
    return NextResponse.json({
      ok: true,
      run,
      provider_called: false,
      note: "Deterministic simulation started.",
    });
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
  if (action === "cancel_founder_proof_duplicate") {
    const project = await requireActiveProjectForProof(body.project_id);
    const clientCanonicalRunId = body.canonical_run_id;
    const duplicateRunId = body.duplicate_run_id;
    const reason = body.reason || "cancelled_duplicate";

    if (!duplicateRunId) {
      throw badRequest("duplicate_run_id is required");
    }

    const persisted = await listPersistedIntegrationRuns({
      project_id: project.id,
      limit: 50,
    });
    for (const r of persisted || []) {
      if (r?.id) saveRun(r);
    }
    const mergedMap = new Map();
    for (const r of listRuns({ project_id: project.id })) {
      if (r?.id) mergedMap.set(r.id, r);
    }
    for (const r of persisted || []) {
      if (r?.id) mergedMap.set(r.id, r);
    }
    const allRuns = [...mergedMap.values()];
    const resolution = resolveCanonicalFounderProofRuns(allRuns);
    // Server independently determines canonical — never trust client-only flag.
    const canonicalActive = resolution.canonical_run;

    if (!canonicalActive) {
      throw badRequest("No active canonical production Founder proof run found.");
    }

    if (
      clientCanonicalRunId &&
      String(canonicalActive.id) !== String(clientCanonicalRunId)
    ) {
      throw badRequest(
        "canonical_run_id does not match server-resolved canonical active run."
      );
    }

    if (String(duplicateRunId) === String(canonicalActive.id)) {
      recordAudit({
        action: "integration.duplicate_cancel_rejected",
        integration_run_id: duplicateRunId,
        project_id: project.id,
        actor,
        outcome: "rejected_canonical",
        detail: "Cannot cancel the canonical Founder proof run.",
      });
      throw badRequest("Cannot cancel the canonical Founder proof run.");
    }

    const target = mergedMap.get(duplicateRunId) || getRun(duplicateRunId);
    if (!target) {
      throw badRequest("duplicate_run_id not found.");
    }
    if (target.project_id && String(target.project_id) !== String(project.id)) {
      recordAudit({
        action: "integration.duplicate_cancel_rejected",
        integration_run_id: duplicateRunId,
        project_id: project.id,
        actor,
        outcome: "rejected_cross_project",
      });
      throw badRequest("Cross-project duplicate cancellation is rejected.");
    }

    // Idempotent: already terminal / cancelled duplicate.
    if (isTerminalFounderProofRun(target)) {
      recordAudit({
        action: "integration.duplicate_cancel_idempotent",
        integration_run_id: duplicateRunId,
        project_id: project.id,
        actor,
        outcome: "already_terminal",
        canonical_run_id: canonicalActive.id,
      });
      return NextResponse.json({
        ok: true,
        run: target,
        cancelled_run_id: duplicateRunId,
        canonical_run_id: canonicalActive.id,
        resumed_existing_cancellation: true,
        note: "Duplicate already terminal — canonical run unchanged.",
      });
    }

    const duplicateOk = resolution.duplicate_runs.some(
      (r) => String(r.id) === String(duplicateRunId)
    );
    if (!duplicateOk) {
      recordAudit({
        action: "integration.duplicate_cancel_rejected",
        integration_run_id: duplicateRunId,
        project_id: project.id,
        actor,
        outcome: "rejected_not_duplicate",
      });
      throw badRequest(
        "duplicate_run_id must be a non-canonical active production Founder proof run."
      );
    }

    recordAudit({
      action: "integration.duplicate_resolution_requested",
      integration_run_id: duplicateRunId,
      project_id: project.id,
      actor,
      canonical_run_id: canonicalActive.id,
      reason,
    });

    const run = cancelIntegrationRun(duplicateRunId, {
      actor,
      failure_reason: reason,
    });
    run.proof = {
      ...(run.proof || {}),
      cancelled_as_duplicate: true,
      cancelled_duplicate_of: canonicalActive.id,
      cancel_reason: reason,
    };
    run.payload = {
      ...(run.payload || {}),
      cancelled_as_duplicate: true,
      canonical_run_preserved: canonicalActive.id,
    };
    run.current_stage = "cancelled";
    run.status = "cancelled";
    saveRun(run);
    await finish(run);

    recordAudit({
      action: "integration.duplicate_cancelled",
      integration_run_id: duplicateRunId,
      project_id: project.id,
      actor,
      outcome: "cancelled_duplicate",
      canonical_run_id: canonicalActive.id,
      reason,
    });
    recordAudit({
      action: "integration.canonical_run_preserved",
      integration_run_id: canonicalActive.id,
      project_id: project.id,
      actor,
      outcome: "preserved",
      cancelled_duplicate_id: duplicateRunId,
    });

    return NextResponse.json({
      ok: true,
      run,
      cancelled_run_id: duplicateRunId,
      canonical_run_id: canonicalActive.id,
      note: "Non-canonical duplicate marked as cancelled. Canonical run unchanged.",
    });
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
