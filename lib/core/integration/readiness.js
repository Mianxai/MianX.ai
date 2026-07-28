/**
 * Integration readiness fields for /api/core/health.
 * Never reports liveExecutionReady without a real provider + controls.
 */

import { isProviderConfigured, providerOperationalStatus, schedulerStatus } from "../config.js";
import { rateLimitBackendStatus } from "../ratelimit.js";
import { listActiveAgentDefinitions, isAgentExecutable } from "../agents.js";
import { ENGINE_VERSION } from "./schemas.js";
import { getSimulationTimestamps, listRuns } from "./store.js";
import { assessProviderGate } from "./provider-gate.js";

export function buildIntegrationReadiness({ lastTickAt = null } = {}) {
  const executable = listActiveAgentDefinitions().filter(isAgentExecutable);
  const providerStatus = providerOperationalStatus("anthropic");
  const liveGate = assessProviderGate({
    execution_mode: "live_provider",
    founder_enabled_live: false,
    founder_approved: false,
    budget_present: false,
  });
  const timestamps = getSimulationTimestamps();
  const runs = listRuns();
  const completedSim = runs.some(
    (r) =>
      r.execution_mode === "deterministic_simulation" &&
      (r.status === "completed" || r.current_stage === "founder_final_review" || r.current_stage === "completed")
  );

  return {
    templateEngineReady: true,
    planningEngineReady: true,
    executionEngineReady: true,
    workforceReady: true,
    memoryReady: true,
    learningReady: true,
    integrationOrchestratorReady: true,
    routableAgentCount: executable.length,
    providerStatus,
    simulationReady: true,
    liveExecutionReady: Boolean(
      isProviderConfigured("anthropic") && liveGate.live_execution_ready
    ),
    // Honest: without Founder live enable + approval + budget, always false here
    liveExecutionReadyNote:
      "Requires configured provider, Founder live mode, approval, and budget. Not inferred from simulation.",
    schedulerStatus: schedulerStatus({ lastTickAt }),
    lastSchedulerTick: lastTickAt,
    durableRateLimiterStatus: rateLimitBackendStatus(),
    pendingMigrationsKnown: [
      "20260728210000_phase_h_integration_runtime.sql (additive — apply only with Founder approval)",
    ],
    integrationProofStatus: completedSim
      ? "deterministic_simulation_exercised_in_process"
      : "awaiting_deterministic_simulation_proof",
    lastSuccessfulSimulationAt: timestamps.lastSuccessfulSimulationAt,
    lastFailedSimulationAt: timestamps.lastFailedSimulationAt,
    engine_version: ENGINE_VERSION,
    fabricated_live_execution: false,
  };
}
