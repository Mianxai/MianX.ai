import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import * as repo from "@/lib/core/repo";

export const dynamic = "force-dynamic";

// GET /api/core/audit?project_id=<uuid>
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const params = req.nextUrl?.searchParams;
  const projectId = params?.get("project_id") || undefined;
  if (projectId) assertUuid(projectId, "project_id");
  const logs = await repo.listAuditLogs({ projectId });
  return NextResponse.json({ logs });
});
