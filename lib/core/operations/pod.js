import { getDefinition, isInstantiable } from "@/lib/workforce";
import { WAVE4_AGENT_DEFINITIONS, OPERATIONS_INCIDENT_STEPS } from "./agents";
import { validationError, forbidden } from "../errors";
import { clip } from "../validate";

export function activateOperationsPod({ projectId, orgId = null } = {}) {
  const project_id = clip(projectId, 64);
  if (!project_id) {
    throw validationError("project_id is required for operations pod activation.", {
      project_id: "required",
    });
  }

  const instances = WAVE4_AGENT_DEFINITIONS.map((agent) => {
    const workforce = getDefinition(agent.workforceSlug);
    if (!workforce) {
      throw validationError("Missing workforce mapping.", {
        agent: agent.slug,
        workforceSlug: agent.workforceSlug,
      });
    }
    if (!isInstantiable(workforce)) {
      throw forbidden(`Workforce role "${agent.workforceSlug}" is not instantiable.`);
    }
    return {
      instance_id: `pod:${project_id}:${agent.slug}`,
      project_id,
      org_id: orgId || null,
      runtime_slug: agent.slug,
      workforce_slug: agent.workforceSlug,
      department: agent.department,
      activation_class: "project_dedicated",
      production_mutation_authority: false,
      status: "active",
    };
  });

  return {
    project_id,
    org_id: orgId || null,
    pod: "operations-support-analytics",
    wave: "wave-4",
    steps: [...OPERATIONS_INCIDENT_STEPS],
    instances,
    count: instances.length,
    note: "Operations pod is advisory only. No production remediation or external sends.",
  };
}
