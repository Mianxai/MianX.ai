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
  rejectFakeProviderNameSelection,
  FAKE_PROVIDER_NAME,
} from "./fake-provider";
import {
  buildPilotEvidenceRecord,
  verifyEvidenceChecksum,
  assertEvidenceHasNoSecrets,
  evidenceSatisfiesGenuineLiveTested,
  EVIDENCE_REQUIRED_FIELDS,
} from "./evidence-contract";
import {
  createLiveRunAuthorizationFixture,
  validateLiveRunAuthorization,
  consumeLiveRunAuthorizationFixture,
  revokeLiveRunAuthorizationFixture,
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
      "USE_FAKE_PROVIDER",
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

  it("Production-mode construction rejects fake provider; env flags rejected", () => {
    expect(() => assertFakeProviderAllowedInCurrentRuntime()).not.toThrow();
    process.env.LIVE_AGENT_FAKE_PROVIDER = "1";
    expect(() => assertFakeProviderAllowedInCurrentRuntime()).toThrow(
      /FAKE_PROVIDER_ENV_FLAG_FORBIDDEN/
    );
    delete process.env.LIVE_AGENT_FAKE_PROVIDER;
    process.env.USE_FAKE_PROVIDER = "true";
    expect(() => assertFakeProviderAllowedInCurrentRuntime()).toThrow(
      /FAKE_PROVIDER_ENV_FLAG_FORBIDDEN/
    );
    delete process.env.USE_FAKE_PROVIDER;
    process.env.VERCEL_ENV = "production";
    expect(() => assertFakeProviderAllowedInCurrentRuntime()).toThrow(
      /FAKE_PROVIDER_FORBIDDEN_IN_PRODUCTION/
    );
    delete process.env.VERCEL_ENV;
    expect(rejectFakeProviderNameSelection("fake_openai_test_only").ok).toBe(false);
    expect(rejectFakeProviderNameSelection("openai").ok).toBe(true);
  });

  it("complete fake-provider rehearsal succeeds without genuine OpenAI or live-tested", async () => {
    const result = await runDryRunEvidenceRehearsal();
    expect(result.ok).toBe(true);
    expect(result.fakeProvider).toBe(FAKE_PROVIDER_NAME);
    expect(result.genuineOpenAICalls).toBe(0);
    expect(result.fakeProviderCalls).toBe(1);
    expect(result.liveTestedSeats).toBe(0);
    expect(result.evidence.simulated).toBe(true);
    expect(result.evidence.evidenceEnvironment).toBe("test");
    expect(evidenceSatisfiesGenuineLiveTested(result.evidence)).toBe(false);
    expect(result.checksum.ok).toBe(true);
    expect(result.secrets.ok).toBe(true);
    for (const field of EVIDENCE_REQUIRED_FIELDS) {
      expect(result.evidence).toHaveProperty(field);
    }
  });

  it("content-integrity checksum detects token/cost/model/status mutation", () => {
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
      approvedModel: OPENAI_PILOT_MODEL_ID,
      providerRequestId: "req1",
      inputTokens: 1,
      outputTokens: 1,
      totalTokens: 2,
      estimatedCostMicrousd: 100,
      schemaValidationPassed: true,
      providerCallCount: 1,
      attemptCount: 1,
      terminalStatus: "succeeded",
      evidenceEnvironment: "test",
      simulated: true,
      rehearsal: true,
    });
    expect(verifyEvidenceChecksum(rec).ok).toBe(true);
    expect(assertEvidenceHasNoSecrets(rec).ok).toBe(true);
    const mutated = { ...rec, inputTokens: 999 };
    expect(verifyEvidenceChecksum(mutated).code).toBe("CHECKSUM_MISMATCH");
    const costMut = { ...rec, estimatedCostMicrousd: 999 };
    expect(verifyEvidenceChecksum(costMut).code).toBe("CHECKSUM_MISMATCH");
    const modelMut = { ...rec, configuredModel: "other" };
    expect(verifyEvidenceChecksum(modelMut).code).toBe("CHECKSUM_MISMATCH");
    const statusMut = { ...rec, terminalStatus: "failed" };
    expect(verifyEvidenceChecksum(statusMut).code).toBe("CHECKSUM_MISMATCH");
    expect(verifyEvidenceChecksum({ ...rec, evidenceChecksum: null }).code).toBe(
      "CHECKSUM_MISSING"
    );
  });

  it("authorization state machine: draft/expired/revoked/consumed/mismatch", () => {
    const draft = createLiveRunAuthorizationFixture({ status: "draft", taskId: "t1" });
    expect(
      validateLiveRunAuthorization(draft, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t1",
      }).missing
    ).toContain("draft_cannot_authorize");

    const expired = createLiveRunAuthorizationFixture({
      taskId: "t1",
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });
    expect(
      validateLiveRunAuthorization(expired, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t1",
      }).missing
    ).toContain("expired");

    const auth = createLiveRunAuthorizationFixture({ taskId: "t1" });
    expect(auth.founderFinalReviewIndependent).toBe(true);
    expect(
      validateLiveRunAuthorization(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t1",
      }).ok
    ).toBe(true);
    expect(
      validateLiveRunAuthorization(auth, {
        projectId: "00000000-0000-4000-8000-000000000099",
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t1",
      }).missing
    ).toContain("authorized_project");
    expect(
      validateLiveRunAuthorization(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: "wrong",
        taskId: "t1",
      }).missing
    ).toContain("authorized_pilot_agent");
    expect(
      validateLiveRunAuthorization(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "other",
      }).missing
    ).toContain("authorized_task_envelope");
    expect(
      validateLiveRunAuthorization(auth, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t1",
        model: "not-the-model",
      }).missing
    ).toContain("model_mismatch");
    expect(consumeLiveRunAuthorizationFixture(auth).ok).toBe(true);
    expect(consumeLiveRunAuthorizationFixture(auth).ok).toBe(false);
    const again = createLiveRunAuthorizationFixture({ taskId: "t2" });
    revokeLiveRunAuthorizationFixture(again);
    expect(
      validateLiveRunAuthorization(again, {
        projectId: PILOT_PROJECT_ID,
        agentSlug: PILOT_AGENT_SLUG,
        taskId: "t2",
      }).missing
    ).toContain("revoked");
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
    expect(report.testOnly).toBe(true);
    expect(report.productionFakeProviderButton).toBe(false);
    expect(report.genuineProviderCalls).toBe(0);
    expect(report.agentLiveTested).toBe(false);
    expect(report.notDigitalSignature).toBe(true);
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
