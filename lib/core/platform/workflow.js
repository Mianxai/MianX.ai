// Wave-3 platform workflows: platform-candidate + controlled-delivery (Wave2→3).

import * as repo from "../repo";
import { enqueueJob } from "../jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "../audit";
import { clip } from "../validate";
import { getSupabaseAdmin } from "@/lib/supabase";
import { activatePlatformPod } from "./pod";
import {
  validateCodingCandidateOutput,
  validateSecurityOutput,
  validateDevopsOutput,
  validateInfraOutput,
  validateDataAiOutput,
} from "./schemas";
import {
  statusPreventsSuccess,
  derivePlatformApproval,
  aggregatePlatformReadiness,
  assertProjectScope,
} from "./policy";
import {
  PLATFORM_CANDIDATE_STEPS,
  CONTROLLED_DELIVERY_STEPS,
} from "./agents";
import { isProtectedAction } from "../executive/policy";
import {
  validateProductSpec,
  validateArchitecturePlan,
  validateEngineeringResult,
  validateReviewResult,
  validateQaOutput,
} from "../delivery/schemas";
import {
  assertQaIndependence,
  qaPreventsSuccess,
  reviewPreventsProgress,
  IMPLEMENTER_SLUG,
  INDEPENDENT_QA_SLUG,
} from "../delivery/policy";

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
 * Starts a Wave-3 platform candidate from an engineering work package + workspace.
 */
export async function startPlatformCandidate({
  projectId,
  objective,
  workspaceRoot,
  edits,
  allowedPathPrefixes,
  commands = [],
  proposedAction = null,
  workPackage = null,
  idempotencyKey = null,
  actor,
  source = "api",
}) {
  const project = await repo.getProject(projectId);
  assertProjectScope({ jobProjectId: project.id, requestedProjectId: projectId });

  const rootKey =
    idempotencyKey ||
    `wf:platform-candidate:${project.id}:${clip(objective, 60).replace(/\s+/g, "-").toLowerCase()}`;

  const proposed_action = proposedAction ? clip(proposedAction, 100) : null;
  const willNeedApproval = isProtectedAction(proposed_action);
  const pod = activatePlatformPod({ projectId: project.id });

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Platform candidate: ${clip(objective, 120)}`,
    description:
      "Wave-3: coding executor → security → devops → infra → data/AI. " +
      "Workspace-scoped patches only; production deploy remains Founder-gated.",
    status: "pending",
    priority: "high",
    input: {
      workflow: "platform-candidate",
      objective,
      proposed_action,
      workspace_root: workspaceRoot,
      source,
      stage: "coding-executor",
    },
    idempotency_key: rootKey,
    requires_approval: willNeedApproval,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueWorkflowJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "coding-executor",
    workflow: "platform-candidate",
    workflowStep: 0,
    input: {
      objective,
      mode: "code",
      workspace_root: workspaceRoot,
      edits,
      allowed_path_prefixes: allowedPathPrefixes,
      commands,
      work_package: workPackage,
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
      metadata: { workflow: "platform-candidate", pod_instances: pod.count, source },
    });
  }

  return { task, job, pod, created: created && jobCreated };
}

/**
 * Full Wave-2 → Wave-3 controlled delivery from an approved objective.
 */
export async function startControlledDelivery({
  projectId,
  objective,
  workspaceRoot,
  edits,
  allowedPathPrefixes,
  commands = [],
  proposedAction = null,
  idempotencyKey = null,
  actor,
  routedBy = null,
}) {
  const project = await repo.getProject(projectId);
  const rootKey =
    idempotencyKey ||
    `wf:controlled-delivery:${project.id}:${clip(objective, 60).replace(/\s+/g, "-").toLowerCase()}`;

  const proposed_action = proposedAction ? clip(proposedAction, 100) : null;
  const willNeedApproval = isProtectedAction(proposed_action);
  const pod = activatePlatformPod({ projectId: project.id });

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Controlled delivery: ${clip(objective, 120)}`,
    description:
      "Wave-2 product/engineering → controlled coding → review → security → QA → " +
      "DevOps/infra/data-AI readiness. No autonomous production deploy.",
    status: "pending",
    priority: "high",
    input: {
      workflow: "controlled-delivery",
      objective,
      proposed_action,
      workspace_root: workspaceRoot,
      routed_by: routedBy,
      stage: "delivery-product",
    },
    idempotency_key: rootKey,
    requires_approval: willNeedApproval,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueWorkflowJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "delivery-product",
    workflow: "controlled-delivery",
    workflowStep: 0,
    input: {
      objective,
      mode: "specify",
      proposed_action,
      workspace_root: workspaceRoot,
      edits,
      allowed_path_prefixes: allowedPathPrefixes,
      commands,
      project_id: project.id,
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
        workflow: "controlled-delivery",
        routed_by: routedBy,
        pod_instances: pod.count,
      },
    });
  }

  return { task, job, pod, created: created && jobCreated };
}

function codingInputFromJob(job, prior) {
  return {
    objective: job.input?.objective,
    mode: "code",
    workspace_root: job.input?.workspace_root,
    edits: job.input?.edits,
    allowed_path_prefixes: job.input?.allowed_path_prefixes,
    commands: job.input?.commands || [],
    work_package: prior["delivery-engineer"] || job.input?.work_package,
    proposed_action: job.input?.proposed_action,
    project_id: job.project_id,
    task_id: job.task_id,
    prior,
  };
}

/**
 * Advance platform-candidate steps.
 */
export function buildPlatformCandidateNextStep(job, output) {
  const proposed_action = job.input?.proposed_action || null;
  const prior = { ...(job.input?.prior || {}) };

  if (job.agent_slug === "coding-executor") {
    let candidate;
    try {
      candidate = validateCodingCandidateOutput(output);
    } catch (err) {
      return { halt: "coding_failed", reason: err.message };
    }
    if (candidate.validation_passed === false) {
      return { halt: "coding_validation_failed", reason: "Coding validation failed." };
    }
    return {
      nextSlug: "platform-security",
      input: {
        objective: job.input?.objective,
        mode: "security",
        candidate,
        proposed_action,
        prior: { ...prior, "coding-executor": candidate },
      },
    };
  }

  if (job.agent_slug === "platform-security") {
    let security;
    try {
      security = validateSecurityOutput(output);
    } catch (err) {
      return { halt: "security_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(security.security_status)) {
      return {
        halt: security.security_status === "BLOCKED" ? "security_blocked" : "security_failed",
        reason: security.findings?.[0] || `Security ${security.security_status}`,
        security,
      };
    }
    return {
      nextSlug: "platform-devops",
      input: {
        objective: job.input?.objective,
        mode: "devops",
        candidate: job.input?.candidate || prior["coding-executor"],
        security,
        proposed_action,
        prior: { ...prior, "platform-security": security },
      },
    };
  }

  if (job.agent_slug === "platform-devops") {
    let devops;
    try {
      devops = validateDevopsOutput(output);
    } catch (err) {
      return { halt: "devops_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(devops.devops_status)) {
      return { halt: "devops_failed", reason: devops.risk_assessment, devops };
    }
    return {
      nextSlug: "platform-infra",
      input: {
        objective: job.input?.objective,
        mode: "infra",
        candidate: job.input?.candidate,
        devops,
        proposed_action,
        prior: { ...prior, "platform-devops": devops },
      },
    };
  }

  if (job.agent_slug === "platform-infra") {
    let infra;
    try {
      infra = validateInfraOutput(output);
    } catch (err) {
      return { halt: "infra_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(infra.infra_status)) {
      return {
        halt: infra.infra_status === "BLOCKED" ? "infra_blocked" : "infra_failed",
        reason: infra.failure_modes?.[0] || `Infra ${infra.infra_status}`,
        infra,
      };
    }
    return {
      nextSlug: "platform-data-ai",
      input: {
        objective: job.input?.objective,
        mode: "data_ai",
        candidate: job.input?.candidate,
        prior: { ...prior, "platform-infra": infra },
        proposed_action,
      },
    };
  }

  if (job.agent_slug === "platform-data-ai") {
    let dataAi;
    try {
      dataAi = validateDataAiOutput(output);
    } catch (err) {
      return { halt: "data_ai_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(dataAi.data_ai_status)) {
      return {
        halt: dataAi.data_ai_status === "BLOCKED" ? "data_ai_blocked" : "data_ai_failed",
        reason: dataAi.findings?.[0] || `Data/AI ${dataAi.data_ai_status}`,
        dataAi,
      };
    }

    const readiness = aggregatePlatformReadiness({
      candidate: prior["coding-executor"] || job.input?.candidate,
      security: prior["platform-security"],
      devops: prior["platform-devops"],
      infra: prior["platform-infra"],
      dataAi,
      proposedAction: proposed_action,
    });

    if (readiness.blockers.length) {
      return { halt: "platform_not_ready", reason: readiness.blockers[0], readiness };
    }

    const approval = derivePlatformApproval({
      proposedAction: proposed_action,
      readiness,
    });

    if (approval.approval_required) {
      return {
        approval: {
          capability: approval.approval_capability,
          reason: `Protected action "${approval.primary_action}" requires Founder approval.`,
        },
        readiness,
      };
    }

    return { done: true, readiness };
  }

  return null;
}

/**
 * Advance controlled-delivery (Wave-2 + Wave-3) steps.
 */
export function buildControlledDeliveryNextStep(job, output) {
  const objective = job.input?.objective || "";
  const proposed_action = job.input?.proposed_action || null;
  const prior = { ...(job.input?.prior || {}) };
  const workspace_root = job.input?.workspace_root;
  const edits = job.input?.edits;
  const allowed_path_prefixes = job.input?.allowed_path_prefixes;
  const commands = job.input?.commands || [];

  // Reuse Wave-2 product → architect → engineer
  if (job.agent_slug === "delivery-product") {
    try {
      const product_spec = validateProductSpec(output);
      return {
        nextSlug: "delivery-architect",
        input: {
          objective,
          mode: "architect",
          product_spec,
          proposed_action,
          workspace_root,
          edits,
          allowed_path_prefixes,
          commands,
          prior: { "delivery-product": product_spec },
        },
      };
    } catch (err) {
      return { halt: "product_spec_invalid", reason: err.message };
    }
  }

  if (job.agent_slug === "delivery-architect") {
    try {
      const architecture_plan = validateArchitecturePlan(output);
      return {
        nextSlug: "delivery-engineer",
        input: {
          objective,
          mode: "implement",
          product_spec: job.input?.product_spec || prior["delivery-product"],
          architecture_plan,
          proposed_action,
          workspace_root,
          edits,
          allowed_path_prefixes,
          commands,
          prior: { ...prior, "delivery-architect": architecture_plan },
        },
      };
    } catch (err) {
      return { halt: "architecture_failed", reason: err.message };
    }
  }

  if (job.agent_slug === "delivery-engineer") {
    try {
      const engineering = validateEngineeringResult(output);
      return {
        nextSlug: "coding-executor",
        input: codingInputFromJob(
          {
            ...job,
            input: {
              ...job.input,
              workspace_root,
              edits,
              allowed_path_prefixes,
              commands,
              proposed_action,
            },
          },
          { ...prior, "delivery-engineer": engineering }
        ),
      };
    } catch (err) {
      return { halt: "engineering_failed", reason: err.message };
    }
  }

  if (job.agent_slug === "coding-executor") {
    let candidate;
    try {
      candidate = validateCodingCandidateOutput(output);
    } catch (err) {
      return { halt: "coding_failed", reason: err.message };
    }
    if (!candidate.validation_passed) {
      return { halt: "coding_validation_failed", reason: "Coding validation failed." };
    }
    return {
      nextSlug: "delivery-review",
      input: {
        objective,
        mode: "review",
        product_spec: prior["delivery-product"],
        architecture_plan: prior["delivery-architect"],
        implementation_result: {
          ...(prior["delivery-engineer"] || {}),
          candidate,
        },
        implementer_slug: "coding-executor",
        proposed_action,
        prior: { ...prior, "coding-executor": candidate },
      },
    };
  }

  if (job.agent_slug === "delivery-review") {
    let review_result;
    try {
      review_result = validateReviewResult(output);
    } catch (err) {
      return { halt: "review_invalid", reason: err.message };
    }
    if (reviewPreventsProgress(review_result.verdict)) {
      return { halt: "review_rejected", reason: review_result.findings?.[0] };
    }
    return {
      nextSlug: "platform-security",
      input: {
        objective,
        mode: "security",
        candidate: prior["coding-executor"],
        review_result,
        proposed_action,
        prior: { ...prior, "delivery-review": review_result },
      },
    };
  }

  if (job.agent_slug === "platform-security") {
    const next = buildPlatformCandidateNextStep(
      { ...job, agent_slug: "platform-security", input: { ...job.input, prior } },
      output
    );
    // After security, insert QA before devops for controlled-delivery.
    if (next?.nextSlug === "platform-devops") {
      const security = next.input.security;
      return {
        nextSlug: "delivery-qa",
        input: {
          objective,
          mode: "qa",
          product_spec: prior["delivery-product"],
          architecture_plan: prior["delivery-architect"],
          implementation_result: prior["delivery-engineer"],
          review_result: prior["delivery-review"],
          candidate: prior["coding-executor"],
          security,
          implementer_slug: "coding-executor",
          proposed_action,
          prior: { ...prior, "platform-security": security },
        },
      };
    }
    return next;
  }

  if (job.agent_slug === "delivery-qa") {
    try {
      assertQaIndependence({
        implementerSlug: job.input?.implementer_slug || "coding-executor",
        qaSlug: INDEPENDENT_QA_SLUG,
      });
    } catch (err) {
      return { halt: "qa_independence_violation", reason: err.message };
    }
    let qa;
    try {
      qa = validateQaOutput(output);
    } catch (err) {
      return { halt: "qa_invalid", reason: err.message };
    }
    if (qaPreventsSuccess(qa.qa_status)) {
      return {
        halt: qa.qa_status === "BLOCKED" ? "qa_blocked" : "qa_failed",
        reason: qa.delivery_readiness?.blockers?.[0] || `QA ${qa.qa_status}`,
      };
    }
    return {
      nextSlug: "platform-devops",
      input: {
        objective,
        mode: "devops",
        candidate: prior["coding-executor"],
        security: prior["platform-security"],
        qa,
        proposed_action,
        prior: { ...prior, "delivery-qa": qa },
      },
    };
  }

  // Remaining platform steps reuse platform-candidate builder.
  if (
    job.agent_slug === "platform-devops" ||
    job.agent_slug === "platform-infra" ||
    job.agent_slug === "platform-data-ai"
  ) {
    return buildPlatformCandidateNextStep(job, output);
  }

  return null;
}

export { PLATFORM_CANDIDATE_STEPS, CONTROLLED_DELIVERY_STEPS, IMPLEMENTER_SLUG, INDEPENDENT_QA_SLUG };
