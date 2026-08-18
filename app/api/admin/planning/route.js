import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { actorFromUser } from "@/lib/admin-auth";
import {
  ENGINE_VERSION,
  runPlanningIntelligence,
  listPlans,
  getPlan,
  requestPlanApproval,
  decidePlanApproval,
  getPlanImpact,
  listSupportedHorizons,
  listPlanningAudit,
  listPlanningMemory,
  listPlanningLearningProposals,
  assessPlanningLearningProposal,
  APPROVAL_STATUSES,
} from "@/lib/core/planning-intelligence";
import { listRuns as listIntegrationRuns } from "@/lib/core/integration/store";
import { listPersistedIntegrationRuns, mapProofStatusFromRun } from "@/lib/core/integration/persist";
import {
  isFounderProductionProofRun,
  resolveCanonicalFounderProofRuns,
} from "@/lib/core/integration/founder-proof-canonical";

export const dynamic = "force-dynamic";

function mergeIntegrationRuns(projectId, persisted = []) {
  const memory = listIntegrationRuns({ project_id: projectId || null });
  const byId = new Map();
  for (const r of persisted) {
    if (r?.id) byId.set(r.id, r);
  }
  for (const r of memory) {
    if (r?.id) byId.set(r.id, r);
  }
  return [...byId.values()];
}

function founderProofPlanMetricsFromRuns(runs = []) {
  const proofRuns = (runs || []).filter(isFounderProductionProofRun);
  const { canonical_run } = resolveCanonicalFounderProofRuns(proofRuns);
  let awaiting = 0;
  let approved = 0;
  for (const run of proofRuns) {
    const ps = mapProofStatusFromRun(run);
    const stage = run.current_stage;
    if (ps === "awaiting_plan_approval" || stage === "founder_approval_required") {
      awaiting += 1;
    } else if (
      run.planning_plan ||
      [
        "simulation_approval_required",
        "approved_for_simulation",
        "workforce_allocated",
        "tasks_claimed",
        "collaboration_running",
        "verification_running",
        "memory_writing",
        "learning_proposals_created",
        "founder_final_review",
        "completed",
      ].includes(stage) ||
      [
        "awaiting_simulation_approval",
        "simulation_approved",
        "simulation_running",
        "awaiting_final_review",
        "completed",
      ].includes(ps)
    ) {
      approved += 1;
    }
  }

  const canonicalStatus = canonical_run ? mapProofStatusFromRun(canonical_run) : null;
  return {
    awaiting_approval: awaiting,
    approved,
    has_awaiting_plan:
      awaiting > 0 ||
      canonicalStatus === "awaiting_plan_approval" ||
      canonical_run?.current_stage === "founder_approval_required",
    canonical_run_id: canonical_run?.id || null,
    proof_status: canonicalStatus,
  };
}

function founderProofPlanMetrics(projectId) {
  const empty = {
    awaiting_approval: 0,
    approved: 0,
    has_awaiting_plan: false,
    canonical_run_id: null,
    proof_status: null,
  };
  if (!projectId) return empty;
  return founderProofPlanMetricsFromRuns(mergeIntegrationRuns(projectId, []));
}

/**
 * GET /api/admin/planning — read-only listing / detail / preview
 */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "overview";
  const projectId = url.searchParams.get("project_id");
  const planId = url.searchParams.get("plan_id") || url.searchParams.get("id");

  if (action === "overview") {
    const plans = listPlans({ project_id: projectId || null, limit: 50 });
    let founderProof = founderProofPlanMetrics(projectId);
    try {
      if (projectId) {
        const persisted = await listPersistedIntegrationRuns({
          project_id: projectId,
          limit: 50,
        });
        if (persisted?.length) {
          founderProof = founderProofPlanMetricsFromRuns(
            mergeIntegrationRuns(projectId, persisted)
          );
        }
      }
    } catch {
      /* persisted optional — memory metrics remain */
    }

    const advanced = {
      draft: plans.filter((p) => p.status === "draft").length,
      awaiting_approval: plans.filter((p) => p.status === "pending_approval").length,
      approved: plans.filter((p) => p.status === "approved").length,
      total: plans.length,
    };

    return NextResponse.json({
      ok: true,
      engine_version: ENGINE_VERSION,
      counts: {
        plans: plans.length,
        pending_approval: advanced.awaiting_approval,
        approved: advanced.approved,
      },
      founder_proof_plans: {
        awaiting_approval: founderProof.awaiting_approval,
        approved: founderProof.approved,
        has_awaiting_plan: founderProof.has_awaiting_plan,
        canonical_run_id: founderProof.canonical_run_id,
        proof_status: founderProof.proof_status,
      },
      advanced_separate_packages: advanced,
      horizons: listSupportedHorizons(),
      note:
        founderProof.has_awaiting_plan
          ? "A Founder Proof plan is awaiting approval. Advanced separate packages below are independent and do not replace it."
          : "Planning Intelligence is read-mostly until Founder approval. Nothing executes.",
      approval_statuses: APPROVAL_STATUSES,
    });
  }

  if (action === "list" || action === "plans") {
    return NextResponse.json({
      ok: true,
      plans: listPlans({ project_id: projectId || null }),
    });
  }

  if (action === "detail" && planId) {
    const plan = getPlan(planId);
    if (!plan) {
      return NextResponse.json(
        { ok: false, error: { code: "NOT_FOUND", message: "Plan not found" } },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true, plan });
  }

  if (action === "preview" && planId) {
    const plan = getPlan(planId);
    if (!plan) {
      return NextResponse.json(
        { ok: false, error: { code: "NOT_FOUND", message: "Plan not found" } },
        { status: 404 }
      );
    }
    return NextResponse.json({
      ok: true,
      execution_preview: plan.execution_preview,
      executes: false,
    });
  }

  if (action === "roadmap" && planId) {
    const plan = getPlan(planId);
    return NextResponse.json({ ok: true, roadmap: plan?.roadmap || null });
  }

  if (action === "capabilities" && planId) {
    const plan = getPlan(planId);
    return NextResponse.json({
      ok: true,
      capability_plan: plan?.capability_plan || null,
    });
  }

  if (action === "dependencies" && planId) {
    const plan = getPlan(planId);
    return NextResponse.json({
      ok: true,
      dependencies: plan?.dependencies || [],
    });
  }

  if (action === "approvals") {
    const plans = listPlans({ project_id: projectId || null });
    return NextResponse.json({
      ok: true,
      approvals: plans.map((p) => ({
        plan_id: p.id,
        status: p.approval_gate?.status || p.status,
        gate: p.approval_gate,
      })),
    });
  }

  if (action === "history") {
    return NextResponse.json({
      ok: true,
      audit: listPlanningAudit({ limit: 100 }),
      memory: listPlanningMemory({ project_id: projectId || null }),
      learning: listPlanningLearningProposals({ limit: 50 }),
    });
  }

  if (action === "impact" && planId) {
    const nodeId = url.searchParams.get("node_id");
    if (!nodeId) {
      return NextResponse.json(
        { ok: false, error: { code: "BAD_REQUEST", message: "node_id required" } },
        { status: 400 }
      );
    }
    return NextResponse.json({ ok: true, ...getPlanImpact(planId, nodeId) });
  }

  return NextResponse.json({
    ok: true,
    engine_version: ENGINE_VERSION,
    plans: listPlans({ project_id: projectId || null }),
  });
});

/**
 * POST /api/admin/planning
 * create_plan | request_approval | decide | assess_learning
 * Mutating decisions are Founder-gated; never executes work.
 */
export const POST = withErrorHandling(async (req) => {
  // SECURITY: derive actor from authenticated session, never trust client-supplied body.actor
  const user = await requireAdmin(req);
  const actor = actorFromUser(user);
  const body = await req.json().catch(() => ({}));
  const action = body.action || "create_plan";

  if (action === "create_plan") {
    const plan = runPlanningIntelligence({
      objective: body.objective || "",
      industry: body.industry || null,
      business_model: body.business_model || null,
      horizon: body.horizon || "90_day",
      project_id: body.project_id || null,
      organization_id: body.organization_id || null,
      company_name: body.company_name || null,
      compliance_sensitivity: body.compliance_sensitivity || null,
      actor: actor,
      persist: true,
    });
    return NextResponse.json({
      ok: true,
      plan,
      executes: false,
      note: "Plan created. Founder approval required before any execution handoff.",
    });
  }

  if (action === "request_approval") {
    const plan = requestPlanApproval(body.plan_id || body.id, {
      actor: actor,
    });
    return NextResponse.json({ ok: true, plan, executes: false });
  }

  if (action === "decide") {
    const decision = body.decision;
    if (!["approved", "rejected", "returned", "archived"].includes(decision)) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "BAD_REQUEST",
            message: "decision must be approved|rejected|returned|archived",
          },
        },
        { status: 400 }
      );
    }
    const plan = decidePlanApproval(body.plan_id || body.id, decision, {
      actor: actor,
      reason: body.reason || "",
    });
    return NextResponse.json({
      ok: true,
      plan,
      executes: false,
      note: "Approval decision recorded. No autonomous execution started.",
    });
  }

  if (action === "assess_learning") {
    const assessment = assessPlanningLearningProposal(body.proposal || {});
    return NextResponse.json({ ok: true, assessment });
  }

  return NextResponse.json(
    { ok: false, error: { code: "BAD_REQUEST", message: `Unknown action: ${action}` } },
    { status: 400 }
  );
});
