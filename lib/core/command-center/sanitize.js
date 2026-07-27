// Sanitize agent/runtime payloads for Admin Command Center responses.

const SENSITIVE_KEY =
  /(secret|password|token|authorization|api[_-]?key|service[_-]?role|cookie|credential)/i;

/**
 * Strip sensitive keys and oversized blobs from objects shown in the UI.
 */
export function sanitizePublicObject(value, { depth = 0, maxDepth = 4 } = {}) {
  if (value == null) return value;
  if (typeof value === "string") {
    if (value.length > 2000) return `${value.slice(0, 2000)}…`;
    return value;
  }
  if (typeof value !== "object") return value;
  if (depth >= maxDepth) return "[truncated]";
  if (Array.isArray(value)) {
    return value.slice(0, 50).map((v) => sanitizePublicObject(v, { depth: depth + 1, maxDepth }));
  }
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    if (SENSITIVE_KEY.test(k)) {
      out[k] = "[redacted]";
      continue;
    }
    out[k] = sanitizePublicObject(v, { depth: depth + 1, maxDepth });
  }
  return out;
}

/**
 * Build a safe agent detail panel payload.
 */
export function buildAgentDetail({
  agent,
  jobs = [],
  runs = [],
  approvals = [],
  audit = [],
  instances = [],
}) {
  if (!agent) return null;
  const agentJobs = jobs.filter((j) => j.agent_slug === agent.slug);
  const agentRuns = runs.filter((r) => r.agent_slug === agent.slug);
  const agentApprovals = approvals.filter(
    (a) => a.agent_slug === agent.slug || a.status === "pending"
  );
  const latestJob = agentJobs[0] || null;
  const latestRun = agentRuns[0] || null;
  const instance = instances.find((i) => i.agent_definitions?.slug === agent.slug);

  let outputSummary = null;
  const rawOut = latestRun?.output || latestJob?.output;
  if (rawOut && typeof rawOut === "object") {
    outputSummary = sanitizePublicObject({
      summary: rawOut.summary || rawOut.rationale || rawOut.verdict || null,
      keys: Object.keys(rawOut).slice(0, 12),
    });
  }

  return sanitizePublicObject({
    canonicalId: agent.workforceSlug || agent.slug,
    runtimeSlug: agent.slug,
    name: agent.name,
    purpose: agent.purpose,
    department: agent.department,
    hierarchyLevel: agent.hierarchyLevel,
    reportsTo: agent.reportsTo,
    capabilities: agent.allowedCapabilities,
    prohibitedCapabilities: agent.prohibitedCapabilities,
    lifecycle: agent.lifecycleStatus,
    riskClass: agent.riskClass,
    autonomyLevel: agent.autonomyLevel,
    provider: agent.defaultProvider,
    model: agent.defaultModel,
    status: agent.status,
    projectScope: {
      instanceId: instance?.id || null,
      projectId: instance?.project_id || agent.live?.projectId || null,
      instanceStatus: instance?.status || null,
    },
    currentTask: latestJob
      ? {
          taskId: latestJob.task_id,
          jobId: latestJob.id,
          workflow: latestJob.workflow,
          status: latestJob.status,
        }
      : null,
    queueJob: latestJob
      ? {
          id: latestJob.id,
          status: latestJob.status,
          attempt: latestJob.attempt,
          maxAttempts: latestJob.max_attempts,
          error: latestJob.error ? sanitizePublicObject(latestJob.error) : null,
        }
      : null,
    lastRun: latestRun
      ? {
          id: latestRun.id,
          status: latestRun.status,
          provider: latestRun.provider,
          model: latestRun.model,
        }
      : null,
    latestOutputSummary: outputSummary,
    failureRetry: latestJob
      ? {
          status: latestJob.status,
          attempt: latestJob.attempt,
          maxAttempts: latestJob.max_attempts,
        }
      : null,
    pendingApproval: agentApprovals
      .filter((a) => a.status === "pending")
      .slice(0, 5)
      .map((a) => ({
        id: a.id,
        capability: a.requested_capability,
        projectId: a.project_id,
      })),
    recentAudit: audit.slice(0, 8).map((e) => ({
      id: e.id,
      action: e.action,
      resourceType: e.resource_type,
      resourceId: e.resource_id,
      createdAt: e.created_at,
    })),
  });
}
