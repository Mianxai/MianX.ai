import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import {
  requireCapability,
  actorFromUser,
  CAPABILITIES,
} from "@/lib/core/auth";
import { parseJsonBody, clip, isSlug } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import * as repo from "@/lib/core/repo";
import { recordAudit, buildAuditEntry } from "@/lib/core/audit";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  requireTenantListScope,
  scopeToListProjectsOpts,
  auditScopePayload,
} from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

// GET /api/core/projects  -> projects in trusted membership/org scope
export const GET = withErrorHandling(async (req) => {
  const { authCtx, scope } = await requireTenantListScope(req);
  const projects = await repo.listProjects(scopeToListProjectsOpts(scope));

  // Platform-admin global org list is intentional; record safe audit evidence.
  if (scope.platformAdmin && scope.mode === "platform_organization") {
    await recordAudit(
      getSupabaseAdmin(),
      buildAuditEntry({
        projectId: null,
        actor: actorFromUser(authCtx.user),
        action: "project.list_scoped",
        resourceType: "project",
        resourceId: null,
        metadata: auditScopePayload(scope, { resultCount: projects.length }),
      })
    ).catch(() => {});
  }

  return NextResponse.json({
    projects,
    scope: {
      mode: scope.mode,
      organizationId: scope.organizationId,
      platformAdmin: scope.platformAdmin === true,
    },
  });
});

// POST /api/core/projects  { name, slug? }
export const POST = withErrorHandling(async (req) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_PROJECTS);
  const actor = actorFromUser(user);
  rateLimit(`project-create:${actor}`, { max: 20, windowMs: 60_000 });

  const body = await parseJsonBody(req);
  const name = clip(body.name, 200);
  if (!name) throw badRequest("Project name is required.");

  let slug = clip(body.slug, 200).toLowerCase();
  if (!slug) {
    slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
  }
  if (!isSlug(slug)) throw badRequest("Invalid slug. Use lowercase letters, numbers and hyphens.");

  const description = clip(body.description, 4000) || null;
  const status = clip(body.status, 32) || "active";
  if (!["active", "paused"].includes(status)) {
    throw badRequest("Invalid project status. Use active or paused.");
  }

  // Never trust client organization_id — always default org.
  const org = await repo.getOrCreateDefaultOrg();
  const project = await repo.createProject({
    organization_id: org.id,
    name,
    slug,
    description,
    status,
  });

  await recordAudit(
    getSupabaseAdmin(),
    buildAuditEntry({
      projectId: project.id,
      actor,
      action: "project.created",
      resourceType: "project",
      resourceId: project.id,
    })
  );

  return NextResponse.json({ project }, { status: 201 });
});
