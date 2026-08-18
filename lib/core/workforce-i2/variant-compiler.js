/**
 * Governed role-variant compiler — specialist variants from approved archetypes.
 */

import { createHash } from "crypto";
import { getArchetypeById, compileRoleArchetypes } from "./archetypes";
import { DEPARTMENTS } from "@/lib/workforce/departments";
import { HIERARCHY_LEVELS } from "@/lib/workforce/constants";

const APPROVED_SPECIALIZATIONS = new Set([
  "backend",
  "frontend",
  "mobile",
  "data",
  "devops",
  "security",
  "sre",
  "platform",
  "qa",
  "research",
  "design",
  "product",
  "support",
  "analytics",
  "general",
  "ai-ml",
  "engineering-qa",
  "automation",
  "healthcare",
  "fintech",
  "retail",
]);

export function compileRoleVariant({
  archetypeId,
  specialization = "general",
  seniorityLevel = "L5",
  projectIndustry = null,
  toolProfile = null,
  workflowId = null,
  riskClass = null,
} = {}) {
  const arch =
    getArchetypeById(archetypeId) ||
    compileRoleArchetypes().archetypes.find((a) => a.id === archetypeId);
  if (!arch) {
    return { ok: false, reason: "unknown_archetype" };
  }
  if (!APPROVED_SPECIALIZATIONS.has(specialization)) {
    return { ok: false, reason: "unsupported_specialization", specialization };
  }
  if (!HIERARCHY_LEVELS.includes(seniorityLevel) || seniorityLevel === "L0") {
    return { ok: false, reason: "invalid_hierarchy" };
  }
  // Fake seniority: cannot claim L1/L2 unless archetype already is
  if (
    (seniorityLevel === "L1" || seniorityLevel === "L2") &&
    !["L1", "L2"].includes(arch.hierarchyLevel)
  ) {
    return { ok: false, reason: "fake_seniority_rejected" };
  }
  const dept = DEPARTMENTS.find((d) => d.slug === arch.department);
  if (!dept) return { ok: false, reason: "unknown_department" };

  const tools = toolProfile || arch.allowedTools;
  for (const t of tools) {
    if ((arch.prohibitedTools || []).includes(t)) {
      return { ok: false, reason: "unauthorized_tool", tool: t };
    }
  }

  const variant = {
    variantId: `variant.${arch.id}.${specialization}.${seniorityLevel}`,
    baseArchetypeId: arch.id,
    title: `${seniorityLevel} ${projectIndustry ? projectIndustry + " " : ""}${specialization} ${arch.title}`,
    department: arch.department,
    hierarchyLevel: seniorityLevel,
    specialization,
    projectIndustry,
    workflowId,
    riskClass: riskClass || arch.riskClass,
    allowedTools: tools,
    prohibitedTools: arch.prohibitedTools,
    capabilities: [...new Set([...(arch.capabilities || []), specialization])],
    sourceProvenance: [
      arch.id,
      ...arch.sourceDocumentReferences,
      `specialization:${specialization}`,
    ],
    projectScoped: true,
  };
  variant.contractHash = createHash("sha256")
    .update(JSON.stringify(variant))
    .digest("hex")
    .slice(0, 24);

  return { ok: true, variant };
}
