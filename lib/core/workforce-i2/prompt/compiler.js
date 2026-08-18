/**
 * Prompt OS compiler — layers L0–L5 + role/project/task context.
 * Secrets never enter the compiled prompt.
 */

import { createHash } from "crypto";
import { getArchetypeById, compileRoleArchetypes } from "../archetypes";

const SECRET_RE = /(api[_-]?key|secret|password|token|bearer\s+[a-z0-9._-]+)/gi;

function stripSecrets(text) {
  if (!text) return "";
  return String(text).replace(SECRET_RE, "[REDACTED]");
}

function estimateTokens(text) {
  return Math.ceil(String(text).length / 4);
}

const LAYER_SNIPPETS = {
  L0: "Founder (human) retains constitutional authority. Never claim Founder approval.",
  L1: "Executive Orchestrator / AI CEO coordinates under Founder policy.",
  L2: "C-Suite advisors recommend; they do not execute protected production actions.",
  L3: "Directors route work within department boundaries.",
  L4: "Managers plan and delegate with bounded depth; no self-approval.",
  L5: "Specialists execute scoped tasks, produce evidence, and request independent review.",
};

/**
 * Compile a runtime prompt for a seat/archetype invocation.
 */
export function compileAgentPrompt({
  archetypeId,
  seatId = null,
  projectId,
  organizationId = null,
  objectiveTitle = null,
  taskContext = null,
  documentsUsed = [],
  verifiedMemory = [],
  allowedTools = [],
  deniedTools = [],
  hierarchyLevel = "L5",
} = {}) {
  if (!projectId) throw new Error("compileAgentPrompt requires projectId");
  const arch =
    getArchetypeById(archetypeId) ||
    compileRoleArchetypes().archetypes.find((a) => a.id === archetypeId);
  if (!arch) throw new Error(`Unknown archetype ${archetypeId}`);

  const layers = ["L0", "L1", "L2", "L3", "L4", "L5"].map((l) => ({
    layer: l,
    text: LAYER_SNIPPETS[l],
  }));

  const systemParts = [
    `You are ${arch.title} (${arch.id}) for MianX.ai.`,
    `Department: ${arch.department}. Level: ${arch.hierarchyLevel}.`,
    `Mission: ${stripSecrets(arch.mission)}`,
    `Project boundary: project_id=${projectId}` +
      (organizationId ? ` organization_id=${organizationId}` : ""),
    `Respond with ONLY valid JSON matching the output contract.`,
    `Never deploy production, send email, mutate production DB, or claim live-tested status without evidence.`,
    ...layers.map((l) => `[${l.layer}] ${l.text}`),
    `[Role] ${stripSecrets(JSON.stringify(arch.responsibilities).slice(0, 800))}`,
    objectiveTitle ? `[Objective] ${stripSecrets(objectiveTitle)}` : null,
    taskContext ? `[Task] ${stripSecrets(JSON.stringify(taskContext).slice(0, 1500))}` : null,
    documentsUsed.length
      ? `[VerifiedKnowledgeHints] ${JSON.stringify(documentsUsed).slice(0, 1200)}`
      : null,
    verifiedMemory.length
      ? `[VerifiedMemoryHints] ${JSON.stringify(verifiedMemory).slice(0, 800)}`
      : null,
    `[PermittedTools] ${(allowedTools.length ? allowedTools : arch.allowedTools).slice(0, 30).join(", ")}`,
    `[DeniedTools] ${(deniedTools.length ? deniedTools : arch.prohibitedTools).join(", ")}`,
    `[Escalation] ${(arch.escalationRules || []).join(", ")}`,
    `[EvidenceRequired] ${(arch.evidenceSchema || []).join(", ")}`,
  ].filter(Boolean);

  const system = systemParts.join("\n");
  const version = "prompt-os/phase-i2/1.0.0";
  const contractChecksum = arch.contractChecksum;
  const sourceHashes = {
    archetype: arch.contractChecksum,
    promptVersion: createHash("sha256").update(version).digest("hex").slice(0, 12),
  };

  return {
    version,
    contractChecksum,
    sourceHashes,
    tokenEstimate: estimateTokens(system),
    permittedTools: allowedTools.length ? allowedTools : arch.allowedTools,
    deniedTools: deniedTools.length ? deniedTools : arch.prohibitedTools,
    projectBoundary: { projectId, organizationId },
    escalationRules: arch.escalationRules,
    seatId,
    archetypeId: arch.id,
    hierarchyLevel: hierarchyLevel || arch.hierarchyLevel,
    system: stripSecrets(system),
    secretsScrubbed: true,
  };
}
