import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
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

export const dynamic = "force-dynamic";

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
    return NextResponse.json({
      ok: true,
      engine_version: ENGINE_VERSION,
      counts: {
        plans: plans.length,
        pending_approval: plans.filter((p) => p.status === "pending_approval").length,
        approved: plans.filter((p) => p.status === "approved").length,
      },
      horizons: listSupportedHorizons(),
      note: "Planning Intelligence is read-mostly until Founder approval. Nothing executes.",
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
  await requireAdmin(req);
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
      actor: body.actor || "founder",
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
      actor: body.actor || "founder",
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
      actor: body.actor || "founder",
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
