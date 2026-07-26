import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireCapability, actorFromUser, CAPABILITIES } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import { cancelJob } from "@/lib/core/jobs";

export const dynamic = "force-dynamic";

// POST /api/core/jobs/[id]/cancel — cancels a queued job immediately, or
// requests cooperative cancellation of a leased/running job.
export const POST = withErrorHandling(async (req, { params }) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_JOBS);
  const actor = actorFromUser(user);
  const { id } = await params;
  assertUuid(id, "id");
  rateLimit(`job-cancel:${actor}`, { max: 30, windowMs: 60_000 });

  const job = await cancelJob({ jobId: id, actor });
  return NextResponse.json({ job });
});
