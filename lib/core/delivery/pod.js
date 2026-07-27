// Project-scoped Wave-2 delivery pod activation (not full workforce clone).

import { getDefinition, isInstantiable } from "@/lib/workforce";
import { WAVE2_AGENT_DEFINITIONS, SOFTWARE_DELIVERY_STEPS } from "./agents";
import { FINAL_QA_OWNER } from "./policy";
import { validationError, forbidden } from "../errors";
import { clip } from "../validate";

/**
 * Activates the minimum software-delivery pod for a project.
 * Returns conceptual instance descriptors — does not spawn OS processes.
 */
export function activateDeliveryPod({ projectId, orgId = null } = {}) {
  const project_id = clip(projectId, 64);
  if (!project_id) {
    throw validationError("project_id is required for pod activation.", {
      project_id: "project_id is required.",
    });
  }

  const instances = WAVE2_AGENT_DEFINITIONS.map((agent) => {
    const workforce = getDefinition(agent.workforceSlug);
    if (!workforce) {
      throw validationError("Missing workforce mapping for delivery agent.", {
        agent: agent.slug,
        workforceSlug: agent.workforceSlug,
      });
    }
    if (!isInstantiable(workforce)) {
      throw forbidden(
        `Workforce role "${agent.workforceSlug}" is not instantiable (capacity reserve or inactive).`
      );
    }
    return {
      instance_id: `pod:${project_id}:${agent.slug}`,
      project_id,
      org_id: orgId || null,
      runtime_slug: agent.slug,
      workforce_slug: agent.workforceSlug,
      department: agent.department,
      domain: agent.domain,
      activation_class: "project_dedicated",
      repository_write_authority: false,
      status: "active",
    };
  });

  return {
    project_id,
    org_id: orgId || null,
    pod: "software-delivery",
    wave: "wave-2",
    steps: [...SOFTWARE_DELIVERY_STEPS],
    final_qa_owner: FINAL_QA_OWNER,
    instances,
    count: instances.length,
    note:
      "Pod is project-scoped. Instances produce structured artifacts only; " +
      "no autonomous repository writes or production deploys.",
  };
}

export function assertPodInstanceProjectScope(instance, projectId) {
  if (!instance || instance.project_id !== projectId) {
    throw forbidden("Delivery pod instance is not scoped to this project.");
  }
  return true;
}
