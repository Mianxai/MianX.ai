import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import {
  buildWorkforceActivationChecklist,
  compileCapacitySeats,
  oneKeyActivationStatus,
  planProjectTeam,
  listInstances,
  listSeatsFromStore,
  bootstrapWorkforceRegistryInMemory,
} from "@/lib/core/workforce-i2";
import { runSoftwareHouseTestDoubleE2E } from "@/lib/core/workforce-i2";

export const dynamic = "force-dynamic";

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "snapshot";

  bootstrapWorkforceRegistryInMemory();

  if (action === "test_double_e2e") {
    const e2e = await runSoftwareHouseTestDoubleE2E();
    return NextResponse.json({ ok: e2e.ok, e2e, providerCallsMade: false });
  }

  const checklist = buildWorkforceActivationChecklist();
  const seats = compileCapacitySeats();
  const seatList = listSeatsFromStore();
  const available = seatList.filter((s) => s.lifecycleState === "available").length;
  const allocated = seatList.filter((s) =>
    ["allocated", "active", "waiting", "reviewing"].includes(s.lifecycleState)
  ).length;

  return NextResponse.json({
    ok: true,
    checklist,
    oneKey: oneKeyActivationStatus(),
    capacity: {
      capacitySeats: seats.capacitySeats,
      mappedSeats: seats.mappedSeats,
      orphanSeats: seats.orphanSeats,
      available,
      allocated,
      primary: seats.primarySeats,
      reservePool: seats.reservePoolSeats,
    },
    instances: listInstances(),
    explanation:
      "445 workforce seats are ready to allocate. They are not 445 continuously running processes. MianX activates only the specialists required for current project work.",
    liveTested: 0,
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
