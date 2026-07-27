// Map live tasks/jobs onto known workflow stage chains.

export const WORKFLOW_CHAINS = {
  "software-delivery": {
    label: "Software delivery",
    stages: [
      { key: "executive", label: "Executive", agentSlug: "executive-ceo" },
      { key: "product", label: "Product", agentSlug: "delivery-product" },
      { key: "architecture", label: "Architecture", agentSlug: "delivery-architect" },
      { key: "engineering", label: "Engineering", agentSlug: "delivery-engineer" },
      {
        key: "coding",
        label: "Coding candidate",
        agentSlug: "coding-executor",
        optional: true,
      },
      { key: "review", label: "Review", agentSlug: "delivery-review" },
      {
        key: "security",
        label: "Security",
        agentSlug: "platform-security",
        optional: true,
      },
      { key: "qa", label: "QA", agentSlug: "delivery-qa" },
      {
        key: "devops",
        label: "DevOps / Infra",
        agentSlug: "platform-devops",
        optional: true,
      },
    ],
  },
  "business-growth": {
    label: "Business growth",
    stages: [
      { key: "lead", label: "Lead Intelligence", agentSlug: "lead-intelligence" },
      { key: "research", label: "Research", agentSlug: "research", optional: true },
      { key: "sales", label: "Sales", agentSlug: "sales-opportunity" },
      { key: "marketing", label: "Marketing", agentSlug: "marketing-planner" },
      { key: "seo", label: "SEO", agentSlug: "seo-analyst" },
      { key: "cs", label: "Customer Success", agentSlug: "customer-success-advisor" },
      { key: "qa", label: "QA", agentSlug: "qa-review" },
      { key: "approval", label: "Approval", agentSlug: null, kind: "human" },
    ],
  },
  "lead-qualification": {
    label: "Lead qualification",
    stages: [
      { key: "lead", label: "Lead Intelligence", agentSlug: "lead-intelligence" },
      { key: "research", label: "Research", agentSlug: "research", optional: true },
      { key: "qa", label: "QA", agentSlug: "qa-review" },
      { key: "approval", label: "Approval", agentSlug: null, kind: "human" },
    ],
  },
  "operations-incident": {
    label: "Operations incident",
    stages: [
      { key: "ops", label: "Operations", agentSlug: "ops-coordinator" },
      { key: "support", label: "Support", agentSlug: "support-triage" },
      { key: "infra", label: "Infra", agentSlug: "platform-infra" },
      { key: "security", label: "Security", agentSlug: "platform-security" },
      { key: "analytics", label: "Analytics", agentSlug: "analytics-reporter" },
      { key: "executive", label: "Executive", agentSlug: "executive-coo" },
      { key: "approval", label: "Approval", agentSlug: null, kind: "human" },
    ],
  },
  "advisory-review": {
    label: "Advisory review",
    stages: [
      { key: "finance", label: "Finance", agentSlug: "finance-advisor" },
      { key: "hr", label: "HR", agentSlug: "hr-workforce-planner" },
      { key: "legal", label: "Legal", agentSlug: "legal-risk-advisor" },
      { key: "approval", label: "Founder gate", agentSlug: null, kind: "human" },
    ],
  },
  "executive-readiness": {
    label: "Executive readiness",
    stages: [
      { key: "ceo", label: "CEO", agentSlug: "executive-ceo" },
      { key: "c-suite", label: "C-Suite", agentSlug: null, kind: "group" },
    ],
  },
  "enterprise-objective": {
    label: "Enterprise objective",
    stages: [
      { key: "founder", label: "Founder", agentSlug: null, kind: "human" },
      { key: "ceo", label: "Executive", agentSlug: "executive-ceo" },
      { key: "plan", label: "Orchestrator", agentSlug: "workflow-orchestrator" },
      { key: "workstreams", label: "Workstreams", agentSlug: null, kind: "group" },
      { key: "synthesize", label: "Synthesis", agentSlug: "workflow-orchestrator" },
      { key: "approval", label: "Approval", agentSlug: null, kind: "human" },
    ],
  },
};

/**
 * Build visualization rows for active workflow tasks.
 */
export function mapWorkflowVisualizations({ tasks = [], jobs = [], approvals = [] }) {
  const rows = [];
  for (const task of tasks) {
    const workflow = task.input?.workflow;
    if (!workflow || !WORKFLOW_CHAINS[workflow]) continue;
    const chain = WORKFLOW_CHAINS[workflow];
    const taskJobs = jobs.filter((j) => j.task_id === task.id);
    const activeJob =
      taskJobs.find((j) => ["leased", "running", "queued"].includes(j.status)) ||
      null;
    const maxStep = Math.max(
      -1,
      ...taskJobs
        .filter((j) => ["succeeded", "failed", "dead_letter", "cancelled"].includes(j.status))
        .map((j) => Number(j.workflow_step) || 0),
      activeJob ? Number(activeJob.workflow_step) || 0 : -1,
      task.input?.workflow_step != null ? Number(task.input.workflow_step) : -1
    );
    const pendingApproval = approvals.some(
      (a) => a.task_id === task.id && a.status === "pending"
    );

    // Prefer matching the live job's agent slug; fall back to step index.
    const currentSlug = activeJob?.agent_slug || null;

    const stages = chain.stages.map((stage, index) => {
      let state = "pending";
      if (task.status === "completed") state = "completed";
      else if (pendingApproval && stage.kind === "human") state = "approval_required";
      else if (currentSlug && stage.agentSlug === currentSlug) {
        if (activeJob?.status === "running" || activeJob?.status === "leased") {
          state = "working";
        } else if (activeJob?.status === "queued") state = "waiting";
        else state = "current";
      } else if (
        stage.agentSlug &&
        taskJobs.some(
          (j) =>
            j.agent_slug === stage.agentSlug &&
            ["succeeded"].includes(j.status)
        )
      ) {
        state = "completed";
      } else if (!currentSlug && maxStep >= 0 && index < maxStep) {
        state = "completed";
      } else if (!currentSlug && maxStep >= 0 && index === maxStep) {
        if (task.status === "awaiting_approval") state = "blocked";
        else if (task.status === "failed") state = "failed";
        else state = "current";
      }
      return {
        ...stage,
        index,
        state,
        href:
          stage.agentSlug != null
            ? `/admin/command-center?agent=${encodeURIComponent(stage.agentSlug)}`
            : stage.kind === "human"
              ? "/admin/runtime/approvals"
              : null,
      };
    });

    rows.push({
      taskId: task.id,
      projectId: task.project_id,
      title: task.title,
      status: task.status,
      workflow,
      label: chain.label,
      stages,
      detailHref: `/admin/runtime/tasks?project_id=${encodeURIComponent(task.project_id || "")}`,
    });
  }
  return rows;
}
