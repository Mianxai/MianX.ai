/**
 * Count unique Founder-facing task dependency edges.
 * Excludes hierarchy scaffolding (program/epic/feature/story → child) and metadata edges.
 */

export function countTaskDependencies(edges = [], tasks = []) {
  const taskIds = new Set(
    (tasks || [])
      .map((t) => t.id || t.task_id)
      .filter(Boolean)
  );
  const seen = new Set();
  const named = [];

  for (const e of edges || []) {
    const from = e.from || e.source || e.from_id;
    const to = e.to || e.target || e.to_id;
    const kind = String(e.kind || e.type || e.relation || "depends_on");
    if (!from || !to) continue;
    // Prefer task↔task edges when task ids are known
    if (taskIds.size > 0) {
      const fromIsTask = taskIds.has(from);
      const toIsTask = taskIds.has(to);
      if (!(fromIsTask && toIsTask)) continue;
    } else {
      // Heuristic: skip hierarchical scaffolding kinds used by WBS engine
      if (kind === "requires" && !String(from).includes("task") && !String(to).includes("task")) {
        continue;
      }
      // Only count edges that look like task dependencies
      if (!/task|depends|after|wave/i.test(`${from} ${to} ${kind}`)) continue;
    }
    const key = `${from}->${to}:${kind}`;
    if (seen.has(key)) continue;
    seen.add(key);
    named.push({ from, to, kind });
  }

  // If no task↔task edges, derive sequential deps from task order (n-1)
  if (named.length === 0 && (tasks || []).length > 1) {
    for (let i = 1; i < tasks.length; i += 1) {
      const prev = tasks[i - 1];
      const cur = tasks[i];
      const from = prev.id || prev.task_id || `task-${i}`;
      const to = cur.id || cur.task_id || `task-${i + 1}`;
      named.push({ from, to, kind: "after", implied: true });
    }
  }

  return {
    count: named.length,
    edges: named,
  };
}

/**
 * Human-readable risk cards from mixed risk payloads.
 */
export function normalizePlanRisks(risks = []) {
  return (risks || []).map((r, i) => {
    if (typeof r === "string") {
      return {
        id: `risk-${i + 1}`,
        title: r,
        severity: "medium",
        meaning: r,
        mitigation: "Review during Founder plan approval.",
      };
    }
    const title =
      r.title || r.name || r.code || r.risk || r.message || `Risk ${i + 1}`;
    return {
      id: r.id || `risk-${i + 1}`,
      title: String(title).replace(/_/g, " "),
      severity: r.severity || r.level || "medium",
      meaning:
        r.meaning ||
        r.description ||
        r.detail ||
        r.message ||
        "Identified during deterministic planning.",
      mitigation:
        r.mitigation ||
        r.mitigate ||
        r.recommendation ||
        "Continue with deterministic simulation; do not claim live completion.",
    };
  });
}

/** Canonical department display names for Founder Proof WBS. */
export const DEPARTMENT_DISPLAY = Object.freeze({
  security: "Security",
  infrastructure: "Infrastructure",
  hr: "Human Resources",
  human_resources: "Human Resources",
  operations: "Operations",
  ops: "Operations",
  qa: "Quality Assurance",
  quality: "Quality Assurance",
  engineering: "Engineering",
  leadership: "Leadership",
  executive: "Leadership",
});

export function displayDepartment(raw) {
  if (!raw || raw === "Unassigned") return null;
  const key = String(raw).toLowerCase().replace(/\s+/g, "_");
  return DEPARTMENT_DISPLAY[key] || String(raw).replace(/_/g, " ");
}

/**
 * Propose department for a task from payload / title heuristics (display + plan enrichment).
 */
export function proposeDepartmentForTask(task = {}, index = 0) {
  const fromPayload =
    task.department ||
    task.owning_department ||
    task.owner_department ||
    task.payload?.department ||
    task.payload?.owning_department;
  const mapped = displayDepartment(fromPayload);
  if (mapped) return mapped;

  const text = `${task.title || ""} ${task.name || ""} ${task.purpose || ""} ${task.description || ""}`.toLowerCase();
  if (/identity|access|privilege|security|auth/.test(text)) return "Security";
  if (/\boperations?\b|provision|runbook/.test(text)) return "Operations";
  if (/qa|quality|verif|evidence|test/.test(text)) return "Quality Assurance";
  if (/hr|human|employee|onboard|organisation|organization|workforce/.test(text)) {
    return "Human Resources";
  }
  if (/infra|platform|deploy/.test(text)) return "Infrastructure";

  const fallbacks = ["Security", "Human Resources", "Operations", "Quality Assurance"];
  return fallbacks[index % fallbacks.length];
}
