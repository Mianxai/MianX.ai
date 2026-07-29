/**
 * Integration readiness fields for /api/core/health.
 * Never reports liveExecutionReady without a real provider + controls.
 * Never hardcodes an already-applied migration as pending.
 */

import { isProviderConfigured, providerOperationalStatus, schedulerStatus } from "../config.js";
import { rateLimitBackendStatus } from "../ratelimit.js";
import { listActiveAgentDefinitions, isAgentExecutable } from "../agents.js";
import { ENGINE_VERSION } from "./schemas.js";
import { assessProviderGate } from "./provider-gate.js";
import {
  integrationPersistenceStatus,
  loadProofTimestamps,
  probeIntegrationSchemaCapabilities,
} from "./persist.js";

/**
 * Sync fallback for unit tests that do not await probes.
 * Must not claim pending Phase H migration statically.
 */
export function buildIntegrationReadiness({ lastTickAt = null } = {}) {
  const executable = listActiveAgentDefinitions().filter(isAgentExecutable);
  const providerStatus = providerOperationalStatus("anthropic");
  const liveGate = assessProviderGate({
    execution_mode: "live_provider",
    founder_enabled_live: false,
    founder_approved: false,
    budget_present: false,
  });

  return {
    templateEngineReady: true,
    planningEngineReady: true,
    executionEngineReady: true,
    workforceReady: true,
    memoryReady: true,
    learningReady: true,
    integrationOrchestratorReady: true,
    integrationPersistenceReady: false,
    routableAgentCount: executable.length,
    providerStatus,
    simulationReady: false,
    liveExecutionReady: Boolean(
      isProviderConfigured("anthropic") && liveGate.live_execution_ready
    ),
    liveExecutionReadyNote:
      "Requires configured provider, Founder live mode, approval, and budget. Not inferred from simulation.",
    schedulerStatus: schedulerStatus({ lastTickAt }),
    lastSchedulerTick: lastTickAt,
    durableRateLimiterStatus: rateLimitBackendStatus(),
    migrationReadiness: {
      status: "unknown",
      mode: "schema_capability",
      note: "Use async health probe for truthful migration/schema readiness.",
      pending: [],
    },
    integrationSchema: {
      integration_runs: false,
      integration_stage_events: false,
      integration_checkpoints: false,
      integration_evidence_manifests: false,
      integration_failure_events: false,
    },
    integrationProofStatus: "not_started",
    canonicalActiveProofStatus: null,
    canonicalActiveProofStage: null,
    activeProofCount: 0,
    duplicateActiveProofCount: 0,
    lastSuccessfulSimulationAt: null,
    lastFailedSimulationAt: null,
    lastProofStartedAt: null,
    lastProofCompletedAt: null,
    engine_version: ENGINE_VERSION,
    fabricated_live_execution: false,
  };
}

/**
 * Truthful async readiness used by /api/core/health.
 */
export async function buildIntegrationReadinessAsync({ lastTickAt = null } = {}) {
  const base = buildIntegrationReadiness({ lastTickAt });
  const [persistence, caps, proofTs] = await Promise.all([
    integrationPersistenceStatus(),
    probeIntegrationSchemaCapabilities(),
    loadProofTimestamps(),
  ]);

  const migrationReadiness = deriveMigrationReadiness(caps);
  const persistenceReady = Boolean(persistence.durable);
  const simulationReady = persistenceReady && caps.allPresent && !persistence.failClosed;

  return {
    ...base,
    integrationPersistenceReady: persistenceReady,
    simulationReady,
    simulationReadyNote: simulationReady
      ? "Durable integration schema available for deterministic simulation."
      : persistence.failClosed
        ? "Fail-closed: production requires durable integration persistence."
        : `Simulation not ready: ${persistence.reason || migrationReadiness.status}`,
    migrationReadiness,
    integrationSchema: caps.tables,
    integrationProofStatus: proofTs.integrationProofStatus || "not_started",
    canonicalActiveProofStatus: proofTs.canonicalActiveProofStatus || null,
    canonicalActiveProofStage: proofTs.canonicalActiveProofStage || null,
    activeProofCount: proofTs.activeProofCount || 0,
    duplicateActiveProofCount: proofTs.duplicateActiveProofCount || 0,
    lastSuccessfulSimulationAt: proofTs.lastSuccessfulSimulationAt,
    lastFailedSimulationAt: proofTs.lastFailedSimulationAt,
    lastProofStartedAt: proofTs.lastProofStartedAt,
    lastProofCompletedAt: proofTs.lastProofCompletedAt,
    persistence: {
      durable: persistence.durable,
      backend: persistence.backend,
      reason: persistence.reason,
      failClosed: persistence.failClosed,
    },
    fabricated_live_execution: false,
  };
}

export function deriveMigrationReadiness(caps) {
  if (!caps.supabaseConfigured) {
    return {
      status: "unconfigured",
      mode: "schema_capability",
      note: "Supabase not configured — migration history not queried.",
      pending: [],
    };
  }
  if (caps.anyUnknown) {
    return {
      status: "unknown",
      mode: "schema_capability",
      note: "Schema probes inconclusive; refusing to invent pending migration list.",
      pending: [],
    };
  }
  if (caps.allPresent) {
    return {
      status: "applied_or_equivalent",
      mode: "schema_capability",
      note: "Required Phase H integration tables are queryable. Applied migrations are not listed as pending.",
      pending: [],
    };
  }
  const missing = Object.entries(caps.tables)
    .filter(([, present]) => !present)
    .map(([name]) => name);
  return {
    status: "schema_missing",
    mode: "schema_capability",
    note: "One or more Phase H integration tables are not queryable. Founder may need to apply the additive Phase H migration.",
    pending: missing.map(
      (table) => `capability:${table} (table not queryable — migration may be required)`
    ),
  };
}
