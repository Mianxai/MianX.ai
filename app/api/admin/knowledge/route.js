import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured, badRequest } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { buildKnowledgeView } from "@/lib/core/knowledge/build";
import { requireProjectAccess } from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

export const GET = withErrorHandling(async (req) => {
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    await requireAdmin(req);
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }
  const url = new URL(req.url);
  const projectId = url.searchParams.get("project_id") || null;
  if (!projectId) {
    await requireAdmin(req);
    throw badRequest("project_id is required.");
  }
  assertUuid(projectId, "project_id");
  await requireProjectAccess(req, projectId);
  const data = await buildKnowledgeView({ projectId });
  return NextResponse.json(data);
});
