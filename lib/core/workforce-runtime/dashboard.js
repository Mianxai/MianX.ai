/**
 * Live workforce dashboard aggregates.
 */

import { listActiveAgentDefinitions, isAgentExecutable, getAgentDefinition } from "../agents.js";
import {
  listAgentStates,
  listMemoryWrites,
  listLearningProposals,
  listDelegations,
  listPipelineEvents,
  isWorkforcePaused,
} from "./store.js";
import { bootstrapWorkforce } from "./lifecycle.js";
import { computeWorkloadAnalytics } from "./analytics.js";
import { assessWorkforceHealth } from "./health.js";
import { ENGINE_VERSION } from "./schemas.js";
import { getControlStatus } from "./founder-control.js";

export function getWorkforceDashboard({ project_id = null } = {}) {
  if (!listAgentStates({ project_id }).length) {
    bootstrapWorkforce({ project_id });
  }
  const executable = listActiveAgentDefinitions().filter(isAgentExecutable);
  const states = listAgentStates({ project_id });

  const countBy = (status) =>
    states.filter((s) => s.lifecycle_status === status).length;

  const busy = states.filter((s) =>
    ["assigned", "thinking", "planning", "delegating", "executing", "review"].includes(
      s.lifecycle_status
    )
  );

  const runningTasks = listPipelineEvents({ project_id }).filter(
    (e) => e.stage === "execute" && !["ok", "simulated", "blocked_no_provider_or_policy"].includes(e.status)
  );

  const analytics = computeWorkloadAnalytics({ project_id });
  const health = assessWorkforceHealth({ project_id });

  return {
    ok: true,
    engine_version: ENGINE_VERSION,
    executable_agents: executable.length,
    paused: isWorkforcePaused(),
    counts: {
      idle: countBy("idle"),
      busy: busy.length,
      waiting: countBy("waiting"),
      blocked: countBy("blocked"),
      executing: countBy("executing"),
      review: countBy("review"),
      failed: countBy("failed"),
      completed: countBy("completed"),
    },
    busy_agents: busy.map((s) => ({
      slug: s.agent_slug,
      status: s.lifecycle_status,
      task_id: s.current_task_id,
    })),
    idle_agents: states
      .filter((s) => s.lifecycle_status === "idle")
      .map((s) => s.agent_slug),
    waiting_agents: states
      .filter((s) => s.lifecycle_status === "waiting")
      .map((s) => s.agent_slug),
    blocked_agents: states
      .filter((s) => s.lifecycle_status === "blocked")
      .map((s) => s.agent_slug),
    running_tasks: runningTasks.length,
    average_execution_ms: analytics.average_duration_ms,
    memory_writes: listMemoryWrites({ project_id }).length,
    learning_proposals: listLearningProposals({ project_id }).length,
    open_delegations: listDelegations({ project_id }).filter((d) => d.status === "open")
      .length,
    analytics,
    health,
    control: getControlStatus(),
    note: "Live dashboard over real executable catalog (36). Simulation safe. No fabricated agents.",
  };
}

export function getAgentDetail(slug, { project_id = null } = {}) {
  const def = getAgentDefinition(slug);
  if (!def || !isAgentExecutable(def)) {
    throw new Error(`Unknown executable agent: ${slug}`);
  }
  if (!listAgentStates({ project_id }).length) bootstrapWorkforce({ project_id });
  const state = listAgentStates({ project_id }).find((s) => s.agent_slug === slug);
  return {
    profile: {
      slug: def.slug,
      name: def.name,
      purpose: def.purpose,
      department: def.department,
      allowed_capabilities: def.allowedCapabilities,
      requires_human_approval: def.requiresHumanApproval,
      lifecycle_catalog: def.lifecycleStatus,
    },
    department: def.department,
    current_task: state?.current_task_id || null,
    lifecycle_status: state?.lifecycle_status || "idle",
    history: listPipelineEvents({ project_id }).filter((e) => e.agent_slug === slug),
    performance: computeWorkloadAnalytics({ project_id, agent_slug: slug }),
    memory: listMemoryWrites({ project_id, agent_slug: slug }),
    learning: listLearningProposals({ project_id }).filter((p) => p.agent_slug === slug),
    delegations: listDelegations({ project_id }).filter(
      (d) => d.from_agent === slug || d.to_agent === slug
    ),
    dependencies: state?.audit_metadata || {},
  };
}
