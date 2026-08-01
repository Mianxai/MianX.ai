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
import { OPENAI_SDK_VERSION } from "./openai-adapter";

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
  const latestCost =
    store.costUsage.filter((c) => c.projectId === PILOT_PROJECT_ID).slice(-1)[0] ||
    null;
  const latestProviderReq =
    store.providerRequests
      .filter((p) => p.projectId === PILOT_PROJECT_ID)
      .slice(-1)[0] || null;

  const eligibility = evaluatePilotEligibility({
    authenticated: opts.authenticated !== false,
    authorized: opts.authorized !== false,
    projectId: opts.projectId || PILOT_PROJECT_ID,
    agentSlug: PILOT_AGENT_SLUG,
    taskId: opts.taskId || null,
    modelName: provider.selectedModel || opts.modelName || null,
  });

  const disabledReasons = [];
  if (provider.providerName === "none") disabledReasons.push("Provider setup required");
  if (!globalEnabled) disabledReasons.push("Global live execution disabled");
  if (!pilotEnabled) disabledReasons.push("Pilot execution disabled");
  if (killSwitch) disabledReasons.push("Kill switch active");
  if (!eligibility.approvalPresent) disabledReasons.push("Founder approval missing");
  if (provider.modelStatus === "none_selected") {
    disabledReasons.push("LIVE_AGENT_OPENAI_MODEL not set");
  }
  if (provider.modelStatus === "not_allowlisted") {
    disabledReasons.push("Model not allowlisted");
  }
  if (!eligibility.networkCallAllowed) {
    disabledReasons.push("Server eligibility incomplete");
  }

  const runButtonEnabled = Boolean(
    eligibility.networkCallAllowed && eligibility.executionEligible && !killSwitch
  );

  return {
    ok: true,
    fabricated: false,
    simulated: false,
    phase: "ii2_openai_path",
    openaiSdkVersion: OPENAI_SDK_VERSION,
    agent: {
      ...buildPilotAgentDefinition(),
      liveTested: getLiveTestedSeats() >= 1,
    },
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
      pricingVersion: provider.pricingVersion,
      worstCaseCostUsd: provider.worstCaseCostUsd,
    },
    model: {
      selected: provider.selectedModel,
      allowlisted: provider.modelAllowlisted,
      status: provider.modelStatus,
      allowlist: provider.modelAllowlist,
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
      worstCaseCostUsd: provider.worstCaseCostUsd,
      latestRunCostUsd: latestCost?.estimatedCostUsd ?? null,
    },
    eligibility: {
      ...eligibility,
      executionEligible: runButtonEnabled,
      runButtonEnabled,
      disabledReasons,
    },
    latestRun: latestRun
      ? {
          id: latestRun.id,
          status: latestRun.status,
          provider: latestRun.provider,
          model: latestRun.model,
          inputTokens: latestRun.inputTokens,
          outputTokens: latestRun.outputTokens,
          totalTokens: latestRun.totalTokens,
          estimatedCostUsd: latestRun.estimatedCostUsd,
          fabricated: latestRun.fabricated,
          simulated: latestRun.simulated,
          live: latestRun.live,
          failureClassification: latestRun.failureClassification,
        }
      : null,
    latestProviderRequestId: latestProviderReq?.requestId || null,
    latestEvidence:
      store.evidence.filter((e) => e.projectId === PILOT_PROJECT_ID).slice(-1)[0] ||
      null,
    failureReason: store.failures.slice(-1)[0]?.classification || null,
    workforce: {
      allocatedSeats: 0,
      activeInstances: 0,
      liveTestedSeats: getLiveTestedSeats(),
      liveExecutionReady: Boolean(eligibility.liveExecutionReady),
    },
    scheduler: {
      note: "Supabase Cron primary remains unchanged; pilot does not auto-run on tick.",
      scheduleAutoPilot: false,
      processesExplicitQueueOnly: true,
    },
  };
}
