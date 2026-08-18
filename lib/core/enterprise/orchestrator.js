// Enterprise objective orchestration — pure planning + status aggregation.
// Decomposes Founder objectives into department-routed workstreams with an
// explicit dependency graph. Never claims full-workforce activation.

import { planWorkforceActivation } from "@/lib/workforce/planner";
import { isProtectedAction, approvalCapabilityForAction } from "../executive/policy";
import { clip } from "../validate";

export const ENTERPRISE_STATUSES = [
  "PENDING",
  "RUNNING",
  "SUCCESS",
  "PARTIAL_SUCCESS",
  "BLOCKED",
  "FAILED",
  "AWAITING_APPROVAL",
  "CANCELLED",
  "DEAD_LETTER",
];

/** Workstream statuses that prevent overall SUCCESS. */
export const BLOCKING_WORKSTREAM_STATUSES = new Set([
  "blocked",
  "failed",
  "cancelled",
  "awaiting_approval",
  "dead_letter",
  "BLOCKED",
  "FAILED",
  "CANCELLED",
  "AWAITING_APPROVAL",
  "DEAD_LETTER",
]);

const SUCCESS_STATUSES = new Set(["succeeded", "success", "SUCCESS", "done", "completed"]);
const PENDING_STATUSES = new Set([
  "pending",
  "queued",
  "leased",
  "running",
  "RUNNING",
  "PENDING",
]);

function normalizeWsStatus(status) {
  return String(status || "pending").trim();
}

function slugify(text) {
  return clip(String(text || "ws"), 40)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "ws";
}

/**
 * Decompose a Founder objective into workstreams with department routing
 * and an explicit dependency graph. Independent workstreams may run in parallel.
 */
export function decomposeEnterpriseObjective({
  objective,
  departmentsNeeded = [],
  riskClass = "R2",
  proposedAction = null,
  projectProfile = "mianx-core",
  workstreamOverrides = null,
} = {}) {
  const plan = planWorkforceActivation({
    objective,
    departmentsNeeded,
    riskClass,
    proposedAction,
    projectProfile,
  });

  const workstreams = [];

  if (Array.isArray(workstreamOverrides) && workstreamOverrides.length > 0) {
    for (const raw of workstreamOverrides) {
      workstreams.push(normalizeWorkstreamDraft(raw, plan));
    }
  } else {
    // Leadership coordination first when multiple departments.
    if (plan.requiredDepartments.length > 1) {
      workstreams.push({
        id: "ws-leadership",
        name: "Executive coordination",
        department: "leadership",
        required: true,
        optional: false,
        depends_on: [],
        runtime_agents: plan.requiredRuntimeAgents.filter((a) =>
          String(a).startsWith("executive-")
        ),
        canonical_definitions: plan.requiredCanonicalDefinitions.filter((s) =>
          String(s).startsWith("mianx.")
        ),
        status: "pending",
        parallel_group: "coord",
      });
    }

    for (const dept of plan.requiredDepartments) {
      if (dept === "leadership" && workstreams.some((w) => w.department === "leadership")) {
        continue;
      }
      const deps = [];
      if (workstreams.some((w) => w.id === "ws-leadership")) {
        deps.push("ws-leadership");
      }
      // Explicit department-level deps from planner.
      for (const edge of plan.dependencies) {
        if (edge.to === dept) {
          const upstream = workstreams.find((w) => w.department === edge.from);
          if (upstream) deps.push(upstream.id);
        }
      }

      const id = `ws-${slugify(dept)}`;
      const isOps = dept === "operations" || dept === "support";
      const isGrowth = dept === "sales" || dept === "marketing";
      const runtime_agents = hintRuntimeForDept(dept, plan.requiredRuntimeAgents);
      workstreams.push({
        id,
        name: `${dept} workstream`,
        department: dept,
        required: !isGrowth, // growth/sales may be optional for PARTIAL_SUCCESS demos
        optional: isGrowth,
        depends_on: [...new Set(deps)],
        runtime_agents,
        canonical_definitions: plan.requiredCanonicalDefinitions.slice(0, 3),
        status: "pending",
        parallel_group: deps.length === 0 ? "root" : isOps ? "ops" : "delivery",
        incident: isOps && /\bincident\b/i.test(objective || ""),
      });
    }
  }

  const graph = buildDependencyGraph(workstreams);
  const parallelBatches = computeParallelBatches(workstreams);

  return {
    objective: clip(objective || "", 8000),
    proposed_action: proposedAction ? clip(proposedAction, 100) : null,
    risk_class: plan.riskClass,
    workforce_plan: plan,
    workstreams,
    dependency_graph: graph,
    parallel_batches: parallelBatches,
    approval_boundaries: plan.approvalBoundaries,
    note: plan.note,
  };
}

function hintRuntimeForDept(dept, agents) {
  const map = {
    leadership: (a) => String(a).startsWith("executive-"),
    engineering: (a) =>
      ["delivery-engineer", "coding-executor", "delivery-architect"].includes(a),
    product: (a) => a === "delivery-product",
    qa: (a) => a === "delivery-qa" || a === "qa-review",
    security: (a) => a === "platform-security" || a === "executive-ciso",
    devops: (a) => a === "platform-devops",
    infrastructure: (a) => a === "platform-infra",
    "data-ai": (a) => a === "platform-data-ai",
    sales: (a) => a === "lead-intelligence",
    marketing: (a) => a === "lead-intelligence" || a === "research",
    operations: (a) => String(a).startsWith("executive-") || a === "platform-devops",
    research: (a) => a === "research",
  };
  const pred = map[dept];
  if (!pred) return [];
  return (agents || []).filter(pred);
}

function normalizeWorkstreamDraft(raw, plan) {
  const id = raw.id || `ws-${slugify(raw.name || raw.department || "custom")}`;
  return {
    id,
    name: raw.name || id,
    department: raw.department || "leadership",
    required: raw.required !== false && raw.optional !== true,
    optional: raw.optional === true || raw.required === false,
    depends_on: Array.isArray(raw.depends_on) ? raw.depends_on : [],
    runtime_agents: raw.runtime_agents || [],
    canonical_definitions: raw.canonical_definitions || [],
    status: normalizeWsStatus(raw.status || "pending"),
    parallel_group: raw.parallel_group || "custom",
  };
}

export function buildDependencyGraph(workstreams) {
  const nodes = workstreams.map((w) => w.id);
  const edges = [];
  for (const w of workstreams) {
    for (const dep of w.depends_on || []) {
      edges.push({ from: dep, to: w.id });
    }
  }
  return { nodes, edges };
}

/**
 * Batches of workstream ids that may run in parallel (all deps satisfied
 * relative to earlier batches).
 */
export function computeParallelBatches(workstreams) {
  const byId = new Map(workstreams.map((w) => [w.id, w]));
  const remaining = new Set(workstreams.map((w) => w.id));
  const batches = [];
  const completed = new Set();

  while (remaining.size > 0) {
    const batch = [];
    for (const id of remaining) {
      const w = byId.get(id);
      const deps = w.depends_on || [];
      if (deps.every((d) => completed.has(d) || !byId.has(d))) {
        batch.push(id);
      }
    }
    if (batch.length === 0) {
      // Cycle or missing dep — surface remaining as a blocked batch.
      batches.push([...remaining]);
      break;
    }
    batches.push(batch);
    for (const id of batch) {
      remaining.delete(id);
      completed.add(id);
    }
  }
  return batches;
}

/**
 * Aggregate enterprise status from workstream rows.
 *
 * SUCCESS — all required workstreams succeeded
 * PARTIAL_SUCCESS — all required succeeded; one or more optional failed
 * BLOCKED / FAILED / AWAITING_APPROVAL / CANCELLED / DEAD_LETTER — any required
 *   workstream in that blocking state (priority: awaiting_approval > blocked >
 *   dead_letter > failed > cancelled)
 * RUNNING / PENDING — otherwise
 */
export function aggregateEnterpriseStatus(workstreams = []) {
  if (!Array.isArray(workstreams) || workstreams.length === 0) {
    return {
      status: "PENDING",
      reason: "No workstreams.",
      required: [],
      optional: [],
      blocking: [],
    };
  }

  const required = workstreams.filter((w) => w.required !== false && !w.optional);
  const optional = workstreams.filter((w) => w.optional === true || w.required === false);

  const blocking = [];
  for (const w of workstreams) {
    const st = normalizeWsStatus(w.status);
    if (BLOCKING_WORKSTREAM_STATUSES.has(st)) {
      blocking.push({ id: w.id, status: st, required: required.includes(w) });
    }
  }

  const requiredBlocking = blocking.filter((b) => b.required);
  if (requiredBlocking.length > 0) {
    const priority = [
      "awaiting_approval",
      "AWAITING_APPROVAL",
      "blocked",
      "BLOCKED",
      "dead_letter",
      "DEAD_LETTER",
      "failed",
      "FAILED",
      "cancelled",
      "CANCELLED",
    ];
    let chosen = requiredBlocking[0].status;
    for (const p of priority) {
      if (requiredBlocking.some((b) => b.status === p)) {
        chosen = p;
        break;
      }
    }
    const upper = String(chosen).toUpperCase();
    return {
      status: upper,
      reason: `Required workstream in ${chosen}.`,
      required: required.map(summarizeWs),
      optional: optional.map(summarizeWs),
      blocking,
    };
  }

  const allRequiredSuccess =
    required.length > 0 &&
    required.every((w) => SUCCESS_STATUSES.has(normalizeWsStatus(w.status)));

  const anyOptionalFailed = optional.some((w) => {
    const st = normalizeWsStatus(w.status);
    return (
      BLOCKING_WORKSTREAM_STATUSES.has(st) ||
      st === "failed" ||
      st === "FAILED"
    );
  });

  const anyPending = workstreams.some((w) =>
    PENDING_STATUSES.has(normalizeWsStatus(w.status))
  );

  if (allRequiredSuccess && anyOptionalFailed) {
    return {
      status: "PARTIAL_SUCCESS",
      reason: "Required workstreams succeeded; optional workstream(s) failed.",
      required: required.map(summarizeWs),
      optional: optional.map(summarizeWs),
      blocking,
    };
  }

  if (allRequiredSuccess) {
    const optionalOk = optional.every(
      (w) =>
        SUCCESS_STATUSES.has(normalizeWsStatus(w.status)) ||
        PENDING_STATUSES.has(normalizeWsStatus(w.status)) === false
    );
    // If optional still pending, stay RUNNING; if all terminal success → SUCCESS
    const optionalPending = optional.some((w) =>
      PENDING_STATUSES.has(normalizeWsStatus(w.status))
    );
    if (optionalPending) {
      return {
        status: "RUNNING",
        reason: "Required succeeded; optional still running.",
        required: required.map(summarizeWs),
        optional: optional.map(summarizeWs),
        blocking,
      };
    }
    return {
      status: "SUCCESS",
      reason: optionalOk
        ? "All required workstreams succeeded."
        : "All required workstreams succeeded.",
      required: required.map(summarizeWs),
      optional: optional.map(summarizeWs),
      blocking,
    };
  }

  if (required.length === 0 && workstreams.every((w) => SUCCESS_STATUSES.has(normalizeWsStatus(w.status)))) {
    return {
      status: "SUCCESS",
      reason: "All workstreams succeeded.",
      required: [],
      optional: optional.map(summarizeWs),
      blocking,
    };
  }

  if (anyPending) {
    const anyRunning = workstreams.some((w) => {
      const st = normalizeWsStatus(w.status);
      return st === "running" || st === "RUNNING" || st === "leased";
    });
    return {
      status: anyRunning ? "RUNNING" : "PENDING",
      reason: anyRunning ? "Workstreams in progress." : "Workstreams pending.",
      required: required.map(summarizeWs),
      optional: optional.map(summarizeWs),
      blocking,
    };
  }

  return {
    status: "FAILED",
    reason: "Unable to derive SUCCESS from workstream states.",
    required: required.map(summarizeWs),
    optional: optional.map(summarizeWs),
    blocking,
  };
}

function summarizeWs(w) {
  return { id: w.id, status: normalizeWsStatus(w.status), department: w.department };
}

/**
 * Given current workstream states, return ids that are ready to start
 * (deps succeeded, self still pending).
 */
export function readyWorkstreams(workstreams) {
  const byId = new Map(workstreams.map((w) => [w.id, w]));
  return workstreams.filter((w) => {
    const st = normalizeWsStatus(w.status);
    if (!PENDING_STATUSES.has(st) && st !== "pending") return false;
    if (st !== "pending" && st !== "PENDING" && st !== "queued") return false;
    return (w.depends_on || []).every((depId) => {
      const dep = byId.get(depId);
      if (!dep) return true;
      return SUCCESS_STATUSES.has(normalizeWsStatus(dep.status));
    });
  });
}

export function deriveEnterpriseApproval({ proposedAction, aggregate } = {}) {
  if (!isProtectedAction(proposedAction)) {
    return { approval_required: false, approval_capability: null };
  }
  if (aggregate?.status === "AWAITING_APPROVAL" || aggregate?.status === "SUCCESS" || aggregate?.status === "PARTIAL_SUCCESS") {
    return {
      approval_required: true,
      approval_capability: approvalCapabilityForAction(proposedAction),
    };
  }
  return {
    approval_required: true,
    approval_capability: approvalCapabilityForAction(proposedAction),
  };
}
