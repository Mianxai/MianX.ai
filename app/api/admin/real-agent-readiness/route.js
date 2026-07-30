import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import {
  buildRealAgentReadinessReport,
  compileCanonicalRoleRegistry,
  liveSmokeReadiness,
  listRealInstances,
  listToolDefinitions,
  openRouterHealthCheck,
  runProviderTestDoubleE2E,
  auditRealAgentWorkflowCoverage,
  isInstanceActivelyRunning,
} from "@/lib/core/real-agent";
import { auditQueueReliabilityPath } from "@/lib/core/workforce-completion";

export const dynamic = "force-dynamic";

function instanceSummary(instances) {
  const list = instances || [];
  return {
    total: list.length,
    allocated: list.filter((i) =>
      ["allocated", "idle", "assigned", "reasoning", "tool_executing"].includes(i.status)
    ).length,
    running: list.filter((i) => isInstanceActivelyRunning(i)).length,
    waiting: list.filter((i) =>
      String(i.status || "").startsWith("waiting_")
    ).length,
    blocked: list.filter((i) => ["failed", "paused"].includes(i.status)).length,
    completed: list.filter((i) => ["completed", "released", "archived"].includes(i.status))
      .length,
  };
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "snapshot";

  if (action === "readiness_check") {
    // Never triggers provider calls
    const report = buildRealAgentReadinessReport({ liveTestedSlugs: [] });
    const compiled = compileCanonicalRoleRegistry();
    const instances = listRealInstances();
    return NextResponse.json({
      ok: true,
      action: "readiness_check",
      providerCallsMade: false,
      report,
      compiled: {
        documentedCapacity: compiled.documentedCapacity,
        canonicalRolesCompiled: compiled.canonicalRolesCompiled,
        unresolvedCapacityGaps: compiled.unresolvedCapacityGaps,
        namedRoleSlotsCovered: compiled.namedRoleSlotsCovered,
        departmentsCovered: compiled.departmentsCovered,
        note: compiled.note,
      },
      tools: listToolDefinitions().length,
      queue: auditQueueReliabilityPath(),
      workflows: auditRealAgentWorkflowCoverage(),
      openrouter: openRouterHealthCheck(),
      liveSmoke: liveSmokeReadiness(),
      instances,
      instanceSummary: instanceSummary(instances),
    });
  }

  if (action === "test_double_e2e") {
    const e2e = await runProviderTestDoubleE2E();
    return NextResponse.json({ ok: e2e.ok, action: "test_double_e2e", e2e });
  }

  const report = buildRealAgentReadinessReport({ liveTestedSlugs: [] });
  const compiled = compileCanonicalRoleRegistry();
  const instances = listRealInstances();
  return NextResponse.json({
    ok: true,
    report,
    compiled,
    openrouter: openRouterHealthCheck(),
    liveSmoke: liveSmokeReadiness(),
    instances,
    instanceSummary: instanceSummary(instances),
    toolsCount: listToolDefinitions().length,
    queue: auditQueueReliabilityPath(),
    workflows: auditRealAgentWorkflowCoverage(),
  });
});
