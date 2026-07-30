/**
 * Admin preflight — configuration status only, never secrets.
 */

import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { buildActivationPreflight, runWorkforceVerify } from "@/lib/core/workforce-i2";

export const dynamic = "force-dynamic";

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const preflight = await buildActivationPreflight();
  const verify = await runWorkforceVerify({ productionMode: true });
  return NextResponse.json({
    ok: preflight.ok,
    preflight,
    verifySummary: {
      capacityBaseline: verify.capacityBaseline,
      compiledSeats: verify.compiledSeats,
      persistedSeats: verify.persistedSeats,
      readyToAllocateSeats: verify.readyToAllocateSeats,
      liveTestedSeats: verify.liveTestedSeats,
      compilationReady: verify.compilationReady,
      databaseReady: verify.databaseReady,
      foundationReady: verify.foundationReady,
      providerReady: verify.providerReady,
      liveReady: verify.liveReady,
      productionReady: verify.productionReady,
      claimVerification: verify.claimVerification,
    },
  });
});
