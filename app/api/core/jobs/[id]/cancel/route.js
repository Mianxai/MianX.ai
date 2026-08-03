import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import { CAPABILITIES, actorFromUser } from "@/lib/core/auth";
import { assertUuid, clip, parseJsonBody } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import { cancelJob } from "@/lib/core/jobs";
import { requireProjectAccess } from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

// POST /api/core/jobs/[id]/cancel — cancels a queued job immediately, or
// requests cooperative cancellation of a leased/running job.
// Requires trusted project access so UUID lookups cannot cross projects.
export const POST = withErrorHandling(async (req, { params }) => {
  const { id } = await params;
  assertUuid(id, "id");

  const q = clip(req.nextUrl?.searchParams?.get("project_id") || "", 64);
  let projectId = q;
  if (!projectId) {
    const body = await parseJsonBody(req).catch(() => ({}));
    projectId = clip(body?.project_id || "", 64);
  }
  if (!projectId) throw badRequest("project_id is required.");
  assertUuid(projectId, "project_id");

  const { authCtx } = await requireProjectAccess(req, projectId, {
    capability: CAPABILITIES.MANAGE_JOBS,
  });
  const actor = actorFromUser(authCtx.user);
  rateLimit(`job-cancel:${actor}`, { max: 30, windowMs: 60_000 });

  const job = await cancelJob({ jobId: id, projectId, actor });
  return NextResponse.json({ job });
});
