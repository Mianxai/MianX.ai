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
  const preflight = buildActivationPreflight();
  const verify = runWorkforceVerify();
  return NextResponse.json({
    ok: preflight.ok,
    preflight,
    verifySummary: {
      capacityBaseline: verify.capacityBaseline,
      compiledSeats: verify.compiledSeats,
      mappedSeats: verify.mappedSeats,
      liveTestedCount: verify.liveTestedCount,
      claimVerification: verify.claimVerification,
    },
  });
});
