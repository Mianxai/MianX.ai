export {
  ENGINE_VERSION,
  TEMPLATE_STATUSES,
  TEMPLATE_KINDS,
  TEMPLATE_SCOPES,
  RELATION_TYPES,
  ACYCLIC_RELATION_TYPES,
  makeTemplateBase,
  assertBaseFields,
  nodeKey,
} from "./schemas";

export {
  registerTemplateVersion,
  getTemplateVersion,
  listTemplateVersions,
  transitionTemplateStatus,
  createNewVersion,
  canSelectForNewExecution,
  assertNotMutatingActive,
  getAllowedTransitions,
  __resetVersionStore,
} from "./versioning";

export {
  buildRelationGraph,
  validateRelation,
  detectCycles,
  assertAcyclic,
  traverseDependencies,
  impactAnalysis,
  lineageFromTemplateToBacklog,
} from "./graph";

export { matchTemplates } from "./matcher";
export { selectCapabilitiesFromObjective } from "./capability-engine";
export {
  mapCapabilitiesToDepartments,
  mapDepartmentsToExecutableAgents,
} from "./department-engine";
export {
  runTemplateIntelligencePlan,
  attachTemplateIntelligenceToBlueprint,
} from "./planning";
export {
  buildTemplateLineage,
  stampExecutionLineage,
  explainLineage,
} from "./lineage";
export { buildTemplateMemoryCandidates } from "./memory-bridge";
export {
  assessLearningProposal,
  proposeTemplateImprovements,
} from "./learning-bridge";
export { recordTemplateAudit, listTemplateAudits, __resetTemplateAudit } from "./audit";

export * from "./catalog/index";
