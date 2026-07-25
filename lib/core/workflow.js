// Three-agent workflow orchestration:
//
//   Lead Intelligence → (optional) Research → QA Review → Human Approval
//
// Safety rules enforced here:
//  * No email or external action is ever executed — the terminal step only
//    creates a *pending* approval_request for a human to decide.
//  * A QA failure (or any failed validation) halts downstream execution.
//  * Agents can never approve their own protected action — the approval is
//    created as "pending" and only lib/core/approvals.js decision rules
//    (admin actor required) can move it.
//  * Every step is idempotent: step jobs use deterministic idempotency keys,
//    so re-processing a success can never enqueue a duplicate step.

import * as repo from "./repo";
import { enqueueJob } from "./jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "./audit";
import { validationError, badRequest } from "./errors";
import { clip } from "./validate";
import { getSupabaseAdmin } from "@/lib/supabase";

export const WORKFLOWS = {
  "lead-qualification": {
    name: "Lead qualification",
    steps: ["lead-intelligence", "research", "qa-review"],
  },
};

async function audit(entry) {
  await recordAudit(getSupabaseAdmin(), buildAuditEntry(entry));
}

function stepKey(rootKey, step) {
  return `${rootKey}:step:${step}`;
}

// Starts the lead-qualification workflow for a lead. Loads the lead
// server-side (never trusting client-supplied lead fields), creates a task
// for traceability and enqueues the first step.
export async function startLeadQualification({
  projectId,
  leadId,
  includeResearch = false,
  idempotencyKey = null,
  actor,
}) {
  const lead = await repo.getLead(leadId);
  const project = await repo.getProject(projectId);

  const rootKey = idempotencyKey || `wf:lead-qualification:${lead.id}`;

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Lead qualification: ${clip(lead.email, 200) || lead.id}`,
    description:
      "Automated lead-qualification workflow (Lead Intelligence → " +
      (includeResearch ? "Research → " : "") +
      "QA Review → human approval). No email is sent automatically.",
    status: "pending",
    priority: "normal",
    input: {
      workflow: "lead-qualification",
      lead_id: lead.id,
      include_research: Boolean(includeResearch),
    },
    idempotency_key: rootKey,
    requires_approval: false,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "lead-intelligence",
    workflow: "lead-qualification",
    workflowStep: 0,
    input: {
      lead_id: lead.id,
      include_research: Boolean(includeResearch),
      name: lead.name || "",
      email: lead.email,
      company: lead.company || "",
      industry: lead.industry || "",
      message: lead.message || "",
    },
    idempotencyKey: stepKey(rootKey, 0),
    actor,
    actorType: "admin",
  });

  return { task, job, created: created && jobCreated };
}

// Builds the input for the next workflow step from the finished job's output.
function buildNextStepInput(job, output) {
  const include = Boolean(job.input?.include_research);
  const slug = job.agent_slug;

  if (slug === "lead-intelligence") {
    if (include) {
      return {
        nextSlug: "research",
        input: {
          question: `What should Mianx.ai verify about this lead before outreach? Lead summary: ${clip(
            output.summary,
            1500
          )}`,
          context: clip(
            `Score ${output.score}/100 (${output.temperature}). Recommended actions: ${(
              output.next_actions || []
            ).join("; ")}`,
            3000
          ),
          include_research: include,
          prior: { "lead-intelligence": output },
        },
      };
    }
    return {
      nextSlug: "qa-review",
      input: {
        result: clip(JSON.stringify({ "lead-intelligence": output }), 8000),
        acceptance_criteria:
          "The lead evaluation must include a numeric score between 0 and 100, " +
          "a temperature of hot/warm/cold, a truthful 2-3 sentence summary, " +
          "concrete next actions, and a professional draft reply that makes no " +
          "false claims and sends nothing automatically.",
        include_research: include,
      },
    };
  }

  if (slug === "research") {
    const prior = job.input?.prior || {};
    return {
      nextSlug: "qa-review",
      input: {
        result: clip(JSON.stringify({ ...prior, research: output }), 8000),
        acceptance_criteria:
          "The combined lead evaluation and research findings must be " +
          "internally consistent, contain no invented citations or URLs, and " +
          "include a professional draft reply that makes no false claims.",
        include_research: include,
      },
    };
  }

  return null; // qa-review is the final agent step.
}

// Called by the worker when a workflow job succeeds. Enqueues the next step,
// or — after a QA pass — creates the pending human approval. A QA failure
// halts the workflow. Idempotent: step jobs reuse deterministic keys.
export async function advanceWorkflow({ job, output, actor = "worker" }) {
  if (!job.workflow || !WORKFLOWS[job.workflow]) return { done: true };

  const rootKeyMatch = /^(.*):step:\d+$/.exec(job.idempotency_key || "");
  const rootKey = rootKeyMatch ? rootKeyMatch[1] : `wf:${job.workflow}:${job.task_id || job.id}`;

  // Terminal step: QA review decides whether a human approval is created.
  if (job.agent_slug === "qa-review") {
    if (output.verdict !== "pass") {
      await audit({
        projectId: job.project_id,
        actor,
        actorType: "system",
        action: AUDIT_ACTIONS.WORKFLOW_HALTED,
        resourceType: "runtime_job",
        resourceId: job.id,
        metadata: {
          workflow: job.workflow,
          reason: "qa_failed",
          issues: (output.issues || []).slice(0, 10),
        },
      });
      return { done: true, halted: true, reason: "qa_failed" };
    }

    // QA passed → pending human approval for the protected outreach action.
    // The QA agent itself can never approve this (separation of duties is
    // enforced in approvals.validateApprovalDecision).
    let approval = null;
    if (job.task_id) {
      const existing = await repo.findPendingApprovalForTask(job.task_id);
      approval =
        existing ||
        (await repo.createApproval({
          project_id: job.project_id,
          task_id: job.task_id,
          requested_capability: "send_email",
          reason:
            "QA review passed. A human must approve the drafted outreach " +
            "before any email is sent. Nothing is sent automatically.",
          status: "pending",
        }));
      if (!existing) {
        await audit({
          projectId: job.project_id,
          actor,
          actorType: "system",
          action: AUDIT_ACTIONS.APPROVAL_REQUESTED,
          resourceType: "approval_request",
          resourceId: approval.id,
          metadata: { workflow: job.workflow, source_job_id: job.id },
        });
      }
    }
    await audit({
      projectId: job.project_id,
      actor,
      actorType: "system",
      action: AUDIT_ACTIONS.WORKFLOW_STEP_COMPLETED,
      resourceType: "runtime_job",
      resourceId: job.id,
      metadata: { workflow: job.workflow, step: job.workflow_step, final: true },
    });
    return { done: true, approval };
  }

  const next = buildNextStepInput(job, output);
  if (!next) return { done: true };

  const nextStep = (job.workflow_step || 0) + 1;
  const { job: nextJob, created } = await enqueueJob({
    projectId: job.project_id,
    taskId: job.task_id,
    agentSlug: next.nextSlug,
    workflow: job.workflow,
    workflowStep: nextStep,
    priority: job.priority || 0,
    input: next.input,
    idempotencyKey: stepKey(rootKey, nextStep),
    actor,
    actorType: "system",
  });

  await audit({
    projectId: job.project_id,
    actor,
    actorType: "system",
    action: AUDIT_ACTIONS.WORKFLOW_STEP_COMPLETED,
    resourceType: "runtime_job",
    resourceId: job.id,
    metadata: {
      workflow: job.workflow,
      step: job.workflow_step,
      next_step: nextStep,
      next_agent: next.nextSlug,
      next_job_id: nextJob.id,
      deduplicated: !created,
    },
  });

  return { done: false, nextJob };
}

// Validates the workflow-start payload (route boundary).
export function validateWorkflowStart(body) {
  const errors = {};
  const raw = body && typeof body === "object" ? body : {};
  const workflow = clip(raw.workflow, 100);
  if (!WORKFLOWS[workflow]) {
    errors.workflow = `workflow must be one of: ${Object.keys(WORKFLOWS).join(", ")}`;
  }
  const project_id = clip(raw.project_id, 64);
  if (!project_id) errors.project_id = "project_id is required.";
  const lead_id = clip(raw.lead_id, 64);
  if (!lead_id) errors.lead_id = "lead_id is required.";
  const include_research =
    typeof raw.include_research === "boolean" ? raw.include_research : false;
  if (Object.keys(errors).length > 0) {
    throw validationError("Please fix the highlighted fields.", errors);
  }
  return { workflow, project_id, lead_id, include_research };
}

export function assertWorkflowExists(workflow) {
  if (!WORKFLOWS[workflow]) {
    throw badRequest("Unknown workflow.");
  }
}
