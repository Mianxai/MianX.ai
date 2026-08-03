/**
 * Secure config + model-check + billing-path readiness tests.
 * Mocks and fixtures only — genuine OpenAI calls must remain zero.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  assertKeyPresencePrivacy,
  getApiKeyPresenceStatus,
} from "./key-presence";
import {
  buildModelAccessCheckEnvelope,
  getAccountAccessStatus,
  resetModelAccessVerificationFixtures,
  verifyAccountModelAccess,
} from "./model-access-verification";
import {
  assertPricingCeiling,
  billingPathFixture,
  getBillingPathReadinessStatus,
  PILOT_COST_BOUNDS,
  PILOT_TOKEN_CAPS,
} from "./billing-path-readiness";
import { buildPostConfigPreflight } from "./post-config-preflight";
import {
  createLiveRunAuthorizationRecord,
  resetLiveRunAuthorizationFixtures,
} from "./authorization";
import {
  OPENAI_PILOT_MODEL_ID,
  OPENAI_PILOT_MODEL_SNAPSHOT,
} from "../model-registry";

const PREV_KEY = process.env.OPENAI_API_KEY;

describe("OpenAI secure-config and model-check readiness", () => {
  beforeEach(() => {
    resetLiveRunAuthorizationFixtures();
    resetModelAccessVerificationFixtures();
    delete process.env.OPENAI_API_KEY;
  });

  afterEach(() => {
    resetLiveRunAuthorizationFixtures();
    resetModelAccessVerificationFixtures();
    if (PREV_KEY === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = PREV_KEY;
  });

  it("reports key absent with boolean only", () => {
    const presence = getApiKeyPresenceStatus();
    expect(presence.apiKeyConfigured).toBe(false);
    expect(presence.calledOpenAI).toBe(false);
    expect(assertKeyPresencePrivacy(presence).ok).toBe(true);
    expect(JSON.stringify(presence)).not.toMatch(/sk-/);
  });

  it("reports key present boolean only without fragments", () => {
    process.env.OPENAI_API_KEY = "sk-test-not-a-real-production-key-value";
    const presence = getApiKeyPresenceStatus();
    expect(presence.apiKeyConfigured).toBe(true);
    expect(assertKeyPresencePrivacy(presence).ok).toBe(true);
    const blob = JSON.stringify(presence);
    expect(blob).not.toContain("sk-test");
    expect(blob).not.toMatch(/OPENAI_API_KEY\s*[:=]/);
  });

  it("rejects privacy violations that expose key-like fields", () => {
    expect(
      assertKeyPresencePrivacy({
        apiKeyConfigured: true,
        apiKey: "sk-should-never-appear",
      }).ok
    ).toBe(false);
  });

  it("model-check envelope stays not_checked and unexecuted", () => {
    const envelope = buildModelAccessCheckEnvelope();
    expect(envelope.officialCatalogStatus).toBe("verified");
    expect(envelope.accountAccessStatus).toBe("not_checked");
    expect(envelope.authenticatedModelsApiCalls).toBe(0);
    expect(envelope.approvedModel).toBe(OPENAI_PILOT_MODEL_ID);
    expect(envelope.approvedSnapshot).toBe(OPENAI_PILOT_MODEL_SNAPSHOT);
    expect(envelope.timeoutMs).toBe(60_000);
    expect(envelope.executed).toBe(false);
    expect(envelope.calledOpenAI).toBe(false);
    expect(getAccountAccessStatus().accountAccessStatus).toBe("not_checked");
  });

  it("blocks model-check when authorization absent", async () => {
    const r = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: "missing",
      fetchModels: async () => ({ models: [OPENAI_PILOT_MODEL_ID] }),
    });
    expect(r.ok).toBe(false);
    expect(r.calledOpenAI).toBe(false);
    expect(r.authenticatedModelsApiCalls).toBe(0);
  });

  it("blocks expired authorization without OpenAI call", async () => {
    process.env.OPENAI_API_KEY = "sk-test-not-real";
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      expiresAt: new Date(Date.now() - 60_000).toISOString(),
    });
    const r = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: auth.authorizationId,
      fetchModels: async () => ({ models: [OPENAI_PILOT_MODEL_ID] }),
    });
    expect(r.ok).toBe(false);
    expect(r.code).toBe("EXPIRED");
    expect(r.calledOpenAI).toBe(false);
  });

  it("blocks revoked authorization", async () => {
    process.env.OPENAI_API_KEY = "sk-test-not-real";
    const auth = createLiveRunAuthorizationRecord({ status: "revoked" });
    const r = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: auth.authorizationId,
      fetchModels: async () => ({ models: [OPENAI_PILOT_MODEL_ID] }),
    });
    expect(r.ok).toBe(false);
    expect(["REVOKED", "AUTHORIZATION_NOT_AUTHORIZED"]).toContain(r.code);
    expect(r.calledOpenAI).toBe(false);
  });

  it("blocks already-consumed authorization", async () => {
    process.env.OPENAI_API_KEY = "sk-test-not-real";
    const auth = createLiveRunAuthorizationRecord({ status: "consumed" });
    const r = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: auth.authorizationId,
      fetchModels: async () => ({ models: [OPENAI_PILOT_MODEL_ID] }),
    });
    expect(r.ok).toBe(false);
    expect(r.calledOpenAI).toBe(false);
  });

  it("rejects wrong model and wrong snapshot before network", async () => {
    process.env.OPENAI_API_KEY = "sk-test-not-real";
    const auth = createLiveRunAuthorizationRecord({ status: "authorized" });
    const wrongModel = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: auth.authorizationId,
      checkedModelId: "gpt-wrong",
      fetchModels: async () => {
        throw new Error("should-not-run");
      },
    });
    expect(wrongModel.code).toBe("UNAPPROVED_MODEL_OR_SNAPSHOT");
    expect(wrongModel.calledOpenAI).toBe(false);

    const wrongSnap = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: auth.authorizationId,
      checkedSnapshotId: "wrong-snap",
      fetchModels: async () => {
        throw new Error("should-not-run");
      },
    });
    expect(wrongSnap.code).toBe("UNAPPROVED_MODEL_OR_SNAPSHOT");
    expect(wrongSnap.calledOpenAI).toBe(false);
  });

  it("duplicate check returns idempotent fixture without second network", async () => {
    process.env.OPENAI_API_KEY = "sk-test-not-real";
    const auth = createLiveRunAuthorizationRecord({ status: "authorized" });
    let calls = 0;
    const fetchModels = async () => {
      calls += 1;
      return { models: [OPENAI_PILOT_MODEL_ID, OPENAI_PILOT_MODEL_SNAPSHOT] };
    };
    const first = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: auth.authorizationId,
      fetchModels,
      idempotencyKey: "mav-idem-1",
    });
    expect(first.ok).toBe(true);
    expect(first.calledOpenAI).toBe(true);
    expect(calls).toBe(1);

    const second = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: auth.authorizationId,
      fetchModels,
      idempotencyKey: "mav-idem-1",
    });
    expect(second.duplicate).toBe(true);
    expect(second.calledOpenAI).toBe(false);
    expect(calls).toBe(1);
  });

  it("timeout path sanitizes errors", async () => {
    process.env.OPENAI_API_KEY = "sk-test-not-real";
    const auth = createLiveRunAuthorizationRecord({ status: "authorized" });
    const r = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: auth.authorizationId,
      timeoutMs: 20,
      fetchModels: async () =>
        new Promise((resolve) => setTimeout(() => resolve({ models: [] }), 200)),
    });
    expect(r.ok).toBe(false);
    expect(r.code).toBe("TIMEOUT");
    expect(r.sanitizedError).toBe("Model-access verification failed");
    expect(JSON.stringify(r)).not.toMatch(/sk-/);
  });

  it("provider error and model unavailable fixtures", async () => {
    process.env.OPENAI_API_KEY = "sk-test-not-real";
    const authErr = createLiveRunAuthorizationRecord({ status: "authorized" });
    const err = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: authErr.authorizationId,
      fetchModels: async () => {
        throw new Error("upstream boom with sk-secret");
      },
    });
    expect(err.ok).toBe(false);
    expect(err.code).toBe("FETCH_FAILED");
    expect(JSON.stringify(err)).not.toContain("sk-secret");

    const authMiss = createLiveRunAuthorizationRecord({ status: "authorized" });
    const miss = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: authMiss.authorizationId,
      fetchModels: async () => ({ models: ["other-model"] }),
    });
    expect(miss.ok).toBe(false);
    expect(miss.result).toBe("mismatch");
  });

  it("verified model fixture succeeds once", async () => {
    process.env.OPENAI_API_KEY = "sk-test-not-real";
    const auth = createLiveRunAuthorizationRecord({ status: "authorized" });
    const r = await verifyAccountModelAccess({
      enabled: true,
      authorizationId: auth.authorizationId,
      fetchModels: async () => ({
        models: [{ id: OPENAI_PILOT_MODEL_ID }, { id: OPENAI_PILOT_MODEL_SNAPSHOT }],
      }),
    });
    expect(r.ok).toBe(true);
    expect(r.accountAccessStatus).toBe("verified");
    expect(r.authenticatedModelsApiCalls).toBe(1);
  });

  it("billing path unknown by default; standard fixture and ceiling", () => {
    const unknown = getBillingPathReadinessStatus();
    expect(unknown.officialPricingStatus).toBe("verified");
    expect(unknown.billingModeStatus).toBe("unknown");
    expect(unknown.pricingReadyForProviderCall).toBe(false);
    expect(unknown.standardUncachedEstimateMicroUsd).toBe(8400);
    expect(unknown.maximumFounderCeilingMicroUsd).toBe(100000);
    expect(unknown.maximumInputTokens).toBe(4000);
    expect(unknown.maximumOutputTokens).toBe(1200);
    expect(unknown.maximumTotalTokens).toBe(5200);
    expect(unknown.tools).toEqual([]);
    expect(unknown.calledOpenAI).toBe(false);

    const standard = billingPathFixture("standard");
    expect(standard.billingModeStatus).toBe("standard");
    expect(standard.pricingReadyForProviderCall).toBe(true);

    expect(assertPricingCeiling(PILOT_COST_BOUNDS.standardUncachedEstimateMicroUsd).ok).toBe(
      true
    );
    expect(assertPricingCeiling(PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd + 1).ok).toBe(
      false
    );
    expect(PILOT_TOKEN_CAPS.maximumTotalTokens).toBe(5200);
  });

  it("post-config preflight keeps providerCallAllowed false", async () => {
    const report = await buildPostConfigPreflight({
      authorizationStore: { status: "available", migrationApplied: true },
      scheduler: { schedulerHealth: "healthy", primaryScheduler: "supabase_cron" },
      workforce: { allocatedSeats: 0, activeInstances: 0, liveTestedSeats: 0 },
      queuedPilotTasks: 0,
      concurrentPilotRuns: 0,
    });
    expect(report.providerCallAllowed).toBe(false);
    expect(report.checklist.providerCallAllowed).toBe(false);
    expect(report.checklist.switchesFalse).toBe(true);
    expect(report.checklist.agentsZero).toBe(true);
    expect(report.checklist.authenticatedModelsApiCalls).toBe(0);
    expect(report.checklist.generationCalls).toBe(0);
    expect(JSON.stringify(report)).not.toMatch(/sk-/);
  });
});
