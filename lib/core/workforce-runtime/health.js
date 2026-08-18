/**
 * Workforce health — dead agents, blocked queues, circular delegation, memory/learning failures.
 */

import { nowIso, uid } from "./schemas.js";
import {
  listAgentStates,
  listDelegations,
  listMemoryWrites,
  listLearningProposals,
  listHealthEvents,
  pushHealthEvent,
  listPipelineEvents,
} from "./store.js";
import { detectCircularDelegation } from "./communication.js";
import { listActiveAgentDefinitions, isAgentExecutable } from "../agents.js";
import { assessLearningProposal } from "./learning-bridge.js";

export function assessWorkforceHealth({ project_id = null } = {}) {
  const executable = listActiveAgentDefinitions().filter(isAgentExecutable);
  const states = listAgentStates({ project_id });
  const bySlug = new Map(states.map((s) => [s.agent_slug, s]));

  const deadAgents = [];
  for (const def of executable) {
    const st = bySlug.get(def.slug);
    if (!st) {
      deadAgents.push({ slug: def.slug, reason: "missing_state" });
    } else if (st.lifecycle_status === "failed" && (st.attempt_count || 0) >= 3) {
      deadAgents.push({ slug: def.slug, reason: "exhausted_retries" });
    }
  }

  const blocked = states.filter((s) => s.lifecycle_status === "blocked");
  const openDelegations = listDelegations({ project_id }).filter((d) => d.status === "open");
  const circular = detectCircularDelegation(project_id);

  const memoryWrites = listMemoryWrites({ project_id });
  const memoryFailures = memoryWrites.filter((w) => w.payload?.failed === true);

  const learning = listLearningProposals({ project_id });
  const learningFailures = [];
  for (const p of learning) {
    const a = assessLearningProposal(p);
    if (!a.safe && p.status === "applied") {
      learningFailures.push({ id: p.id, reasons: a.reasons });
    }
  }

  const dupClaims = listPipelineEvents({ project_id }).filter(
    (e) => e.stage === "claim" && e.status === "rejected_duplicate"
  );

  const report = {
    id: uid("health"),
    at: nowIso(),
    project_id,
    executable_count: executable.length,
    dead_agents: deadAgents,
    blocked_agents: blocked.map((b) => b.agent_slug),
    blocked_queue_depth: openDelegations.length,
    circular_delegation: circular,
    memory_failures: memoryFailures,
    learning_failures: learningFailures,
    duplicate_execution_blocks: dupClaims.length,
    healthy:
      deadAgents.length === 0 &&
      circular.ok &&
      memoryFailures.length === 0 &&
      learningFailures.length === 0,
  };

  pushHealthEvent({
    id: report.id,
    kind: report.healthy ? "healthy" : "degraded",
    severity: report.healthy ? "info" : "warning",
    project_id,
    payload: report,
    created_at: nowIso(),
  });

  return report;
}

export { listHealthEvents };
