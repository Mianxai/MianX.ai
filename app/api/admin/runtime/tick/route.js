import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireCapability, CAPABILITIES } from "@/lib/admin-auth";
import { parseJsonBody } from "@/lib/core/validate";
import { runTick } from "@/lib/core/worker";
import { JOB_LIMITS } from "@/lib/core/constants";
import { rateLimit } from "@/lib/core/ratelimit";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/runtime/tick
 *
 * Capability-gated manual worker tick for Founders/operators when no external
 * scheduler is configured yet. Same bounded runTick path as the internal
 * endpoint; never exposes secrets or provider payloads.
 */
export const POST = withErrorHandling(async (req) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_JOBS);
  rateLimit(`admin-tick:${user.id}`, { max: 10, windowMs: 60_000 });

  const body = await parseJsonBody(req, 2_048);
  let maxJobs = JOB_LIMITS.maxJobsPerTick;
  if (body.max_jobs !== undefined) {
    const n = Number(body.max_jobs);
    if (Number.isInteger(n) && n >= 1) {
      maxJobs = Math.min(n, JOB_LIMITS.maxJobsPerTick);
    }
  }

  const summary = await runTick({
    workerId: `admin:${user.id.slice(0, 8)}`,
    maxJobs,
    source: "manual_diagnostic",
    httpStatus: 200,
  });
  return NextResponse.json({ ok: true, tick: summary });
});
