import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin, requireCapability, actorFromUser, CAPABILITIES } from "@/lib/core/auth";
import { parseJsonBody, assertUuid, clip } from "@/lib/core/validate";
import { listAgentDefinitions } from "@/lib/core/agents";
import { registerAgent } from "@/lib/core/runtime";
import * as repo from "@/lib/core/repo";
import { badRequest } from "@/lib/core/errors";

export const dynamic = "force-dynamic";

// GET /api/core/agents
//   ?project_id=<uuid>  -> instances registered in that project
//   (omitted)           -> the registry catalog of available agent definitions
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const projectId = req.nextUrl?.searchParams?.get("project_id");
  if (projectId) {
    assertUuid(projectId, "project_id");
    const instances = await repo.listAgentInstances(projectId);
    return NextResponse.json({ instances });
  }
  return NextResponse.json({ catalog: listAgentDefinitions() });
});

// POST /api/core/agents  { project_id, slug, display_name? }
// Registers a catalog agent into a project as an active instance.
export const POST = withErrorHandling(async (req) => {
  const { user } = await requireCapability(req, CAPABILITIES.MANAGE_AGENTS);
  const body = await parseJsonBody(req);
  const projectId = clip(body.project_id, 64);
  const slug = clip(body.slug, 100);
  if (!projectId || !slug) {
    throw badRequest("project_id and slug are required.");
  }
  assertUuid(projectId, "project_id");
  const instance = await registerAgent({
    projectId,
    slug,
    displayName: clip(body.display_name, 200),
    actor: actorFromUser(user),
  });
  return NextResponse.json({ instance }, { status: 201 });
});
