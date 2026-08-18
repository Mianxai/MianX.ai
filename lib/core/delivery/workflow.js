// Wave-2 software-delivery workflow.
// approved objective → product → architecture → engineering → review → QA
// → delivery readiness. Founder approval only for protected actions.
// Reuses existing queue / worker / audit / approval path.

import * as repo from "../repo";
import { enqueueJob } from "../jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "../audit";
import { clip } from "../validate";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  validateProductSpec,
  validateArchitecturePlan,
  validateEngineeringResult,
  validateReviewResult,
  validateQaOutput,
  assertNoSilentScopeExpansion,
} from "./schemas";
import {
  assertQaIndependence,
  assertWave2Agent,
  deriveDeliveryApproval,
  qaPreventsSuccess,
  reviewPreventsProgress,
  IMPLEMENTER_SLUG,
  INDEPENDENT_QA_SLUG,
} from "./policy";
import { activateDeliveryPod } from "./pod";
import { SOFTWARE_DELIVERY_STEPS } from "./agents";
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
 * Starts a project-scoped software-delivery objective.
 */
export async function startSoftwareDelivery({
  projectId,
  objective,
  proposedAction = null,
  idempotencyKey = null,
  actor,
  source = "api",
}) {
  const project = await repo.getProject(projectId);
  const rootKey =
    idempotencyKey ||
    `wf:software-delivery:${project.id}:${clip(objective, 80).replace(/\s+/g, "-").toLowerCase()}`;

  const proposed_action = proposedAction ? clip(proposedAction, 100) : null;
  const willNeedApproval = isProtectedAction(proposed_action);

  const pod = activateDeliveryPod({ projectId: project.id });

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Software delivery: ${clip(objective, 120)}`,
    description: willNeedApproval
      ? "Wave-2 delivery with proposed protected action — Founder approval required before that action."
      : "Wave-2 advisory software delivery: Product → Architecture → Engineering → Review → QA.",
    status: "pending",
    priority: "high",
    input: {
      workflow: "software-delivery",
      objective,
      proposed_action,
      pod_count: pod.count,
      source,
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
    workflow: "software-delivery",
    workflowStep: 0,
    input: {
      objective,
      mode: "specify",
      proposed_action,
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
        workflow: "software-delivery",
        proposed_action,
        pod_instances: pod.count,
        source,
      },
    });
  }

  return { task, job, pod, created: created && jobCreated };
}

/**
 * Builds the next software-delivery step from finished job output.
 */
export function buildSoftwareDeliveryNextStep(job, output) {
  const objective = job.input?.objective || "";
  const proposed_action =
    job.input?.proposed_action ||
    job.input?.prior?.proposed_action ||
    null;
  const prior = { ...(job.input?.prior || {}) };

  // ---- Product ----
  if (job.agent_slug === "delivery-product") {
    assertWave2Agent("delivery-product");
    if (output?.recommendation === "blocked") {
      return {
        halt: "product_spec_invalid",
        reason: output.summary || "Product specification blocked.",
      };
    }
    let product_spec;
    try {
      product_spec = validateProductSpec(output);
      assertNoSilentScopeExpansion(product_spec, objective);
    } catch (err) {
      return {
        halt: "product_spec_invalid",
        reason: err.message || "Product specification malformed.",
      };
    }
    if (!product_spec.acceptance_criteria?.length) {
      return { halt: "missing_acceptance_criteria", reason: "Acceptance criteria required." };
    }
    return {
      nextSlug: "delivery-architect",
      input: {
        objective,
        mode: "architect",
        product_spec,
        proposed_action,
        prior: { "delivery-product": product_spec, proposed_action },
      },
    };
  }

  // ---- Architecture ----
  if (job.agent_slug === "delivery-architect") {
    if (output?.recommendation === "blocked" || output?.status === "failed") {
      return {
        halt: "architecture_failed",
        reason: output.summary || "Architecture stage blocked.",
      };
    }
    let architecture_plan;
    try {
      architecture_plan = validateArchitecturePlan(output);
    } catch (err) {
      return {
        halt: "architecture_failed",
        reason: err.message || "Architecture plan invalid.",
      };
    }
    const product_spec = job.input?.product_spec || prior["delivery-product"];
    return {
      nextSlug: "delivery-engineer",
      input: {
        objective,
        mode: "implement",
        product_spec,
        architecture_plan,
        proposed_action,
        prior: {
          ...prior,
          "delivery-architect": architecture_plan,
        },
      },
    };
  }

  // ---- Engineering ----
  if (job.agent_slug === "delivery-engineer") {
    if (
      output?.recommendation === "blocked" ||
      output?.implementation_result?.status === "failed"
    ) {
      return {
        halt: "engineering_failed",
        reason: output?.implementation_result?.summary || "Engineering stage blocked.",
      };
    }
    let engineering;
    try {
      engineering = validateEngineeringResult(output);
    } catch (err) {
      return {
        halt: "engineering_failed",
        reason: err.message || "Engineering result invalid.",
      };
    }
    return {
      nextSlug: "delivery-review",
      input: {
        objective,
        mode: "review",
        product_spec: job.input?.product_spec || prior["delivery-product"],
        architecture_plan: job.input?.architecture_plan || prior["delivery-architect"],
        implementation_result: engineering,
        implementer_slug: IMPLEMENTER_SLUG,
        proposed_action: engineering.proposed_action || proposed_action,
        prior: {
          ...prior,
          "delivery-engineer": engineering,
        },
      },
    };
  }

  // ---- Review ----
  if (job.agent_slug === "delivery-review") {
    let review_result;
    try {
      review_result = validateReviewResult(output);
    } catch (err) {
      return {
        halt: "review_invalid",
        reason: err.message || "Review result invalid.",
      };
    }
    if (reviewPreventsProgress(review_result.verdict)) {
      return {
        halt: "review_rejected",
        reason:
          review_result.findings?.[0] ||
          "Engineering review rejected the implementation result.",
        review_result,
      };
    }
    return {
      nextSlug: "delivery-qa",
      input: {
        objective,
        mode: "qa",
        product_spec: job.input?.product_spec || prior["delivery-product"],
        architecture_plan: job.input?.architecture_plan || prior["delivery-architect"],
        implementation_result:
          job.input?.implementation_result || prior["delivery-engineer"],
        review_result,
        implementer_slug: job.input?.implementer_slug || IMPLEMENTER_SLUG,
        proposed_action,
        prior: {
          ...prior,
          "delivery-review": review_result,
        },
      },
    };
  }

  // ---- Independent QA + delivery readiness ----
  if (job.agent_slug === "delivery-qa") {
    const implementerSlug = job.input?.implementer_slug || IMPLEMENTER_SLUG;
    try {
      assertQaIndependence({
        implementerSlug,
        qaSlug: INDEPENDENT_QA_SLUG,
      });
    } catch (err) {
      return {
        halt: "qa_independence_violation",
        reason: err.message,
      };
    }

    let qa;
    try {
      qa = validateQaOutput(output);
    } catch (err) {
      return {
        halt: "qa_invalid",
        reason: err.message || "QA output invalid.",
      };
    }

    if (qaPreventsSuccess(qa.qa_status)) {
      return {
        halt: qa.qa_status === "BLOCKED" ? "qa_blocked" : "qa_failed",
        reason:
          qa.delivery_readiness?.blockers?.[0] ||
          `QA status ${qa.qa_status} prevents delivery success.`,
        qa,
      };
    }

    const proposed =
      proposed_action ||
      qa.delivery_readiness?.proposed_action ||
      prior["delivery-engineer"]?.proposed_action ||
      null;

    const readiness = {
      ...qa.delivery_readiness,
      qa_status: qa.qa_status,
      proposed_action: proposed,
      known_risks: [
        ...(qa.delivery_readiness.known_risks || []),
        ...(qa.qa_status === "PASS_WITH_RISKS" ? ["QA passed with residual risks"] : []),
      ],
    };

    const approval = deriveDeliveryApproval({
      proposedAction: proposed,
      deliveryReadiness: readiness,
    });

    if (approval.approval_required) {
      return {
        approval: {
          capability: approval.approval_capability,
          reason:
            `Protected action "${approval.primary_action}" requires Founder approval. ` +
            "Wave-2 delivery does not deploy or mutate production automatically.",
        },
        readiness,
        qa,
      };
    }

    // Advisory / internal readiness — complete without Founder approval.
    return {
      done: true,
      readiness: { ...readiness, approval_required: false },
      qa,
    };
  }

  return null;
}

export { SOFTWARE_DELIVERY_STEPS };
