// Materialise approved Company Builder blueprint into an execution program.

import { forbidden, validationError } from "../errors";
import { baseRecord } from "./model";
import { transitionState } from "./state-machine";
import {
  saveProgram,
  saveItem,
  saveDependency,
  appendEvent,
  saveCheckpoint,
  listItems,
  listDependencies,
  getItem,
} from "./store";
import { CHECKPOINT_KINDS } from "./states";

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Freeze blueprint and create execution graph in-process.
 * Never executes protected actions or industry OS builds.
 */
export function materializeExecutionProgram(blueprint, { actor = "founder" } = {}) {
  if (!blueprint) throw validationError("Blueprint required.");
  if (blueprint.status === "rejected" || blueprint.status === "cancelled") {
    throw forbidden("Rejected/cancelled blueprint is non-executable.");
  }
  if (blueprint.status !== "approved") {
    throw forbidden("Only approved blueprints may materialise an execution program.");
  }

  const frozen = JSON.parse(JSON.stringify(blueprint));
  const companyId = uid("company");
  const productId = uid("product");
  const programId = uid("program");
  const projectId = blueprint.project_id;
  const objectiveId = blueprint.objective?.objective_id || null;

  let program = {
    id: programId,
    company_id: companyId,
    product_id: productId,
    project_id: projectId,
    blueprint_id: blueprint.id,
    blueprint_version: blueprint.engine_version || 1,
    objective_id: objectiveId,
    status: "approved",
    priority: blueprint.objective?.priority || "P2",
    risk_level: blueprint.objective?.risk_class || "R2",
    frozen_blueprint: frozen,
    company: {
      id: companyId,
      name: frozen.backlog?.company?.title || "MianX.ai",
      project_id: projectId,
    },
    product: {
      id: productId,
      name: frozen.objective?.product_hint || "Product",
      industry: frozen.objective?.industry || "general",
      company_id: companyId,
      project_id: projectId,
    },
    paused_at: null,
    cancelled_at: null,
    created_by: actor,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    metadata: {
      industry_os_build: false,
      note: "Execution program for planning deliverables — does not build RestaurantOS/PoultryOS.",
    },
  };
  saveProgram(program);

  appendEvent({
    program_id: programId,
    project_id: projectId,
    event_type: "approval_immutable",
    actor,
    payload: {
      blueprint_id: blueprint.id,
      decided_by: blueprint.decided_by || actor,
      frozen: true,
    },
  });
  saveCheckpoint({
    program_id: programId,
    project_id: projectId,
    kind: CHECKPOINT_KINDS[0],
    label: "Blueprint approved and frozen",
    payload: { blueprint_id: blueprint.id },
  });
  saveCheckpoint({
    program_id: programId,
    project_id: projectId,
    kind: CHECKPOINT_KINDS[1],
    label: "Execution program created",
    payload: { program_id: programId },
  });

  const idMap = new Map();
  const backlog = frozen.backlog || {};
  const buckets = [
    ["epics", "epic"],
    ["features", "feature"],
    ["stories", "story"],
    ["tasks", "task"],
    ["agent_runs", "agent_run"],
  ];

  for (const [key, level] of buckets) {
    for (const row of backlog[key] || []) {
      const parentMapped = row.parent_id ? idMap.get(row.parent_id) || null : null;
      const wave =
        (frozen.roadmap?.waves || []).find(
          (w) =>
            (w.feature_ids || []).includes(row.id) ||
            (w.feature_ids || []).includes(row.parent_id)
        )?.wave || null;

      const item = baseRecord({
        id: uid(level),
        level,
        parent_id: parentMapped,
        company_id: companyId,
        project_id: projectId,
        objective_id: objectiveId,
        program_id: programId,
        blueprint_id: blueprint.id,
        status: "queued",
        priority: program.priority,
        risk_level: program.risk_level,
        title: row.title,
        department: row.department || null,
        wave,
        dependency_ids: [],
        audit_metadata: { source_backlog_id: row.id },
        extra: {
          review_requirements:
            level === "task" || level === "agent_run" ? ["qa"] : [],
          lineage_source_id: row.id,
        },
      });
      idMap.set(row.id, item.id);
      saveItem(item);
    }
  }

  // Only materialise edges whose endpoints both map to execution items.
  // Phase/department graph nodes are planning metadata, not runnable parents.
  for (const edge of frozen.dependency_graph?.edges || []) {
    const from = idMap.get(edge.from);
    const to = idMap.get(edge.to);
    if (!from || !to) continue;
    saveDependency({
      id: uid("dep"),
      program_id: programId,
      project_id: projectId,
      from_item_id: from,
      to_item_id: to,
      kind: edge.kind || "requires",
      required: edge.required !== false,
    });
  }

  // Agent runs wait on their parent task when mapped.
  for (const item of listItems({ programId })) {
    if (item.level !== "agent_run" || !item.parent_id) continue;
    const parent = getItem(item.parent_id);
    if (!parent || parent.level !== "task") continue;
    const already = listDependencies({ programId }).some(
      (d) => d.from_item_id === parent.id && d.to_item_id === item.id
    );
    if (!already) {
      saveDependency({
        id: uid("dep"),
        program_id: programId,
        project_id: projectId,
        from_item_id: parent.id,
        to_item_id: item.id,
        kind: "parent_task",
        required: true,
      });
    }
  }

  const allDeps = listDependencies({ programId });
  for (const item of listItems({ programId })) {
    const incoming = allDeps
      .filter((d) => d.to_item_id === item.id)
      .map((d) => d.from_item_id);
    if (incoming.length) {
      saveItem({
        ...item,
        dependency_ids: incoming,
        updated_at: new Date().toISOString(),
      });
    }
  }

  // Detect cycles among materialised item deps
  if (hasItemCycle(listItems({ programId }), allDeps)) {
    throw validationError("Dependency cycle detected — execution refused.", {
      program_id: programId,
    });
  }

  program = transitionState(program, "queued", { reason: "materialised", actor });
  saveProgram(program);

  return {
    program,
    item_count: listItems({ programId }).length,
    dependency_count: allDeps.length,
    getItem,
  };
}

function hasItemCycle(items, deps) {
  const ids = new Set(items.map((i) => i.id));
  const adj = new Map([...ids].map((id) => [id, []]));
  for (const d of deps) {
    if (ids.has(d.from_item_id) && ids.has(d.to_item_id)) {
      adj.get(d.from_item_id).push(d.to_item_id);
    }
  }
  const visiting = new Set();
  const visited = new Set();
  function dfs(u) {
    if (visiting.has(u)) return true;
    if (visited.has(u)) return false;
    visiting.add(u);
    for (const v of adj.get(u) || []) {
      if (dfs(v)) return true;
    }
    visiting.delete(u);
    visited.add(u);
    return false;
  }
  for (const id of ids) {
    if (dfs(id)) return true;
  }
  return false;
}

export function assertNoDependencyCycles(nodes, edges) {
  const fakeItems = nodes.map((n) => ({ id: n.id || n }));
  const fakeDeps = edges.map((e, i) => ({
    id: `e${i}`,
    from_item_id: e.from,
    to_item_id: e.to,
  }));
  if (hasItemCycle(fakeItems, fakeDeps)) {
    throw validationError("Invalid dependency cycle — rejected before execution.");
  }
  return true;
}
