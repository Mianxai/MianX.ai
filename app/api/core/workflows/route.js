import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireCapability, actorFromUser, CAPABILITIES } from "@/lib/admin-auth";
import { parseJsonBody, assertUuid } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import {
  validateWorkflowStart,
  startLeadQualification,
  startProductPlanning,
  startReleaseReadiness,
  startExecutiveObjective,
  startSoftwareDelivery,
  startPlatformCandidate,
  startControlledDelivery,
} from "@/lib/core/workflow";
import { routeExecutiveObjectiveToDelivery } from "@/lib/core/delivery/executive-bridge";

export const dynamic = "force-dynamic";

// POST /api/core/workflows
// Starts a governed workflow. No email, deploy, or external side effect.
export const POST = withErrorHandling(async (req) => {
  const { user } = await requireCapability(req, CAPABILITIES.START_WORKFLOWS);
  const actor = actorFromUser(user);
  rateLimit(`workflow-start:${actor}`, { max: 10, windowMs: 60_000 });

  const body = await parseJsonBody(req);
  const safe = validateWorkflowStart(body);
  assertUuid(safe.project_id, "project_id");

  let result;
  if (safe.workflow === "lead-qualification") {
    assertUuid(safe.lead_id, "lead_id");
    result = await startLeadQualification({
      projectId: safe.project_id,
      leadId: safe.lead_id,
      includeResearch: safe.include_research,
      actor,
    });
  } else if (safe.workflow === "product-planning") {
    result = await startProductPlanning({
      projectId: safe.project_id,
      request: safe.request,
      actor,
    });
  } else if (safe.workflow === "release-readiness") {
    result = await startReleaseReadiness({
      projectId: safe.project_id,
      changeSummary: safe.change_summary,
      evidence: safe.evidence,
      actor,
    });
  } else if (safe.workflow === "executive-readiness") {
    result = await startExecutiveObjective({
      projectId: safe.project_id,
      objective: safe.objective,
      proposedAction: safe.proposed_action,
      actor,
    });
  } else if (safe.workflow === "software-delivery") {
    if (safe.routed_by) {
      result = await routeExecutiveObjectiveToDelivery({
        projectId: safe.project_id,
        objective: safe.objective,
        routedBy: safe.routed_by,
        proposedAction: safe.proposed_action,
        actor,
      });
    } else {
      result = await startSoftwareDelivery({
        projectId: safe.project_id,
        objective: safe.objective,
        proposedAction: safe.proposed_action,
        actor,
      });
    }
  } else if (safe.workflow === "platform-candidate") {
    result = await startPlatformCandidate({
      projectId: safe.project_id,
      objective: safe.objective,
      workspaceRoot: safe.workspace_root,
      edits: Array.isArray(body.edits) ? body.edits : [],
      allowedPathPrefixes: Array.isArray(body.allowed_path_prefixes)
        ? body.allowed_path_prefixes
        : ["fixtures/"],
      commands: Array.isArray(body.commands) ? body.commands : [],
      proposedAction: safe.proposed_action,
      actor,
    });
  } else if (safe.workflow === "controlled-delivery") {
    result = await startControlledDelivery({
      projectId: safe.project_id,
      objective: safe.objective,
      workspaceRoot: safe.workspace_root,
      edits: Array.isArray(body.edits) ? body.edits : [],
      allowedPathPrefixes: Array.isArray(body.allowed_path_prefixes)
        ? body.allowed_path_prefixes
        : ["fixtures/"],
      commands: Array.isArray(body.commands) ? body.commands : [],
      proposedAction: safe.proposed_action,
      routedBy: safe.routed_by,
      actor,
    });
  }

  return NextResponse.json(
    {
      task: result.task,
      job: result.job,
      created: result.created,
      pod: result.pod || null,
      executive_state: result.executive_state || null,
    },
    { status: result.created ? 201 : 200 }
  );
});
