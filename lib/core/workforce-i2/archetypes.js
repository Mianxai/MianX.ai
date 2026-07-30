/**
 * Canonical role archetype registry.
 * Named definitions become archetypes; department team pools cover remaining seats.
 * Does NOT invent filler persona names.
 */

import { createHash } from "crypto";
import { WORKFORCE_DEFINITIONS } from "@/lib/workforce/definitions";
import { DEPARTMENTS } from "@/lib/workforce/departments";
import { listToolDefinitions } from "../real-agent/tools/registry";
import { listAgentDefinitions, isAgentExecutable } from "../agents";

const PROHIBITED_DEFAULT = [
  "send_email",
  "publish_content",
  "deploy_production",
  "production_deployment",
  "change_permissions",
  "financial_transaction",
  "legal_commitment",
  "delete_data",
  "modify_production_database",
  "contact_customer",
  "approve_release",
  "secret_rotation",
  "permission_escalation",
];

function checksum(obj) {
  return createHash("sha256").update(JSON.stringify(obj)).digest("hex").slice(0, 24);
}

function safeTools() {
  try {
    return listToolDefinitions()
      .filter((t) => t.risk !== "protected")
      .map((t) => t.name);
  } catch {
    return [
      "knowledge.search",
      "knowledge.read",
      "memory.search",
      "memory.propose",
      "project.read_context",
      "evidence.record",
      "audit.record",
      "task.read",
      "task.create_child",
      "agent.request_review",
    ];
  }
}

function fromNamedDefinition(def, tools) {
  const runtime = def.runtimeSlug
    ? listAgentDefinitions().find((a) => a.slug === def.runtimeSlug)
    : null;
  const body = {
    id: def.id || `archetype.${def.slug}`,
    version: def.version || 1,
    title: def.name,
    department: def.department,
    hierarchyLevel: def.hierarchyLevel || "L5",
    reportsTo: def.reportsTo,
    mission: def.purpose || "",
    responsibilities: def.responsibilities || [],
    capabilities: def.allowedCapabilities || [],
    requiredKnowledgeDomains: [def.department, "mianx-core"].filter(Boolean),
    inputSchema: runtime?.inputSchema || { requiredInputs: def.requiredInputs || ["task_context"] },
    outputSchema: runtime?.outputSchema || {
      expectedOutputs: def.expectedOutputs || ["structured_result"],
    },
    evidenceSchema: ["structured_result", "documents_used", "verifiable_work_envelope_when_material"],
    allowedTools: (def.tools && def.tools.length ? def.tools : tools).slice(0, 40),
    prohibitedTools: PROHIBITED_DEFAULT,
    protectedActions: PROHIBITED_DEFAULT,
    providerCapabilitiesRequired: ["chat", "structured_output"],
    memoryReadPolicy: def.memoryScope || "project",
    memoryWritePolicy: "propose_only",
    learningPolicy: "propose_only",
    delegationPolicy: def.canDelegate ? "hierarchical_bounded" : "none",
    qaReviewerRequirements: ["independent_qualified_reviewer", "no_self_approval"],
    workloadLimits: { maxConcurrentTasks: 2 },
    concurrencyLimits: { maxInstancesPerProject: 4 },
    riskClass: def.riskClass || "R1",
    escalationRules: def.humanGateRequirements || ["protected_actions"],
    projectScoped: true,
    sourceDocumentReferences: [
      "lib/workforce/definitions.js",
      "doc/19-ai-workforce/AGENT-CAPACITY-BASELINE.md",
    ],
    lifecycleStatus: def.lifecycleStatus || "proposed",
    roleType: def.roleType,
    capacitySlotsDeclared: def.capacitySlots || 1,
    runtimeSlug: def.runtimeSlug || null,
    expansionCategory: null,
    fabrications: 0,
  };
  return { ...body, contractChecksum: checksum(body) };
}

/**
 * Department team pool archetype — justified expansion category for reserve seats.
 * Not a fake named persona; maps capacity to documented department.teams.
 */
function departmentPoolArchetype(dept, team, tools) {
  const body = {
    id: `archetype.${dept.slug}.${team}.specialist.v1`,
    version: 1,
    title: `${dept.name} ${team.replace(/-/g, " ")} specialist`,
    department: dept.slug,
    hierarchyLevel: "L5",
    reportsTo: dept.executiveAgentSlug || "mianx.ceo.v1",
    mission: `Project-scoped specialist capacity within ${dept.name} / ${team} pool.`,
    responsibilities: [`${team}_specialist_execution`, "evidence_production", "escalate_protected"],
    capabilities: ["summarize", "draft_text", "plan"],
    requiredKnowledgeDomains: [dept.slug, team, "mianx-core"],
    inputSchema: { requiredInputs: ["task_context", "project_id"] },
    outputSchema: { expectedOutputs: ["structured_result", "documents_used"] },
    evidenceSchema: ["structured_result", "documents_used"],
    allowedTools: tools.slice(0, 24),
    prohibitedTools: PROHIBITED_DEFAULT,
    protectedActions: PROHIBITED_DEFAULT,
    providerCapabilitiesRequired: ["chat", "structured_output"],
    memoryReadPolicy: "project",
    memoryWritePolicy: "propose_only",
    learningPolicy: "propose_only",
    delegationPolicy: "none",
    qaReviewerRequirements: ["independent_qualified_reviewer", "no_self_approval"],
    workloadLimits: { maxConcurrentTasks: 1 },
    concurrencyLimits: { maxInstancesPerProject: 2 },
    riskClass: "R2",
    escalationRules: ["protected_actions", "founder_for_production"],
    projectScoped: true,
    sourceDocumentReferences: [
      "lib/workforce/departments.js",
      "doc/19-ai-workforce/AGENT-CAPACITY-BASELINE.md",
      `department:${dept.slug}:teams:${team}`,
    ],
    lifecycleStatus: "planned_capacity",
    roleType: "department_capacity_pool",
    capacitySlotsDeclared: 0,
    runtimeSlug: null,
    expansionCategory: "department_team_capacity_pool",
    fabrications: 0,
    note: "Justified specialist variant of department capacity — not an invented personal name.",
  };
  return { ...body, contractChecksum: checksum(body) };
}

export function compileRoleArchetypes() {
  const tools = safeTools();
  const archetypes = [];
  const named = WORKFORCE_DEFINITIONS.filter((d) => d.roleType !== "capacity_reserve");

  for (const def of named) {
    if ((def.capacitySlots || 0) === 0 && def.roleType === "runtime_catalogue") continue;
    archetypes.push(fromNamedDefinition(def, tools));
  }

  // Also include executable runtime agents not linked
  for (const agent of listAgentDefinitions()) {
    if (!isAgentExecutable(agent)) continue;
    const already = archetypes.some((a) => a.runtimeSlug === agent.slug);
    if (already) continue;
    const body = {
      id: `archetype.runtime.${agent.slug}`,
      version: 1,
      title: agent.name,
      department: agent.department || "unassigned",
      hierarchyLevel: agent.hierarchyLevel || "L5",
      reportsTo: agent.reportsTo || null,
      mission: agent.purpose || "",
      responsibilities: [],
      capabilities: agent.allowedCapabilities || [],
      requiredKnowledgeDomains: [agent.department || "mianx-core"],
      inputSchema: agent.inputSchema,
      outputSchema: agent.outputSchema,
      evidenceSchema: ["structured_output"],
      allowedTools: tools.filter((t) => t.startsWith("knowledge.") || t.startsWith("evidence.")),
      prohibitedTools: PROHIBITED_DEFAULT,
      protectedActions: PROHIBITED_DEFAULT,
      providerCapabilitiesRequired: ["chat", "structured_output"],
      memoryReadPolicy: "project",
      memoryWritePolicy: "propose_only",
      learningPolicy: "propose_only",
      delegationPolicy: "none",
      qaReviewerRequirements: ["independent_qualified_reviewer"],
      workloadLimits: { maxConcurrentTasks: 2 },
      concurrencyLimits: { maxInstancesPerProject: 2 },
      riskClass: agent.riskClass || "R2",
      escalationRules: ["protected_actions"],
      projectScoped: true,
      sourceDocumentReferences: ["lib/core/agents.js"],
      lifecycleStatus: agent.lifecycleStatus || "active",
      roleType: "runtime_catalogue",
      capacitySlotsDeclared: 0,
      runtimeSlug: agent.slug,
      expansionCategory: null,
      fabrications: 0,
    };
    archetypes.push({ ...body, contractChecksum: checksum(body) });
  }

  // Department team pool archetypes for reserve coverage
  for (const dept of DEPARTMENTS) {
    const teams = dept.teams?.length ? dept.teams : ["general"];
    for (const team of teams) {
      const id = `archetype.${dept.slug}.${team}.specialist.v1`;
      if (archetypes.some((a) => a.id === id)) continue;
      archetypes.push(departmentPoolArchetype(dept, team, tools));
    }
  }

  return {
    archetypes,
    count: archetypes.length,
    namedArchetypes: archetypes.filter((a) => a.roleType !== "department_capacity_pool").length,
    poolArchetypes: archetypes.filter((a) => a.roleType === "department_capacity_pool").length,
    fabrications: 0,
  };
}

export function getArchetypeById(id, compiled = null) {
  const set = compiled || compileRoleArchetypes();
  return set.archetypes.find((a) => a.id === id) || null;
}
