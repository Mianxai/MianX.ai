import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin, actorFromUser } from "@/lib/core/auth";
import { parseJsonBody, assertUuid, clip } from "@/lib/core/validate";
import { decideApproval } from "@/lib/core/runtime";
import { CORE_LIMITS } from "@/lib/core/constants";

export const dynamic = "force-dynamic";

// POST /api/core/approvals/[id]/decision  { decision: "approved"|"rejected", note? }
export const POST = withErrorHandling(async (req, { params }) => {
  const user = await requireAdmin(req);
  const { id } = await params;
  assertUuid(id, "id");

  const body = await parseJsonBody(req);
  const decision = clip(body.decision, 20);
  const note = clip(body.note, CORE_LIMITS.decisionNote);

  const approval = await decideApproval({
    approvalId: id,
    decision,
    decidedBy: actorFromUser(user),
    actorType: "admin",
    note,
  });

  return NextResponse.json({ approval });
});
