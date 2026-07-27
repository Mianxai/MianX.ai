// Public entry point for the MianX AI Workforce canonical registry.
//
// Organizational planning only. Does not activate runtime agents.
// Executable agents: lib/core/agents.js

export {
  PLANNED_ROLE_SLOT_TOTAL,
  HISTORICAL_MINIMUM_CLAIM,
  HIERARCHY_LEVELS,
  WORKFORCE_CAPABILITIES,
  PROTECTED_WORKFORCE_CAPABILITIES,
} from "./constants";

export {
  DEPARTMENTS,
  listDepartments,
  getDepartment,
  departmentSlotTotal,
  assertDepartmentSlotTotal,
} from "./departments";

export {
  WORKFORCE_DEFINITIONS,
  listDefinitions,
  getDefinition,
  plannedSlotContribution,
  namedDefinitionCount,
  capacityReserveSlotTotal,
} from "./definitions";

export {
  FOUNDER_NODE,
  buildReportingGraph,
  detectHierarchyCycles,
  assertValidHierarchy,
  hierarchySummary,
} from "./hierarchy";

export {
  ACTIVATION_MODEL,
  SAFETY_POLICY,
  isInstantiable,
} from "./activation";

export { IMPLEMENTATION_WAVES, listWaves } from "./waves";

export { RECONCILIATION, computeReconciliation } from "./reconciliation";

export { validateWorkforceRegistry } from "./validate";
