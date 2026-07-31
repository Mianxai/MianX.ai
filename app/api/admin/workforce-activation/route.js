import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import {
  buildWorkforceActivationChecklist,
  compileCapacitySeats,
  oneKeyActivationStatus,
  planProjectTeam,
  buildActivationPreflight,
  runSoftwareHouseTestDoubleE2E,
  buildFoundationMetrics,
  sanitizeFoundationMetrics,
} from "@/lib/core/workforce-i2";

export const dynamic = "force-dynamic";

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "snapshot";

  if (action === "test_double_e2e") {
    const e2e = await runSoftwareHouseTestDoubleE2E();
    return NextResponse.json({ ok: e2e.ok, e2e, providerCallsMade: false });
  }

  const checklist = buildWorkforceActivationChecklist();
  const seats = compileCapacitySeats();
  const foundation = sanitizeFoundationMetrics(
    await buildFoundationMetrics({ productionMode: true })
  );
  const preflight = await buildActivationPreflight();

  return NextResponse.json({
    ok: true,
    checklist,
    oneKey: oneKeyActivationStatus(),
    foundation,
    capacity: {
      capacitySeats: foundation.capacitySeats,
      compiledSeats: foundation.compiledSeats,
      mappedSeats: seats.mappedSeats,
      orphanSeats: seats.orphanSeats,
      persistedSeats: foundation.persistedSeats,
      readyToAllocate: foundation.readyToAllocateSeats,
      available: foundation.readyToAllocateSeats,
      allocated: foundation.allocatedSeats,
      primary: seats.primarySeats,
      reservePool: seats.reservePoolSeats,
    },
    verify: foundation,
    preflight,
    foundationReady: foundation.foundationReady,
    providerReady: foundation.providerConfigured,
    explanation:
      "445 workforce seats are compiled capacity. Persisted seats come only from the database after migration and bootstrap. They are not 445 continuously running processes.",
    liveTested: foundation.liveTestedSeats,
    providerFreeMessage: foundation.providerFreeMessage,
  });
});

export const POST = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const body = await req.json().catch(() => ({}));
  if (body.action === "plan_team") {
    const plan = planProjectTeam({
      projectId: body.projectId,
      organizationId: body.organizationId || null,
      objectiveTitle: body.objectiveTitle || "",
      activate: false,
    });
    return NextResponse.json({ ok: true, plan });
  }
  return NextResponse.json(
    { ok: false, error: "Unknown action. Live activation is Founder-gated via CLI only." },
    { status: 400 }
  );
});
