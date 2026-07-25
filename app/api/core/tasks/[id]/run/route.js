import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin, actorFromUser } from "@/lib/core/auth";
import { parseJsonBody, assertUuid, clip } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import { executeTaskRun } from "@/lib/core/runtime";

export const dynamic = "force-dynamic";

// POST /api/core/tasks/[id]/run  { agent_instance_id?, idempotency_key? }
// Validates, gates on approval, then executes a run — calling the provider only
// when configured. Returns 202 when a human approval is required.
export const POST = withErrorHandling(async (req, { params }) => {
  const user = await requireAdmin(req);
  const actor = actorFromUser(user);
  const { id } = await params;
  assertUuid(id, "id");

  rateLimit(`task-run:${actor}`, { max: 20, windowMs: 60_000 });

  const body = await parseJsonBody(req);
  const agentInstanceId = clip(body.agent_instance_id, 64) || undefined;
  if (agentInstanceId) assertUuid(agentInstanceId, "agent_instance_id");
  const idempotencyKey = clip(body.idempotency_key, 200) || undefined;

  const result = await executeTaskRun({
    taskId: id,
    agentInstanceId,
    idempotencyKey,
    actor,
  });

  if (result.approvalRequired) {
    return NextResponse.json(
      { approvalRequired: true, task: result.task, approval: result.approval },
      { status: 202 }
    );
  }
  return NextResponse.json({ run: result.run, task: result.task });
});
