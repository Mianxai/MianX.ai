import { NextResponse } from "next/server";
import { withErrorHandling, badRequest, invalidTransition } from "@/lib/core/errors";
import { requireAdmin, actorFromUser } from "@/lib/core/auth";
import { parseJsonBody, assertUuid } from "@/lib/core/validate";
import { AGENT_INSTANCE_STATUSES } from "@/lib/core/constants";
import * as repo from "@/lib/core/repo";
import { recordAudit, buildAuditEntry } from "@/lib/core/audit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/core/ratelimit";

export const dynamic = "force-dynamic";

// Locked instance transitions (server-authoritative).
const INSTANCE_TRANSITIONS = {
  active: ["paused", "retired"],
  paused: ["active", "retired"],
  retired: [],
};

// PATCH /api/core/agents/:id  { status }
export const PATCH = withErrorHandling(async (req, { params }) => {
  const user = await requireAdmin(req);
  const actor = actorFromUser(user);
  const { id } = await params;
  assertUuid(id, "id");
  rateLimit(`agent-patch:${actor}`, { max: 60, windowMs: 60_000 });

  const body = await parseJsonBody(req);
  const status = typeof body.status === "string" ? body.status.trim() : "";
  if (!AGENT_INSTANCE_STATUSES.includes(status)) {
    throw badRequest("Invalid agent instance status.", {
      status: `Must be one of: ${AGENT_INSTANCE_STATUSES.join(", ")}`,
    });
  }

  const existing = await repo.getAgentInstance(id);
  const allowed = INSTANCE_TRANSITIONS[existing.status] || [];
  if (!allowed.includes(status)) {
    throw invalidTransition(
      `Cannot transition agent instance from ${existing.status} to ${status}.`,
      { from: existing.status, to: status, allowed }
    );
  }

  const patch = { status };
  if (status === "retired") {
    patch.archived_at = new Date().toISOString();
  }

  const instance = await repo.updateAgentInstance(id, patch, existing.project_id);

  await recordAudit(
    getSupabaseAdmin(),
    buildAuditEntry({
      projectId: existing.project_id,
      actor,
      action: "agent_instance.status_changed",
      resourceType: "agent_instance",
      resourceId: id,
      metadata: { from: existing.status, to: status },
    })
  );

  return NextResponse.json({ instance });
});
