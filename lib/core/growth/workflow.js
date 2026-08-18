import * as repo from "../repo";
import { enqueueJob } from "../jobs";
import { recordAudit, buildAuditEntry, AUDIT_ACTIONS } from "../audit";
import { clip } from "../validate";
import { getSupabaseAdmin } from "@/lib/supabase";
import { activateGrowthPod } from "./pod";
import {
  validateSalesOutput,
  validateMarketingOutput,
  validateSeoOutput,
  validateCsOutput,
} from "./schemas";
import { statusPreventsSuccess, assertProjectScope } from "./policy";

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
 * Business growth: Lead Intelligence → Research → Sales → Marketing → SEO → CS → QA → follow-up draft → email approval.
 * Never sends email.
 */
export async function startBusinessGrowth({
  projectId,
  leadId,
  includeResearch = true,
  idempotencyKey = null,
  actor,
  source = "api",
}) {
  const lead = await repo.getLead(leadId);
  const project = await repo.getProject(projectId);
  assertProjectScope({ jobProjectId: project.id, requestedProjectId: projectId });

  const rootKey = idempotencyKey || `wf:business-growth:${lead.id}`;
  const pod = activateGrowthPod({ projectId: project.id });

  const { row: task, created } = await repo.createTask({
    project_id: project.id,
    title: `Business growth: ${clip(lead.email, 200) || lead.id}`,
    description:
      "Wave-5 growth workflow. Drafts only — external communication requires human approval.",
    status: "pending",
    priority: "normal",
    input: {
      workflow: "business-growth",
      lead_id: lead.id,
      include_research: Boolean(includeResearch),
      source,
    },
    idempotency_key: rootKey,
    requires_approval: true,
    created_by: actor,
  });

  const { job, created: jobCreated } = await enqueueWorkflowJob({
    projectId: project.id,
    taskId: task.id,
    agentSlug: "lead-intelligence",
    workflow: "business-growth",
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
      metadata: { workflow: "business-growth", pod_instances: pod.count, source },
    });
  }

  return { task, job, pod, created: created && jobCreated };
}

export function buildBusinessGrowthNextStep(job, output) {
  const prior = { ...(job.input?.prior || {}) };
  const slug = job.agent_slug;

  if (slug === "lead-intelligence") {
    return {
      nextSlug: "research",
      input: {
        question: clip(
          `Account/context research for growth planning: ${output.summary || ""}`,
          2000
        ),
        context: clip(JSON.stringify(output), 4000),
        prior: { "lead-intelligence": output },
      },
    };
  }

  if (slug === "research") {
    return {
      nextSlug: "sales-opportunity",
      input: {
        lead_context: {
          lead: prior["lead-intelligence"],
          research: output,
        },
        mode: "sales",
        prior: { ...prior, research: output },
      },
    };
  }

  if (slug === "sales-opportunity") {
    let sales;
    try {
      sales = validateSalesOutput(output);
    } catch (err) {
      return { halt: "sales_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(sales.sales_status)) {
      return { halt: "sales_failed", sales };
    }
    return {
      nextSlug: "marketing-planner",
      input: {
        context: { sales, lead: prior["lead-intelligence"], research: prior.research },
        sales,
        mode: "marketing",
        prior: { ...prior, "sales-opportunity": sales },
      },
    };
  }

  if (slug === "marketing-planner") {
    let marketing;
    try {
      marketing = validateMarketingOutput(output);
    } catch (err) {
      return { halt: "marketing_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(marketing.marketing_status)) {
      return { halt: "marketing_failed", marketing };
    }
    return {
      nextSlug: "seo-analyst",
      input: {
        context: { marketing, sales: prior["sales-opportunity"] },
        marketing,
        mode: "seo",
        prior: { ...prior, "marketing-planner": marketing },
      },
    };
  }

  if (slug === "seo-analyst") {
    let seo;
    try {
      seo = validateSeoOutput(output);
    } catch (err) {
      return { halt: "seo_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(seo.seo_status)) {
      return { halt: "seo_failed", seo };
    }
    return {
      nextSlug: "customer-success-advisor",
      input: {
        account_context: {
          sales: prior["sales-opportunity"],
          marketing: prior["marketing-planner"],
          seo,
        },
        mode: "cs",
        prior: { ...prior, "seo-analyst": seo },
      },
    };
  }

  if (slug === "customer-success-advisor") {
    let cs;
    try {
      cs = validateCsOutput(output);
    } catch (err) {
      return { halt: "cs_invalid", reason: err.message };
    }
    if (statusPreventsSuccess(cs.cs_status)) {
      return { halt: "cs_failed", cs };
    }
    return {
      nextSlug: "qa-review",
      input: {
        result: clip(
          JSON.stringify({
            lead: prior["lead-intelligence"],
            sales: prior["sales-opportunity"],
            marketing: prior["marketing-planner"],
            seo: prior["seo-analyst"],
            cs,
          }),
          8000
        ),
        acceptance_criteria:
          "Growth package must include qualification, drafts, and no claim that email was sent.",
        prior: { ...prior, "customer-success-advisor": cs },
      },
    };
  }

  if (slug === "qa-review") {
    if (output.verdict !== "pass") return { halt: "qa_failed" };
    return {
      nextSlug: "follow-up-draft",
      input: {
        context: clip(
          JSON.stringify({
            sales: prior["sales-opportunity"],
            cs: prior["customer-success-advisor"],
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
          "Business-growth follow-up draft ready. A human must approve before any email is sent. " +
          "Nothing is sent automatically.",
      },
    };
  }

  return null;
}
