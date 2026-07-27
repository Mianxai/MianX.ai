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
  startOperationsIncident,
  startBusinessGrowth,
  startAdvisoryReview,
  startEnterpriseObjective,
} from "@/lib/core/workflow";
import { routeExecutiveObjectiveToDelivery } from "@/lib/core/delivery/executive-bridge";
import { startSoftwareFactory } from "@/lib/core/enterprise/software-factory";

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
  } else if (safe.workflow === "operations-incident") {
    result = await startOperationsIncident({
      projectId: safe.project_id,
      signal: safe.signal,
      objective: safe.objective,
      proposedAction: safe.proposed_action,
      actor,
    });
  } else if (safe.workflow === "business-growth") {
    assertUuid(safe.lead_id, "lead_id");
    result = await startBusinessGrowth({
      projectId: safe.project_id,
      leadId: safe.lead_id,
      includeResearch: safe.include_research,
      actor,
    });
  } else if (safe.workflow === "advisory-review") {
    result = await startAdvisoryReview({
      projectId: safe.project_id,
      question: safe.question,
      matter: safe.matter,
      proposedAction: safe.proposed_action,
      actor,
    });
  } else if (safe.workflow === "enterprise-objective") {
    if (body.factory === "software-factory") {
      result = await startSoftwareFactory({
        projectId: safe.project_id,
        objective: safe.objective,
        mode: body.factory_mode === "controlled-delivery"
          ? "controlled-delivery"
          : "software-delivery",
        proposedAction: safe.proposed_action,
        workspaceRoot: body.workspace_root || null,
        edits: Array.isArray(body.edits) ? body.edits : [],
        allowedPathPrefixes: Array.isArray(body.allowed_path_prefixes)
          ? body.allowed_path_prefixes
          : ["fixtures/"],
        commands: Array.isArray(body.commands) ? body.commands : [],
        actor,
      });
      return NextResponse.json(
        {
          factory: result.factory,
          mode: result.mode,
          executive: result.executive,
          delivery: result.delivery,
          notes: result.notes,
          created: Boolean(result.delivery?.created || result.executive?.created),
        },
        { status: 201 }
      );
    }
    result = await startEnterpriseObjective({
      projectId: safe.project_id,
      objective: safe.objective,
      departmentsNeeded: safe.departments_needed,
      riskClass: safe.risk_class,
      proposedAction: safe.proposed_action,
      projectProfile: safe.project_profile,
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
      decomposition: result.decomposition || null,
    },
    { status: result.created ? 201 : 200 }
  );
});
