import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import { requireAdmin, requireCapability, actorFromUser, CAPABILITIES } from "@/lib/core/auth";
import { parseJsonBody, assertUuid, clip } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import * as repo from "@/lib/core/repo";
import { validateJobEnqueue, enqueueJob } from "@/lib/core/jobs";
import { JOB_STATUSES, JOB_LIMITS } from "@/lib/core/constants";

export const dynamic = "force-dynamic";

// GET /api/core/jobs?project_id=&status=&task_id=&limit=&offset=
// Paginated, filtered queue listing plus status counts, admin-only and
// project-scoped server-side.
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);

  const params = req.nextUrl?.searchParams || new URLSearchParams();
  const projectId = clip(params.get("project_id") || "", 64);
  const status = clip(params.get("status") || "", 40);
  const taskId = clip(params.get("task_id") || "", 64);

  if (projectId) assertUuid(projectId, "project_id");
  if (taskId) assertUuid(taskId, "task_id");
  if (status && !JOB_STATUSES.includes(status)) {
    throw badRequest(`status must be one of: ${JOB_STATUSES.join(", ")}`);
  }

  let limit = JOB_LIMITS.listPageSize;
  const rawLimit = Number(params.get("limit"));
  if (Number.isInteger(rawLimit) && rawLimit >= 1) {
    limit = Math.min(rawLimit, JOB_LIMITS.maxListPageSize);
  }
  let offset = 0;
  const rawOffset = Number(params.get("offset"));
  if (Number.isInteger(rawOffset) && rawOffset >= 0) {
    offset = Math.min(rawOffset, 100_000);
  }

  const [{ rows, total }, counts] = await Promise.all([
    repo.listJobs({
      projectId: projectId || undefined,
      taskId: taskId || undefined,
      status: status || undefined,
      limit,
      offset,
    }),
    repo.countJobsByStatus(projectId || undefined),
  ]);

  return NextResponse.json({ jobs: rows, total, counts, limit, offset });
});

// POST /api/core/jobs
// { project_id, agent_slug, task_id?, input?, priority?, max_attempts?,
//   idempotency_key? }
// Enqueues one job. Idempotent per (project_id, idempotency_key); duplicate
// enqueues replay the existing job with 200 instead of creating a copy.
export const POST = withErrorHandling(async (req) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_JOBS);
  const actor = actorFromUser(user);
  rateLimit(`job-enqueue:${actor}`, { max: 30, windowMs: 60_000 });

  const body = await parseJsonBody(req);
  const projectId = clip(body.project_id, 64);
  assertUuid(projectId, "project_id");
  const project = await repo.getProject(projectId); // existence + scope

  let taskId = clip(body.task_id, 64) || null;
  if (taskId) {
    assertUuid(taskId, "task_id");
    await repo.getTask(taskId, project.id); // 404 unless task is in project
  }

  const safe = validateJobEnqueue(body);

  const { job, created } = await enqueueJob({
    projectId: project.id,
    taskId,
    agentSlug: safe.agent_slug,
    priority: safe.priority,
    maxAttempts: safe.max_attempts,
    input: safe.input,
    idempotencyKey: safe.idempotency_key,
    provider: safe.provider,
    model: safe.model,
    actor,
    actorType: "admin",
  });

  return NextResponse.json({ job, created }, { status: created ? 201 : 200 });
});
