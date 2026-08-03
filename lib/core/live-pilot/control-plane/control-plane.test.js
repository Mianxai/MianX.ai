import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  PILOT_PROJECT_ID,
  PILOT_AGENT_SLUG,
  ENV_LIVE_AGENT_EXECUTION_ENABLED,
  ENV_LIVE_AGENT_PILOT_ENABLED,
  resetLivePilotStore,
  createPilotRun,
  OPENAI_PILOT_MODEL_ID,
  OPENAI_PILOT_MODEL_SNAPSHOT,
  __setPilotModelVerificationForTests,
  __resetPilotModelVerificationForTests,
} from "../index";
import { setKillSwitch, isKillSwitchActive } from "../store";
import { createFakeOpenAIResponsesClient as createFake } from "../dry-run/fake-provider";
import {
  resetLiveRunAuthorizationFixtures,
  createLiveRunAuthorizationRecord,
  authorizeLiveRunAuthorization,
  revokeLiveRunAuthorization,
  consumeLiveRunAuthorizationAtomically,
  validateLiveRunAuthorizationMatch,
  taskEnvelopeHash,
  computeAuthorizationIntegrity,
  authorizationCrashRecoveryProcedure,
} from "./authorization";
import {
  getApiKeyPresenceStatus,
  assertKeyPresencePrivacy,
} from "./key-presence";
import {
  resetModelAccessVerificationFixtures,
  getAccountAccessStatus,
  verifyAccountModelAccess,
} from "./model-access-verification";
import {
  resetExecutionLockFixtures,
  evaluateLiveRunExecutionLock,
  acquireLiveRunProviderAttempt,
} from "./execution-lock";
import {
  evaluatePostRunLockout,
  armKillSwitchForControlPlane,
  assertFutureProviderCallsBlocked,
  manualSwitchOffProcedure,
} from "./post-run-lockout";
import { buildLiveRunControlPlaneAdminReport } from "./admin-report";

function verifiedBilling() {
  __setPilotModelVerificationForTests({
    officialCatalogStatus: "verified",
    accountAccessStatus: "not_checked",
    officialPricingStatus: "verified",
    billingModeStatus: "standard",
    accountVerifiedModel: OPENAI_PILOT_MODEL_ID,
  });
}

describe("One-agent live-run control plane", () => {
  const prev = {};

  beforeEach(() => {
    resetLivePilotStore();
    resetLiveRunAuthorizationFixtures();
    resetModelAccessVerificationFixtures();
    resetExecutionLockFixtures();
    __resetPilotModelVerificationForTests();
    setKillSwitch(false);
    for (const k of [
      ENV_LIVE_AGENT_EXECUTION_ENABLED,
      ENV_LIVE_AGENT_PILOT_ENABLED,
      "OPENAI_API_KEY",
      "LIVE_AGENT_OPENAI_MODEL",
      "VERCEL_ENV",
    ]) {
      prev[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    __resetPilotModelVerificationForTests();
    resetLivePilotStore();
    resetLiveRunAuthorizationFixtures();
    setKillSwitch(false);
    for (const [k, v] of Object.entries(prev)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });

  it("key presence returns boolean only and never leaks secrets", () => {
    expect(getApiKeyPresenceStatus()).toEqual({
      apiKeyConfigured: false,
      providerName: "none",
      calledOpenAI: false,
    });
    process.env.OPENAI_API_KEY = "sk-test-not-real-key-value";
    const presence = getApiKeyPresenceStatus();
    expect(presence.apiKeyConfigured).toBe(true);
    expect(presence.providerName).toBe("openai");
    expect(assertKeyPresencePrivacy(presence).ok).toBe(true);
    expect(assertKeyPresencePrivacy({ apiKey: "sk-leak" }).ok).toBe(false);
  });

  it("account access defaults to not_checked with zero Models API calls", () => {
    expect(getAccountAccessStatus().accountAccessStatus).toBe("not_checked");
    expect(getAccountAccessStatus().authenticatedModelsApiCalls).toBe(0);
  });

  it("authorization state machine: draft/authorized/expired/revoked/consumed", () => {
    const draft = createLiveRunAuthorizationRecord({
      status: "draft",
      taskId: "t1",
    });
    expect(
      validateLiveRunAuthorizationMatch(draft, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t1",
      }).missing
    ).toContain("draft_cannot_authorize");

    expect(authorizeLiveRunAuthorization(draft.authorizationId).ok).toBe(true);
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "t2",
    });
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t2",
      }).ok
    ).toBe(true);

    const expired = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "t3",
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });
    expect(
      validateLiveRunAuthorizationMatch(expired, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t3",
      }).missing
    ).toContain("expired");

    const rev = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "t4",
    });
    revokeLiveRunAuthorization(rev.authorizationId);
    expect(
      validateLiveRunAuthorizationMatch(rev, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t4",
      }).missing
    ).toContain("revoked");

    const once = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "t5",
    });
    expect(consumeLiveRunAuthorizationAtomically(once.authorizationId).ok).toBe(true);
    expect(consumeLiveRunAuthorizationAtomically(once.authorizationId).ok).toBe(false);
  });

  it("authorization mismatch matrix blocks", () => {
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "tm",
    });
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: "00000000-0000-4000-8000-000000000099",
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "tm",
      }).missing
    ).toContain("project_mismatch");
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: "wrong",
        taskId: "tm",
      }).missing
    ).toContain("agent_mismatch");
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "other",
      }).missing
    ).toContain("task_mismatch");
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "tm",
        providerName: "anthropic",
      }).missing
    ).toContain("provider_mismatch");
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "tm",
        model: "not-model",
      }).missing
    ).toContain("model_mismatch");
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "tm",
        snapshot: "wrong-snap",
      }).missing
    ).toContain("snapshot_mismatch");
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "tm",
        maximumInputTokens: 1,
      }).missing
    ).toContain("input_limit_mismatch");
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "tm",
        estimatedCostMicrousd: 999_999_999,
      }).missing
    ).toContain("cost_mismatch");

    auth.integrityChecksum = "deadbeef";
    expect(
      validateLiveRunAuthorizationMatch(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "tm",
      }).missing
    ).toContain("checksum_mismatch");
    expect(computeAuthorizationIntegrity(auth)).not.toBe("deadbeef");
    expect(taskEnvelopeHash("tm")).toHaveLength(64);
  });

  it("model-access verification disabled by default; mock path consumes once", async () => {
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "mav",
    });
    process.env.OPENAI_API_KEY = "sk-test";
    const disabled = await verifyAccountModelAccess({
      authorizationId: auth.authorizationId,
    });
    expect(disabled.accountAccessStatus).toBe("not_checked");
    expect(disabled.authenticatedModelsApiCalls).toBe(0);

    const mocked = await verifyAccountModelAccess({
      authorizationId: auth.authorizationId,
      enabled: true,
      fetchModels: async () => ({
        models: [OPENAI_PILOT_MODEL_ID, OPENAI_PILOT_MODEL_SNAPSHOT],
        providerRequestId: "req_mock_1",
      }),
      idempotencyKey: "mav-1",
    });
    expect(mocked.result).toBe("verified");
    expect(mocked.authenticatedModelsApiCalls).toBe(1);
    expect(auth.status).toBe("consumed");

    const dup = await verifyAccountModelAccess({
      authorizationId: auth.authorizationId,
      enabled: true,
      fetchModels: async () => ({ models: [OPENAI_PILOT_MODEL_ID] }),
      idempotencyKey: "mav-1",
    });
    expect(dup.duplicate).toBe(true);
    expect(dup.authenticatedModelsApiCalls).toBe(0);
  });

  it("execution lock blocks absent key, provider none, switches, queue, concurrent, scheduler", () => {
    verifiedBilling();
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "lock",
    });
    createPilotRun({
      projectId: PILOT_PROJECT_ID,
      taskId: "lock",
      status: "queued",
      idempotencyKey: "lock-q",
    });

    const blocked = evaluateLiveRunExecutionLock({
      authorizationId: auth.authorizationId,
      taskId: "lock",
      accountAccessStatus: "verified",
      schedulerHealthy: true,
    });
    expect(blocked.ok).toBe(false);
    expect(blocked.blockers).toEqual(
      expect.arrayContaining(["api_key_absent", "provider_none", "execution_switch_off"])
    );

    process.env.OPENAI_API_KEY = "sk-test";
    process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
    process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
    process.env[ENV_LIVE_AGENT_PILOT_ENABLED] = "true";

    const zeroQ = evaluateLiveRunExecutionLock({
      authorizationId: auth.authorizationId,
      taskId: "lock",
      accountAccessStatus: "verified",
      queuedCount: 0,
      schedulerHealthy: true,
    });
    expect(zeroQ.blockers).toContain("zero_queued_tasks");

    const twoQ = evaluateLiveRunExecutionLock({
      authorizationId: auth.authorizationId,
      taskId: "lock",
      accountAccessStatus: "verified",
      queuedCount: 2,
      schedulerHealthy: true,
    });
    expect(twoQ.blockers).toContain("two_queued_tasks");

    const concurrent = evaluateLiveRunExecutionLock({
      authorizationId: auth.authorizationId,
      taskId: "lock",
      accountAccessStatus: "verified",
      queuedCount: 1,
      concurrentRuns: 1,
      schedulerHealthy: true,
    });
    expect(concurrent.blockers).toContain("concurrent_run");

    const sched = evaluateLiveRunExecutionLock({
      authorizationId: auth.authorizationId,
      taskId: "lock",
      accountAccessStatus: "verified",
      queuedCount: 1,
      concurrentRuns: 0,
      schedulerHealthy: false,
    });
    expect(sched.blockers).toContain("scheduler_unhealthy");

    const evid = evaluateLiveRunExecutionLock({
      authorizationId: auth.authorizationId,
      taskId: "lock",
      accountAccessStatus: "verified",
      queuedCount: 1,
      concurrentRuns: 0,
      schedulerHealthy: true,
      evidenceStoreAvailable: false,
    });
    expect(evid.blockers).toContain("evidence_store_unavailable");
  });

  it("fully valid fixture may acquire attempt once; crash recovery blocks second call", async () => {
    verifiedBilling();
    process.env.OPENAI_API_KEY = "sk-test";
    process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
    process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
    process.env[ENV_LIVE_AGENT_PILOT_ENABLED] = "true";
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "ok",
    });
    createPilotRun({
      projectId: PILOT_PROJECT_ID,
      taskId: "ok",
      status: "queued",
      idempotencyKey: "ok-q",
    });

    const lock = evaluateLiveRunExecutionLock({
      authorizationId: auth.authorizationId,
      taskId: "ok",
      accountAccessStatus: "verified",
      queuedCount: 1,
      concurrentRuns: 0,
      schedulerHealthy: true,
    });
    expect(lock.ok).toBe(true);

    const first = acquireLiveRunProviderAttempt({
      authorizationId: auth.authorizationId,
      taskId: "ok",
      accountAccessStatus: "verified",
      queuedCount: 1,
      concurrentRuns: 0,
      schedulerHealthy: true,
      idempotencyKey: "attempt-1",
    });
    expect(first.ok).toBe(true);
    expect(first.authorizationConsumed).toBe(true);
    expect(first.genuineOpenAICalls).toBe(0);

    const second = acquireLiveRunProviderAttempt({
      authorizationId: auth.authorizationId,
      taskId: "ok",
      accountAccessStatus: "verified",
      queuedCount: 1,
      concurrentRuns: 0,
      schedulerHealthy: true,
      idempotencyKey: "attempt-1",
    });
    expect(second.ok).toBe(false);

    const recovery = authorizationCrashRecoveryProcedure();
    expect(recovery.secondProviderCallAllowed).toBe(false);

    // Fake provider rehearsal may run once under Vitest after lock — still not live-tested
    const fake = createFake();
    await fake.responses.create({ model: OPENAI_PILOT_MODEL_ID });
    expect(fake.getCallCount()).toBe(1);
    expect(fake.providerName).toContain("fake");
  });

  it("failed fake-provider rehearsal and post-run lockout", async () => {
    verifiedBilling();
    process.env.OPENAI_API_KEY = "sk-test";
    process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
    process.env[ENV_LIVE_AGENT_PILOT_ENABLED] = "true";
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "fail",
    });
    const attempt = acquireLiveRunProviderAttempt({
      authorizationId: auth.authorizationId,
      taskId: "fail",
      accountAccessStatus: "verified",
      queuedCount: 1,
      concurrentRuns: 0,
      schedulerHealthy: true,
      idempotencyKey: "fail-1",
    });
    expect(attempt.ok).toBe(true);

    const fake = createFake({
      error: Object.assign(new Error("aborted"), { name: "AbortError" }),
    });
    await expect(fake.responses.create({ model: OPENAI_PILOT_MODEL_ID })).rejects.toThrow();
    expect(fake.getCallCount()).toBe(1);

    const post = evaluatePostRunLockout({ authorizationId: auth.authorizationId });
    expect(post.anotherCallAllowed).toBe(false);
    expect(assertFutureProviderCallsBlocked(auth.authorizationId).ok).toBe(true);

    armKillSwitchForControlPlane();
    expect(isKillSwitchActive()).toBe(true);
    expect(manualSwitchOffProcedure().applicationCannotMutateVercelEnv).toBe(true);
  });

  it("Admin control-plane report is preparation-only without Run now or secrets", () => {
    const report = buildLiveRunControlPlaneAdminReport({ schedulerHealthy: true });
    expect(report.runNowActionPresent).toBe(false);
    expect(report.secretInputPresent).toBe(false);
    expect(report.apiKeyFieldPresent).toBe(false);
    expect(report.productionAuthorizationCreated).toBe(false);
    expect(report.migrationApplied).toBe(false);
    expect(report.productionDatabaseChanged).toBe(false);
    expect(report.storageDecision).toBe("B");
    expect(report.accountAccessStatus).toBe("not_checked");
    expect(report.apiKeyConfigured).toBe(false);
    expect(report.providerName).toBe("none");
    expect(report.providerCallAllowed).toBe(false);
    expect(report.liveExecutionReady).toBe(false);
    expect(report.authenticatedModelsApiCalls).toBe(0);
    expect(report.genuineGenerationCalls).toBe(0);
    expect(report.founderFinalReviewChanged).toBe(false);
  });
});
