/**
 * Work distribution — CEO → Department Head → Manager → Specialist.
 * Balancing, priority, queue ordering. Real executable agents only.
 */

import {
  listActiveAgentDefinitions,
  isAgentExecutable,
  getAgentDefinition,
} from "../agents.js";
import { listAgentStates, isWorkforcePaused, recordAudit } from "./store.js";
import { bootstrapWorkforce, transitionAgent } from "./lifecycle.js";
import { nowIso, uid } from "./schemas.js";

const PRIORITY_ORDER = { P0: 0, P1: 1, P2: 2, P3: 3 };

/**
 * Rank agents for assignment: prefer idle, then waiting; respect department.
 */
export function balanceWorkload({
  department = null,
  project_id = null,
  prefer_role = null,
} = {}) {
  if (!listAgentStates({ project_id }).length) {
    bootstrapWorkforce({ project_id });
  }
  const defs = listActiveAgentDefinitions().filter(isAgentExecutable);
  const states = listAgentStates({ project_id });
  const bySlug = new Map(states.map((s) => [s.agent_slug, s]));

  let candidates = defs;
  if (department) {
    candidates = candidates.filter((d) => d.department === department);
  }
  if (prefer_role) {
    const preferred = candidates.filter(
      (d) => d.roleType === prefer_role || d.slug.includes(prefer_role)
    );
    if (preferred.length) candidates = preferred;
  }

  const scored = candidates.map((d) => {
    const st = bySlug.get(d.slug);
    const status = st?.lifecycle_status || "idle";
    let score = 100;
    if (status === "idle") score = 0;
    else if (status === "waiting") score = 10;
    else if (status === "completed") score = 5;
    else score = 50;
    return { slug: d.slug, department: d.department, status, score, name: d.name };
  });
  scored.sort((a, b) => a.score - b.score || a.slug.localeCompare(b.slug));
  return scored;
}

/**
 * Hierarchical distribution plan from CEO downward (structure only until assigned).
 */
export function distributeWork({
  objective,
  project_id = null,
  priority = "P2",
  department_hint = null,
  simulation = false,
} = {}) {
  if (isWorkforcePaused()) {
    throw new Error("Workforce paused — distribution blocked");
  }
  bootstrapWorkforce({ project_id, simulation });

  const ceo = getAgentDefinition("executive-ceo");
  if (!ceo || !isAgentExecutable(ceo)) {
    throw new Error("executive-ceo must be executable for workforce distribution");
  }

  const chain = [];
  chain.push({
    level: "ceo",
    agent_slug: "executive-ceo",
    role: "coordinate",
  });

  // Department heads / managers from idle pool
  const balanced = balanceWorkload({
    department: department_hint,
    project_id,
  });
  const head = balanced.find((a) => a.slug !== "executive-ceo" && a.status === "idle");
  if (head) {
    chain.push({ level: "department_or_manager", agent_slug: head.slug, role: "own" });
  }
  const specialist = balanced.find(
    (a) => a.slug !== "executive-ceo" && a.slug !== head?.slug && a.status === "idle"
  );
  if (specialist) {
    chain.push({ level: "specialist", agent_slug: specialist.slug, role: "execute" });
  }

  const queueItem = {
    id: uid("q"),
    objective: String(objective || "").slice(0, 2000),
    project_id,
    priority,
    priority_rank: PRIORITY_ORDER[priority] ?? 2,
    chain,
    status: "queued",
    simulation: Boolean(simulation),
    created_at: nowIso(),
    retry_count: 0,
  };

  recordAudit({
    action: "workforce.distribute",
    project_id,
    queue_id: queueItem.id,
    chain: chain.map((c) => c.agent_slug),
    simulation: Boolean(simulation),
  });

  return queueItem;
}

export function orderQueue(items = []) {
  return [...items].sort(
    (a, b) =>
      (a.priority_rank ?? 2) - (b.priority_rank ?? 2) ||
      String(a.created_at).localeCompare(String(b.created_at))
  );
}

/**
 * Assign first chain specialist (or CEO) to a task.
 */
export function assignFromQueue(queueItem, { project_id = null } = {}) {
  if (isWorkforcePaused()) throw new Error("Workforce paused");
  const target =
    queueItem.chain?.find((c) => c.level === "specialist") ||
    queueItem.chain?.find((c) => c.level === "department_or_manager") ||
    queueItem.chain?.[0];
  if (!target) throw new Error("Empty distribution chain");
  const task_id = queueItem.id;
  transitionAgent(target.agent_slug, "assigned", {
    project_id: project_id || queueItem.project_id,
    task_id,
    actor: "distributor",
  });
  return { agent_slug: target.agent_slug, task_id, queueItem };
}
