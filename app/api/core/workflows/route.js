import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin, actorFromUser } from "@/lib/core/auth";
import { parseJsonBody, assertUuid } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import { validateWorkflowStart, startLeadQualification } from "@/lib/core/workflow";

export const dynamic = "force-dynamic";

// POST /api/core/workflows
// { workflow: "lead-qualification", project_id, lead_id, include_research? }
//
// Starts the three-agent workflow: Lead Intelligence → optional Research →
// QA Review → pending human approval. The lead is loaded server-side; no
// email or external action is ever executed by this workflow.
export const POST = withErrorHandling(async (req) => {
  const user = await requireAdmin(req);
  const actor = actorFromUser(user);
  rateLimit(`workflow-start:${actor}`, { max: 10, windowMs: 60_000 });

  const body = await parseJsonBody(req);
  const safe = validateWorkflowStart(body);
  assertUuid(safe.project_id, "project_id");
  assertUuid(safe.lead_id, "lead_id");

  const { task, job, created } = await startLeadQualification({
    projectId: safe.project_id,
    leadId: safe.lead_id,
    includeResearch: safe.include_research,
    actor,
  });

  return NextResponse.json(
    { task, job, created },
    { status: created ? 201 : 200 }
  );
});
