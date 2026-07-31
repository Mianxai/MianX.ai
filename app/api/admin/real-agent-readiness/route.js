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
import {
  buildFoundationMetrics,
  sanitizeFoundationMetrics,
} from "@/lib/core/workforce-i2";

export const dynamic = "force-dynamic";

function instanceSummary(instances) {
  const list = instances || [];
  return {
    total: list.length,
    allocated: list.filter((i) =>
      ["allocated", "idle", "assigned", "reasoning", "tool_executing"].includes(i.status)
    ).length,
    running: list.filter((i) => isInstanceActivelyRunning(i)).length,
    waiting: list.filter((i) => String(i.status || "").startsWith("waiting_")).length,
    blocked: list.filter((i) => ["failed", "paused"].includes(i.status)).length,
    completed: list.filter((i) =>
      ["completed", "released", "archived"].includes(i.status)
    ).length,
  };
}

function buildPayload({ action = "snapshot" } = {}) {
  return async () => {
    const report = buildRealAgentReadinessReport({ liveTestedSlugs: [] });
    const roleRegistry = compileCanonicalRoleRegistry();
    const instances = listRealInstances();
    const foundation = sanitizeFoundationMetrics(
      await buildFoundationMetrics({ productionMode: true })
    );
    return {
      ok: true,
      action,
      providerCallsMade: false,
      mutatesDatabase: false,
      report,
      foundation,
      verify: foundation,
      // Legacy field retained with accurate naming — not capacity compiled seats.
      compiled: {
        documentedCapacity: roleRegistry.documentedCapacity,
        namedRoleRegistryEntries: roleRegistry.canonicalRolesCompiled,
        // Deprecated alias — do not use as compiledSeats in UI
        canonicalRolesCompiled: roleRegistry.canonicalRolesCompiled,
        unresolvedCapacityGaps: roleRegistry.unresolvedCapacityGaps,
        namedRoleSlotsCovered: roleRegistry.namedRoleSlotsCovered,
        departmentsCovered: roleRegistry.departmentsCovered,
        note: roleRegistry.note,
        warning:
          "canonicalRolesCompiled / namedRoleRegistryEntries is NOT compiledSeats. Use foundation.compiledSeats (445).",
      },
      tools: listToolDefinitions().length,
      toolsCount: listToolDefinitions().length,
      queue: auditQueueReliabilityPath(),
      workflows: auditRealAgentWorkflowCoverage(),
      openrouter: openRouterHealthCheck(),
      liveSmoke: liveSmokeReadiness(),
      instances,
      instanceSummary: instanceSummary(instances),
    };
  };
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "snapshot";

  if (action === "readiness_check") {
    // Read-only foundation/runtime contract refresh — never provider calls, never DB writes.
    const payload = await buildPayload({ action: "readiness_check" })();
    return NextResponse.json(payload);
  }

  if (action === "test_double_e2e") {
    const e2e = await runProviderTestDoubleE2E();
    return NextResponse.json({
      ok: e2e.ok,
      action: "test_double_e2e",
      e2e,
      providerCallsMade: false,
    });
  }

  const payload = await buildPayload({ action: "snapshot" })();
  return NextResponse.json(payload);
});
