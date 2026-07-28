import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
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
} from "@/lib/core/integration";

export const dynamic = "force-dynamic";

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "dashboard";
  const projectId = url.searchParams.get("project_id");
  const runId = url.searchParams.get("run_id") || url.searchParams.get("id");

  if (action === "dashboard" || action === "overview") {
    return NextResponse.json(getIntegrationDashboard({ project_id: projectId || null }));
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
    const run = getRun(runId);
    if (!run) return NextResponse.json({ ok: false, error: { message: "not found" } }, { status: 404 });
    return NextResponse.json({ ok: true, run });
  }
  if (action === "stages" && runId) {
    return NextResponse.json({
      ok: true,
      events: listStageEvents({ integration_run_id: runId, project_id: projectId || null }),
    });
  }
  if (action === "evidence" && runId) {
    return NextResponse.json({
      ok: true,
      manifest: getEvidenceManifest(runId),
    });
  }
  if (action === "memory" && runId) {
    return NextResponse.json({
      ok: true,
      entries: listMemoryEntries({
        integration_run_id: runId,
        project_id: projectId || null,
      }),
    });
  }
  if (action === "learning" && runId) {
    return NextResponse.json({
      ok: true,
      proposals: listLearningProposals({
        integration_run_id: runId,
        project_id: projectId || null,
      }),
    });
  }
  if (action === "proof" && runId) {
    const run = getRun(runId);
    if (!run) return NextResponse.json({ ok: false, error: { message: "not found" } }, { status: 404 });
    return NextResponse.json({
      ok: true,
      proof_pack: run.proof_pack || buildProofPack(run),
      proof_level: "LEVEL_1_DETERMINISTIC_SIMULATION",
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
  return NextResponse.json({
    ok: true,
    engine_version: ENGINE_VERSION,
    ...getIntegrationDashboard({ project_id: projectId || null }),
  });
});

export const POST = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const body = await req.json().catch(() => ({}));
  const action = body.action || "create";
  const actor = body.actor || "founder";

  if (action === "create" || action === "create_objective") {
    const result = createIntegrationRun(body.objective || body, {
      actor,
      idempotency_key: body.idempotency_key || null,
      force_cycle: Boolean(body.force_cycle),
    });
    return NextResponse.json({ ok: true, ...result });
  }
  if (action === "clarify" || action === "submit_clarification") {
    return NextResponse.json({
      ok: true,
      ...submitClarification(body.run_id, body.answers || body, { actor }),
    });
  }
  if (action === "plan" || action === "generate_plan") {
    return NextResponse.json({
      ok: true,
      run: generateIntegrationPlan(body.run_id, { actor }),
    });
  }
  if (action === "approve_simulation") {
    return NextResponse.json({
      ok: true,
      run: decideFounderApproval(body.run_id, "approve_simulation", {
        actor,
        note: body.note || "",
        auto_approve: false,
      }),
    });
  }
  if (action === "reject") {
    return NextResponse.json({
      ok: true,
      run: decideFounderApproval(body.run_id, "reject", { actor, note: body.note || "" }),
    });
  }
  if (action === "return_for_changes") {
    return NextResponse.json({
      ok: true,
      run: decideFounderApproval(body.run_id, "return_for_changes", {
        actor,
        note: body.note || "",
      }),
    });
  }
  if (action === "start_simulation") {
    return NextResponse.json({
      ok: true,
      run: startIntegrationSimulation(body.run_id, { actor }),
    });
  }
  if (action === "pause") {
    return NextResponse.json({
      ok: true,
      run: pauseIntegrationRun(body.run_id, { actor }),
    });
  }
  if (action === "resume") {
    return NextResponse.json({
      ok: true,
      run: resumeIntegrationRun(body.run_id, { actor }),
    });
  }
  if (action === "cancel") {
    return NextResponse.json({
      ok: true,
      run: cancelIntegrationRun(body.run_id, { actor }),
    });
  }
  if (action === "recover") {
    return NextResponse.json({
      ok: true,
      run: recoverIntegrationRun(body.run_id, { actor }),
    });
  }
  if (action === "final_review") {
    return NextResponse.json({
      ok: true,
      run: decideFinalReview(body.run_id, body.decision || "approve", {
        actor,
        auto_approve: false,
      }),
    });
  }
  if (action === "concurrency_proof") {
    return NextResponse.json({ ok: true, metrics: measureConcurrencyProof() });
  }
  return NextResponse.json(
    { ok: false, error: { message: `Unknown action: ${action}` } },
    { status: 400 }
  );
});
