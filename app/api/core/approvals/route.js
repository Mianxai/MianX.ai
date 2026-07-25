import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import * as repo from "@/lib/core/repo";

export const dynamic = "force-dynamic";

// GET /api/core/approvals?project_id=<uuid>&status=<status>
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  const params = req.nextUrl?.searchParams;
  const projectId = params?.get("project_id") || undefined;
  const status = params?.get("status") || undefined;
  if (projectId) assertUuid(projectId, "project_id");
  const approvals = await repo.listApprovals({ projectId, status });
  return NextResponse.json({ approvals });
});
