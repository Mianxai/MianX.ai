import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireInternalWorker } from "@/lib/core/internal-auth";
import { parseJsonBody } from "@/lib/core/validate";
import { runTick } from "@/lib/core/worker";
import { JOB_LIMITS } from "@/lib/core/constants";
import { normalizeSchedulerSource } from "@/lib/core/scheduler-view-model";

export const dynamic = "force-dynamic";

function resolveTickSource(req, body = {}) {
  const header = req.headers.get("x-mianx-scheduler-source") || "";
  const fromBody = typeof body.source === "string" ? body.source : "";
  const raw = header || fromBody || "legacy_or_unknown";
  return normalizeSchedulerSource(raw);
}

async function executeTick(req, { fromGet = false } = {}) {
  const { workerId } = requireInternalWorker(req);

  let body = {};
  if (!fromGet) {
    body = await parseJsonBody(req, 2_048);
  }

  let maxJobs = JOB_LIMITS.maxJobsPerTick;
  if (body.max_jobs !== undefined) {
    const n = Number(body.max_jobs);
    if (Number.isInteger(n) && n >= 1) {
      maxJobs = Math.min(n, JOB_LIMITS.maxJobsPerTick);
    }
  }

  const source = resolveTickSource(req, body);
  const summary = await runTick({ workerId, maxJobs, source, httpStatus: 200 });
  return NextResponse.json({ ok: true, tick: summary });
}

// POST /api/internal/runtime/tick  { max_jobs?, source? }
//
// Internal worker heartbeat. Authenticated ONLY by INTERNAL_RUNTIME_SECRET /
// CRON_SECRET. Optional header x-mianx-scheduler-source:
//   supabase_cron | github_actions | manual_diagnostic
export const POST = withErrorHandling(async (req) => executeTick(req));

export const GET = withErrorHandling(async (req) =>
  executeTick(req, { fromGet: true })
);
