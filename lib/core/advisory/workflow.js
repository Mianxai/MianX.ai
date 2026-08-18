// Wave-6 advisory workflow: finance → HR → legal (analysis only).

import * as repo from "../repo";
import { enqueueJob } from "../jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "../audit";
import { clip } from "../validate";
import { getSupabaseAdmin } from "@/lib/supabase";
import { activateAdvisoryPod } from "./pod";
import {
  validateFinanceOutput,
  validateHrOutput,
  validateLegalOutput,
} from "./schemas";
import {
  statusPreventsSuccess,
  assertProjectScope,
  deriveAdvisoryApproval,
} from "./policy";
import { ADVISORY_REVIEW_STEPS } from "./agents";
import { isProtectedAction } from "../executive/policy";

async function audit(entry) {
  await recordAudit(getSupabaseAdmin(), buildAuditEntry(entry));
}

function stepKey(rootKey, step) {
  return `${rootKey}:step:${step}`;
}

async function enqueueWorkflowJob(args) {
  return enqueueJob({ ...args, allowDraft: true, actorType: args.actorType || "system" });
}

/**
 * Starts advisory-review: finance-advisor → hr-workforce-planner → legal-risk-advisor.
 */
export async function startAdvisoryReview({
  projectId,
  question,
  matter = null,
  evidence = null,
  proposedAction = null,
  idempotencyKey = null,
  actor,
  source = "api",
}) {
  const project = await repo.getProject(projectId);
  assertProjectScope({ jobProjectId: project.id, requestedProjectId: projectId });

  const clipped = clip(question, 8000);
  const rootKey =
    idempotencyKey ||
    `wf:advisory-review:${project.id}:${clip(clipped, 60).replace(/\s+/g, "-").toLowerCase()}`;

  const proposed_action = proposedAction ? clip(proposedAction, 100) : null;
  const approvalHint = deriveAdvisoryApproval(proposed_action);
  const willNeedApproval =
    isProtectedAction(proposed_action) || Boolean(approvalHint.required);
  const pod = activateAdvisoryPod({ projectId: project.id });

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Advisory review: ${clip(clipped, 120)}`,
    description:
      "Wave-6: finance → HR → legal analysis only. No transfers, hiring decisions, or filings.",
    status: "pending",
    priority: "normal",
    input: {
      workflow: "advisory-review",
      question: clipped,
      proposed_action,
      source,
      stage: "finance-advisor",
    },
    idempotency_key: rootKey,
    requires_approval: willNeedApproval,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueWorkflowJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "finance-advisor",
    workflow: "advisory-review",
    workflowStep: 0,
    input: {
      question: clipped,
      evidence: evidence || {},
      mode: "analyze",
      proposed_action,
      project_id: project.id,
      task_id: task.id,
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
      metadata: {
        workflow: "advisory-review",
        pod_instances: pod.count,
        steps: ADVISORY_REVIEW_STEPS,
        source,
      },
    });
  }

  return { task, job, pod, created: created && jobCreated };
}

/** Alias used by some callers. */
export const startDomainAdvisory = startAdvisoryReview;

export function buildAdvisoryReviewNextStep(job, output) {
  const question = job.input?.question || job.input?.objective || "";
  const proposed_action = job.input?.proposed_action || null;
  const prior = { ...(job.input?.prior || {}) };

  if (job.agent_slug === "finance-advisor") {
    let finance;
    try {
      finance = validateFinanceOutput(output);
    } catch (err) {
      return { halt: "finance_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(finance.finance_status)) {
      return { halt: "finance_failed", finance };
    }
    return {
      nextSlug: "hr-workforce-planner",
      input: {
        question,
        evidence: { finance },
        mode: "plan",
        proposed_action,
        prior: { "finance-advisor": finance },
      },
    };
  }

  if (job.agent_slug === "hr-workforce-planner") {
    let hr;
    try {
      hr = validateHrOutput(output);
    } catch (err) {
      return { halt: "hr_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(hr.hr_status)) {
      return { halt: "hr_failed", hr };
    }
    return {
      nextSlug: "legal-risk-advisor",
      input: {
        matter: question,
        evidence: {
          finance: prior["finance-advisor"],
          hr,
        },
        mode: "analyze",
        proposed_action,
        prior: { ...prior, "hr-workforce-planner": hr },
      },
    };
  }

  if (job.agent_slug === "legal-risk-advisor") {
    let legal;
    try {
      legal = validateLegalOutput(output);
    } catch (err) {
      return { halt: "legal_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(legal.legal_status)) {
      return { halt: "legal_failed", legal };
    }

    const approval = deriveAdvisoryApproval(proposed_action);
    if (approval.required || isProtectedAction(proposed_action)) {
      return {
        approval: {
          capability: approval.capability || "approve_production_action",
          reason: `Protected action "${proposed_action}" requires human approval. Advisory analysis only — nothing was executed.`,
        },
        legal,
      };
    }

    return {
      done: true,
      advisory: {
        finance: prior["finance-advisor"],
        hr: prior["hr-workforce-planner"],
        legal,
      },
    };
  }

  return null;
}

export const buildDomainAdvisoryNextStep = buildAdvisoryReviewNextStep;
