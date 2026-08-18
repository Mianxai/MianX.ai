/**
 * Workforce Completion Matrix — machine + human readable truth.
 */

import {
  AGENT_DEFINITIONS,
  EXPECTED_CATALOGUE_AGENT_COUNT,
  EXPECTED_EXECUTABLE_AGENT_COUNT,
  PROTECTED_CAPABILITIES,
  isAgentExecutable,
  listIntentionallyNonExecutableDefinitions,
} from "../agents";
import { DEPARTMENTS } from "@/lib/workforce/departments";
import { PLANNED_ROLE_SLOT_TOTAL } from "@/lib/workforce/constants";
import { WORKFLOWS } from "../workflow";
import { buildDepartmentCoverageMatrix } from "../coverage/department-matrix";
import { classifyCatalogueGaps } from "./classification";

function inferDepartment(def) {
  return (
    def.department ||
    def.department_slug ||
    (String(def.slug).startsWith("executive-") ? "leadership" : null) ||
    "unassigned"
  );
}

function rowFor(def) {
  const executable = isAgentExecutable(def);
  const protectedActions = (def.allowedCapabilities || []).filter((c) =>
    PROTECTED_CAPABILITIES.includes(c)
  );
  const missing = [];
  if (!def.inputSchema) missing.push("input_schema");
  if (!def.outputSchema) missing.push("output_schema");
  if (!def.purpose) missing.push("purpose");
  if (!(def.allowedCapabilities || []).length) missing.push("capabilities");

  return {
    canonicalAgentId: def.slug,
    displayName: def.name,
    department: inferDepartment(def),
    hierarchyLevel: def.hierarchyLevel || null,
    executable,
    catalogueOnly: !executable,
    runtimeCapable: executable,
    enabled: Boolean(def.enabledByDefault) && executable,
    capabilities: def.allowedCapabilities || [],
    inputContract: Boolean(def.inputSchema),
    outputContract: Boolean(def.outputSchema),
    allowedActions: def.allowedCapabilities || [],
    protectedActions,
    providerRequirement: def.defaultProvider || "anthropic",
    deterministicSimulationSupport: true,
    projectScopedInstanceSupport: executable,
    routingSupport: executable,
    delegationSupport:
      executable &&
      ((def.allowedCapabilities || []).includes("delegate") ||
        String(def.slug).startsWith("executive-")),
    memorySupport: executable,
    learningSupport: executable,
    tests: "covered_by_registry_and_phase_i",
    missingImplementation: missing,
    reasonForNonExecutable: executable
      ? null
      : def.reasonNonExecutable ||
        (def.lifecycleStatus === "draft" ? "catalogue_draft" : def.lifecycleStatus),
    catalogueClassification: def.catalogueClassification || (executable ? "runtime_capable" : "draft"),
    supersededBy: def.supersededBy || [],
    intentionallyNonExecutable: Boolean(def.intentionallyNonExecutable),
  };
}

export function buildWorkforceCompletionMatrix() {
  const agents = AGENT_DEFINITIONS.map(rowFor);
  const slugs = agents.map((a) => a.canonicalAgentId);
  const duplicateDefinitions = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  const invalidDefinitions = agents.filter(
    (a) => a.missingImplementation.length > 0 || !a.canonicalAgentId
  );
  const executable = agents.filter((a) => a.executable);
  const nonExecutable = agents.filter((a) => !a.executable);
  const departmentsCovered = new Set(executable.map((a) => a.department));
  const deptMatrix = buildDepartmentCoverageMatrix();
  const gaps = classifyCatalogueGaps();

  const workflowsCovered = Object.keys(WORKFLOWS).filter((id) => {
    const steps = WORKFLOWS[id].steps || [];
    return steps.every((slug) => {
      const def = AGENT_DEFINITIONS.find((a) => a.slug === slug);
      return def && isAgentExecutable(def);
    });
  });

  return {
    generatedAt: new Date().toISOString(),
    phase: "I",
    totals: {
      catalogue: agents.length,
      executable: executable.length,
      nonExecutable: nonExecutable.length,
      intentionallyNonExecutable: listIntentionallyNonExecutableDefinitions().length,
      duplicateDefinitions: duplicateDefinitions.length,
      invalidDefinitions: invalidDefinitions.length,
      departments: DEPARTMENTS.length,
      departmentsCovered: departmentsCovered.size,
      departmentsWithExecutableCoverage: deptMatrix.departments.filter((d) => d.ok).length,
      workflows: Object.keys(WORKFLOWS).length,
      workflowsCovered: workflowsCovered.length,
      capacitySlots: PLANNED_ROLE_SLOT_TOTAL,
      expectedCatalogue: EXPECTED_CATALOGUE_AGENT_COUNT,
      expectedExecutable: EXPECTED_EXECUTABLE_AGENT_COUNT,
    },
    matchesExpected:
      agents.length === EXPECTED_CATALOGUE_AGENT_COUNT &&
      executable.length === EXPECTED_EXECUTABLE_AGENT_COUNT,
    explanation: {
      catalogueVsExecutable:
        `${agents.length} catalogue definitions; ${executable.length} executable; ` +
        `${nonExecutable.length} intentionally non-executable (superseded catalogue). ` +
        `${PLANNED_ROLE_SLOT_TOTAL} future capacity slots are planning inventory — not live agents.`,
      definitionVsInstance:
        "Definitions are contracts. Live instances are project-scoped processes allocated only when work requires them.",
    },
    gapClassification: gaps,
    departmentCoverage: deptMatrix,
    workflowsCovered,
    agents,
  };
}

export function formatWorkforceCompletionMatrixMarkdown(matrix) {
  const m = matrix || buildWorkforceCompletionMatrix();
  const lines = [
    "# Workforce Completion Matrix",
    "",
    `Generated: ${m.generatedAt}`,
    "",
    "## Totals",
    "",
    `| Metric | Count |`,
    `| --- | ---: |`,
    `| Catalogue | ${m.totals.catalogue} |`,
    `| Executable | ${m.totals.executable} |`,
    `| Non-executable | ${m.totals.nonExecutable} |`,
    `| Duplicate definitions | ${m.totals.duplicateDefinitions} |`,
    `| Invalid definitions | ${m.totals.invalidDefinitions} |`,
    `| Departments | ${m.totals.departments} |`,
    `| Departments with executable coverage | ${m.totals.departmentsWithExecutableCoverage} |`,
    `| Workflows covered | ${m.totals.workflowsCovered}/${m.totals.workflows} |`,
    `| Capacity slots (planning) | ${m.totals.capacitySlots} |`,
    "",
    m.explanation.catalogueVsExecutable,
    "",
    m.explanation.definitionVsInstance,
    "",
    "## Agents",
    "",
    "| ID | Name | Dept | Executable | Classification | Reason |",
    "| --- | --- | --- | --- | --- | --- |",
  ];
  for (const a of m.agents) {
    lines.push(
      `| ${a.canonicalAgentId} | ${a.displayName} | ${a.department} | ${a.executable} | ${a.catalogueClassification} | ${a.reasonForNonExecutable || "—"} |`
    );
  }
  return lines.join("\n");
}
