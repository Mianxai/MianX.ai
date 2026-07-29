/**
 * Resolve a Founder-facing project display name.
 * Never returns the label "Selected project" as the value.
 */

const FORBIDDEN_FALLBACKS = new Set([
  "selected project",
  "selected project selected project",
]);

/**
 * @param {{
 *   projectName?: string|null,
 *   project?: { name?: string|null, title?: string|null, id?: string }|null,
 *   summary?: { project_name?: string|null, project?: { name?: string } }|null,
 *   projects?: Array<{ id?: string, name?: string }>,
 *   projectId?: string|null,
 * }} opts
 * @returns {string}
 */
export function resolveProjectDisplayName(opts = {}) {
  const {
    projectName = null,
    project = null,
    summary = null,
    projects = [],
    projectId = null,
  } = opts;

  const candidates = [
    projectName,
    project?.name,
    project?.title,
    summary?.project_name,
    summary?.project?.name,
  ];

  if (projectId && Array.isArray(projects)) {
    const match = projects.find((p) => p && p.id === projectId);
    if (match?.name) candidates.push(match.name);
    if (match?.title) candidates.push(match.title);
  }

  for (const raw of candidates) {
    const name = String(raw || "").trim();
    if (!name) continue;
    if (FORBIDDEN_FALLBACKS.has(name.toLowerCase())) continue;
    if (name.toLowerCase() === "selected project") continue;
    return name;
  }

  if (projectId) return `Project ${String(projectId).slice(0, 8)}…`;
  return "No project selected";
}

export function isInvalidProjectDisplayName(value) {
  const v = String(value || "").trim().toLowerCase();
  return !v || FORBIDDEN_FALLBACKS.has(v) || v === "selected project";
}
