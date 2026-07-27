// Governed multi-agent workflow orchestration.
//
// Workflows:
//   1. lead-qualification:
//      Lead Intelligence → optional Research → QA Review → follow-up draft
//      → pending human approval (send_email). Nothing is sent.
//   2. product-planning:
//      Requirements → Research → Engineering plan → QA Review
//      (analysis only; no GitHub/deploy mutation)
//   3. release-readiness:
//      Test/QA → Security review → Release recommendation → human decision
//      (recommendation only; never deploys)
//
// Draft catalog agents may be enqueued ONLY through these workflow starters
// (allowDraft: true). Casual POST /api/core/jobs still rejects drafts.
// Agents never approve their own protected actions.

import * as repo from "./repo";
import { enqueueJob } from "./jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "./audit";
import { validationError, badRequest } from "./errors";
import { clip } from "./validate";
import { getSupabaseAdmin } from "@/lib/supabase";
import { canTransitionTask } from "./tasks";
import { buildExecutiveNextStep, startExecutiveObjective } from "./executive/workflow";
import { validateExecutiveObjectiveStart } from "./executive/plan";
import {
  buildSoftwareDeliveryNextStep,
  startSoftwareDelivery,
} from "./delivery/workflow";
import {
  buildPlatformCandidateNextStep,
  buildControlledDeliveryNextStep,
  startPlatformCandidate,
  startControlledDelivery,
} from "./platform/workflow";
import {
  buildOperationsIncidentNextStep,
  startOperationsIncident,
} from "./operations/workflow";
import {
  buildBusinessGrowthNextStep,
  startBusinessGrowth,
} from "./growth/workflow";
import {
  buildAdvisoryReviewNextStep,
  startAdvisoryReview,
} from "./advisory/workflow";
import {
  buildEnterpriseNextStep,
  startEnterpriseObjective,
} from "./enterprise/workflow";

export {
  startExecutiveObjective,
  startSoftwareDelivery,
  startPlatformCandidate,
  startControlledDelivery,
  startOperationsIncident,
  startBusinessGrowth,
  startAdvisoryReview,
  startEnterpriseObjective,
};

export const WORKFLOWS = {
  "lead-qualification": {
    name: "Lead qualification",
    steps: ["lead-intelligence", "research", "qa-review", "follow-up-draft"],
  },
  "product-planning": {
    name: "Product planning",
    steps: ["requirements-analyst", "research", "engineering-planning", "qa-review"],
  },
  "release-readiness": {
    name: "Release readiness",
    steps: ["test-qa", "security-review", "release-readiness"],
  },
  "executive-readiness": {
    name: "Executive readiness (Wave-1)",
    steps: [
      "executive-ceo",
      "executive-cto",
      "executive-cpo",
      "executive-ciso",
      "executive-ceo",
    ],
  },
  "software-delivery": {
    name: "Software delivery (Wave-2)",
    steps: [
      "delivery-product",
      "delivery-architect",
      "delivery-engineer",
      "delivery-review",
      "delivery-qa",
    ],
  },
  "platform-candidate": {
    name: "Platform candidate (Wave-3)",
    steps: [
      "coding-executor",
      "platform-security",
      "platform-devops",
      "platform-infra",
      "platform-data-ai",
    ],
  },
  "controlled-delivery": {
    name: "Controlled delivery (Wave-2 + Wave-3)",
    steps: [
      "delivery-product",
      "delivery-architect",
      "delivery-engineer",
      "coding-executor",
      "delivery-review",
      "platform-security",
      "delivery-qa",
      "platform-devops",
      "platform-infra",
      "platform-data-ai",
    ],
  },
  "operations-incident": {
    name: "Operations incident (Wave-4)",
    steps: ["ops-coordinator", "support-triage", "analytics-reporter"],
  },
  "business-growth": {
    name: "Business growth (Wave-5)",
    steps: [
      "lead-intelligence",
      "research",
      "sales-opportunity",
      "marketing-planner",
      "seo-analyst",
      "customer-success-advisor",
      "qa-review",
      "follow-up-draft",
    ],
  },
  "advisory-review": {
    name: "Advisory review (Wave-6)",
    steps: ["finance-advisor", "hr-workforce-planner", "legal-risk-advisor"],
  },
  "enterprise-objective": {
    name: "Enterprise objective orchestration",
    steps: ["workflow-orchestrator", "workflow-orchestrator"],
  },
};

async function audit(entry) {
  await recordAudit(getSupabaseAdmin(), buildAuditEntry(entry));
}

function stepKey(rootKey, step) {
  return `${rootKey}:step:${step}`;
}

async function enqueueWorkflowJob(args) {
  return enqueueJob({ ...args, allowDraft: true, actorType: args.actorType || "system" });
}

// ---------------------------------------------------------------------------
// Lead qualification
// ---------------------------------------------------------------------------
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
      "Lead triage workflow (Lead Intelligence → optional Research → QA → " +
      "follow-up draft → human approval). No email is sent automatically.",
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

  const { job, created: jobCreated } = await enqueueWorkflowJob({
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

  if (created) {
    await audit({
      projectId: project.id,
      actor,
      actorType: "admin",
      action: AUDIT_ACTIONS.TASK_CREATED,
      resourceType: "task",
      resourceId: task.id,
      metadata: { workflow: "lead-qualification", lead_id: lead.id },
    });
  }

  return { task, job, created: created && jobCreated };
}

// ---------------------------------------------------------------------------
// Product planning
// ---------------------------------------------------------------------------
export async function startProductPlanning({
  projectId,
  request,
  idempotencyKey = null,
  actor,
}) {
  const project = await repo.getProject(projectId);
  const clipped = clip(request, 8000);
  if (!clipped) {
    throw validationError("Please fix the highlighted fields.", {
      request: "request is required.",
    });
  }
  const rootKey =
    idempotencyKey ||
    `wf:product-planning:${project.id}:${clipped.slice(0, 40).replace(/\s+/g, "-")}`;

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Product planning: ${clipped.slice(0, 80)}`,
    description:
      "Product planning workflow (Requirements → Research → Engineering plan → QA). " +
      "Produces analysis only — no GitHub mutation or deployment.",
    status: "pending",
    priority: "normal",
    input: { workflow: "product-planning", request: clipped },
    idempotency_key: rootKey,
    requires_approval: false,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueWorkflowJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "requirements-analyst",
    workflow: "product-planning",
    workflowStep: 0,
    input: { request: clipped },
    idempotencyKey: stepKey(rootKey, 0),
    actor,
    actorType: "admin",
  });

  return { task, job, created: created && jobCreated };
}

// ---------------------------------------------------------------------------
// Release readiness
// ---------------------------------------------------------------------------
export async function startReleaseReadiness({
  projectId,
  changeSummary,
  evidence = "",
  idempotencyKey = null,
  actor,
}) {
  const project = await repo.getProject(projectId);
  const summary = clip(changeSummary, 8000);
  if (!summary) {
    throw validationError("Please fix the highlighted fields.", {
      change_summary: "change_summary is required.",
    });
  }
  const evidenceText = clip(evidence, 8000);
  const rootKey =
    idempotencyKey ||
    `wf:release-readiness:${project.id}:${summary.slice(0, 40).replace(/\s+/g, "-")}`;

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Release readiness: ${summary.slice(0, 80)}`,
    description:
      "Release readiness workflow (Test/QA → Security review → Release " +
      "recommendation → human decision). Never deploys or mutates production.",
    status: "pending",
    priority: "normal",
    input: {
      workflow: "release-readiness",
      change_summary: summary,
      evidence: evidenceText,
    },
    idempotency_key: rootKey,
    requires_approval: true,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueWorkflowJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "test-qa",
    workflow: "release-readiness",
    workflowStep: 0,
    input: { change_summary: summary, evidence: evidenceText },
    idempotencyKey: stepKey(rootKey, 0),
    actor,
    actorType: "admin",
  });

  return { task, job, created: created && jobCreated };
}

function rootKeyFromJob(job) {
  const match = /^(.*):step:\d+$/.exec(job.idempotency_key || "");
  return match
    ? match[1]
    : `wf:${job.workflow}:${job.task_id || job.id}`;
}

async function requestHumanApproval({
  job,
  capability,
  reason,
  actor,
}) {
  if (!job.task_id) return null;
  const existing = await repo.findPendingApprovalForTask(job.task_id);
  if (existing) return existing;
  const approval = await repo.createApproval({
    project_id: job.project_id,
    task_id: job.task_id,
    requested_capability: capability,
    reason,
    status: "pending",
  });
  await audit({
    projectId: job.project_id,
    actor,
    actorType: "system",
    action: AUDIT_ACTIONS.APPROVAL_REQUESTED,
    resourceType: "approval_request",
    resourceId: approval.id,
    metadata: { workflow: job.workflow, source_job_id: job.id },
  });
  return approval;
}

function buildNextStepInput(job, output) {
  const include = Boolean(job.input?.include_research);
  const slug = job.agent_slug;
  const prior = job.input?.prior || {};

  // ---- executive-readiness (Wave-1) ----
  if (job.workflow === "executive-readiness") {
    return buildExecutiveNextStep(job, output);
  }

  // ---- software-delivery (Wave-2) ----
  if (job.workflow === "software-delivery") {
    return buildSoftwareDeliveryNextStep(job, output);
  }

  // ---- platform-candidate (Wave-3) ----
  if (job.workflow === "platform-candidate") {
    return buildPlatformCandidateNextStep(job, output);
  }

  // ---- controlled-delivery (Wave-2 + Wave-3) ----
  if (job.workflow === "controlled-delivery") {
    return buildControlledDeliveryNextStep(job, output);
  }

  // ---- operations-incident (Wave-4) ----
  if (job.workflow === "operations-incident") {
    return buildOperationsIncidentNextStep(job, output);
  }

  // ---- business-growth (Wave-5) ----
  if (job.workflow === "business-growth") {
    return buildBusinessGrowthNextStep(job, output);
  }

  // ---- advisory-review (Wave-6) ----
  if (job.workflow === "advisory-review") {
    return buildAdvisoryReviewNextStep(job, output);
  }

  // ---- enterprise-objective ----
  if (job.workflow === "enterprise-objective") {
    return buildEnterpriseNextStep(job, output);
  }

  // ---- lead-qualification ----
  if (job.workflow === "lead-qualification") {
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
            "The lead evaluation must include a numeric score 0-100, temperature " +
            "hot/warm/cold, a truthful summary, concrete next actions, and a " +
            "professional draft reply that sends nothing automatically.",
          include_research: include,
          prior: { "lead-intelligence": output },
        },
      };
    }
    if (slug === "research") {
      return {
        nextSlug: "qa-review",
        input: {
          result: clip(
            JSON.stringify({ ...prior, research: output }),
            8000
          ),
          acceptance_criteria:
            "Combined lead evaluation and research must be consistent, contain " +
            "no invented citations, and include a professional draft reply.",
          include_research: include,
          prior: { ...prior, research: output },
        },
      };
    }
    if (slug === "qa-review") {
      if (output.verdict !== "pass") return { halt: "qa_failed" };
      const leadOut = prior["lead-intelligence"] || {};
      return {
        nextSlug: "follow-up-draft",
        input: {
          context: clip(
            JSON.stringify({
              lead: leadOut,
              research: prior.research || null,
              qa: output,
            }),
            8000
          ),
          audience: "lead contact",
          prior: { ...prior, "qa-review": output },
        },
      };
    }
    if (slug === "follow-up-draft") {
      return {
        approval: {
          capability: "send_email",
          reason:
            "Follow-up draft ready. A human must approve before any email is sent. " +
            "Nothing is sent automatically.",
        },
      };
    }
  }

  // ---- product-planning ----
  if (job.workflow === "product-planning") {
    if (slug === "requirements-analyst") {
      return {
        nextSlug: "research",
        input: {
          question: clip(
            `Research constraints and prior art for: ${output.summary || ""}`,
            2000
          ),
          context: clip(JSON.stringify(output), 4000),
          prior: { "requirements-analyst": output },
        },
      };
    }
    if (slug === "research") {
      return {
        nextSlug: "engineering-planning",
        input: {
          requirements: clip(
            JSON.stringify({
              requirements: prior["requirements-analyst"],
              research: output,
            }),
            8000
          ),
          prior: { ...prior, research: output },
        },
      };
    }
    if (slug === "engineering-planning") {
      return {
        nextSlug: "qa-review",
        input: {
          result: clip(
            JSON.stringify({ ...prior, "engineering-planning": output }),
            8000
          ),
          acceptance_criteria:
            "The engineering plan must include concrete work items, risks, and a " +
            "test plan. It must not claim any GitHub mutation or deployment occurred.",
          prior: { ...prior, "engineering-planning": output },
        },
      };
    }
    if (slug === "qa-review") {
      if (output.verdict !== "pass") return { halt: "qa_failed" };
      return { done: true };
    }
  }

  // ---- release-readiness ----
  if (job.workflow === "release-readiness") {
    if (slug === "test-qa") {
      if (output.verdict === "fail") return { halt: "qa_failed" };
      return {
        nextSlug: "security-review",
        input: {
          change_summary: job.input?.change_summary || "",
          evidence: clip(
            JSON.stringify({ test_qa: output, prior_evidence: job.input?.evidence }),
            8000
          ),
          prior: { "test-qa": output },
        },
      };
    }
    if (slug === "security-review") {
      if (output.verdict === "fail") return { halt: "security_failed" };
      return {
        nextSlug: "release-readiness",
        input: {
          change_summary: job.input?.change_summary || "",
          qa_verdict: prior["test-qa"]?.verdict || "unknown",
          security_verdict: output.verdict,
          prior: { ...prior, "security-review": output },
        },
      };
    }
    if (slug === "release-readiness") {
      return {
        approval: {
          capability: "approve_production_action",
          reason:
            `Release recommendation: ${output.recommendation || "hold"}. ` +
            "A human must decide. This workflow never deploys or mutates production.",
        },
      };
    }
  }

  return null;
}

export async function advanceWorkflow({ job, output, actor = "worker" }) {
  if (!job.workflow || !WORKFLOWS[job.workflow]) return { done: true };

  const rootKey = rootKeyFromJob(job);
  const next = buildNextStepInput(job, output);

  if (next?.halt) {
    await audit({
      projectId: job.project_id,
      actor,
      actorType: "system",
      action: AUDIT_ACTIONS.WORKFLOW_HALTED,
      resourceType: "runtime_job",
      resourceId: job.id,
      metadata: {
        workflow: job.workflow,
        reason: next.halt,
        issues: (output.issues || output.findings || []).slice(0, 10),
      },
    });
    return { done: true, halted: true, reason: next.halt };
  }

  if (next?.approval) {
    const approval = await requestHumanApproval({
      job,
      capability: next.approval.capability,
      reason: next.approval.reason,
      actor,
    });
    if (job.task_id) {
      try {
        const task = await repo.getTask(job.task_id);
        if (task.status !== "awaiting_approval") {
          // Worker keeps the task in "running" during steps; park it for a human.
          if (canTransitionTask(task.status, "awaiting_approval")) {
            await repo.updateTask(job.task_id, { status: "awaiting_approval" });
          }
        }
      } catch {
        /* task sync is advisory */
      }
    }
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
        final: true,
        awaiting_approval: true,
      },
    });
    // Not "done": the workflow is waiting on a human. The last job succeeded,
    // but the linked task must not be marked completed.
    return { done: false, awaitingApproval: true, approval };
  }

  if (next?.done || !next?.nextSlug) {
    await audit({
      projectId: job.project_id,
      actor,
      actorType: "system",
      action: AUDIT_ACTIONS.WORKFLOW_STEP_COMPLETED,
      resourceType: "runtime_job",
      resourceId: job.id,
      metadata: { workflow: job.workflow, step: job.workflow_step, final: true },
    });
    return { done: true };
  }

  const nextStep = (job.workflow_step || 0) + 1;
  const { job: nextJob, created } = await enqueueWorkflowJob({
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

export function validateWorkflowStart(body) {
  const errors = {};
  const raw = body && typeof body === "object" ? body : {};
  const workflow = clip(raw.workflow, 100);
  if (!WORKFLOWS[workflow]) {
    errors.workflow = `workflow must be one of: ${Object.keys(WORKFLOWS).join(", ")}`;
  }
  const project_id = clip(raw.project_id, 64);
  if (!project_id) errors.project_id = "project_id is required.";

  const out = {
    workflow,
    project_id,
    include_research:
      typeof raw.include_research === "boolean" ? raw.include_research : false,
  };

  if (workflow === "lead-qualification") {
    out.lead_id = clip(raw.lead_id, 64);
    if (!out.lead_id) errors.lead_id = "lead_id is required.";
  } else if (workflow === "product-planning") {
    out.request = clip(raw.request, 8000);
    if (!out.request) errors.request = "request is required.";
  } else if (workflow === "release-readiness") {
    out.change_summary = clip(raw.change_summary, 8000);
    out.evidence = clip(raw.evidence, 8000);
    if (!out.change_summary) errors.change_summary = "change_summary is required.";
  } else if (workflow === "executive-readiness") {
    out.objective = clip(raw.objective, 8000);
    out.proposed_action = clip(raw.proposed_action, 100) || null;
    if (!out.objective) errors.objective = "objective is required.";
  } else if (workflow === "software-delivery") {
    out.objective = clip(raw.objective, 8000);
    out.proposed_action = clip(raw.proposed_action, 100) || null;
    out.routed_by = clip(raw.routed_by, 100) || null;
    if (!out.objective) errors.objective = "objective is required.";
  } else if (workflow === "platform-candidate" || workflow === "controlled-delivery") {
    out.objective = clip(raw.objective, 8000);
    out.proposed_action = clip(raw.proposed_action, 100) || null;
    out.workspace_root = clip(raw.workspace_root, 1000) || null;
    out.routed_by = clip(raw.routed_by, 100) || null;
    if (!out.objective) errors.objective = "objective is required.";
    if (workflow === "platform-candidate" && !out.workspace_root) {
      errors.workspace_root = "workspace_root is required for platform-candidate.";
    }
    if (workflow === "controlled-delivery" && !out.workspace_root) {
      errors.workspace_root = "workspace_root is required for controlled-delivery.";
    }
  } else if (workflow === "operations-incident") {
    out.signal = clip(raw.signal, 8000);
    out.objective = clip(raw.objective, 8000) || out.signal;
    out.proposed_action = clip(raw.proposed_action, 100) || null;
    if (!out.signal) errors.signal = "signal is required.";
  } else if (workflow === "business-growth") {
    out.lead_id = clip(raw.lead_id, 64);
    out.include_research =
      typeof raw.include_research === "boolean" ? raw.include_research : true;
    if (!out.lead_id) errors.lead_id = "lead_id is required.";
  } else if (workflow === "advisory-review") {
    out.question = clip(raw.question, 8000);
    out.matter = clip(raw.matter, 8000) || out.question;
    out.proposed_action = clip(raw.proposed_action, 100) || null;
    if (!out.question) errors.question = "question is required.";
  } else if (workflow === "enterprise-objective") {
    out.objective = clip(raw.objective, 8000);
    out.proposed_action = clip(raw.proposed_action, 100) || null;
    out.project_profile = clip(raw.project_profile, 80) || "mianx-core";
    out.risk_class = clip(raw.risk_class, 10) || "R2";
    out.departments_needed = Array.isArray(raw.departments_needed)
      ? raw.departments_needed.map((d) => clip(String(d), 80)).filter(Boolean)
      : [];
    if (!out.objective) errors.objective = "objective is required.";
  }

  if (Object.keys(errors).length > 0) {
    throw validationError("Please fix the highlighted fields.", errors);
  }
  return out;
}

export function assertWorkflowExists(workflow) {
  if (!WORKFLOWS[workflow]) {
    throw badRequest("Unknown workflow.");
  }
}
