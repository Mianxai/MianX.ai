/**
 * Count unique Founder-facing task dependency edges.
 * Excludes hierarchy scaffolding (program/epic/feature/story → child) and metadata edges.
 */

export function countTaskDependencies(edges = [], tasks = []) {
  const taskById = new Map();
  for (const t of tasks || []) {
    const id = t.id || t.task_id;
    if (!id) continue;
    taskById.set(id, t);
  }
  const taskIds = new Set(taskById.keys());
  const seen = new Set();
  const named = [];

  function labelFor(id) {
    const t = taskById.get(id);
    if (!t) return String(id);
    return t.title || t.name || t.label || String(id);
  }

  for (const e of edges || []) {
    const from = e.from || e.source || e.from_id;
    const to = e.to || e.target || e.to_id;
    const kind = String(e.kind || e.type || e.relation || "depends_on");
    if (!from || !to) continue;
    if (taskIds.size > 0) {
      const fromIsTask = taskIds.has(from);
      const toIsTask = taskIds.has(to);
      if (!(fromIsTask && toIsTask)) continue;
    } else {
      if (
        kind === "requires" &&
        !String(from).includes("task") &&
        !String(to).includes("task")
      ) {
        continue;
      }
      if (!/task|depends|after|wave/i.test(`${from} ${to} ${kind}`)) continue;
    }
    const key = `${from}->${to}:${kind}`;
    if (seen.has(key)) continue;
    seen.add(key);
    named.push({
      from,
      to,
      kind,
      from_label: labelFor(from),
      to_label: labelFor(to),
    });
  }

  if (named.length === 0 && (tasks || []).length > 1) {
    for (let i = 1; i < tasks.length; i += 1) {
      const prev = tasks[i - 1];
      const cur = tasks[i];
      const from = prev.id || prev.task_id || `task-${i}`;
      const to = cur.id || cur.task_id || `task-${i + 1}`;
      named.push({
        from,
        to,
        kind: "after",
        implied: true,
        from_label: prev.title || prev.name || from,
        to_label: cur.title || cur.name || to,
      });
    }
  }

  return {
    count: named.length,
    edges: named,
    flow_labels: named
      .map((e) => e.from_label)
      .concat(named.length ? [named[named.length - 1].to_label] : [])
      .filter((v, i, arr) => arr.indexOf(v) === i),
  };
}

function humanizeRiskToken(value) {
  return String(value || "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
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
        effect_on_approval:
          "Informational — does not auto-approve or start simulation.",
        blocks_deterministic_simulation: false,
      };
    }
    const title =
      r.title ||
      r.name ||
      (r.slug ? humanizeRiskToken(r.slug) : null) ||
      r.code ||
      r.risk ||
      r.message ||
      `Risk ${i + 1}`;
    const severity = r.severity || r.level || "medium";
    const blocks =
      r.blocks_deterministic_simulation === true ||
      /critical|blocker/i.test(String(severity));
    return {
      id: r.id || r.slug || `risk-${i + 1}`,
      slug: r.slug || null,
      title: String(title).replace(/_/g, " "),
      severity,
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
      effect_on_approval:
        r.effect_on_approval ||
        (blocks
          ? "Blocks plan approval until resolved."
          : "Informational for Founder review — does not start simulation or call a provider."),
      blocks_deterministic_simulation: Boolean(blocks),
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
  const text = `${task.title || ""} ${task.name || ""} ${task.purpose || ""} ${task.description || ""} ${task.capability || ""}`.toLowerCase();
  if (/identity|access|privilege|security|auth/.test(text)) return "Security";
  if (/\boperations?\b|provision|runbook|readiness|handoff/.test(text)) {
    return "Operations";
  }
  if (/qa|quality|verif|evidence|test|acceptance/.test(text)) {
    return "Quality Assurance";
  }
  if (
    /hr|human|employee|onboard|organisation|organization|workforce|lifecycle/.test(
      text
    )
  ) {
    return "Human Resources";
  }
  if (/infra|platform|idp|identity provider/.test(text)) return "Infrastructure";

  const fromPayload =
    task.department ||
    task.owning_department ||
    task.owner_department ||
    task.payload?.department ||
    task.payload?.owning_department;
  const mapped = displayDepartment(fromPayload);
  if (mapped && mapped !== "Engineering") return mapped;

  const fallbacks = [
    "Security",
    "Human Resources",
    "Operations",
    "Quality Assurance",
  ];
  return fallbacks[index % fallbacks.length];
}
