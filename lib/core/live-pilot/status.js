/**
 * Canonical Admin / API status snapshot for the live pilot (no secrets).
 */

import {
  PILOT_AGENT_NAME,
  PILOT_AGENT_SLUG,
  PILOT_POLICY,
  PILOT_PROJECT_ID,
  PILOT_PROJECT_NAME,
  PILOT_TOOL_PERMISSIONS,
} from "./constants";
import { getPilotProviderStatus } from "./adapter";
import {
  isGlobalLiveExecutionEnabled,
  isPilotLiveExecutionEnabled,
  getPilotPolicy,
} from "./policy";
import { evaluatePilotEligibility } from "./eligibility";
import {
  getLivePilotStoreSnapshot,
  getLiveTestedSeats,
  isKillSwitchActive,
  listPilotRuns,
} from "./store";

export function buildPilotAgentDefinition() {
  return {
    slug: PILOT_AGENT_SLUG,
    name: PILOT_AGENT_NAME,
    purpose:
      "Perform a read-only architectural risk review of one Founder-approved MianX.ai internal task and return structured recommendations.",
    projectId: PILOT_PROJECT_ID,
    projectName: PILOT_PROJECT_NAME,
    inactiveUntilFounderActivation: true,
    allocated: false,
    active: false,
    liveTested: false,
    tools: { ...PILOT_TOOL_PERMISSIONS },
    permissions: {
      write: false,
      mutate: false,
      spawnChildren: false,
      recursive: false,
      providerFallback: false,
    },
  };
}

export function buildLivePilotStatus(opts = {}) {
  const provider = getPilotProviderStatus();
  const globalEnabled = isGlobalLiveExecutionEnabled();
  const pilotEnabled = isPilotLiveExecutionEnabled();
  const killSwitch = isKillSwitchActive();
  const store = getLivePilotStoreSnapshot();
  const runs = listPilotRuns({ projectId: PILOT_PROJECT_ID });
  const latestRun = runs.length ? runs[runs.length - 1] : null;
  const eligibility = evaluatePilotEligibility({
    authenticated: opts.authenticated !== false,
    authorized: opts.authorized !== false,
    projectId: opts.projectId || PILOT_PROJECT_ID,
    agentSlug: PILOT_AGENT_SLUG,
    taskId: opts.taskId || null,
    modelName: opts.modelName || null,
  });

  const disabledReasons = [];
  if (provider.providerName === "none") disabledReasons.push("Provider setup required");
  if (!globalEnabled) disabledReasons.push("Global live execution disabled");
  if (!pilotEnabled) disabledReasons.push("Pilot execution disabled");
  if (killSwitch) disabledReasons.push("Kill switch active");
  if (!eligibility.approvalPresent) disabledReasons.push("Founder approval missing");
  disabledReasons.push("Phase II.1 foundation blocks provider network calls");

  return {
    ok: true,
    fabricated: false,
    simulated: false,
    agent: buildPilotAgentDefinition(),
    project: {
      id: PILOT_PROJECT_ID,
      name: PILOT_PROJECT_NAME,
      isolation: "pilot_only",
    },
    provider: {
      providerName: provider.providerName,
      status: provider.providerName === "none" ? "Provider setup required" : "configured",
      configured: provider.configured,
      modelAllowlist: provider.modelAllowlist,
      paidFallbackEnabled: false,
    },
    model: {
      selected: null,
      allowlisted: provider.modelAllowlist,
      status: "none_selected",
    },
    switches: {
      globalLiveExecutionEnabled: globalEnabled,
      pilotLiveExecutionEnabled: pilotEnabled,
      defaults: { global: false, pilot: false },
    },
    killSwitch: {
      active: killSwitch,
      events: store.killSwitchEvents.slice(-5),
    },
    policy: getPilotPolicy(),
    queue: {
      queued: store.runs.filter((r) => r.status === "queued").length,
      maxQueued: PILOT_POLICY.maxQueuedPilotTasks,
      activeLeases: store.activeLeaseCount,
      maxConcurrent: PILOT_POLICY.maxConcurrentRequests,
    },
    budget: {
      maxEstimatedCostUsd: PILOT_POLICY.maxEstimatedCostUsd,
      maxInputTokens: PILOT_POLICY.maxInputTokens,
      maxOutputTokens: PILOT_POLICY.maxOutputTokens,
      maxTotalTokens: PILOT_POLICY.maxTotalTokens,
    },
    eligibility: {
      ...eligibility,
      executionEligible: false,
      runButtonEnabled: false,
      disabledReasons,
    },
    latestRun: latestRun
      ? {
          id: latestRun.id,
          status: latestRun.status,
          provider: latestRun.provider,
          fabricated: latestRun.fabricated,
          simulated: latestRun.simulated,
          live: latestRun.live,
        }
      : null,
    latestEvidence: store.evidence.filter((e) => e.projectId === PILOT_PROJECT_ID).slice(-1)[0] || null,
    failureReason: store.failures.slice(-1)[0]?.classification || null,
    workforce: {
      allocatedSeats: 0,
      activeInstances: 0,
      liveTestedSeats: getLiveTestedSeats(),
      liveExecutionReady: false,
    },
    scheduler: {
      note: "Supabase Cron primary remains unchanged; pilot does not auto-run on tick.",
      scheduleAutoPilot: false,
    },
    phase: "ii1_foundation",
  };
}
