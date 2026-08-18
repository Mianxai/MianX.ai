import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  PILOT_AGENT_SLUG,
  PILOT_PROJECT_ID,
  OPENAI_PILOT_MODEL_ID,
  OPENAI_PILOT_MODEL_SNAPSHOT,
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
  officialStandardWorstCaseCost,
  OFFICIAL_STANDARD_WORST_CASE_MICRO_USD,
  getPilotModelVerification,
  __setPilotModelVerificationForTests,
  __resetPilotModelVerificationForTests,
  invokeOpenAIResponses,
  createMockOpenAIClient,
  processExplicitPilotQueue,
  queuePilotExecution,
  getLiveTestedSeats,
  evaluatePilotEligibility,
  buildOpenAIResponsesRequest,
  assertSafeOpenAIRequest,
  isModelAvailabilityVerifiedForProviderCall,
  isPricingVerifiedForProviderCall,
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

function fullyVerifiedOverride(extra = {}) {
  return {
    officialCatalogStatus: "verified",
    accountAccessStatus: "verified",
    officialPricingStatus: "verified",
    billingModeStatus: "standard",
    accountVerifiedModel: OPENAI_PILOT_MODEL_SNAPSHOT,
    modelId: OPENAI_PILOT_MODEL_SNAPSHOT,
    ...extra,
  };
}

describe("One-agent provider activation preflight (corrected dimensions)", () => {
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

  it("default dimensions: catalog+pricing verified; account+billing not ready", () => {
    const v = getPilotModelVerification(OPENAI_PILOT_MODEL_ID);
    expect(v.officialCatalogStatus).toBe("verified");
    expect(v.accountAccessStatus).toBe("not_checked");
    expect(v.officialPricingStatus).toBe("verified");
    expect(v.billingModeStatus).toBe("unknown");
    expect(v.modelReadyForProviderCall).toBe(false);
    expect(v.pricingReadyForProviderCall).toBe(false);
    expect(v.approvedSnapshot).toBe(OPENAI_PILOT_MODEL_SNAPSHOT);
    expect(v.accountVerifiedModel).toBeNull();
    expect(v.responseStorageEnabled).toBe(false);
    expect(v.zeroDataRetentionVerified).toBe(false);

    const p = buildProviderActivationPreflight({ schedulerHealthy: true });
    expect(p.display.provider).toBe("Not configured");
    expect(p.display.apiKeyConfigured).toBe("No");
    expect(p.display.officialCatalog).toBe("Verified");
    expect(p.display.accountModelAccess).toBe("Not checked");
    expect(p.display.officialPricing).toBe("Verified");
    expect(p.display.billingPath).toBe("Not checked");
    expect(p.display.responseStorage).toBe("Disabled");
    expect(p.display.zeroDataRetention).toBe("Not verified");
    expect(p.display.executionSwitch).toBe("Off");
    expect(p.display.pilotSwitch).toBe("Off");
    expect(p.display.providerCallAllowed).toBe("No");
    expect(p.display.liveExecutionReady).toBe("No");
    expect(p.display.providerCalls).toBe("0");
    expect(p.display.allocated).toBe("0");
    expect(p.display.active).toBe("0");
    expect(p.display.liveTested).toBe("0");
    expect(p.providerCallAllowed).toBe(false);
    expect(p.officialStandardWorstCaseMicroUsd).toBe(
      OFFICIAL_STANDARD_WORST_CASE_MICRO_USD
    );
    expect(JSON.stringify(p)).not.toMatch(/sk-/i);
  });

  it("integer-safe official standard cost is exactly 8400 microdollars", () => {
    const std = officialStandardWorstCaseCost(OPENAI_PILOT_MODEL_ID);
    expect(std.ok).toBe(true);
    expect(std.estimatedCostMicroUsd).toBe(8400);
    expect(std.estimatedCostUsd).toBe(0.0084);
    // provider-call path remains blocked without billing verification
    expect(worstCasePreflightCost(OPENAI_PILOT_MODEL_ID).ok).toBe(false);
  });

  it("Responses request shape: store false, empty tools, json_schema", () => {
    const req = buildOpenAIResponsesRequest({
      modelId: OPENAI_PILOT_MODEL_ID,
      systemPrompt: "sys",
      userPrompt: "user",
    });
    expect(req.store).toBe(false);
    expect(req.tools).toEqual([]);
    expect(req.stream).toBe(false);
    expect(req.text.format.type).toBe("json_schema");
    expect(req.text.format.strict).toBe(true);
    expect(assertSafeOpenAIRequest(req).ok).toBe(true);
  });

  it("alias vs snapshot mismatch fails selected model readiness", () => {
    __setPilotModelVerificationForTests({
      officialCatalogStatus: "verified",
      accountAccessStatus: "verified",
      officialPricingStatus: "verified",
      billingModeStatus: "standard",
      accountVerifiedModel: OPENAI_PILOT_MODEL_SNAPSHOT,
      modelId: "totally-other-model",
    });
    process.env.LIVE_AGENT_OPENAI_MODEL = "totally-other-model";
    const v = getPilotModelVerification("totally-other-model");
    expect(v.selectedModelStatus).toBe("mismatch");
    expect(v.modelReadyForProviderCall).toBe(false);
  });

  describe("activation gate truth table", () => {
    function baseEnv() {
      process.env.OPENAI_API_KEY = "sk-test";
      process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
      process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED] = "true";
      process.env[ENV_LIVE_AGENT_PILOT_ENABLED] = "true";
      __setPilotModelVerificationForTests(fullyVerifiedOverride());
    }

    const cases = [
      {
        label: "no key",
        setup: () => {},
        expectBlocker: "provider_not_configured",
      },
      {
        label: "provider none",
        setup: () => {
          process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
        },
        expectBlocker: "provider_not_configured",
      },
      {
        label: "no model",
        setup: () => {
          process.env.OPENAI_API_KEY = "sk-test";
        },
        expectBlocker: "model_not_allowlisted",
      },
      {
        label: "official catalog not checked",
        setup: () => {
          baseEnv();
          __setPilotModelVerificationForTests(
            fullyVerifiedOverride({ officialCatalogStatus: "not_checked" })
          );
        },
        expectBlocker: "official_catalog_not_verified",
      },
      {
        label: "official catalog mismatch",
        setup: () => {
          baseEnv();
          __setPilotModelVerificationForTests(
            fullyVerifiedOverride({ officialCatalogStatus: "mismatch" })
          );
        },
        expectBlocker: "official_catalog_not_verified",
      },
      {
        label: "account access not checked",
        setup: () => {
          baseEnv();
          __setPilotModelVerificationForTests(
            fullyVerifiedOverride({
              accountAccessStatus: "not_checked",
              accountVerifiedModel: null,
            })
          );
        },
        expectBlocker: "account_model_access_not_verified",
      },
      {
        label: "account model unavailable",
        setup: () => {
          baseEnv();
          __setPilotModelVerificationForTests(
            fullyVerifiedOverride({
              accountAccessStatus: "unavailable",
              accountVerifiedModel: null,
            })
          );
        },
        expectBlocker: "account_model_access_not_verified",
      },
      {
        label: "official pricing not checked",
        setup: () => {
          baseEnv();
          __setPilotModelVerificationForTests(
            fullyVerifiedOverride({
              officialPricingStatus: "not_checked",
              billingModeStatus: "standard",
            })
          );
        },
        expectBlocker: "model_pricing_not_verified",
      },
      {
        label: "billing mode unknown",
        setup: () => {
          baseEnv();
          __setPilotModelVerificationForTests(
            fullyVerifiedOverride({ billingModeStatus: "unknown" })
          );
        },
        expectBlocker: "billing_path_not_verified",
      },
      {
        label: "switches off",
        setup: () => {
          process.env.OPENAI_API_KEY = "sk-test";
          process.env.LIVE_AGENT_OPENAI_MODEL = OPENAI_PILOT_MODEL_ID;
          __setPilotModelVerificationForTests(fullyVerifiedOverride());
        },
        expectBlocker: "global_live_execution_disabled",
      },
      {
        label: "wrong agent",
        setup: () => {
          baseEnv();
        },
        gateInput: { agentSlug: "wrong-agent" },
        expectBlocker: "agent_not_canonical_pilot",
      },
      {
        label: "Founder authorization missing",
        setup: () => {
          baseEnv();
        },
        gateInput: { founderLiveAuthorization: false },
        expectBlocker: "founder_live_run_authorization_missing",
      },
      {
        label: "scheduler unhealthy",
        setup: () => {
          baseEnv();
        },
        gateInput: { schedulerHealthy: false },
        expectBlocker: "runtime_scheduler_unhealthy",
      },
    ];

    for (const c of cases) {
      it(`blocks: ${c.label}`, async () => {
        resetLivePilotStore();
        __resetPilotModelVerificationForTests();
        delete process.env.OPENAI_API_KEY;
        delete process.env.LIVE_AGENT_OPENAI_MODEL;
        delete process.env[ENV_LIVE_AGENT_EXECUTION_ENABLED];
        delete process.env[ENV_LIVE_AGENT_PILOT_ENABLED];
        c.setup();
        const gate = assertActivationGate({
          founderLiveAuthorization: true,
          schedulerHealthy: true,
          ...(c.gateInput || {}),
        });
        expect(gate.ok, c.label).toBe(false);
        expect(gate.blockers, c.label).toContain(c.expectBlocker);
        expect(gate.providerCallCountIncrement).toBe(0);
        expect(gate.markAgentActive).toBe(false);
        expect(gate.markAgentLiveTested).toBe(false);
        expect(gate.modifyFounderProof).toBe(false);

        let fakeCalls = 0;
        const client = {
          responses: {
            create: async () => {
              fakeCalls += 1;
              throw new Error("should not be called");
            },
          },
        };
        const invoke = await invokeOpenAIResponses({
          client,
          allowNetwork: true,
          modelId: OPENAI_PILOT_MODEL_ID,
          systemPrompt: "s",
          userPrompt: "u",
        });
        // Without modelReady/pricingReady verification, invoke fails closed before fake call
        if (
          !isModelAvailabilityVerifiedForProviderCall(OPENAI_PILOT_MODEL_ID) ||
          !isPricingVerifiedForProviderCall(OPENAI_PILOT_MODEL_ID)
        ) {
          expect(fakeCalls, c.label).toBe(0);
          expect(invoke.ok, c.label).toBe(false);
        }
        expect(getLiveTestedSeats()).toBe(0);
      });
    }

    it("blocks: two queued tasks / concurrent run / require exactly one queued", () => {
      baseEnv();
      createPilotRun({
        projectId: PILOT_PROJECT_ID,
        taskId: "t1",
        status: "queued",
        idempotencyKey: "a",
      });
      createPilotRun({
        projectId: PILOT_PROJECT_ID,
        taskId: "t2",
        status: "queued",
        idempotencyKey: "b",
      });
      expect(
        assertActivationGate({
          founderLiveAuthorization: true,
          schedulerHealthy: true,
          requireExactlyOneQueuedTask: true,
        }).blockers
      ).toContain("queue_capacity_exhausted");

      resetLivePilotStore();
      baseEnv();
      const created = createPilotRun({
        projectId: PILOT_PROJECT_ID,
        taskId: "t1",
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

    it("fully valid fake-provider path invokes once; live-tested stays 0", async () => {
      baseEnv();
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
      expect(getLiveTestedSeats()).toBe(0);
    });
  });

  it("eligibility reports account/billing blockers without live readiness", () => {
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
        "account_model_access_not_verified",
        "billing_path_not_verified",
        "global_live_execution_disabled",
        "pilot_execution_disabled",
      ])
    );
  });
});
