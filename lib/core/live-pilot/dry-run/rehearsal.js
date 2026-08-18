/**
 * Deterministic dry-run rehearsal orchestrator (test-only).
 * Never exposes fake provider to Production Admin buttons or API routes.
 */

import {
  PILOT_AGENT_SLUG,
  PILOT_PROJECT_ID,
  ENV_LIVE_AGENT_EXECUTION_ENABLED,
  ENV_LIVE_AGENT_PILOT_ENABLED,
} from "../constants";
import {
  resetLivePilotStore,
  createPilotApproval,
  setKillSwitch,
  getLiveTestedSeats,
  getLivePilotStoreSnapshot,
  countQueuedPilotTasks,
  listPilotRuns,
} from "../store";
import { queuePilotExecution } from "../execute";
import { processExplicitPilotQueue } from "../runtime";
import { buildProviderActivationPreflight, assertActivationGate } from "../activation-preflight";
import { __setPilotModelVerificationForTests, __resetPilotModelVerificationForTests, OPENAI_PILOT_MODEL_ID, OPENAI_OFFICIAL_PRICE_SOURCE } from "../model-registry";
import { buildPilotEvidenceRecord, verifyEvidenceChecksum, assertEvidenceHasNoSecrets } from "./evidence-contract";
import {
  createFakeOpenAIResponsesClient,
  assertFakeProviderAllowedInCurrentRuntime,
  FAKE_PROVIDER_NAME,
} from "./fake-provider";
import {
  createLiveRunAuthorizationFixture,
  validateLiveRunAuthorization,
  consumeLiveRunAuthorizationFixture,
  taskEnvelopeHash,
} from "./live-run-authorization";
import { buildDryRunRehearsalAdminReport } from "./admin-report";

export { buildDryRunRehearsalAdminReport };

function fullyVerified() {
  return {
    officialCatalogStatus: "verified",
    accountAccessStatus: "verified",
    officialPricingStatus: "verified",
    billingModeStatus: "standard",
    accountVerifiedModel: OPENAI_PILOT_MODEL_ID,
    modelId: OPENAI_PILOT_MODEL_ID,
  };
}

/**
 * Full happy-path rehearsal using injected fake provider only.
 */
export async function runDryRunEvidenceRehearsal(opts = {}) {
  assertFakeProviderAllowedInCurrentRuntime();
  resetLivePilotStore();
  __setPilotModelVerificationForTests(fullyVerified());

  const prev = {};
  for (const k of [
    ENV_LIVE_AGENT_EXECUTION_ENABLED,
    ENV_LIVE_AGENT_PILOT_ENABLED,
    "OPENAI_API_KEY",
    "LIVE_AGENT_OPENAI_MODEL",
  ]) {
    prev[k] = process.env[k];
  }
  process.env.OPENAI_API_KEY = "sk-test-not-real";
  process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
  process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
  process.env[ENV_LIVE_AGENT_PILOT_ENABLED] = "true";

  try {
    const auth = createLiveRunAuthorizationFixture({
      taskId: "dry-run-task-1",
      notes: "fixture only",
    });
    const authCheck = validateLiveRunAuthorization(auth, {
      projectId: PILOT_PROJECT_ID,
      agentSlug: PILOT_AGENT_SLUG,
      taskId: "dry-run-task-1",
    });
    if (!authCheck.ok) {
      return { ok: false, stage: "authorization", missing: authCheck.missing };
    }

    const preflight = buildProviderActivationPreflight({
      schedulerHealthy: true,
      founderLiveAuthorization: true,
    });
    const gate = assertActivationGate({
      founderLiveAuthorization: true,
      schedulerHealthy: true,
      modelId: OPENAI_PILOT_MODEL_ID,
    });

    const approval = createPilotApproval({
      projectId: PILOT_PROJECT_ID,
      taskId: "dry-run-task-1",
      agentSlug: PILOT_AGENT_SLUG,
    });
    const queued = await queuePilotExecution({
      authenticated: true,
      authorized: true,
      projectId: PILOT_PROJECT_ID,
      agentSlug: PILOT_AGENT_SLUG,
      taskId: "dry-run-task-1",
      approvalId: approval.id,
      idempotencyKey: opts.idempotencyKey || "dry-run-idem-1",
      taskTitle: "dry-run",
      taskBody: "rehearsal only",
    });
    if (!queued.ok) {
      return { ok: false, stage: "queue", queued };
    }

    const started = new Date().toISOString();
    const fake = createFakeOpenAIResponsesClient(opts.fakeOpts || {});
    const summary = await processExplicitPilotQueue({
      openaiClient: fake,
      allowNetwork: true,
      founderLiveAuthorization: true,
      schedulerHealthy: true,
    });
    const ended = new Date().toISOString();
    consumeLiveRunAuthorizationFixture(auth);

    const runs = listPilotRuns({ projectId: PILOT_PROJECT_ID });
    const run = runs[runs.length - 1] || null;
    const evidence = buildPilotEvidenceRecord({
      pilotRunId: run?.id || null,
      projectId: PILOT_PROJECT_ID,
      agentId: PILOT_AGENT_SLUG,
      taskId: "dry-run-task-1",
      taskEnvelopeHash: taskEnvelopeHash("dry-run-task-1"),
      providerName: FAKE_PROVIDER_NAME,
      configuredModel: OPENAI_PILOT_MODEL_ID,
      approvedModel: OPENAI_PILOT_MODEL_ID,
      accountVerifiedModelStatus: "verified",
      providerRequestId: run?.id ? `fake_for_${run.id}` : null,
      requestStartedAt: started,
      requestCompletedAt: ended,
      requestEndedAt: ended,
      latencyMs: 12,
      inputTokens: 100,
      outputTokens: 50,
      totalTokens: 150,
      estimatedCostUsd: 0.0003,
      estimatedCostMicrousd: 300,
      maximumAuthorizedCostMicrousd: 100_000,
      pricingSource: OPENAI_OFFICIAL_PRICE_SOURCE.pricingVersion,
      officialPriceSourceVersion: OPENAI_OFFICIAL_PRICE_SOURCE.pricingVersion,
      pricingVerifiedAt: OPENAI_OFFICIAL_PRICE_SOURCE.retrievalDate,
      schemaValidationOk: summary.succeeded === 1,
      schemaValidationPassed: summary.succeeded === 1,
      providerCallCount: fake.getCallCount(),
      attemptCount: 1,
      timeoutType: "none",
      timeoutResult: "none",
      terminalStatus: summary.succeeded === 1 ? "succeeded" : "failed",
      blockedReason: null,
      errorCategory: null,
      evidenceEnvironment: "test",
      simulated: true,
      rehearsal: true,
    });

    const checksum = verifyEvidenceChecksum(evidence);
    const secrets = assertEvidenceHasNoSecrets(evidence);

    return {
      ok: summary.succeeded === 1 && checksum.ok && secrets.ok,
      stage: "complete",
      fakeProvider: FAKE_PROVIDER_NAME,
      notProduction: true,
      genuineOpenAICalls: 0,
      fakeProviderCalls: fake.getCallCount(),
      liveTestedSeats: getLiveTestedSeats(),
      preflightProviderCallAllowed: preflight.providerCallAllowed,
      gateOk: gate.ok,
      queueOk: queued.ok,
      summary,
      evidence,
      checksum,
      secrets,
      authorization: { id: auth.id, status: auth.status },
      store: getLivePilotStoreSnapshot(),
    };
  } finally {
    __resetPilotModelVerificationForTests();
    for (const [k, v] of Object.entries(prev)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
    if (opts.resetStore !== false) {
      // leave store for caller inspection when resetStore=false
    }
  }
}

/**
 * Read-only Admin report — re-exported from admin-report (no fake client import).
 */
// buildDryRunRehearsalAdminReport imported/exported above

export function rehearsalSwitchOffAndRollback() {
  assertFakeProviderAllowedInCurrentRuntime();
  const before = {
    global: process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED],
    pilot: process.env[ENV_LIVE_AGENT_PILOT_ENABLED],
  };
  delete process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED];
  delete process.env[ENV_LIVE_AGENT_PILOT_ENABLED];
  setKillSwitch(true, { actor: "rehearsal", reason: "switch-off rehearsal" });
  const preflight = buildProviderActivationPreflight({ schedulerHealthy: true });
  const queued = countQueuedPilotTasks();
  return {
    ok:
      preflight.executionSwitchEnabled === false &&
      preflight.pilotSwitchEnabled === false &&
      preflight.providerCallAllowed === false,
    killSwitchActive: true,
    queuedRetained: queued,
    evidenceRetained: getLivePilotStoreSnapshot().evidence.length,
    founderProofUnchanged: true,
    restoredHint: before,
  };
}
