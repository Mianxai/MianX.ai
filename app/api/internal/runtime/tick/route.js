import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireInternalWorker } from "@/lib/core/internal-auth";
import { parseJsonBody } from "@/lib/core/validate";
import { runTick } from "@/lib/core/worker";
import { JOB_LIMITS } from "@/lib/core/constants";

export const dynamic = "force-dynamic";

// POST /api/internal/runtime/tick  { max_jobs? }
//
// Internal worker heartbeat: recovers expired leases, atomically claims a
// bounded batch of queued jobs and executes them. Authenticated ONLY by the
// server-side INTERNAL_RUNTIME_SECRET / CRON_SECRET — browser sessions can
// never invoke this. Returns a sanitized counters summary; never any secret,
// prompt or raw provider payload.
export const POST = withErrorHandling(async (req) => {
  const { workerId } = requireInternalWorker(req);

  const body = await parseJsonBody(req, 2_048);
  let maxJobs = JOB_LIMITS.maxJobsPerTick;
  if (body.max_jobs !== undefined) {
    const n = Number(body.max_jobs);
    if (Number.isInteger(n) && n >= 1) {
      maxJobs = Math.min(n, JOB_LIMITS.maxJobsPerTick);
    }
  }

  const summary = await runTick({ workerId, maxJobs });
  return NextResponse.json({ ok: true, tick: summary });
});

// GET is intentionally supported for Vercel Cron (which issues GET requests
// with the Authorization header). Same authentication, same bounded tick.
export const GET = withErrorHandling(async (req) => {
  const { workerId } = requireInternalWorker(req);
  const summary = await runTick({ workerId });
  return NextResponse.json({ ok: true, tick: summary });
});
