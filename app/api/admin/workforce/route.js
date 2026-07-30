import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import {
  ENGINE_VERSION,
  getWorkforceDashboard,
  getAgentDetail,
  bootstrapWorkforce,
  recoverWorkforce,
  startSimulation,
  approveSimulation,
  pauseWorkforce,
  resumeWorkforce,
  stopAgent,
  retryAgent,
  reassignTask,
  founderDecide,
  distributeWork,
  assignFromQueue,
  runPipeline,
  assessWorkforceHealth,
  computeWorkloadAnalytics,
  listSimulations,
  listLifecycleStatuses,
  isWorkforcePaused,
} from "@/lib/core/workforce-runtime";
import { runWorkforceVerify } from "@/lib/core/workforce-i2";

export const dynamic = "force-dynamic";

async function capacityTruthPayload() {
  const verify = await runWorkforceVerify({ productionMode: false });
  return {
    capacitySeats: verify.capacityBaseline,
    compiledSeats: verify.compiledSeats,
    persistedSeats: verify.persistedSeats,
    readyToAllocate: verify.readyToAllocateSeats,
    allocated: verify.allocatedSeats,
    active: verify.activeInstances,
    waiting: 0,
    reviewing: verify.reviewingInstances,
    blocked: verify.blockedSeats,
    released: 0,
    liveTested: verify.liveTestedSeats,
    note: "Compiled seats are not persisted database seats. Live tested only after real provider evidence.",
  };
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "dashboard";
  const projectId = url.searchParams.get("project_id");
  const slug = url.searchParams.get("slug") || url.searchParams.get("agent");

  if (action === "dashboard" || action === "overview") {
    const dash = getWorkforceDashboard({ project_id: projectId || null });
    return NextResponse.json({
      ...dash,
      capacityTruth: await capacityTruthPayload(),
    });
  }
  if (action === "agent" && slug) {
    return NextResponse.json({
      ok: true,
      agent: getAgentDetail(slug, { project_id: projectId || null }),
    });
  }
  if (action === "analytics") {
    return NextResponse.json({
      ok: true,
      analytics: computeWorkloadAnalytics({
        project_id: projectId || null,
        agent_slug: slug || null,
      }),
    });
  }
  if (action === "health") {
    return NextResponse.json({
      ok: true,
      health: assessWorkforceHealth({ project_id: projectId || null }),
    });
  }
  if (action === "simulations") {
    return NextResponse.json({ ok: true, simulations: listSimulations() });
  }
  if (action === "lifecycle") {
    return NextResponse.json({
      ok: true,
      statuses: listLifecycleStatuses(),
      paused: isWorkforcePaused(),
      engine_version: ENGINE_VERSION,
    });
  }
  return NextResponse.json(getWorkforceDashboard({ project_id: projectId || null }));
});

export const POST = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const body = await req.json().catch(() => ({}));
  const action = body.action || "bootstrap";
  const projectId = body.project_id || null;

  if (action === "bootstrap") {
    return NextResponse.json({
      ok: true,
      ...bootstrapWorkforce({ project_id: projectId, simulation: Boolean(body.simulation) }),
    });
  }
  if (action === "recover") {
    return NextResponse.json({
      ok: true,
      ...recoverWorkforce({ project_id: projectId }),
    });
  }
  if (action === "pause") {
    return NextResponse.json(pauseWorkforce({ actor: body.actor || "founder", project_id: projectId, reason: body.reason }));
  }
  if (action === "resume") {
    return NextResponse.json(resumeWorkforce({ actor: body.actor || "founder", project_id: projectId }));
  }
  if (action === "stop_agent") {
    return NextResponse.json({
      ok: true,
      state: stopAgent(body.agent_slug || body.slug, { project_id: projectId, actor: body.actor || "founder" }),
    });
  }
  if (action === "retry_agent") {
    return NextResponse.json({
      ok: true,
      state: retryAgent(body.agent_slug || body.slug, { project_id: projectId, actor: body.actor || "founder" }),
    });
  }
  if (action === "reassign") {
    return NextResponse.json({
      ok: true,
      state: reassignTask({
        from_agent: body.from_agent,
        to_agent: body.to_agent,
        task_id: body.task_id,
        project_id: projectId,
        actor: body.actor || "founder",
      }),
    });
  }
  if (action === "founder_decide") {
    return NextResponse.json(
      founderDecide({
        task_id: body.task_id,
        agent_slug: body.agent_slug,
        decision: body.decision,
        project_id: projectId,
        actor: body.actor || "founder",
      })
    );
  }
  if (action === "simulate") {
    return NextResponse.json(
      startSimulation({
        name: body.name,
        objective: body.objective,
        project_id: projectId || "sim-project",
        actor: body.actor || "founder",
        auto_founder_approve: false,
      })
    );
  }
  if (action === "approve_simulation") {
    return NextResponse.json(
      approveSimulation(body.simulation_id || body.id, {
        actor: body.actor || "founder",
        decision: body.decision || "approve",
      })
    );
  }
  if (action === "distribute") {
    const queue = distributeWork({
      objective: body.objective,
      project_id: projectId,
      priority: body.priority || "P2",
      simulation: Boolean(body.simulation),
    });
    const assigned = assignFromQueue(queue, { project_id: projectId });
    return NextResponse.json({ ok: true, queue, assigned, executes: false });
  }
  if (action === "run_pipeline") {
    return NextResponse.json(
      runPipeline({
        task_id: body.task_id,
        agent_slug: body.agent_slug,
        project_id: projectId,
        objective: body.objective || "",
        simulation: Boolean(body.simulation),
        founder_approved: Boolean(body.founder_approved),
      })
    );
  }

  return NextResponse.json(
    { ok: false, error: { code: "BAD_REQUEST", message: `Unknown action: ${action}` } },
    { status: 400 }
  );
});
