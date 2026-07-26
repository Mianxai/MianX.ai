import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireCapability, actorFromUser, CAPABILITIES } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import { retryJob } from "@/lib/core/jobs";

export const dynamic = "force-dynamic";

// POST /api/core/jobs/[id]/retry — returns a failed/dead-letter job to the
// queue with a fresh attempt budget. Admin-only; audited.
export const POST = withErrorHandling(async (req, { params }) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_JOBS);
  const actor = actorFromUser(user);
  const { id } = await params;
  assertUuid(id, "id");
  rateLimit(`job-retry:${actor}`, { max: 30, windowMs: 60_000 });

  const job = await retryJob({ jobId: id, actor });
  return NextResponse.json({ job });
});
