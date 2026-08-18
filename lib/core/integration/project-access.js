/**
 * Server-side project gate for Phase H integration mutations.
 * Reuses canonical repo.getProject (rejects missing/archived).
 */

import { badRequest } from "../errors.js";
import * as repo from "../repo.js";

export {
  filterProofSelectableProjects,
  isActiveProofProject,
} from "./project-access-shared.js";

/**
 * @param {string|null|undefined} projectId
 * @returns {Promise<object>}
 */
export async function requireActiveProjectForProof(projectId) {
  const id = typeof projectId === "string" ? projectId.trim() : "";
  if (!id || id === "all") {
    throw badRequest("A specific active project_id is required.");
  }

  let project;
  try {
    project = await repo.getProject(id);
  } catch (err) {
    if (err?.status === 404 || err?.code === "NOT_FOUND") {
      throw badRequest("Project not found, inaccessible, or archived.");
    }
    throw err;
  }

  if (project.status && project.status !== "active") {
    throw badRequest("Project must be active to start a production proof.");
  }

  return project;
}
