import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import * as repo from "@/lib/core/repo";

export const dynamic = "force-dynamic";

// GET /api/core/jobs/[id] — job detail (sanitized error/output already stored
// sanitized; nothing secret lives on the row).
export const GET = withErrorHandling(async (req, { params }) => {
  await requireAdmin(req);
  const { id } = await params;
  assertUuid(id, "id");
  const job = await repo.getJob(id);
  return NextResponse.json({ job });
});
