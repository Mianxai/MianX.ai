// Project-scoped Wave-3 platform pod activation.

import { getDefinition, isInstantiable } from "@/lib/workforce";
import { WAVE3_AGENT_DEFINITIONS, PLATFORM_CANDIDATE_STEPS } from "./agents";
import { validationError, forbidden } from "../errors";
import { clip } from "../validate";

export function activatePlatformPod({ projectId, orgId = null } = {}) {
  const project_id = clip(projectId, 64);
  if (!project_id) {
    throw validationError("project_id is required for platform pod activation.", {
      project_id: "required",
    });
  }

  const instances = WAVE3_AGENT_DEFINITIONS.map((agent) => {
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
    pod: "platform-security-data",
    wave: "wave-3",
    steps: [...PLATFORM_CANDIDATE_STEPS],
    instances,
    count: instances.length,
    note: "Platform pod is advisory + workspace-scoped coding only. No production mutation.",
  };
}
