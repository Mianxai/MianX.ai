import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import * as repo from "@/lib/core/repo";
import { requireProjectAccess } from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

// GET /api/core/audit?project_id=<uuid>
// project_id is required — audit logs are project-owned.
export const GET = withErrorHandling(async (req) => {
  const params = req.nextUrl?.searchParams;
  const projectId = params?.get("project_id") || undefined;
  if (!projectId) {
    await requireAdmin(req);
    throw badRequest("project_id is required.");
  }
  assertUuid(projectId, "project_id");
  await requireProjectAccess(req, projectId);
  const logs = await repo.listAuditLogs({ projectId });
  return NextResponse.json({ logs });
});
