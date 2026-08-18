import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured, badRequest } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { buildProofDiagnostics } from "@/lib/core/integration/proof-diagnostics.js";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/integration/proof-diagnostics?project_id=<uuid>
 * Authenticated, project-scoped, read-only Founder Proof forensics.
 */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured("Supabase is not configured.");
  }

  const url = new URL(req.url);
  const projectId = url.searchParams.get("project_id");
  if (!projectId) {
    throw badRequest("project_id is required.");
  }
  assertUuid(projectId, "project_id");

  const lookFor =
    url.searchParams.get("run_id") || "e8848aeb-388f-49b3-9b44-7ffbfa715110";

  const diagnostics = await buildProofDiagnostics({
    projectId,
    lookForRunId: lookFor,
  });

  return NextResponse.json({
    ok: diagnostics.ok,
    diagnostics,
  });
});
