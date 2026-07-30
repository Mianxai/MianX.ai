/**
 * Deterministic Founder Plan readiness gate (display + approval UI).
 * Never mutates runs. Never calls a provider.
 */

import { extractPlanTasks, extractProposedAgents, extractPlanDependencySummary, extractPlanRiskCards } from "./founder-labels.js";
import { isFounderProductionProofRun } from "./founder-proof-canonical.js";

const DISCOURAGED = new Set(["lead-intelligence", "research", "follow-up-draft"]);

/**
 * @param {object} run
 * @returns {{
 *   ready: boolean,
 *   status: 'ready'|'warning'|'blocked',
 *   reasons: string[],
 *   recommended_corrections: string[],
 *   coverage: object,
 *   dependency: object,
 * }}
 */
export function validateFounderPlanReadiness(run) {
  const reasons = [];
  const recommended_corrections = [];
  const warnings = [];

  if (!run) {
    return blocked(["No Founder Proof run is loaded."], [
      "Open Founder Proof for the selected project.",
    ]);
  }

  const tasks = extractPlanTasks(run);
  const agents = extractProposedAgents(run);
  const deps = extractPlanDependencySummary(run);
  const risks = extractPlanRiskCards(run);
  const protectedActions =
    run?.approval_package?.protected_actions ||
    run?.objective?.protected_actions ||
    ["production_deployment"];

  if (!tasks.length) {
    reasons.push("Plan has no work-breakdown tasks.");
    recommended_corrections.push("Return for changes so planning can regenerate the WBS.");
  }

  for (const t of tasks) {
    if (!t.department || t.department === "Unassigned") {
      reasons.push(`Task "${t.title}" has no valid department.`);
      recommended_corrections.push(
        `Assign department ownership for "${t.title}" (Security / HR / Operations / QA).`
      );
    }
    if (!t.agent_role && !t.deferred_allocation_reason) {
      // Soft: tasks may defer to proposed workforce package
      warnings.push(`Task "${t.title}" has no per-task agent role (workforce package may cover it).`);
    }
  }

  const depts = new Set(tasks.map((t) => t.department).filter(Boolean));
  const agentSlugs = agents.map((a) => a.slug || a.role).filter(Boolean);
  const agentBlob = agentSlugs.join(" ").toLowerCase();
  const coverage = {
    security:
      [...depts].some((d) => /security/i.test(d)) ||
      /security|platform-security|ciso/.test(agentBlob),
    hr:
      [...depts].some((d) => /human|hr/i.test(d)) ||
      /hr-workforce|chro|human/.test(agentBlob),
    operations:
      [...depts].some((d) => /operations/i.test(d)) ||
      /ops-coordinator|operations|coo/.test(agentBlob),
    qa:
      [...depts].some((d) => /quality|qa/i.test(d)) ||
      /qa-review|delivery-qa|quality/.test(agentBlob),
  };

  if (isFounderProductionProofRun(run) || /onboard|employee|identity/i.test(run?.objective?.title || "")) {
    for (const [key, label] of [
      ["security", "Security"],
      ["hr", "Human Resources"],
      ["operations", "Operations"],
      ["qa", "Quality Assurance"],
    ]) {
      if (!coverage[key]) {
        reasons.push(`Required ${label} ownership is not covered in the work breakdown.`);
        recommended_corrections.push(`Ensure at least one task is owned by ${label}.`);
      }
    }
  }

  const bad = agentSlugs.filter((s) => DISCOURAGED.has(String(s).toLowerCase()));
  if (bad.length) {
    reasons.push(`Irrelevant default agents selected: ${bad.join(", ")}.`);
    recommended_corrections.push(
      "Exclude lead-intelligence / research / follow-up-draft for secure onboarding proofs."
    );
  }

  if (!agents.length) {
    warnings.push("No proposed agents yet — allocation may appear after package rebuild.");
  }

  // Dependency integrity
  const taskIds = new Set(tasks.map((t) => t.id));
  let duplicateEdge = false;
  const edgeKeys = new Set();
  for (const e of deps.edges || []) {
    if (taskIds.size && (!taskIds.has(e.from) && !String(e.from).startsWith("task"))) {
      // implied sequential may use synthetic ids — skip hard fail when implied
      if (!e.implied) {
        warnings.push(`Dependency references unknown task id ${e.from}.`);
      }
    }
    const key = `${e.from}->${e.to}`;
    if (edgeKeys.has(key)) duplicateEdge = true;
    edgeKeys.add(key);
  }
  if (duplicateEdge) {
    reasons.push("Duplicate dependency edges detected.");
    recommended_corrections.push("Remove duplicate task dependency edges.");
  }

  const cycle = detectCycle(deps.edges || []);
  if (cycle) {
    reasons.push("Dependency graph contains a cycle.");
    recommended_corrections.push("Break the circular dependency before approval.");
  }

  // Protected / provider / simulation boundaries (informational — must remain blocked)
  const productionBlocked = (protectedActions || []).some((p) =>
    /production_deployment|production_deploy/i.test(String(p))
  );
  if (!productionBlocked) {
    warnings.push("production_deployment should remain listed as a protected action.");
  }

  if (run.execution_mode === "live_provider") {
    reasons.push("Live provider execution mode is not allowed for deterministic Founder Proof approval.");
  }

  const status = reasons.length ? "blocked" : warnings.length ? "warning" : "ready";
  return {
    ready: status === "ready" || status === "warning",
    approve_enabled: status !== "blocked",
    status,
    reasons: status === "blocked" ? reasons : [],
    warnings,
    recommended_corrections,
    coverage,
    dependency: {
      count: deps.count,
      acyclic: !cycle,
      edges: deps.edges,
    },
    risk_count: risks.length,
    protected_actions_blocked: true,
    provider_calls_disabled: run.execution_mode !== "live_provider",
    simulation_blocked_until_separate_approval: true,
    will_happen_on_approve: [
      "Plan status advances to Simulation Approval.",
      "Proposed agents remain proposed — not executing.",
    ],
    will_not_happen_on_approve: [
      "Simulation does not start.",
      "Provider is not called.",
      "No production change occurs.",
      "No external side effect occurs.",
      "production_deployment remains blocked.",
    ],
  };
}

function blocked(reasons, recommended_corrections) {
  return {
    ready: false,
    approve_enabled: false,
    status: "blocked",
    reasons,
    warnings: [],
    recommended_corrections,
    coverage: {},
    dependency: { count: 0, acyclic: true, edges: [] },
    protected_actions_blocked: true,
    provider_calls_disabled: true,
    simulation_blocked_until_separate_approval: true,
    will_happen_on_approve: [],
    will_not_happen_on_approve: [
      "Simulation does not start.",
      "Provider is not called.",
      "No production change occurs.",
    ],
  };
}

function detectCycle(edges) {
  const graph = new Map();
  for (const e of edges) {
    if (!e.from || !e.to) continue;
    if (!graph.has(e.from)) graph.set(e.from, []);
    graph.get(e.from).push(e.to);
  }
  const visiting = new Set();
  const visited = new Set();
  function dfs(n) {
    if (visiting.has(n)) return true;
    if (visited.has(n)) return false;
    visiting.add(n);
    for (const next of graph.get(n) || []) {
      if (dfs(next)) return true;
    }
    visiting.delete(n);
    visited.add(n);
    return false;
  }
  for (const n of graph.keys()) {
    if (dfs(n)) return true;
  }
  return false;
}
