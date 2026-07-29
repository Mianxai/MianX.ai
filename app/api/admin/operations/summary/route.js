import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { buildProjectOperationalSummary } from "@/lib/core/founder-operations";
import * as repo from "@/lib/core/repo";
import { badRequest } from "@/lib/core/errors";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/operations/summary?project_id=
 * Canonical read-only Founder operational summary for a project.
 */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured("Supabase is not configured.");
  }

  const url = new URL(req.url);
  const projectIdRaw = url.searchParams.get("project_id");
  if (!projectIdRaw) {
    return NextResponse.json({
      ok: false,
      project_id: null,
      note: "project_id required",
    });
  }

  assertUuid(projectIdRaw, "project_id");
  try {
    await repo.getProject(projectIdRaw);
  } catch {
    throw badRequest("Project not found, inaccessible, or archived.");
  }

  const summary = await buildProjectOperationalSummary({ projectId: projectIdRaw });
  return NextResponse.json(summary);
});
