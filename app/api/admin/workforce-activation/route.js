import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import {
  buildWorkforceActivationChecklist,
  compileCapacitySeats,
  oneKeyActivationStatus,
  planProjectTeam,
  runWorkforceVerify,
  buildActivationPreflight,
  runSoftwareHouseTestDoubleE2E,
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
  const verify = await runWorkforceVerify({ productionMode: true });
  const preflight = await buildActivationPreflight();

  return NextResponse.json({
    ok: true,
    checklist,
    oneKey: oneKeyActivationStatus(),
    capacity: {
      capacitySeats: seats.capacitySeats,
      compiledSeats: verify.compiledSeats,
      mappedSeats: seats.mappedSeats,
      orphanSeats: seats.orphanSeats,
      persistedSeats: verify.persistedSeats,
      readyToAllocate: verify.readyToAllocateSeats,
      available: verify.readyToAllocateSeats,
      allocated: verify.allocatedSeats,
      primary: seats.primarySeats,
      reservePool: seats.reservePoolSeats,
    },
    verify,
    preflight,
    foundationReady: verify.foundationReady,
    providerReady: verify.providerReady,
    explanation:
      "445 workforce seats are compiled capacity. Persisted seats come only from the database after migration and bootstrap. They are not 445 continuously running processes.",
    liveTested: verify.liveTestedSeats,
    providerFreeMessage: verify.providerFreeMessage,
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
