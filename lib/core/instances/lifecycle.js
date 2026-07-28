// Agent instance lifecycle helpers (maps onto DB statuses after migration).

export const INSTANCE_LIFECYCLE = [
  "provisioning",
  "ready",
  "active",
  "idle",
  "paused",
  "blocked",
  "failed",
  "retired",
];

/** Pre-migration DB only allows active|paused|retired — map extended states. */
export function toPersistedInstanceStatus(status) {
  const s = String(status || "active");
  if (["active", "paused", "retired"].includes(s)) return s;
  if (s === "ready" || s === "idle" || s === "provisioning") return "active";
  if (s === "blocked" || s === "failed") return "paused";
  return "active";
}

export function deriveInstanceOperationalStatus({
  persistedStatus = "active",
  jobs = [],
  instanceId = null,
  agentSlug = null,
} = {}) {
  if (persistedStatus === "retired") return "retired";
  if (persistedStatus === "paused") return "paused";

  const related = jobs.filter(
    (j) =>
      (instanceId && j.agent_instance_id === instanceId) ||
      (agentSlug && j.agent_slug === agentSlug)
  );
  if (related.some((j) => j.status === "leased" || j.status === "running")) return "active";
  if (related.some((j) => j.status === "dead_letter" || j.status === "failed")) return "failed";
  if (related.some((j) => j.status === "queued")) return "ready";
  return persistedStatus === "active" ? "idle" : persistedStatus;
}

/**
 * Plan instance activation without instantiating the full workforce.
 */
export function buildInstanceActivationPlan(routePlan) {
  const selected = routePlan?.selectedAgents || [];
  return selected.map((a) => ({
    agent_slug: a.slug,
    project_id: routePlan.projectId,
    action: a.alreadyInstanced ? "reuse" : "provision",
    target_status: "ready",
    shared_org_allowed: false,
    ephemeral: false,
  }));
}
