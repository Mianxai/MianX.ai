/**
 * Phase G — Real Autonomous Workforce Runtime public API.
 * Uses only the 38 executable agents from lib/core/agents.js.
 */

export { ENGINE_VERSION, AGENT_LIFECYCLE, PIPELINE_STAGES, CONTROL_ACTIONS } from "./schemas.js";

export {
  bootstrapWorkforce,
  transitionAgent,
  recoverWorkforce,
  listLifecycleStatuses,
} from "./lifecycle.js";

export { buildAgentExecutionContext } from "./context.js";

export {
  delegateWork,
  receiveWork,
  replyWork,
  escalateWork,
  completeDelegation,
  getThread,
  detectCircularDelegation,
} from "./communication.js";

export {
  balanceWorkload,
  distributeWork,
  orderQueue,
  assignFromQueue,
} from "./distribution.js";

export {
  startCollaboration,
  shareMemory,
  shareOutput,
  mergeDecision,
  listCollaborations,
  getCollaboration,
} from "./collaboration.js";

export {
  runPipeline,
  founderApprovePipeline,
  isTaskClaimed,
} from "./pipeline.js";

export { writeTaskExperience, listMemoryWrites } from "./memory-bridge.js";
export {
  proposeWorkforceLearning,
  assessLearningProposal,
  listLearningProposals,
} from "./learning-bridge.js";

export { recoverWorkforce as recoverRuntime } from "./lifecycle.js";

export {
  pauseWorkforce,
  resumeWorkforce,
  stopAgent,
  retryAgent,
  cancelAgentTask,
  reassignTask,
  founderDecide,
  getControlStatus,
} from "./founder-control.js";

export {
  startSimulation,
  approveSimulation,
  listSimulations,
  getSimulation,
} from "./simulation.js";

export { assessWorkforceHealth, listHealthEvents } from "./health.js";
export { computeWorkloadAnalytics } from "./analytics.js";
export { getWorkforceDashboard, getAgentDetail } from "./dashboard.js";

export {
  __resetWorkforceRuntime,
  listAgentStates,
  listAudit,
  isWorkforcePaused,
} from "./store.js";
