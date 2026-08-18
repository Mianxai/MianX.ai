/**
 * Compile canonical workforce roles from existing registries + docs.
 * Does NOT invent filler personas to pad to 445.
 */

import {
  WORKFORCE_DEFINITIONS,
  plannedSlotContribution,
  namedDefinitionCount,
  capacityReserveSlotTotal,
} from "@/lib/workforce/definitions";
import { DEPARTMENTS } from "@/lib/workforce/departments";
import { PLANNED_ROLE_SLOT_TOTAL } from "@/lib/workforce/constants";
import { listAgentDefinitions, isAgentExecutable } from "../agents";
import { listToolDefinitions } from "./tools/registry";

const SOURCE_REFS = [
  "doc/19-ai-workforce/AGENT-CAPACITY-BASELINE.md",
  "doc/19-ai-workforce/C-SUITE-AGENT-REGISTRY.md",
  "lib/workforce/definitions.js",
  "lib/core/agents.js",
];

/**
 * Expand capacity_reserve rows into slot descriptors (not fake named agents).
 */
function expandCapacityGaps(def) {
  const slots = def.capacitySlots || 0;
  const gaps = [];
  for (let i = 0; i < slots; i += 1) {
    gaps.push({
      slotIndex: i + 1,
      department: def.department,
      reserveId: def.id || def.slug,
      status: "capacity_gap",
      reason:
        "Documented capacity reserve — named role inventory not yet approved for this slot.",
      sourceDocuments: SOURCE_REFS,
    });
  }
  return gaps;
}

export function compileCanonicalRoleRegistry() {
  const tools = listToolDefinitions().map((t) => t.name);
  const runtimeBySlug = new Map(listAgentDefinitions().map((a) => [a.slug, a]));

  const roles = [];
  const gaps = [];

  for (const def of WORKFORCE_DEFINITIONS) {
    if (def.roleType === "capacity_reserve") {
      gaps.push(...expandCapacityGaps(def));
      continue;
    }

    const runtime = def.runtimeSlug ? runtimeBySlug.get(def.runtimeSlug) : null;
    roles.push({
      stableId: def.id || def.slug,
      displayName: def.name,
      department: def.department,
      hierarchyLevel: def.hierarchyLevel,
      reportsTo: def.reportsTo,
      purpose: def.purpose,
      responsibilities: def.responsibilities || [],
      capabilities: def.allowedCapabilities || [],
      allowedTools: (def.tools && def.tools.length ? def.tools : tools.filter((t) => !t.includes("production"))),
      prohibitedTools: [
        "production_deployment",
        "external_email_send",
        "secret_rotation",
        "permission_escalation",
      ],
      inputContract: runtime?.inputSchema || { requiredInputs: def.requiredInputs },
      outputContract: runtime?.outputSchema || { expectedOutputs: def.expectedOutputs },
      evidenceContract: ["structured_result", "verifiable_work_envelope_when_material"],
      memoryPolicy: def.memoryScope || "project",
      learningPolicy: "propose_only",
      providerRequirements: def.providerClass || "optional",
      deterministicSupport: Boolean(runtime && isAgentExecutable(runtime)),
      projectInstanceSupport: true,
      approvalRequirements: def.humanGateRequirements || ["protected_actions"],
      riskLimits: def.riskClass || "R1",
      status: def.lifecycleStatus || "proposed",
      sourceDocumentReferences: SOURCE_REFS,
      capacitySlots: def.capacitySlots || 1,
      runtimeSlug: def.runtimeSlug || null,
      roleType: def.roleType,
    });
  }

  // Also include executable runtime agents that are not org-registry linked
  for (const agent of listAgentDefinitions()) {
    if (!isAgentExecutable(agent)) continue;
    const already = roles.some((r) => r.runtimeSlug === agent.slug);
    if (already) continue;
    roles.push({
      stableId: `runtime.${agent.slug}`,
      displayName: agent.name,
      department: agent.department || "unassigned",
      hierarchyLevel: agent.hierarchyLevel || "L5",
      reportsTo: agent.reportsTo || null,
      purpose: agent.purpose,
      responsibilities: [],
      capabilities: agent.allowedCapabilities || [],
      allowedTools: tools.filter((t) => t.startsWith("knowledge.") || t.startsWith("evidence.") || t.startsWith("task.")),
      prohibitedTools: [
        "production_deployment",
        "external_email_send",
        "secret_rotation",
      ],
      inputContract: agent.inputSchema,
      outputContract: agent.outputSchema,
      evidenceContract: ["structured_output"],
      memoryPolicy: "project",
      learningPolicy: "propose_only",
      providerRequirements: "optional",
      deterministicSupport: true,
      projectInstanceSupport: true,
      approvalRequirements: agent.requiresHumanApproval ? ["human_review"] : ["protected_actions"],
      riskLimits: agent.riskClass || "R2",
      status: agent.lifecycleStatus,
      sourceDocumentReferences: ["lib/core/agents.js", ...SOURCE_REFS],
      capacitySlots: 0,
      runtimeSlug: agent.slug,
      roleType: "runtime_catalogue",
      note: "Runtime catalogue agent; capacity accounting may live in department reserves.",
    });
  }

  const namedSlotSum = roles
    .filter((r) => r.roleType !== "runtime_catalogue")
    .reduce((s, r) => s + (r.capacitySlots || 0), 0);

  return {
    documentedCapacity: PLANNED_ROLE_SLOT_TOTAL,
    plannedSlotContribution: plannedSlotContribution(),
    namedDefinitionCount: namedDefinitionCount(),
    capacityReserveSlots: capacityReserveSlotTotal(),
    canonicalRolesCompiled: roles.length,
    namedRoleSlotsCovered: namedSlotSum,
    unresolvedCapacityGaps: gaps.length,
    capacityGaps: gaps,
    departments: DEPARTMENTS.map((d) => d.slug),
    departmentsCovered: new Set(roles.map((r) => r.department)).size,
    fabrications: 0,
    note:
      gaps.length > 0
        ? `Documentation supports ${roles.length} named/runtime role records covering ${namedSlotSum} named slots; ` +
          `${gaps.length} capacity-reserve slots remain unresolved named inventory (not fabricated).`
        : "All capacity slots are backed by named definitions.",
    roles,
  };
}
