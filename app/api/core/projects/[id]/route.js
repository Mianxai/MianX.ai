import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import {
  requireCapability,
  actorFromUser,
  CAPABILITIES,
} from "@/lib/core/auth";
import { parseJsonBody, clip } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import * as repo from "@/lib/core/repo";
import { recordAudit, buildAuditEntry } from "@/lib/core/audit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { requireProjectAccess } from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

const PROJECT_STATUSES = new Set(["active", "paused", "archived"]);

// GET /api/core/projects/:id — scoped; foreign IDs → privacy-preserving 404
export const GET = withErrorHandling(async (req, { params }) => {
  const { id } = await params;
  const { project } = await requireProjectAccess(req, id);
  return NextResponse.json({ project });
});

// PATCH /api/core/projects/:id  — status update or soft-archive (never hard delete)
export const PATCH = withErrorHandling(async (req, { params }) => {
  const { id } = await params;
  const { authCtx, project: existing } = await requireProjectAccess(req, id, {
    capability: CAPABILITIES.MANAGE_PROJECTS,
  });
  const actor = actorFromUser(authCtx.user);
  rateLimit(`project-patch:${actor}`, { max: 60, windowMs: 60_000 });

  const body = await parseJsonBody(req);

  // Allowlist only — no mass assignment.
  const patch = {};
  if (body.archived === true || body.status === "archived") {
    patch.status = "archived";
    patch.archived_at = new Date().toISOString();
  } else if (typeof body.status === "string") {
    if (!PROJECT_STATUSES.has(body.status)) {
      throw badRequest("Invalid project status.", {
        status: "Must be active, paused, or archived.",
      });
    }
    patch.status = body.status;
    if (body.status !== "archived") patch.archived_at = null;
  }

  if (typeof body.name === "string") {
    const name = clip(body.name, 200);
    if (!name) throw badRequest("Project name cannot be empty.");
    patch.name = name;
  }
  if (typeof body.description === "string") {
    patch.description = clip(body.description, 4000) || null;
  }

  if (Object.keys(patch).length === 0) {
    throw badRequest("No valid fields to update.");
  }

  const project = await repo.updateProject(id, patch);

  await recordAudit(
    getSupabaseAdmin(),
    buildAuditEntry({
      projectId: project.id,
      actor,
      action: patch.archived_at ? "project.archived" : "project.updated",
      resourceType: "project",
      resourceId: project.id,
      metadata: { before: { status: existing.status }, after: patch },
    })
  );

  return NextResponse.json({ project });
});
