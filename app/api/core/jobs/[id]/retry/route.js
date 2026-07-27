import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import { requireCapability, actorFromUser, CAPABILITIES } from "@/lib/core/auth";
import { assertUuid, clip, parseJsonBody } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import { retryJob } from "@/lib/core/jobs";

export const dynamic = "force-dynamic";

// POST /api/core/jobs/[id]/retry — returns a failed/dead-letter job to the
// queue with a fresh attempt budget. Admin-only; audited.
// Requires project_id (query or body) so UUID lookups cannot cross projects.
export const POST = withErrorHandling(async (req, { params }) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_JOBS);
  const actor = actorFromUser(user);
  const { id } = await params;
  assertUuid(id, "id");
  rateLimit(`job-retry:${actor}`, { max: 30, windowMs: 60_000 });

  const q = clip(req.nextUrl?.searchParams?.get("project_id") || "", 64);
  let projectId = q;
  if (!projectId) {
    const body = await parseJsonBody(req).catch(() => ({}));
    projectId = clip(body?.project_id || "", 64);
  }
  if (!projectId) throw badRequest("project_id is required.");
  assertUuid(projectId, "project_id");

  const job = await retryJob({ jobId: id, projectId, actor });
  return NextResponse.json({ job });
});
