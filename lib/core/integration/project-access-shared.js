/**
 * Pure project-selector helpers (safe for client bundles).
 * Server-side mutation gates live in project-access.js.
 */

/**
 * Active/paused, non-archived projects for Founder selectors.
 * Deduplicates by id. Archived entries are excluded.
 * @param {Array<object>} list
 */
export function filterProofSelectableProjects(list = []) {
  const seen = new Set();
  const out = [];
  for (const p of list) {
    if (!p?.id || seen.has(p.id)) continue;
    if (p.archived_at) continue;
    if (p.status === "archived") continue;
    // Catalogue may include paused; selectable for filtering but not proof-start.
    if (p.status && !["active", "paused"].includes(p.status)) continue;
    seen.add(p.id);
    out.push(p);
  }
  return out;
}

export function isActiveProofProject(project) {
  return Boolean(
    project &&
      project.id &&
      !project.archived_at &&
      project.status !== "archived" &&
      (!project.status || project.status === "active")
  );
}
