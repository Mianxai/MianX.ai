/**
 * No-credit / billing fail-closed readiness tests — fixtures and mocks only.
 * Zero genuine OpenAI / Models API / Responses calls.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  BILLING_CREDIT_STATUS,
  BILLING_CREDIT_STATUSES,
  getBillingPathReadinessStatus,
  billingCreditFixture,
  billingPathFixture,
  setBillingCreditStatusOverride,
  resetBillingCreditStatusOverride,
  isBillingCreditReadyForProviderCall,
} from "./billing-path-readiness";
import {
  categorizeProviderError,
  applyBillingFailurePolicy,
  PROVIDER_FAILURE_CATEGORY,
} from "./provider-error-categories";
import { getApiKeyPresenceStatus, assertKeyPresencePrivacy } from "./key-presence";
import { buildPostConfigPreflight } from "./post-config-preflight";
import { buildLiveRunControlPlaneAdminReport } from "./admin-report";
import { evaluateLiveRunExecutionLock, resetExecutionLockFixtures } from "./execution-lock";
import { normalizeOpenAIError } from "../openai-adapter";
import { manualSwitchOffProcedure } from "./post-run-lockout";
import { resetLiveRunAuthorizationFixtures } from "./authorization";
import {
  ENV_LIVE_AGENT_EXECUTION_ENABLED,
  ENV_LIVE_AGENT_PILOT_ENABLED,
} from "../constants";

const PREV = {};

describe("no-credit safe readiness", () => {
  beforeEach(() => {
    resetBillingCreditStatusOverride();
    resetLiveRunAuthorizationFixtures();
    resetExecutionLockFixtures();
    for (const k of [
      "OPENAI_API_KEY",
      ENV_LIVE_AGENT_EXECUTION_ENABLED,
      ENV_LIVE_AGENT_PILOT_ENABLED,
    ]) {
      PREV[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    resetBillingCreditStatusOverride();
    for (const [k, v] of Object.entries(PREV)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });

  it("key absent reports apiKeyConfigured false only", () => {
    const presence = getApiKeyPresenceStatus();
    expect(presence).toEqual({ apiKeyConfigured: false });
    expect(assertKeyPresencePrivacy(presence).ok).toBe(true);
  });

  it("key present reports boolean only — no fragments or dumps", () => {
    process.env.OPENAI_API_KEY = "sk-test-fixture-not-a-real-key-xxxxxx";
    const presence = getApiKeyPresenceStatus();
    expect(presence).toEqual({ apiKeyConfigured: true });
    expect(assertKeyPresencePrivacy(presence).ok).toBe(true);
    const blob = JSON.stringify(presence);
    expect(blob).not.toMatch(/sk-test/);
    expect(blob).not.toContain("keyLength");
    expect(blob).not.toContain("keyPrefix");
  });

  it("exposes all required billing credit states", () => {
    expect(BILLING_CREDIT_STATUSES).toEqual([
      "not_checked",
      "available",
      "insufficient",
      "unavailable",
      "unknown",
      "failed",
    ]);
  });

  it("default billing credit status is not_checked and does not infer from key", () => {
    process.env.OPENAI_API_KEY = "sk-test-fixture-not-a-real-key-xxxxxx";
    const billing = getBillingPathReadinessStatus();
    expect(billing.billingCreditStatus).toBe(BILLING_CREDIT_STATUS.NOT_CHECKED);
    expect(billing.billingModeStatus).toBe("unknown");
    expect(billing.creditReadyForProviderCall).toBe(false);
    expect(billing.pricingReadyForProviderCall).toBe(false);
    expect(billing.calledOpenAI).toBe(false);
    expect(isBillingCreditReadyForProviderCall(billing.billingCreditStatus)).toBe(false);
  });

  it("billing fixtures cover insufficient / unavailable / failed / available", () => {
    expect(billingCreditFixture("insufficient").billingCreditStatus).toBe("insufficient");
    expect(billingCreditFixture("unavailable").billingCreditStatus).toBe("unavailable");
    expect(billingCreditFixture("failed").billingCreditStatus).toBe("failed");
    expect(billingCreditFixture("unknown").billingCreditStatus).toBe("unknown");
    const available = billingCreditFixture("available");
    expect(available.billingCreditStatus).toBe("available");
    expect(available.creditReadyForProviderCall).toBe(true);
    // Mode still unknown until separately verified
    expect(available.billingModeStatus).toBe("unknown");
  });

  it("categorizes insufficient_quota and payment_required without raw body", () => {
    const quota = categorizeProviderError({
      status: 429,
      code: "insufficient_quota",
      message: "You exceeded your current quota",
      response: { data: { secret: "should-not-leak" } },
    });
    expect(quota.category).toBe(PROVIDER_FAILURE_CATEGORY.BILLING_INSUFFICIENT_QUOTA);
    expect(quota.retryable).toBe(false);
    expect(quota.automaticRetry).toBe(false);
    expect(quota.authorizationReusable).toBe(false);
    expect(quota.markAgentActive).toBe(false);
    expect(quota.markAgentLiveTested).toBe(false);
    expect(quota.founderProofChanged).toBe(false);
    expect(quota.founderFinalReviewChanged).toBe(false);
    expect(quota.rawProviderBodyIncluded).toBe(false);
    expect(JSON.stringify(quota)).not.toContain("should-not-leak");

    const pay = categorizeProviderError({ status: 402, code: "payment_required" });
    expect(pay.category).toBe(PROVIDER_FAILURE_CATEGORY.BILLING_PAYMENT_REQUIRED);
    expect(pay.billingRelated).toBe(true);

    const rate = categorizeProviderError({ status: 429, code: "rate_limit_exceeded" });
    expect(rate.category).toBe(PROVIDER_FAILURE_CATEGORY.RATE_LIMIT);
    expect(rate.retryable).toBe(false);

    const model = categorizeProviderError({ code: "model_not_available" });
    expect(model.category).toBe(PROVIDER_FAILURE_CATEGORY.MODEL_NOT_AVAILABLE);

    const deactivated = categorizeProviderError({ code: "account_deactivated" });
    expect(deactivated.category).toBe(PROVIDER_FAILURE_CATEGORY.ACCOUNT_DEACTIVATED);

    const billingInactive = categorizeProviderError({ code: "billing_not_active" });
    expect(billingInactive.category).toBe(PROVIDER_FAILURE_CATEGORY.BILLING_NOT_ACTIVE);
  });

  it("normalizeOpenAIError applies billing categories and never auto-retries", () => {
    const result = normalizeOpenAIError({ status: 429, code: "insufficient_quota" });
    expect(result.retryable).toBe(false);
    expect(result.normalizedErrorCode).toBe("BILLING_INSUFFICIENT_QUOTA");
    expect(result.billingRelatedFailure).toBe(true);
    expect(result.providerEvidenceMetadata.rawBodyIncluded).toBe(false);
  });

  it("billing failure policy keeps authorization one-time and switches off", () => {
    const policy = applyBillingFailurePolicy(
      categorizeProviderError({ code: "insufficient_quota" }),
      { providerCallAttempted: true }
    );
    expect(policy.anotherAttemptAllowed).toBe(false);
    expect(policy.switchesOffRequired).toBe(true);
    expect(policy.providerCallCounted).toBe(true);
  });

  it("execution lock blocks when credits not_checked even with key present", () => {
    process.env.OPENAI_API_KEY = "sk-test-fixture-not-a-real-key-xxxxxx";
    const lock = evaluateLiveRunExecutionLock({
      accountAccessStatus: "verified",
      billingCreditStatus: "not_checked",
    });
    expect(lock.providerCallAllowed).toBe(false);
    expect(lock.blockers).toContain("billing_credits_not_verified");
  });

  it("Admin report surfaces no-credit readiness truth with key present fixture", () => {
    process.env.OPENAI_API_KEY = "sk-test-fixture-not-a-real-key-xxxxxx";
    const report = buildLiveRunControlPlaneAdminReport({
      authorizationStore: {
        status: "available",
        migrationApplied: true,
        providerCallAllowed: false,
        liveExecutionReady: false,
        table: "pilot_live_run_authorizations",
      },
      authorizationRowCount: 0,
      workforce: { allocatedSeats: 0, activeInstances: 0, liveTestedSeats: 0 },
    });
    expect(report.apiKeyConfigured).toBe(true);
    expect(report.accountAccessStatus).toBe("not_checked");
    expect(report.billingCreditStatus).toBe("not_checked");
    expect(report.billingModeStatus).toBe("unknown");
    expect(report.providerCallAllowed).toBe(false);
    expect(report.liveExecutionReady).toBe(false);
    expect(report.executionSwitch).toBe(false);
    expect(report.pilotSwitch).toBe(false);
    expect(report.allocatedAgents).toBe(0);
    expect(report.activeAgents).toBe(0);
    expect(report.liveTestedAgents).toBe(0);
    expect(report.authenticatedModelsApiCalls).toBe(0);
    expect(report.genuineGenerationCalls).toBe(0);
    expect(report.authorizationRowCount).toBe(0);
    expect(report.primaryBlockingReason).toMatch(/account access and billing readiness/i);
    expect(report.providerConfiguredDisplay).toBe(
      "configuration_present_execution_blocked"
    );
    expect(report.runNowActionPresent).toBe(false);
    expect(report.secretInputPresent).toBe(false);
    expect(report.apiKeyFieldPresent).toBe(false);
    const blob = JSON.stringify(report);
    expect(blob).not.toMatch(/sk-test-fixture/);
    expect(blob).not.toContain('"apiKey":');
  });

  it("post-config preflight keeps providerCallAllowed false with key present", async () => {
    process.env.OPENAI_API_KEY = "sk-test-fixture-not-a-real-key-xxxxxx";
    const pf = await buildPostConfigPreflight({
      authorizationStore: { status: "available", migrationApplied: true },
      scheduler: { schedulerHealth: "healthy" },
      workforce: { allocatedSeats: 0, activeInstances: 0, liveTestedSeats: 0 },
    });
    expect(pf.checklist.apiKeyConfigured).toBe(true);
    expect(pf.checklist.billingCreditStatus).toBe("not_checked");
    expect(pf.checklist.accountAccessStatus).toBe("not_checked");
    expect(pf.providerCallAllowed).toBe(false);
    expect(pf.checklist.calledOpenAI).toBe(false);
    expect(pf.blockers).toContain("billing_credits_not_verified");
  });

  it("switch-off rehearsal remains documentation-only and non-mutating of Vercel", () => {
    const proc = manualSwitchOffProcedure();
    expect(proc.applicationCannotMutateVercelEnv).toBe(true);
    expect(proc.steps.some((s) => /LIVE_AGENT_PILOT_ENABLED/i.test(s))).toBe(true);
  });

  it("does not hard-code Founder-observed $0.00 into billing readiness", () => {
    const billing = getBillingPathReadinessStatus();
    const standard = billingPathFixture("standard");
    const blob = JSON.stringify({ billing, standard });
    expect(blob).not.toMatch(/\$0\.00/);
    expect(blob).not.toMatch(/Founder-observed billing balance/);
  });

  it("override available still requires separate mode verification for full path", () => {
    setBillingCreditStatusOverride("available");
    const billing = getBillingPathReadinessStatus();
    expect(billing.billingCreditStatus).toBe("available");
    expect(billing.creditReadyForProviderCall).toBe(true);
    expect(billing.billingModeStatus).toBe("unknown");
    expect(billing.pricingReadyForProviderCall).toBe(false);
  });
});
