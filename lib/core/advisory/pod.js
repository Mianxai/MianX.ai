import { getDefinition, isInstantiable } from "@/lib/workforce";
import { WAVE6_AGENT_DEFINITIONS, ADVISORY_REVIEW_STEPS } from "./agents";
import { validationError, forbidden } from "../errors";
import { clip } from "../validate";

export function activateAdvisoryPod({ projectId, orgId = null } = {}) {
  const project_id = clip(projectId, 64);
  if (!project_id) throw validationError("project_id is required.", { project_id: "required" });
  const instances = WAVE6_AGENT_DEFINITIONS.map((agent) => {
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
      activation_class: "approval_only",
      production_mutation_authority: false,
      status: "active",
    };
  });
  return {
    project_id,
    org_id: orgId || null,
    pod: "finance-hr-legal-advisory",
    wave: "wave-6",
    steps: [...ADVISORY_REVIEW_STEPS],
    instances,
    count: instances.length,
    note: "Advisory only — Founder/human gates for commitments.",
  };
}
