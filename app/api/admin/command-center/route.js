import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import { buildCommandCenterSnapshot } from "@/lib/core/command-center";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { notConfigured } from "@/lib/core/errors";
import {
  requireTenantListScope,
  requireProjectAccess,
  scopeToListProjectsOpts,
} from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/command-center
 * Authenticated Command Center snapshot. Optional:
 *   ?project_id=UUID
 *   ?department=slug
 *   ?agent=slug
 */
export const GET = withErrorHandling(async (req) => {
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }

  const url = new URL(req.url);
  const projectIdRaw = url.searchParams.get("project_id");
  const department = url.searchParams.get("department");
  const agentSlug = url.searchParams.get("agent");

  let projectId = null;
  let listOpts = {};
  if (projectIdRaw) {
    assertUuid(projectIdRaw, "project_id");
    projectId = projectIdRaw;
    const { scope } = await requireProjectAccess(req, projectId);
    listOpts = scopeToListProjectsOpts(scope);
  } else {
    const { scope } = await requireTenantListScope(req);
    listOpts = scopeToListProjectsOpts(scope);
  }

  const snapshot = await buildCommandCenterSnapshot({
    projectId,
    department: department || null,
    agentSlug: agentSlug || null,
    listProjectsOpts: listOpts,
  });

  return NextResponse.json(snapshot);
});
