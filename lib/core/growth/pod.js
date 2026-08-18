import { getDefinition, isInstantiable } from "@/lib/workforce";
import { WAVE5_AGENT_DEFINITIONS, BUSINESS_GROWTH_STEPS } from "./agents";
import { validationError, forbidden } from "../errors";
import { clip } from "../validate";

export function activateGrowthPod({ projectId, orgId = null } = {}) {
  const project_id = clip(projectId, 64);
  if (!project_id) throw validationError("project_id is required.", { project_id: "required" });
  const instances = WAVE5_AGENT_DEFINITIONS.map((agent) => {
    const workforce = getDefinition(agent.workforceSlug);
    if (!workforce) throw validationError("Missing workforce mapping.", { agent: agent.slug });
    if (!isInstantiable(workforce)) throw forbidden(`Not instantiable: ${agent.workforceSlug}`);
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
    pod: "growth-commercial",
    wave: "wave-5",
    steps: [...BUSINESS_GROWTH_STEPS],
    instances,
    count: instances.length,
    note: "Growth pod drafts only — no autonomous external communication.",
  };
}
