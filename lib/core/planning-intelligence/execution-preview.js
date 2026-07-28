/**
 * Execution preview — estimates and waves only. Nothing runs.
 */

import {
  topologicalOrder,
  criticalPath,
  executionWaves,
  blockingAnalysis,
  validateReferences,
  assertAcyclic,
} from "./graph.js";
import { nowIso } from "./schemas.js";

/**
 * Build a non-executing preview from WBS + risks + departments/agents.
 */
export function buildExecutionPreview({
  wbs,
  risks = [],
  departments = [],
  agents = [],
  roadmap = null,
} = {}) {
  if (!wbs) {
    throw new Error("WBS required for execution preview");
  }

  const nodes = [
    ...(wbs.epics || []),
    ...(wbs.features || []),
    ...(wbs.tasks || []),
  ].map((n) => ({
    id: n.id,
    kind: n.kind,
    name: n.name,
    effort: n.payload?.estimated_effort || 1,
  }));

  const nodeIds = new Set(nodes.map((n) => n.id));
  const graphEdges = (wbs.edges || []).filter(
    (e) => nodeIds.has(e.from) && nodeIds.has(e.to)
  );
  validateReferences(nodes, graphEdges);
  assertAcyclic(graphEdges);

  const topo = topologicalOrder(nodes, graphEdges);
  const critical = criticalPath(nodes, graphEdges);
  const waves = executionWaves(nodes, graphEdges);
  const blocking = blockingAnalysis(nodes, graphEdges, []);

  const taskCount = (wbs.tasks || []).length;
  const runSlots = (wbs.agent_runs || []).length;
  const estimatedRuntimeMinutes = taskCount * 15; // planning estimate only

  const deptList = departments.map((d) =>
    typeof d === "string" ? d : d.slug || d.id
  );
  const agentList = (agents || []).map((a) =>
    typeof a === "string" ? a : a.slug || a.id
  );

  return {
    ok: true,
    created_at: nowIso(),
    executes: false,
    fabricated_execution: false,
    estimated_workload: {
      epics: (wbs.epics || []).length,
      features: (wbs.features || []).length,
      stories: (wbs.stories || []).length,
      tasks: taskCount,
      agent_run_slots: runSlots,
      estimated_agent_effort_units:
        roadmap?.payload?.estimated_agent_effort || taskCount,
    },
    departments_involved: deptList,
    agents_involved: agentList,
    agents_note:
      "Agents listed are catalog references only — none are activated or scheduled.",
    execution_waves: waves,
    topological_order: topo.order,
    critical_path: critical,
    blocking,
    risks: (risks || []).map((r) => ({
      slug: r.slug || r.id,
      name: r.name,
      severity: r.payload?.severity || r.severity || "unknown",
    })),
    estimated_runtime: {
      unit: "minutes",
      value: estimatedRuntimeMinutes,
      caveat: "Heuristic planning estimate — not a runtime measurement.",
    },
    expected_outputs: (wbs.deliverables || []).map((d) => ({
      id: d.id,
      name: d.name,
      status: "planned",
    })),
    approval_required: true,
    note: "Execution preview only. No jobs queued. No provider calls. No autonomous execution.",
  };
}
