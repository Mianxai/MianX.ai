/**
 * Canonical foundation metrics — single shared builder for health,
 * Workforce Setup, and Workforce Readiness.
 *
 * Never conflate capacity seat compilation (445) with:
 * - executable catalogue size (43 / 38)
 * - named/runtime role registry entries (historically mislabeled "compiled seats")
 */

import {
  EXPECTED_CATALOGUE_AGENT_COUNT,
  EXPECTED_EXECUTABLE_AGENT_COUNT,
  listAgentDefinitions,
  isAgentExecutable,
} from "@/lib/core/agents";
import { compileCanonicalRoleRegistry } from "@/lib/core/real-agent/role-compilation";
import { auditRealAgentWorkflowCoverage } from "@/lib/core/real-agent/workflow-coverage";
import { buildWorkforceCompletionMatrix } from "@/lib/core/workforce-completion/matrix";
import { oneKeyActivationStatus } from "./provider-resolution";
import { compileCapacitySeats, reconcileDepartmentBaseline } from "./seats";
import { compileRoleArchetypes } from "./archetypes";
import { runWorkforceVerify } from "./bootstrap-runner";

export const FOUNDATION_METRIC_DEFINITIONS = Object.freeze({
  capacitySeats:
    "Complete allocatable workforce capacity registry (slots, not always-on agents).",
  compiledSeats:
    "Seats represented by the compiled workforce seat registry used for bootstrap/persistence.",
  persistedSeats: "Canonical workforce seats durably stored in the database.",
  readyToAllocateSeats: "Persisted valid seats available for safe project allocation.",
  allocatedSeats: "Seats assigned to active project work.",
  activeInstances: "Currently running agent instances.",
  liveTestedSeats:
    "Seats that completed a controlled real provider execution with valid evidence.",
  departments: "Department baseline coverage count for the capacity registry.",
  archetypes: "Compiled role archetype contract count.",
  workflowFamilies: "Founder workflow families mapped to executable contracts.",
  catalogueEntries:
    "Total runtime agent catalogue definitions (includes intentionally non-executable).",
  executableDefinitions:
    "Catalogue definitions with lifecycleStatus active that the runtime may allocate and run.",
  namedRoleRegistryEntries:
    "Named org-registry roles plus unlinked executable runtime catalogue agents from compileCanonicalRoleRegistry. Not capacity seats.",
  capacityReserveGaps:
    "Documented capacity-reserve slots without a separate named persona inventory entry.",
});

/**
 * Executable / runtime catalogue metrics (never labeled as compiled seats).
 */
export function buildExecutableCatalogueMetrics() {
  const defs = listAgentDefinitions();
  const matrix = buildWorkforceCompletionMatrix();
  const roleReg = compileCanonicalRoleRegistry();
  const catalogueEntries = defs.length;
  const executableDefinitions = defs.filter(isAgentExecutable).length;
  const intentionallyNonExecutable = catalogueEntries - executableDefinitions;

  return {
    catalogueEntries,
    executableDefinitions,
    intentionallyNonExecutable,
    expectedCatalogueEntries: EXPECTED_CATALOGUE_AGENT_COUNT,
    expectedExecutableDefinitions: EXPECTED_EXECUTABLE_AGENT_COUNT,
    matrixCatalogue: matrix.totals.catalogue,
    matrixExecutable: matrix.totals.executable,
    namedRoleRegistryEntries: roleReg.canonicalRolesCompiled,
    namedOrgRoleEntries: roleReg.roles.filter((r) => r.roleType !== "runtime_catalogue")
      .length,
    runtimeCatalogueRoleEntries: roleReg.roles.filter(
      (r) => r.roleType === "runtime_catalogue"
    ).length,
    namedRoleSlotsCovered: roleReg.namedRoleSlotsCovered,
    capacityReserveGaps: roleReg.unresolvedCapacityGaps,
    note:
      "Catalogue entries (43) include superseded non-executable definitions. Executable definitions (38) are the smaller runtime-capable set. Named role registry entries are an org/runtime inventory count and must never be labeled compiled seats.",
  };
}

function providerFields() {
  const oneKey = oneKeyActivationStatus();
  return {
    providerName: oneKey.keyPresent ? "openrouter" : "none",
    providerConfigured: Boolean(oneKey.keyPresent),
    liveExecutionReady: false,
  };
}

/**
 * Shared foundation metric snapshot.
 * @param {{ adapter?: object, productionMode?: boolean, verify?: object }} [opts]
 */
export async function buildFoundationMetrics(opts = {}) {
  const verify =
    opts.verify ||
    (await runWorkforceVerify({
      adapter: opts.adapter || null,
      productionMode: opts.productionMode !== false,
    }));
  const seats = compileCapacitySeats();
  const archetypes = compileRoleArchetypes();
  const dept = reconcileDepartmentBaseline();
  const workflows = auditRealAgentWorkflowCoverage();
  const executable = buildExecutableCatalogueMetrics();
  const provider = providerFields();

  const departmentCount = Object.keys(dept.departments || {}).length;
  const workflowFamilyCount = workflows.founderFamiliesMapped;
  const workflowFamiliesRequired = workflows.founderFamiliesRequired;

  return {
    capacitySeats: seats.capacitySeats,
    compiledSeats: seats.capacitySeats,
    mappedSeats: seats.mappedSeats,
    orphanSeats: seats.orphanSeats,
    persistedSeats: verify.persistedSeats,
    readyToAllocateSeats: verify.readyToAllocateSeats ?? 0,
    allocatedSeats: verify.allocatedSeats ?? 0,
    activeInstances: verify.activeInstances ?? 0,
    liveTestedSeats: verify.liveTestedSeats ?? 0,
    departments: departmentCount,
    departmentCount,
    departmentCoverage: `${departmentCount}/${departmentCount}`,
    archetypes: archetypes.count,
    archetypeCount: archetypes.count,
    workflowFamilies: workflowFamilyCount,
    workflowFamilyCount,
    workflowFamiliesRequired,
    workflowCoverage: `${workflowFamilyCount}/${workflowFamiliesRequired}`,
    databaseReady: Boolean(verify.databaseReady),
    foundationReady: Boolean(verify.foundationReady),
    databaseDurable: Boolean(verify.databaseDurable),
    queueDurable: Boolean(verify.queueDurable),
    leaseDurable: Boolean(verify.leasesDurable),
    leasesDurable: Boolean(verify.leasesDurable),
    rateLimitDurable: Boolean(verify.rateLimitDurable),
    bootstrapStatus: verify.bootstrapStatus,
    compilationReady: Boolean(verify.compilationReady),
    ...provider,
    executable,
    definitions: FOUNDATION_METRIC_DEFINITIONS,
    providerFreeMessage: verify.providerFreeMessage,
    errors: verify.errors || [],
    ok: Boolean(verify.ok),
  };
}

/**
 * Safe public/admin subset for JSON responses (no secrets).
 */
export function sanitizeFoundationMetrics(metrics) {
  if (!metrics) return null;
  const {
    capacitySeats,
    compiledSeats,
    mappedSeats,
    orphanSeats,
    persistedSeats,
    readyToAllocateSeats,
    allocatedSeats,
    activeInstances,
    liveTestedSeats,
    departments,
    departmentCount,
    departmentCoverage,
    archetypes,
    archetypeCount,
    workflowFamilies,
    workflowFamilyCount,
    workflowFamiliesRequired,
    workflowCoverage,
    databaseReady,
    foundationReady,
    databaseDurable,
    queueDurable,
    leaseDurable,
    leasesDurable,
    rateLimitDurable,
    bootstrapStatus,
    compilationReady,
    providerName,
    providerConfigured,
    liveExecutionReady,
    executable,
    providerFreeMessage,
    ok,
  } = metrics;
  return {
    capacitySeats,
    compiledSeats,
    mappedSeats,
    orphanSeats,
    persistedSeats,
    readyToAllocateSeats,
    allocatedSeats,
    activeInstances,
    liveTestedSeats,
    departments,
    departmentCount,
    departmentCoverage,
    archetypes,
    archetypeCount,
    workflowFamilies,
    workflowFamilyCount,
    workflowFamiliesRequired,
    workflowCoverage,
    databaseReady,
    foundationReady,
    databaseDurable,
    queueDurable,
    leaseDurable,
    leasesDurable,
    rateLimitDurable,
    bootstrapStatus,
    compilationReady,
    providerName,
    providerConfigured,
    liveExecutionReady,
    executable: executable
      ? {
          catalogueEntries: executable.catalogueEntries,
          executableDefinitions: executable.executableDefinitions,
          intentionallyNonExecutable: executable.intentionallyNonExecutable,
          namedRoleRegistryEntries: executable.namedRoleRegistryEntries,
          capacityReserveGaps: executable.capacityReserveGaps,
          note: executable.note,
        }
      : null,
    providerFreeMessage,
    ok,
  };
}

/**
 * Assert shared foundation invariants for a post-bootstrap fixture/state.
 */
export function assertFoundationMetricInvariants(metrics, { expectPersisted = true } = {}) {
  const errors = [];
  const check = (cond, msg) => {
    if (!cond) errors.push(msg);
  };
  check(metrics.capacitySeats === 445, `capacitySeats=${metrics.capacitySeats}`);
  check(metrics.compiledSeats === 445, `compiledSeats=${metrics.compiledSeats}`);
  check(metrics.compiledSeats !== metrics.executable?.catalogueEntries, "compiledSeats must not equal catalogue");
  check(
    metrics.compiledSeats !== metrics.executable?.executableDefinitions,
    "compiledSeats must not equal executable definitions"
  );
  check(
    metrics.compiledSeats !== metrics.executable?.namedRoleRegistryEntries,
    "compiledSeats must not equal namedRoleRegistryEntries"
  );
  check(metrics.departments === 20, `departments=${metrics.departments}`);
  check(metrics.archetypes === 148, `archetypes=${metrics.archetypes}`);
  check(metrics.workflowFamilies === 13, `workflowFamilies=${metrics.workflowFamilies}`);
  check(metrics.liveTestedSeats === 0, `liveTestedSeats=${metrics.liveTestedSeats}`);
  check(metrics.providerName === "none" || metrics.providerConfigured === false, "provider must be none when unconfigured");
  check(metrics.liveExecutionReady === false, "liveExecutionReady must be false without provider evidence");
  if (expectPersisted) {
    check(metrics.persistedSeats === 445, `persistedSeats=${metrics.persistedSeats}`);
    check(metrics.readyToAllocateSeats === 445, `readyToAllocateSeats=${metrics.readyToAllocateSeats}`);
    check(metrics.allocatedSeats === 0, `allocatedSeats=${metrics.allocatedSeats}`);
    check(metrics.activeInstances === 0, `activeInstances=${metrics.activeInstances}`);
    check(metrics.databaseReady === true, "databaseReady");
    check(metrics.foundationReady === true, "foundationReady");
  }
  return { ok: errors.length === 0, errors };
}
