import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { actorFromUser, CAPABILITIES } from "@/lib/core/auth";
import { parseJsonBody, assertUuid, clip } from "@/lib/core/validate";
import { listAgentDefinitions } from "@/lib/core/agents";
import { registerAgent } from "@/lib/core/runtime";
import * as repo from "@/lib/core/repo";
import { badRequest } from "@/lib/core/errors";
import { rateLimit } from "@/lib/core/ratelimit";
import {
  requireProjectAccess,
  requireTenantListScope,
} from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

// GET /api/core/agents
//   ?project_id=<uuid>  -> instances registered in that project (scoped)
//   (omitted)           -> registry catalog of definitions (not tenant rows)
export const GET = withErrorHandling(async (req) => {
  const projectId = req.nextUrl?.searchParams?.get("project_id");
  if (projectId) {
    assertUuid(projectId, "project_id");
    await requireProjectAccess(req, projectId);
    const instances = await repo.listAgentInstances(projectId);
    return NextResponse.json({ instances });
  }
  // Catalog is global source-controlled definitions — still require admin.
  await requireTenantListScope(req);
  return NextResponse.json({ catalog: listAgentDefinitions() });
});

// POST /api/core/agents  { project_id, slug, display_name? }
export const POST = withErrorHandling(async (req) => {
  const body = await parseJsonBody(req);
  const projectId = clip(body.project_id, 64);
  const slug = clip(body.slug, 100);
  if (!projectId || !slug) {
    throw badRequest("project_id and slug are required.");
  }
  assertUuid(projectId, "project_id");
  const { authCtx } = await requireProjectAccess(req, projectId, {
    capability: CAPABILITIES.MANAGE_AGENTS,
  });
  rateLimit(`agent-register:${actorFromUser(authCtx.user)}`, {
    max: 30,
    windowMs: 60_000,
  });
  const instance = await registerAgent({
    projectId,
    slug,
    displayName: clip(body.display_name, 200),
    actor: actorFromUser(authCtx.user),
  });
  return NextResponse.json({ instance }, { status: 201 });
});
