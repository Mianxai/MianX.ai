import { NextResponse } from "next/server";
import { withErrorHandling, badRequest } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid, clip } from "@/lib/core/validate";
import * as repo from "@/lib/core/repo";

export const dynamic = "force-dynamic";

// GET /api/core/runs/[id]?project_id= — run detail scoped to a project.
export const GET = withErrorHandling(async (req, { params }) => {
  await requireAdmin(req);
  const { id } = await params;
  assertUuid(id, "id");
  const projectId = clip(req.nextUrl?.searchParams?.get("project_id") || "", 64);
  if (!projectId) throw badRequest("project_id is required.");
  assertUuid(projectId, "project_id");
  const run = await repo.getRun(id, projectId);
  return NextResponse.json({ run });
});
