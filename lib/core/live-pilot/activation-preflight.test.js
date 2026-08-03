import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  PILOT_AGENT_SLUG,
  PILOT_PROJECT_ID,
  OPENAI_PILOT_MODEL_ID,
  ENV_LIVE_AGENT_EXECUTION_ENABLED,
  ENV_LIVE_AGENT_PILOT_ENABLED,
  resetLivePilotStore,
  createPilotApproval,
  createPilotRun,
  acquirePilotLease,
  buildProviderActivationPreflight,
  assertActivationGate,
  worstCasePreflightCost,
  calculateEstimatedCostUsd,
  getPilotModelVerification,
  __setPilotModelVerificationForTests,
  __resetPilotModelVerificationForTests,
  invokeOpenAIResponses,
  createMockOpenAIClient,
  processExplicitPilotQueue,
  queuePilotExecution,
  getLiveTestedSeats,
  evaluatePilotEligibility,
} from "./index";

function validOutput() {
  return {
    summary: "Read-only architecture review.",
    architectureFindings: ["Clear boundaries"],
    securityFindings: ["No tools"],
    reliabilityFindings: ["Lease required"],
    dataIsolationFindings: ["Project scoped"],
    operationalRisks: ["Provider config"],
    recommendations: ["Keep switches off until Founder run"],
    blockers: [],
    confidence: 0.8,
    requiresFounderDecision: true,
  };
}

describe("One-agent provider activation preflight", () => {
  const prev = {};

  beforeEach(() => {
    resetLivePilotStore();
    __resetPilotModelVerificationForTests();
    for (const k of [
      ENV_LIVE_AGENT_EXECUTION_ENABLED,
      ENV_LIVE_AGENT_PILOT_ENABLED,
      "OPENAI_API_KEY",
      "LIVE_AGENT_OPENAI_MODEL",
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

  it("default preflight: provider none, verification not checked/unverified, switches off", () => {
    const p = buildProviderActivationPreflight({ schedulerHealthy: true });
    expect(p.secretsIncluded).toBe(false);
    expect(p.providerConfigured).toBe(false);
    expect(p.providerName).toBe("none");
    expect(p.apiKeyConfigured).toBe("no");
    expect(p.modelAvailability).toBe("not_checked");
    expect(["not_checked", "unverified"]).toContain(p.pricingVerification);
    expect(p.executionSwitchEnabled).toBe(false);
    expect(p.pilotSwitchEnabled).toBe(false);
    expect(p.providerCallAllowed).toBe(false);
    expect(p.liveExecutionReady).toBe(false);
    expect(p.display.provider).toBe("Not configured");
    expect(p.display.apiKeyConfigured).toBe("No");
    expect(p.display.modelVerification).toBe("Not checked");
    expect(p.display.pricingVerification).toBe("Not checked");
    expect(p.display.executionSwitch).toBe("Off");
    expect(p.display.pilotSwitch).toBe("Off");
    expect(p.display.agentAllocated).toBe("No");
    expect(p.display.agentActive).toBe("No");
    expect(p.display.agentLiveTested).toBe("No");
    expect(p.display.providerCalls).toBe("0");
    expect(p.display.liveExecutionReady).toBe("No");
    expect(p.concurrencyLimitEquals1).toBe(true);
    expect(p.queuedTaskLimitEquals1).toBe(true);
    expect(p.attemptLimitEquals1).toBe(true);
    expect(p.inputLimitEquals4000).toBe(true);
    expect(p.outputLimitEquals1200).toBe(true);
    expect(p.totalTokenLimitEquals5200).toBe(true);
    expect(p.maximumCostEquals010).toBe(true);
    expect(p.providerTimeoutEquals60s).toBe(true);
    expect(p.wallTimeoutEquals90s).toBe(true);
    expect(JSON.stringify(p)).not.toMatch(/sk-/i);
  });

  it("unverified pricing fails closed — no trustworthy cost for provider call", () => {
    expect(getPilotModelVerification().pricingVerification).toBe("unverified");
    expect(worstCasePreflightCost(OPENAI_PILOT_MODEL_ID).ok).toBe(false);
    expect(worstCasePreflightCost(OPENAI_PILOT_MODEL_ID).code).toBe("PRICING_NOT_VERIFIED");
    expect(
      calculateEstimatedCostUsd({
        modelId: OPENAI_PILOT_MODEL_ID,
        inputTokens: 10,
        outputTokens: 10,
      }).ok
    ).toBe(false);
  });

  it("blocked cases never invoke fake provider (provider calls stay zero)", async () => {
    let fakeCalls = 0;
    const client = {
      responses: {
        create: async () => {
          fakeCalls += 1;
          throw new Error("should not be called");
        },
      },
    };

    const invokeBlockedCases = [
      { label: "no key" },
      {
        label: "no model",
        env: { OPENAI_API_KEY: "sk-test" },
      },
      {
        label: "model not checked",
        env: { OPENAI_API_KEY: "sk-test", LIVE_AGENT_OPENAI_MODEL: OPENAI_PILOT_MODEL_ID },
        verify: { modelAvailability: "not_checked", pricingVerification: "verified" },
      },
      {
        label: "pricing unverified",
        env: { OPENAI_API_KEY: "sk-test", LIVE_AGENT_OPENAI_MODEL: OPENAI_PILOT_MODEL_ID },
        verify: { modelAvailability: "verified", pricingVerification: "unverified" },
      },
      {
        label: "model mismatch",
        env: { OPENAI_API_KEY: "sk-test", LIVE_AGENT_OPENAI_MODEL: OPENAI_PILOT_MODEL_ID },
        verify: { modelAvailability: "mismatch", pricingVerification: "verified" },
      },
    ];

    for (const c of invokeBlockedCases) {
      fakeCalls = 0;
      resetLivePilotStore();
      __resetPilotModelVerificationForTests();
      delete process.env.OPENAI_API_KEY;
      delete process.env.LIVE_AGENT_OPENAI_MODEL;
      delete process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED];
      delete process.env[ENV_LIVE_AGENT_PILOT_ENABLED];
      Object.assign(process.env, c.env || {});
      if (c.verify) __setPilotModelVerificationForTests(c.verify);

      const gate = assertActivationGate({
        founderLiveAuthorization: true,
        schedulerHealthy: true,
        modelId: process.env.LIVE_AGENT_OPENAI_MODEL || null,
      });
      expect(gate.ok, c.label).toBe(false);
      expect(gate.providerCallCountIncrement).toBe(0);

      const invoke = await invokeOpenAIResponses({
        client,
        allowNetwork: true,
        modelId: OPENAI_PILOT_MODEL_ID,
        systemPrompt: "s",
        userPrompt: "u",
      });
      expect(invoke.ok, c.label).toBe(false);
      expect(fakeCalls, c.label).toBe(0);
      expect(invoke.result?.providerEvidenceMetadata?.networkCalled).not.toBe(true);
    }

    // Switch-off cases: activation gate blocks; invoke is not the switch enforcer.
    __setPilotModelVerificationForTests({
      modelAvailability: "verified",
      pricingVerification: "verified",
    });
    process.env.OPENAI_API_KEY = "sk-test";
    process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
    delete process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED];
    delete process.env[ENV_LIVE_AGENT_PILOT_ENABLED];
    expect(
      assertActivationGate({
        founderLiveAuthorization: true,
        schedulerHealthy: true,
      }).ok
    ).toBe(false);
    process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
    expect(
      assertActivationGate({
        founderLiveAuthorization: true,
        schedulerHealthy: true,
      }).blockers
    ).toContain("pilot_execution_disabled");
  });

  it("wrong agent / concurrent lease / missing founder auth block without provider call", () => {
    process.env.OPENAI_API_KEY = "sk-test";
    process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
    process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
    process.env[ENV_LIVE_AGENT_PILOT_ENABLED] = "true";
    __setPilotModelVerificationForTests({
      modelAvailability: "verified",
      pricingVerification: "verified",
    });

    expect(
      assertActivationGate({
        agentSlug: "wrong-agent",
        founderLiveAuthorization: true,
        schedulerHealthy: true,
      }).ok
    ).toBe(false);

    expect(
      assertActivationGate({
        founderLiveAuthorization: false,
        schedulerHealthy: true,
      }).blockers
    ).toContain("founder_live_run_authorization_missing");

    const created = createPilotRun({
      projectId: PILOT_PROJECT_ID,
      taskId: "t1",
      agentSlug: PILOT_AGENT_SLUG,
      status: "queued",
    });
    acquirePilotLease(created.run.id, "worker-a", 60_000);
    expect(
      assertActivationGate({
        founderLiveAuthorization: true,
        schedulerHealthy: true,
      }).blockers
    ).toContain("concurrency_limit_exceeded");
  });

  it("fake provider succeeds only when fully valid; liveTested stays 0 for mock", async () => {
    process.env.OPENAI_API_KEY = "sk-test";
    process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
    process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
    process.env[ENV_LIVE_AGENT_PILOT_ENABLED] = "true";
    __setPilotModelVerificationForTests({
      modelAvailability: "verified",
      pricingVerification: "verified",
    });

    const approval = createPilotApproval({
      projectId: PILOT_PROJECT_ID,
      taskId: "t-fake",
      agentSlug: PILOT_AGENT_SLUG,
    });
    const queued = await queuePilotExecution({
      authenticated: true,
      authorized: true,
      projectId: PILOT_PROJECT_ID,
      agentSlug: PILOT_AGENT_SLUG,
      taskId: "t-fake",
      approvalId: approval.id,
      idempotencyKey: "fake-ok-1",
      taskTitle: "fake",
      taskBody: "body",
    });
    expect(queued.ok).toBe(true);

    let fakeCalls = 0;
    const client = createMockOpenAIClient({
      response: {
        id: "resp_fake_ok",
        status: "completed",
        model: OPENAI_PILOT_MODEL_ID,
        output_text: JSON.stringify(validOutput()),
        usage: { input_tokens: 100, output_tokens: 50, total_tokens: 150 },
      },
    });
    const origCreate = client.responses.create.bind(client.responses);
    client.responses.create = async (...args) => {
      fakeCalls += 1;
      return origCreate(...args);
    };

    const summary = await processExplicitPilotQueue({
      openaiClient: client,
      allowNetwork: true,
      founderLiveAuthorization: true,
      schedulerHealthy: true,
    });
    expect(fakeCalls).toBe(1);
    expect(summary.providerCalled).toBe(true);
    // Mock/simulated evidence must not promote Production live-tested claims
    expect(getLiveTestedSeats()).toBe(0);
  });

  it("eligibility reports pricing/model blockers without converting missing to zero readiness", () => {
    process.env.OPENAI_API_KEY = "sk-test";
    process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
    const elig = evaluatePilotEligibility({
      authenticated: true,
      authorized: true,
      projectId: PILOT_PROJECT_ID,
      agentSlug: PILOT_AGENT_SLUG,
      taskId: "t1",
    });
    expect(elig.liveExecutionReady).toBe(false);
    expect(elig.blockers).toEqual(
      expect.arrayContaining([
        "model_availability_not_verified",
        "model_pricing_not_verified",
        "global_live_execution_disabled",
        "pilot_execution_disabled",
      ])
    );
  });
});
