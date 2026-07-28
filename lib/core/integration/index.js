/**
 * Phase H — End-to-End Autonomous Company Integration public API.
 */

export {
  ENGINE_VERSION,
  EXECUTION_MODES,
  INTEGRATION_STAGES,
  STAGE_TRANSITIONS,
  RUN_STATUSES,
  PROTECTED_ACTIONS,
  nowIso,
  uid,
  assertStage,
  canTransitionStage,
  assertStageTransition,
} from "./schemas.js";

export {
  __resetIntegrationRuntime,
  getRun,
  saveRun,
  listRuns,
  listStageEvents,
  listCheckpoints,
  getEvidenceManifest,
  listFailureEvents,
  listMemoryEntries,
  listLearningProposals,
  listAudit,
  listClaimedTasks,
  isTaskClaimed,
  getSimulationTimestamps,
} from "./store.js";

export {
  createIntegrationContract,
  transitionRun,
  linkLineage,
  assertContractIds,
} from "./contract.js";

export { intakeObjective, applyClarification } from "./objective.js";
export { validatePlanPackage, forceDependencyCycleValidation } from "./validation.js";
export { auditRoutableWorkforce } from "./agent-audit.js";
export { allocateAgentsForPlan } from "./allocation.js";
export {
  makeEvidence,
  buildEvidenceManifest,
  verifyTaskCompletion,
  EVIDENCE_KINDS,
} from "./evidence.js";
export { writeIntegrationMemory, writeRunMemoryBundle } from "./memory-bridge.js";
export {
  proposeIntegrationLearning,
  assessLearningSafety,
} from "./learning-bridge.js";
export {
  evaluateProtectedAction,
  scanObjectiveForProtectedActions,
} from "./protected-actions.js";
export { assessProviderGate, blockLiveWithoutProvider } from "./provider-gate.js";

export {
  createIntegrationRun,
  submitClarification,
  generateIntegrationPlan,
  buildFounderApprovalPackage,
  decideFounderApproval,
  startIntegrationSimulation,
  buildProofPack,
  decideFinalReview,
  pauseIntegrationRun,
  resumeIntegrationRun,
  cancelIntegrationRun,
  recoverIntegrationRun,
  runDeterministicProofChain,
  getIntegrationDashboard,
} from "./orchestrator.js";

export { buildIntegrationReadiness, buildIntegrationReadinessAsync, deriveMigrationReadiness } from "./readiness.js";
export { measureConcurrencyProof } from "./concurrency.js";
export {
  FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
  PROOF_STATUSES,
  buildProductionProofObjective,
  assertExplicitFounderConfirmation,
} from "./proof.js";
export {
  integrationPersistenceStatus,
  persistIntegrationRun,
  loadIntegrationRun,
  listPersistedIntegrationRuns,
  loadProofTimestamps,
  probeIntegrationSchemaCapabilities,
  mapProofStatusFromRun,
  isProductionLike,
} from "./persist.js";
