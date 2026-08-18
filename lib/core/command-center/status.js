// Derive truthful agent operating status from runtime rows — never invent activity.

import { AGENT_STATUSES } from "./hierarchy";

/**
 * @typedef {"working"|"idle"|"waiting"|"blocked"|"approval_required"|"failed"|"paused"|"unavailable"} AgentStatus
 */

/**
 * Compute status for one agent slug from project-scoped runtime snapshots.
 *
 * Priority (highest first):
 * unavailable → paused → approval_required → blocked → working → failed → waiting → idle
 *
 * @param {object} args
 * @param {string} args.slug
 * @param {string} [args.lifecycleStatus]
 * @param {Array<{status?: string, agent_definitions?: {slug?: string}}>} [args.instances]
 * @param {Array<{status?: string, agent_slug?: string}>} [args.jobs]
 * @param {Array<{status?: string, agent_slug?: string}>} [args.runs]
 * @param {Array<{status?: string, agent_slug?: string, requested_capability?: string}>} [args.approvals]
 * @param {Array<{status?: string, input?: object}>} [args.tasks]
 */
export function deriveAgentStatus({
  slug,
  lifecycleStatus,
  instances = [],
  jobs = [],
  runs = [],
  approvals = [],
  tasks = [],
}) {
  if (
    lifecycleStatus === "draft" ||
    lifecycleStatus === "retired" ||
    lifecycleStatus === "unavailable"
  ) {
    return "unavailable";
  }

  const instance = instances.find(
    (i) => i.agent_definitions?.slug === slug || i.agent_slug === slug
  );
  if (instance?.status === "paused" || instance?.status === "retired") {
    return "paused";
  }

  const pendingApproval = approvals.some(
    (a) => a.status === "pending" && (a.agent_slug === slug || !a.agent_slug)
  );
  // Only attribute approval to agent when agent_slug matches or task mentions it
  const agentApprovals = approvals.filter(
    (a) => a.status === "pending" && a.agent_slug === slug
  );
  if (agentApprovals.length > 0) return "approval_required";

  const agentJobs = jobs.filter((j) => j.agent_slug === slug);
  const agentRuns = runs.filter((r) => r.agent_slug === slug);

  if (agentJobs.some((j) => j.status === "leased" || j.status === "running")) {
    return "working";
  }
  if (agentRuns.some((r) => r.status === "running")) {
    return "working";
  }

  const blockedTask = tasks.some(
    (t) =>
      t.status === "awaiting_approval" &&
      (t.input?.stage === slug ||
        t.input?.agent_slug === slug ||
        agentApprovals.length > 0)
  );
  if (blockedTask) return "blocked";

  // Pending approvals without agent_slug still surface as approval_required only
  // when this agent has a waiting job on that task — handled above.

  if (
    agentJobs.some((j) => j.status === "failed" || j.status === "dead_letter") ||
    agentRuns.some((r) => r.status === "failed")
  ) {
    return "failed";
  }

  if (agentJobs.some((j) => j.status === "queued")) {
    return "waiting";
  }

  // Global pending approvals without agent attribution — do not mark every agent
  void pendingApproval;

  return "idle";
}

/**
 * Attach status + live context to hierarchy agents.
 */
export function enrichAgentsWithRuntime(agents, runtime) {
  return agents.map((agent) => {
    const status = deriveAgentStatus({
      slug: agent.slug,
      lifecycleStatus: agent.lifecycleStatus,
      instances: runtime.instances || [],
      jobs: runtime.jobs || [],
      runs: runtime.runs || [],
      approvals: runtime.approvals || [],
      tasks: runtime.tasks || [],
    });
    if (!AGENT_STATUSES.includes(status)) {
      return { ...agent, status: "idle", live: null };
    }

    const jobs = (runtime.jobs || []).filter((j) => j.agent_slug === agent.slug);
    const runs = (runtime.runs || []).filter((r) => r.agent_slug === agent.slug);
    const latestJob = jobs[0] || null;
    const latestRun = runs[0] || null;
    const instance = (runtime.instances || []).find(
      (i) => i.agent_definitions?.slug === agent.slug
    );

    return {
      ...agent,
      status,
      live: {
        instanceId: instance?.id || null,
        instanceStatus: instance?.status || null,
        projectId: instance?.project_id || latestJob?.project_id || null,
        currentJobId: latestJob?.id || null,
        currentJobStatus: latestJob?.status || null,
        currentWorkflow: latestJob?.workflow || null,
        currentTaskId: latestJob?.task_id || null,
        lastRunId: latestRun?.id || null,
        lastRunStatus: latestRun?.status || null,
      },
    };
  });
}
