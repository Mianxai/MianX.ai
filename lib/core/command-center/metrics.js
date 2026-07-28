// Truthful overview metrics — null/"Data unavailable" when sources missing.

/**
 * @param {object} sources
 * @param {{available: boolean, value: any}|null} sources.jobs
 * @param {{available: boolean, value: any}|null} sources.tasks
 * @param {{available: boolean, value: any}|null} sources.approvals
 * @param {{available: boolean, value: any}|null} sources.projects
 * @param {Array<{status: string}>} [sources.enrichedAgents]
 */
export function buildOverviewMetrics({
  jobs = null,
  tasks = null,
  approvals = null,
  projects = null,
  enrichedAgents = null,
  workflows = null,
} = {}) {
  const metric = (available, value) =>
    available
      ? { available: true, value }
      : { available: false, value: null, label: "Data unavailable" };

  const jobMap = jobs?.available ? jobs.value : null;
  const taskMap = tasks?.available ? tasks.value : null;
  const approvalMap = approvals?.available ? approvals.value : null;
  const projectMap = projects?.available ? projects.value : null;

  let activeAgents = null;
  let idleAgents = null;
  let waitingApprovalAgents = null;
  if (Array.isArray(enrichedAgents)) {
    activeAgents = enrichedAgents.filter((a) => a.status === "working").length;
    idleAgents = enrichedAgents.filter((a) => a.status === "idle").length;
    waitingApprovalAgents = enrichedAgents.filter(
      (a) => a.status === "approval_required"
    ).length;
  }

  const activeWorkflows =
    workflows?.available && Array.isArray(workflows.value)
      ? workflows.value.filter((w) =>
          ["pending", "validated", "running", "awaiting_approval"].includes(w.status)
        ).length
      : null;
  const blockedWorkflows =
    workflows?.available && Array.isArray(workflows.value)
      ? workflows.value.filter((w) => w.status === "awaiting_approval").length
      : null;

  return {
    activeAgents: metric(activeAgents !== null, activeAgents),
    idleAgents: metric(idleAgents !== null, idleAgents),
    waitingApproval: metric(
      waitingApprovalAgents !== null || approvalMap != null,
      waitingApprovalAgents !== null
        ? waitingApprovalAgents
        : approvalMap?.pending ?? null
    ),
    queuedJobs: metric(jobMap != null, jobMap ? Number(jobMap.queued) || 0 : null),
    runningJobs: metric(
      jobMap != null,
      jobMap ? (Number(jobMap.running) || 0) + (Number(jobMap.leased) || 0) : null
    ),
    failedJobs: metric(
      jobMap != null,
      jobMap
        ? (Number(jobMap.failed) || 0) + (Number(jobMap.dead_letter) || 0)
        : null
    ),
    succeededJobs: metric(
      jobMap != null,
      jobMap ? Number(jobMap.succeeded) || 0 : null
    ),
    activeWorkflows: metric(activeWorkflows !== null, activeWorkflows),
    blockedWorkflows: metric(blockedWorkflows !== null, blockedWorkflows),
    activeProjects: metric(
      projectMap != null,
      projectMap?.active ?? null
    ),
  };
}

/**
 * Build CEO brief from stored runtime state (no provider call).
 */
export function buildCeoBrief({
  tasks = [],
  approvals = [],
  jobs = [],
  runs = [],
  scheduler = null,
  productionReadiness = null,
  warnings = [],
} = {}) {
  const activeObjectives = tasks.filter((t) =>
    ["pending", "validated", "running"].includes(t.status)
  );
  const blockedObjectives = tasks.filter((t) => t.status === "awaiting_approval");
  const failedWork = [
    ...jobs.filter((j) => j.status === "failed" || j.status === "dead_letter"),
    ...runs.filter((r) => r.status === "failed"),
  ];
  const pendingApprovals = approvals.filter((a) => a.status === "pending");
  const completed = tasks.filter((t) => t.status === "completed").slice(0, 5);

  const operationalWarnings = [...warnings];
  if (scheduler && !scheduler.automaticProcessing) {
    operationalWarnings.push({
      code: "scheduler_manual",
      message:
        scheduler.mode === "external_scheduler_required"
          ? "Worker secret configured; external/Pro scheduler still required for automatic ticks."
          : "Runtime tick is manual — queue will not drain automatically.",
    });
  }
  if (productionReadiness?.provider === "unconfigured") {
    operationalWarnings.push({
      code: "provider_unconfigured",
      message: "Anthropic provider unconfigured — agent runs return controlled 503.",
    });
  }

  return {
    generatedBy: "runtime-state",
    providerSynthesis: false,
    activeObjectives: activeObjectives.map(summarizeTask),
    blockedObjectives: blockedObjectives.map(summarizeTask),
    failedWork: failedWork.slice(0, 10).map(summarizeFailure),
    pendingApprovals: pendingApprovals.map((a) => ({
      id: a.id,
      projectId: a.project_id,
      capability: a.requested_capability,
      status: a.status,
    })),
    recentCompleted: completed.map(summarizeTask),
    operationalWarnings,
  };
}

function summarizeTask(t) {
  return {
    id: t.id,
    projectId: t.project_id,
    title: t.title,
    status: t.status,
    workflow: t.input?.workflow || null,
  };
}

function summarizeFailure(row) {
  return {
    id: row.id,
    projectId: row.project_id,
    kind: row.agent_slug ? "job_or_run" : "record",
    agentSlug: row.agent_slug || null,
    status: row.status,
    workflow: row.workflow || null,
  };
}
