// Founder objectives — view models over existing enterprise/runtime tasks.

import { clip } from "@/lib/core/validate";

/** Workflows treated as Founder-facing objectives in the console. */
export const OBJECTIVE_WORKFLOWS = new Set([
  "enterprise-objective",
  "executive-readiness",
  "software-delivery",
  "operations-incident",
  "business-growth",
  "advisory-review",
  "platform-candidate",
  "controlled-delivery",
]);

/**
 * Map runtime task status → Founder console status.
 * @returns {"QUEUED"|"PLANNING"|"RUNNING"|"BLOCKED"|"AWAITING_APPROVAL"|"COMPLETED"|"FAILED"|"CANCELLED"}
 */
export function mapObjectiveStatus(task, { jobs = [], approvals = [] } = {}) {
  const status = task?.status || "pending";
  const taskJobs = jobs.filter((j) => j.task_id === task.id);
  const pendingApproval = approvals.some(
    (a) => a.task_id === task.id && a.status === "pending"
  );

  if (status === "cancelled") return "CANCELLED";
  if (status === "completed") return "COMPLETED";
  if (status === "failed") return "FAILED";
  if (status === "awaiting_approval" || pendingApproval) return "AWAITING_APPROVAL";

  if (
    taskJobs.some((j) => j.status === "dead_letter" || j.status === "failed") &&
    !taskJobs.some((j) => ["queued", "leased", "running"].includes(j.status))
  ) {
    return "FAILED";
  }

  if (status === "running") return "RUNNING";
  if (status === "validated") return "PLANNING";
  if (status === "pending") {
    if (taskJobs.some((j) => ["leased", "running"].includes(j.status))) return "RUNNING";
    if (task.input?.decomposition) return "PLANNING";
    return "QUEUED";
  }

  // Soft block: running but only waiting jobs + blocked deps recorded
  if (task.input?.enterprise_status === "BLOCKED") return "BLOCKED";

  return "QUEUED";
}

export function isObjectiveTask(task) {
  const wf = task?.input?.workflow;
  return Boolean(wf && OBJECTIVE_WORKFLOWS.has(wf));
}

/**
 * Summarize a task as an objective list row (no fake metrics).
 */
export function toObjectiveSummary(task, runtime = {}) {
  if (!task) return null;
  const consoleStatus = mapObjectiveStatus(task, runtime);
  return {
    id: task.id,
    projectId: task.project_id,
    title: task.title,
    objective: task.input?.objective || task.title,
    workflow: task.input?.workflow || null,
    priority: task.priority || null,
    status: consoleStatus,
    runtimeStatus: task.status,
    requiresApproval: Boolean(task.requires_approval),
    proposedAction: task.input?.proposed_action || null,
    createdAt: task.created_at || null,
    updatedAt: task.updated_at || null,
    workstreamCount: Array.isArray(task.input?.decomposition?.workstreams)
      ? task.input.decomposition.workstreams.length
      : null,
  };
}

/**
 * Full objective detail for Founder console.
 */
export function toObjectiveDetail(task, {
  jobs = [],
  runs = [],
  approvals = [],
  audit = [],
  project = null,
} = {}) {
  const summary = toObjectiveSummary(task, { jobs, approvals });
  if (!summary) return null;

  const decomposition = task.input?.decomposition || null;
  const workstreams = Array.isArray(decomposition?.workstreams)
    ? decomposition.workstreams.map((ws) => ({
        id: ws.id || ws.slug || null,
        name: ws.name || ws.title || ws.id || "Workstream",
        department: ws.department || null,
        status: ws.status || null,
        dependsOn: ws.depends_on || ws.dependencies || [],
        agentSlug: ws.agent_slug || ws.runtimeSlug || null,
      }))
    : [];

  const taskJobs = jobs.filter((j) => j.task_id === task.id);
  const taskRuns = runs.filter((r) => r.task_id === task.id);
  const taskApprovals = approvals.filter((a) => a.task_id === task.id);
  const taskAudit = audit.filter(
    (e) => e.resource_id === task.id || e.metadata?.task_id === task.id
  );

  const blockers = [];
  if (summary.status === "AWAITING_APPROVAL") {
    blockers.push({ kind: "approval", message: "Founder approval required" });
  }
  if (summary.status === "FAILED") {
    blockers.push({ kind: "failure", message: "Objective or workstream failed" });
  }
  for (const ws of workstreams) {
    if (["blocked", "BLOCKED", "failed", "FAILED"].includes(String(ws.status))) {
      blockers.push({
        kind: "workstream",
        message: `${ws.name}: ${ws.status}`,
      });
    }
  }

  let synthesis = null;
  const lastSuccess = [...taskJobs]
    .filter((j) => j.status === "succeeded")
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))[0];
  if (lastSuccess?.output && typeof lastSuccess.output === "object") {
    synthesis = {
      summary:
        lastSuccess.output.summary ||
        lastSuccess.output.rationale ||
        lastSuccess.output.verdict ||
        null,
      keys: Object.keys(lastSuccess.output).slice(0, 12),
    };
  }

  return {
    ...summary,
    description: task.description || null,
    project: project
      ? { id: project.id, name: project.name, status: project.status }
      : { id: task.project_id, name: null, status: null },
    executiveOwner: "executive-ceo",
    workstreams,
    assignedAgents: [
      ...new Set(
        [
          ...workstreams.map((w) => w.agentSlug).filter(Boolean),
          ...taskJobs.map((j) => j.agent_slug).filter(Boolean),
        ]
      ),
    ],
    dependencies: workstreams.flatMap((w) =>
      (w.dependsOn || []).map((d) => ({ from: d, to: w.id }))
    ),
    tasks: [{ id: task.id, title: task.title, status: task.status }],
    jobs: taskJobs.map((j) => ({
      id: j.id,
      agentSlug: j.agent_slug,
      status: j.status,
      workflowStep: j.workflow_step,
      attempt: j.attempt,
      maxAttempts: j.max_attempts,
    })),
    runs: taskRuns.map((r) => ({
      id: r.id,
      status: r.status,
      provider: r.provider,
      model: r.model,
    })),
    blockers,
    approvals: taskApprovals.map((a) => ({
      id: a.id,
      status: a.status,
      capability: a.requested_capability,
      reason: a.reason || null,
    })),
    synthesis,
    auditTimeline: taskAudit.slice(0, 40).map((e) => ({
      id: e.id,
      action: e.action,
      actor: e.actor,
      createdAt: e.created_at,
      resourceType: e.resource_type,
    })),
    riskClass: task.input?.decomposition?.risk_class || task.input?.risk_class || null,
    projectProfile: task.input?.project_profile || null,
  };
}

/**
 * Validate Founder objective form (server-authoritative; no capability injection).
 */
export function validateObjectiveSubmit(body) {
  const errors = {};
  const raw = body && typeof body === "object" ? body : {};
  const project_id = clip(raw.project_id, 64);
  const objective = clip(raw.objective, 8000);
  const priority = clip(raw.priority, 20) || "high";
  const proposed_action = clip(raw.proposed_action, 100) || null;
  const risk_class = clip(raw.risk_class, 10) || "R2";
  const deadline = clip(raw.deadline, 40) || null;
  const idempotency_key = clip(raw.idempotency_key, 200) || null;
  const departments_needed = Array.isArray(raw.departments_needed)
    ? raw.departments_needed.map((d) => clip(String(d), 80)).filter(Boolean)
    : [];

  if (!project_id) errors.project_id = "project_id is required.";
  if (!objective) errors.objective = "objective is required.";
  if (objective && objective.length < 8) {
    errors.objective = "objective must be at least 8 characters.";
  }
  if (!["low", "normal", "high", "urgent"].includes(priority)) {
    errors.priority = "priority must be low, normal, high, or urgent.";
  }
  // Reject capability injection attempts
  if (raw.allowed_capabilities || raw.capabilities || raw.agent_capabilities) {
    errors.capabilities = "Capabilities cannot be injected from the client.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: {
      project_id,
      objective,
      priority,
      proposed_action,
      risk_class,
      deadline,
      idempotency_key,
      departments_needed,
      project_profile: clip(raw.project_profile, 80) || "mianx-core",
    },
  };
}
