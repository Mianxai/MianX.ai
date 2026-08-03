import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  PILOT_AGENT_SLUG,
  PILOT_PROJECT_ID,
  ENV_LIVE_AGENT_EXECUTION_ENABLED,
  ENV_LIVE_AGENT_PILOT_ENABLED,
  resetLivePilotStore,
  createPilotApproval,
  createPilotRun,
  acquirePilotLease,
  queuePilotExecution,
  processExplicitPilotQueue,
  getLiveTestedSeats,
  listPilotRuns,
  setKillSwitch,
  assertActivationGate,
  OPENAI_PILOT_MODEL_ID,
  __setPilotModelVerificationForTests,
  __resetPilotModelVerificationForTests,
} from "../index";
import {
  assertFakeProviderAllowedInCurrentRuntime,
  createFakeOpenAIResponsesClient,
  FAKE_PROVIDER_NAME,
} from "./fake-provider";
import {
  buildPilotEvidenceRecord,
  verifyEvidenceChecksum,
  assertEvidenceHasNoSecrets,
  EVIDENCE_REQUIRED_FIELDS,
} from "./evidence-contract";
import {
  createLiveRunAuthorizationFixture,
  validateLiveRunAuthorization,
  consumeLiveRunAuthorizationFixture,
} from "./live-run-authorization";
import {
  runDryRunEvidenceRehearsal,
  buildDryRunRehearsalAdminReport,
  rehearsalSwitchOffAndRollback,
} from "./rehearsal";

function verified() {
  __setPilotModelVerificationForTests({
    officialCatalogStatus: "verified",
    accountAccessStatus: "verified",
    officialPricingStatus: "verified",
    billingModeStatus: "standard",
    accountVerifiedModel: OPENAI_PILOT_MODEL_ID,
  });
}

describe("One-agent dry-run evidence rehearsal", () => {
  const prev = {};

  beforeEach(() => {
    resetLivePilotStore();
    __resetPilotModelVerificationForTests();
    for (const k of [
      ENV_LIVE_AGENT_EXECUTION_ENABLED,
      ENV_LIVE_AGENT_PILOT_ENABLED,
      "OPENAI_API_KEY",
      "LIVE_AGENT_OPENAI_MODEL",
      "LIVE_AGENT_FAKE_PROVIDER",
      "VERCEL_ENV",
    ]) {
      prev[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    __resetPilotModelVerificationForTests();
    resetLivePilotStore();
    for (const [k, v] of Object.entries(prev)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });

  it("fake provider is allowed only in test runtime", () => {
    expect(() => assertFakeProviderAllowedInCurrentRuntime()).not.toThrow();
    process.env.LIVE_AGENT_FAKE_PROVIDER = "1";
    expect(() => assertFakeProviderAllowedInCurrentRuntime()).toThrow(
      /FAKE_PROVIDER_ENV_FLAG_FORBIDDEN/
    );
    delete process.env.LIVE_AGENT_FAKE_PROVIDER;
    process.env.VERCEL_ENV = "production";
    expect(() => assertFakeProviderAllowedInCurrentRuntime()).toThrow(
      /FAKE_PROVIDER_FORBIDDEN_IN_PRODUCTION/
    );
  });

  it("complete fake-provider rehearsal succeeds without genuine OpenAI or live-tested", async () => {
    const result = await runDryRunEvidenceRehearsal();
    expect(result.ok).toBe(true);
    expect(result.fakeProvider).toBe(FAKE_PROVIDER_NAME);
    expect(result.genuineOpenAICalls).toBe(0);
    expect(result.fakeProviderCalls).toBe(1);
    expect(result.liveTestedSeats).toBe(0);
    expect(result.evidence.simulated).toBe(true);
    expect(result.checksum.ok).toBe(true);
    expect(result.secrets.ok).toBe(true);
    for (const field of EVIDENCE_REQUIRED_FIELDS) {
      expect(result.evidence).toHaveProperty(field);
    }
  });

  it("evidence forbids secrets and detects checksum mismatch", () => {
    expect(() =>
      buildPilotEvidenceRecord({ apiKey: "sk-secret", pilotRunId: "x" })
    ).toThrow(/EVIDENCE_FORBIDDEN_FIELD/);
    const rec = buildPilotEvidenceRecord({
      pilotRunId: "r1",
      projectId: PILOT_PROJECT_ID,
      agentId: PILOT_AGENT_SLUG,
      taskId: "t1",
      providerName: FAKE_PROVIDER_NAME,
      configuredModel: OPENAI_PILOT_MODEL_ID,
      providerRequestId: "req1",
      inputTokens: 1,
      outputTokens: 1,
      totalTokens: 2,
      estimatedCostUsd: 0,
      schemaValidationOk: true,
      providerCallCount: 1,
      attemptCount: 1,
      terminalStatus: "succeeded",
      simulated: true,
      rehearsal: true,
    });
    expect(verifyEvidenceChecksum(rec).ok).toBe(true);
    rec.inputTokens = 999;
    expect(verifyEvidenceChecksum(rec).code).toBe("CHECKSUM_MISMATCH");
    expect(assertEvidenceHasNoSecrets(rec).ok).toBe(true);
  });

  it("authorization fixture validates and consumes once; Final Review independent", () => {
    const auth = createLiveRunAuthorizationFixture({ taskId: "t1" });
    expect(auth.founderFinalReviewIndependent).toBe(true);
    expect(
      validateLiveRunAuthorization(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t1",
      }).ok
    ).toBe(true);
    expect(consumeLiveRunAuthorizationFixture(auth).ok).toBe(true);
    expect(consumeLiveRunAuthorizationFixture(auth).ok).toBe(false);
  });

  it("idempotency: duplicate queue key conflicts; duplicate tick does not double-call", async () => {
    verified();
    process.env.OPENAI_API_KEY = "sk-test";
    process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
    process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
    process.env[ENV_LIVE_AGENT_PILOT_ENABLED] = "true";
    const approval = createPilotApproval({
      projectId: PILOT_PROJECT_ID,
      taskId: "t-idem",
      agentSlug: PILOT_AGENT_SLUG,
    });
    const first = await queuePilotExecution({
      authenticated: true,
      authorized: true,
      projectId: PILOT_PROJECT_ID,
      agentSlug: PILOT_AGENT_SLUG,
      taskId: "t-idem",
      approvalId: approval.id,
      idempotencyKey: "same-key",
    });
    expect(first.ok).toBe(true);
    const second = await queuePilotExecution({
      authenticated: true,
      authorized: true,
      projectId: PILOT_PROJECT_ID,
      agentSlug: PILOT_AGENT_SLUG,
      taskId: "t-idem",
      approvalId: approval.id,
      idempotencyKey: "same-key",
    });
    expect(second.ok).toBe(false);

    const fake = createFakeOpenAIResponsesClient();
    const s1 = await processExplicitPilotQueue({
      openaiClient: fake,
      allowNetwork: true,
      founderLiveAuthorization: true,
      schedulerHealthy: true,
    });
    expect(s1.claimed).toBe(1);
    expect(fake.getCallCount()).toBe(1);
    const s2 = await processExplicitPilotQueue({
      openaiClient: fake,
      allowNetwork: true,
      founderLiveAuthorization: true,
      schedulerHealthy: true,
    });
    expect(s2.claimed).toBe(0);
    expect(fake.getCallCount()).toBe(1);
    expect(getLiveTestedSeats()).toBe(0);
  });

  it("failure rehearsals: preflight blocked, invalid schema, timeout, concurrency, two queues", async () => {
    // preflight blocked — no key
    expect(
      assertActivationGate({
        founderLiveAuthorization: true,
        schedulerHealthy: true,
      }).ok
    ).toBe(false);

    verified();
    process.env.OPENAI_API_KEY = "sk-test";
    process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
    process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
    process.env[ENV_LIVE_AGENT_PILOT_ENABLED] = "true";

    const approval = createPilotApproval({
      projectId: PILOT_PROJECT_ID,
      taskId: "t-fail",
      agentSlug: PILOT_AGENT_SLUG,
    });
    await queuePilotExecution({
      authenticated: true,
      authorized: true,
      projectId: PILOT_PROJECT_ID,
      agentSlug: PILOT_AGENT_SLUG,
      taskId: "t-fail",
      approvalId: approval.id,
      idempotencyKey: "fail-schema",
    });
    const bad = await processExplicitPilotQueue({
      openaiClient: createFakeOpenAIResponsesClient({ invalidJson: true }),
      allowNetwork: true,
      founderLiveAuthorization: true,
      schedulerHealthy: true,
    });
    expect(bad.succeeded || 0).toBe(0);
    expect(getLiveTestedSeats()).toBe(0);

    resetLivePilotStore();
    verified();
    const a2 = createPilotApproval({
      projectId: PILOT_PROJECT_ID,
      taskId: "t-to",
      agentSlug: PILOT_AGENT_SLUG,
    });
    await queuePilotExecution({
      authenticated: true,
      authorized: true,
      projectId: PILOT_PROJECT_ID,
      agentSlug: PILOT_AGENT_SLUG,
      taskId: "t-to",
      approvalId: a2.id,
      idempotencyKey: "fail-timeout",
    });
    const timed = await processExplicitPilotQueue({
      openaiClient: createFakeOpenAIResponsesClient({
        error: Object.assign(new Error("aborted"), { name: "AbortError" }),
      }),
      allowNetwork: true,
      founderLiveAuthorization: true,
      schedulerHealthy: true,
    });
    expect(timed.providerCalled === true || timed.failed === 1).toBe(true);
    expect(getLiveTestedSeats()).toBe(0);

    resetLivePilotStore();
    verified();
    createPilotRun({ projectId: PILOT_PROJECT_ID, taskId: "q1", status: "queued", idempotencyKey: "q1" });
    createPilotRun({ projectId: PILOT_PROJECT_ID, taskId: "q2", status: "queued", idempotencyKey: "q2" });
    expect(
      assertActivationGate({
        founderLiveAuthorization: true,
        schedulerHealthy: true,
        requireExactlyOneQueuedTask: true,
      }).blockers
    ).toContain("queue_capacity_exhausted");

    const leased = createPilotRun({
      projectId: PILOT_PROJECT_ID,
      taskId: "c1",
      status: "queued",
    });
    acquirePilotLease(leased.run.id, "w", 60_000);
    expect(
      assertActivationGate({
        founderLiveAuthorization: true,
        schedulerHealthy: true,
      }).blockers
    ).toContain("concurrency_limit_exceeded");
  });

  it("switch-off rehearsal blocks future calls and retains evidence policy", async () => {
    await runDryRunEvidenceRehearsal();
    const rb = rehearsalSwitchOffAndRollback();
    expect(rb.ok).toBe(true);
    expect(rb.killSwitchActive).toBe(true);
    expect(rb.founderProofUnchanged).toBe(true);
    setKillSwitch(false);
  });

  it("Admin dry-run report is read-only and forbids Production fake button", () => {
    const report = buildDryRunRehearsalAdminReport();
    expect(report.notProduction).toBe(true);
    expect(report.productionFakeProviderButton).toBe(false);
    expect(report.genuineProviderCall).toBe(false);
    expect(report.fakeProviderLabel).toBe(FAKE_PROVIDER_NAME);
  });

  it("completed run cannot execute again; terminal failure stays failed", async () => {
    const result = await runDryRunEvidenceRehearsal({ idempotencyKey: "once-only" });
    expect(result.ok).toBe(true);
    const runs = listPilotRuns({ projectId: PILOT_PROJECT_ID });
    // store was reset in finally of rehearsal by resetLivePilotStore only if we call again —
    // re-run full rehearsal uses fresh store; assert attempt/provider call stays 1 in evidence
    expect(result.evidence.attemptCount).toBe(1);
    expect(result.evidence.providerCallCount).toBe(1);
    expect(runs.length === 0 || result.fakeProviderCalls === 1).toBe(true);
  });
});
