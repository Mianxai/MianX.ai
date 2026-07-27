import { NextResponse } from "next/server";
import { withErrorHandling, validationError, notConfigured } from "@/lib/core/errors";
import { requireCapability, actorFromUser, CAPABILITIES, requireAdmin } from "@/lib/admin-auth";
import { parseJsonBody, assertUuid } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import * as repo from "@/lib/core/repo";
import { startEnterpriseObjective } from "@/lib/core/workflow";
import {
  isObjectiveTask,
  toObjectiveSummary,
  validateObjectiveSubmit,
} from "@/lib/core/objectives";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/objectives?project_id=
 * Lists Founder-facing objective tasks (enterprise + related workflows).
 */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured("Supabase is not configured.");
  }

  const url = new URL(req.url);
  const projectIdRaw = url.searchParams.get("project_id");
  let projectId = null;
  if (projectIdRaw) {
    assertUuid(projectIdRaw, "project_id");
    projectId = projectIdRaw;
  }

  if (!projectId) {
    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      projectId: null,
      objectives: [],
      note: "Select a project to list objectives. Cross-project objective listing is not exposed.",
      available: false,
    });
  }

  const tasks = await repo.listTasks({ projectId });
  const jobsPage = await repo.listJobs({ projectId, limit: 200, offset: 0 });
  const jobs = jobsPage.rows || [];
  const approvals = await repo.listApprovals({ projectId });

  const objectives = tasks
    .filter(isObjectiveTask)
    .map((t) => toObjectiveSummary(t, { jobs, approvals }));

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    projectId,
    available: true,
    objectives,
  });
});

/**
 * POST /api/admin/objectives
 * Starts an enterprise-objective via existing orchestration (no duplicate system).
 */
export const POST = withErrorHandling(async (req) => {
  const { user } = await requireCapability(req, CAPABILITIES.START_WORKFLOWS);
  const actor = actorFromUser(user);
  rateLimit(`objective-start:${actor}`, { max: 10, intervalMs: 60_000 });

  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured("Supabase is not configured.");
  }

  const body = await parseJsonBody(req);
  const validated = validateObjectiveSubmit(body);
  if (!validated.ok) {
    throw validationError("Please fix the highlighted fields.", validated.errors);
  }
  const v = validated.value;
  assertUuid(v.project_id, "project_id");

  const result = await startEnterpriseObjective({
    projectId: v.project_id,
    objective: v.objective,
    departmentsNeeded: v.departments_needed,
    riskClass: v.risk_class,
    proposedAction: v.proposed_action,
    projectProfile: v.project_profile,
    idempotencyKey: v.idempotency_key || null,
    actor,
    source: "founder-console",
  });

  // Persist priority/deadline on task when created (best-effort patch)
  if (result.created && result.task?.id) {
    try {
      await repo.updateTask(result.task.id, {
        priority: v.priority,
        input: {
          ...result.task.input,
          deadline: v.deadline,
          founder_priority: v.priority,
        },
      });
    } catch {
      /* non-fatal — objective already started */
    }
  }

  const refreshed = result.task?.id
    ? await repo.getTask(result.task.id, v.project_id).catch(() => result.task)
    : result.task;

  return NextResponse.json(
    {
      objective: toObjectiveSummary(refreshed, {}),
      task: refreshed,
      job: result.job,
      created: result.created,
      decomposition: result.decomposition || null,
    },
    { status: result.created ? 201 : 200 }
  );
});
