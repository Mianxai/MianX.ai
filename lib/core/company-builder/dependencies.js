// Cross-department dependency graph.

/**
 * Build edges between departments and phases from CEO + backlog structure.
 */
export function buildDependencyGraph(ceoPlan, backlog) {
  const nodes = [];
  const edges = [];

  for (const phase of ceoPlan.execution_phases || []) {
    nodes.push({
      id: phase.id,
      kind: "phase",
      label: phase.name,
      owners: phase.owners || [],
    });
  }

  const depts = new Set();
  for (const f of backlog.features || []) {
    if (f.department) depts.add(f.department);
  }
  for (const d of depts) {
    nodes.push({ id: `dept:${d}`, kind: "department", label: d });
  }

  const phases = ceoPlan.execution_phases || [];
  for (let i = 1; i < phases.length; i += 1) {
    edges.push({
      id: `edge-phase-${i}`,
      from: phases[i - 1].id,
      to: phases[i].id,
      kind: "phase_sequence",
      required: true,
    });
  }

  // Cross-department: security before devops release work; qa after engineering build, etc.
  const cross = [
    { from: "dept:research", to: "dept:product", kind: "informs" },
    { from: "dept:product", to: "dept:engineering", kind: "requires" },
    { from: "dept:product", to: "dept:design", kind: "requires" },
    { from: "dept:engineering", to: "dept:qa", kind: "requires" },
    { from: "dept:security", to: "dept:devops", kind: "requires" },
    { from: "dept:legal", to: "dept:marketing", kind: "gates" },
    { from: "dept:finance", to: "dept:sales", kind: "gates" },
    { from: "dept:qa", to: "dept:operations", kind: "handoff" },
    { from: "dept:support", to: "dept:operations", kind: "handoff" },
  ];
  let n = 0;
  for (const c of cross) {
    if (
      nodes.some((x) => x.id === c.from) &&
      nodes.some((x) => x.id === c.to)
    ) {
      n += 1;
      edges.push({ id: `edge-x-${n}`, ...c, required: c.kind !== "informs" });
    }
  }

  // Feature-level deps: features in later phases depend on earlier phase features of same dept
  const byDeptPhase = new Map();
  for (const f of backlog.features || []) {
    const key = `${f.department}:${f.phase_id}`;
    if (!byDeptPhase.has(key)) byDeptPhase.set(key, []);
    byDeptPhase.get(key).push(f.id);
  }
  for (let i = 1; i < phases.length; i += 1) {
    const prev = phases[i - 1];
    const cur = phases[i];
    for (const dept of new Set([...(prev.owners || []), ...(cur.owners || [])])) {
      const a = byDeptPhase.get(`${dept}:${prev.id}`) || [];
      const b = byDeptPhase.get(`${dept}:${cur.id}`) || [];
      if (a[0] && b[0]) {
        n += 1;
        edges.push({
          id: `edge-f-${n}`,
          from: a[0],
          to: b[0],
          kind: "feature_sequence",
          required: true,
        });
      }
    }
  }

  return {
    nodes,
    edges,
    stats: { node_count: nodes.length, edge_count: edges.length },
    acyclic: !hasCycle(nodes, edges),
  };
}

function hasCycle(nodes, edges) {
  const ids = new Set(nodes.map((n) => n.id));
  const adj = new Map([...ids].map((id) => [id, []]));
  for (const e of edges) {
    if (!adj.has(e.from) || !adj.has(e.to)) continue;
    adj.get(e.from).push(e.to);
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
