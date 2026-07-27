// Progressive disclosure for Agent Network — never render full capacity slots.

const STATUS_PRIORITY = {
  working: 0,
  approval_required: 1,
  blocked: 2,
  waiting: 3,
  failed: 4,
  paused: 5,
  unavailable: 6,
  idle: 7,
};

function statusRank(agent) {
  return STATUS_PRIORITY[agent?.status] ?? 8;
}

function isCSuite(agent) {
  if (!agent || agent.slug === "executive-ceo") return false;
  return agent.reportsTo === "executive-ceo" || agent.hierarchyLevel === "L2";
}

/**
 * Choose a readable subset of agents for the desktop hierarchy.
 * Department drill-down shows that department (+ CEO). Company view shows
 * CEO + C-suite + a bounded specialist set (active first).
 *
 * @param {Array<object>} agents
 * @param {{ department?: string, maxSpecialists?: number }} [opts]
 */
export function selectVisibleNetworkAgents(
  agents = [],
  { department = "all", maxSpecialists = 10 } = {}
) {
  const list = Array.isArray(agents) ? agents : [];
  const ceo = list.find((a) => a.slug === "executive-ceo") || null;

  if (department && department !== "all") {
    const deptAgents = list.filter(
      (a) => a.department === department || a.slug === "executive-ceo"
    );
    // Keep CEO first when present
    return deptAgents.sort((a, b) => {
      if (a.slug === "executive-ceo") return -1;
      if (b.slug === "executive-ceo") return 1;
      if (isCSuite(a) !== isCSuite(b)) return isCSuite(a) ? -1 : 1;
      return statusRank(a) - statusRank(b) || a.name.localeCompare(b.name);
    });
  }

  const cSuite = list
    .filter(isCSuite)
    .sort((a, b) => statusRank(a) - statusRank(b) || a.name.localeCompare(b.name));

  const specialists = list
    .filter((a) => a.slug !== "executive-ceo" && !isCSuite(a))
    .sort((a, b) => statusRank(a) - statusRank(b) || a.name.localeCompare(b.name));

  const active = specialists.filter(
    (a) => a.status && a.status !== "idle" && a.status !== "unavailable"
  );
  const idle = specialists.filter(
    (a) => !a.status || a.status === "idle" || a.status === "unavailable"
  );
  const picked = [...active, ...idle].slice(0, Math.max(0, maxSpecialists));

  const out = [];
  const seen = new Set();
  for (const a of [ceo, ...cSuite, ...picked].filter(Boolean)) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    out.push(a);
  }
  return out;
}

/**
 * Partition visible agents into CEO / C-suite / specialists for layout.
 */
export function partitionNetworkAgents(agents = []) {
  const list = Array.isArray(agents) ? agents : [];
  const ceo = list.find((a) => a.slug === "executive-ceo") || null;
  const cSuite = list.filter(isCSuite);
  const specialists = list.filter(
    (a) => a.slug !== "executive-ceo" && !isCSuite(a)
  );
  return { ceo, cSuite, specialists };
}

export { isCSuite, statusRank };
