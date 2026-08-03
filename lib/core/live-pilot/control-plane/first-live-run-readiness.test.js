/**
 * First-live-run readiness packet tests — fixtures only, zero genuine provider calls.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  buildFirstLiveRunBlockerMatrix,
  buildFirstLiveRunFounderChecklist,
  buildFirstLiveRunReadinessPacket,
  buildBoundedTaskEnvelopeTemplate,
  getFounderActionPhases,
  FOUNDER_AUTHORIZATION_TEMPLATES,
  FIRST_CALL_ACCEPTANCE_CRITERIA,
  SWITCH_ORDER,
  ROLLBACK_CLASSES,
  PILOT_IDENTITY,
  assertNoSecretFieldsInPacket,
} from "./first-live-run-readiness";
import {
  PILOT_AGENT_SLUG,
  PILOT_PROJECT_ID,
  PILOT_POLICY,
  ENV_LIVE_AGENT_EXECUTION_ENABLED,
  ENV_LIVE_AGENT_PILOT_ENABLED,
} from "../constants";
import {
  OPENAI_PILOT_MODEL_ID,
  OPENAI_PILOT_MODEL_SNAPSHOT,
} from "../model-registry";
import { PILOT_COST_BOUNDS, PILOT_TOKEN_CAPS } from "./billing-path-readiness";
import { resetLiveRunAuthorizationFixtures } from "./authorization";

const PREV_ENV = {};

describe("first-live-run readiness packet", () => {
  beforeEach(() => {
    resetLiveRunAuthorizationFixtures();
    for (const k of [
      ENV_LIVE_AGENT_EXECUTION_ENABLED,
      ENV_LIVE_AGENT_PILOT_ENABLED,
      "OPENAI_API_KEY",
    ]) {
      PREV_ENV[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    resetLiveRunAuthorizationFixtures();
    for (const [k, v] of Object.entries(PREV_ENV)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });

  it("displays all current blockers for Production baseline", () => {
    const matrix = buildFirstLiveRunBlockerMatrix({
      authorizationStoreStatus: "available",
      authorizationRowCount: 0,
      schedulerHealth: "healthy",
      workforce: { allocatedSeats: 0, activeInstances: 0, liveTestedSeats: 0 },
    });
    expect(matrix.providerCallAllowed).toBe(false);
    expect(matrix.liveExecutionReady).toBe(false);
    expect(matrix.genuineProviderCalls).toBe(0);
    expect(matrix.blockers).toContain("apiKeyConfigured");
    expect(matrix.blockers).toContain("providerConfigured");
    expect(matrix.blockers).toContain("accountAccessStatus");
    expect(matrix.blockers).toContain("billingPathStatus");
    expect(matrix.blockers).toContain("oneTimeLiveRunAuthorization");
    expect(matrix.blockers).toContain("providerCallAllowed");
    expect(matrix.blockers).toContain("liveExecutionReady");

    const storeRow = matrix.rows.find((r) => r.key === "authorizationStore");
    expect(storeRow.currentValue).toBe("available");
    expect(storeRow.requiredValue).toBe("available");

    const rowsRow = matrix.rows.find((r) => r.key === "authorizationRows");
    expect(rowsRow.currentValue).toBe(0);

    const providerRow = matrix.rows.find((r) => r.key === "providerConfigured");
    expect(providerRow.currentValue).toBe("none");

    const keyRow = matrix.rows.find((r) => r.key === "apiKeyConfigured");
    expect(keyRow.currentValue).toBe(false);

    const catalogRow = matrix.rows.find((r) => r.key === "officialCatalogStatus");
    expect(catalogRow.currentValue).toBe("verified");

    const accountRow = matrix.rows.find((r) => r.key === "accountAccessStatus");
    expect(accountRow.currentValue).toBe("not_checked");

    const modelRow = matrix.rows.find((r) => r.key === "approvedModel");
    expect(modelRow.currentValue).toBe(OPENAI_PILOT_MODEL_ID);

    const snapRow = matrix.rows.find((r) => r.key === "approvedSnapshot");
    expect(snapRow.currentValue).toBe(OPENAI_PILOT_MODEL_SNAPSHOT);

    const pricingRow = matrix.rows.find((r) => r.key === "officialPricingStatus");
    expect(pricingRow.currentValue).toBe("verified");

    const billingRow = matrix.rows.find((r) => r.key === "billingPathStatus");
    expect(billingRow.currentValue).toBe("unknown");

    const schedRow = matrix.rows.find((r) => r.key === "schedulerHealth");
    expect(schedRow.currentValue).toBe("healthy");

    const execRow = matrix.rows.find((r) => r.key === "executionSwitch");
    expect(execRow.currentValue).toBe(false);
    const pilotRow = matrix.rows.find((r) => r.key === "pilotSwitch");
    expect(pilotRow.currentValue).toBe(false);

    const allocRow = matrix.rows.find((r) => r.key === "pilotAgentAllocation");
    expect(allocRow.currentValue).toBe("0/0/0");

    const queueRow = matrix.rows.find((r) => r.key === "queueCount");
    expect(queueRow.currentValue).toBe(0);

    const concRow = matrix.rows.find((r) => r.key === "concurrentRuns");
    expect(concRow.currentValue).toBe(0);

    const authRow = matrix.rows.find((r) => r.key === "oneTimeLiveRunAuthorization");
    expect(authRow.currentValue).toBe("none");

    const evidenceRow = matrix.rows.find((r) => r.key === "evidenceStore");
    expect(evidenceRow.currentValue).toBe("available");

    const finalRow = matrix.rows.find((r) => r.key === "founderFinalReviewIndependence");
    expect(finalRow.currentValue).toBe("independent");
  });

  it("reports key absent with boolean-only posture", () => {
    delete process.env.OPENAI_API_KEY;
    const matrix = buildFirstLiveRunBlockerMatrix();
    const keyRow = matrix.rows.find((r) => r.key === "apiKeyConfigured");
    expect(keyRow.currentValue).toBe(false);
    expect(JSON.stringify(matrix)).not.toMatch(/sk-[a-zA-Z0-9]{8,}/);
  });

  it("preserves account not_checked and billing unknown", () => {
    const matrix = buildFirstLiveRunBlockerMatrix();
    expect(matrix.rows.find((r) => r.key === "accountAccessStatus").currentValue).toBe(
      "not_checked"
    );
    expect(matrix.rows.find((r) => r.key === "billingPathStatus").currentValue).toBe("unknown");
  });

  it("reports no authorization and switches off", () => {
    const matrix = buildFirstLiveRunBlockerMatrix();
    expect(matrix.rows.find((r) => r.key === "oneTimeLiveRunAuthorization").currentValue).toBe(
      "none"
    );
    expect(matrix.rows.find((r) => r.key === "executionSwitch").currentValue).toBe(false);
    expect(matrix.rows.find((r) => r.key === "pilotSwitch").currentValue).toBe(false);
  });

  it("reports queue zero and agents 0/0/0", () => {
    const checklist = buildFirstLiveRunFounderChecklist({
      workforce: { allocatedSeats: 0, activeInstances: 0, liveTestedSeats: 0 },
    });
    const matrix = buildFirstLiveRunBlockerMatrix({
      workforce: { allocatedSeats: 0, activeInstances: 0, liveTestedSeats: 0 },
    });
    expect(matrix.rows.find((r) => r.key === "queueCount").currentValue).toBe(0);
    expect(matrix.rows.find((r) => r.key === "pilotAgentAllocation").currentValue).toBe("0/0/0");
    expect(checklist.currentBlockers.length).toBeGreaterThan(0);
  });

  it("orders Founder action phases 1 through 15 without claiming completion", () => {
    const phases = getFounderActionPhases();
    expect(phases).toHaveLength(15);
    expect(phases.map((p) => p.phase)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(phases.every((p) => p.completed === false)).toBe(true);
    expect(phases[0].action).toMatch(/OPENAI_API_KEY/);
    expect(phases[11].action).toMatch(/Responses generation/);
    expect(phases[12].action).toMatch(/disable both switches/);
    expect(phases[14].action).toMatch(/live-tested/);
  });

  it("defines correct switch enable and disable order", () => {
    expect(SWITCH_ORDER.enable.map((s) => s.switch)).toEqual([
      ENV_LIVE_AGENT_EXECUTION_ENABLED,
      ENV_LIVE_AGENT_PILOT_ENABLED,
    ]);
    expect(SWITCH_ORDER.disable.map((s) => s.switch)).toEqual([
      ENV_LIVE_AGENT_PILOT_ENABLED,
      ENV_LIVE_AGENT_EXECUTION_ENABLED,
    ]);
  });

  it("enforces exact task caps and cost ceiling in envelope template", () => {
    const env = buildBoundedTaskEnvelopeTemplate();
    expect(env.maximumInputTokens).toBe(PILOT_TOKEN_CAPS.maximumInputTokens);
    expect(env.maximumOutputTokens).toBe(PILOT_TOKEN_CAPS.maximumOutputTokens);
    expect(env.maximumTotalTokens).toBe(PILOT_TOKEN_CAPS.maximumTotalTokens);
    expect(env.maximumInputTokens).toBe(4000);
    expect(env.maximumOutputTokens).toBe(1200);
    expect(env.maximumTotalTokens).toBe(5200);
    expect(env.maximumCostMicrousd).toBe(100_000);
    expect(env.maximumCostMicrousd).toBe(PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd);
    expect(env.tools).toEqual([]);
    expect(env.store).toBe(false);
    expect(env.maxAttempts).toBe(1);
    expect(env.maxConcurrentRequests).toBe(1);
    expect(env.maxQueuedPilotTasks).toBe(1);
    expect(env.approvedModel).toBe(OPENAI_PILOT_MODEL_ID);
    expect(env.approvedSnapshot).toBe(OPENAI_PILOT_MODEL_SNAPSHOT);
    expect(env.queueRealTask).toBe(false);
  });

  it("prohibits duplicate calls and requires manual review for uncertain state", () => {
    expect(FIRST_CALL_ACCEPTANCE_CRITERIA.duplicateCallProhibited).toBe(true);
    expect(FIRST_CALL_ACCEPTANCE_CRITERIA.noAutomaticRetryOnUncertain).toBe(true);
    expect(FIRST_CALL_ACCEPTANCE_CRITERIA.uncertainCallRequiresManualReview).toBe(true);
    expect(FIRST_CALL_ACCEPTANCE_CRITERIA.pass).toContain("no_duplicate_tick_call");
    expect(FIRST_CALL_ACCEPTANCE_CRITERIA.pass).toContain("authorization_consumed_once");
    expect(FIRST_CALL_ACCEPTANCE_CRITERIA.automaticFailOrManualReview).toContain(
      "uncertain_provider_attempt_state"
    );
    expect(FIRST_CALL_ACCEPTANCE_CRITERIA.automaticFailOrManualReview).toContain(
      "duplicate_execution_indication"
    );
  });

  it("keeps Founder Proof and Final Review independent", () => {
    const checklist = buildFirstLiveRunFounderChecklist();
    expect(checklist.founderProofIndependent).toBe(true);
    expect(checklist.founderFinalReviewIndependent).toBe(true);
    expect(FIRST_CALL_ACCEPTANCE_CRITERIA.pass).toContain("founder_proof_unchanged");
    expect(FIRST_CALL_ACCEPTANCE_CRITERIA.pass).toContain("founder_final_review_unchanged");
    for (const t of FOUNDER_AUTHORIZATION_TEMPLATES) {
      expect(t.prohibits).toContain("founder_final_review_changes");
    }
  });

  it("rollback classes never delete historical evidence", () => {
    expect(ROLLBACK_CLASSES.every((r) => r.deleteHistoricalEvidence === false)).toBe(true);
    expect(ROLLBACK_CLASSES.every((r) => r.evidenceRetention === "preserve_all")).toBe(true);
  });

  it("documents pilot identity without duplicating hard-coded business logic", () => {
    expect(PILOT_IDENTITY.agentSlug).toBe(PILOT_AGENT_SLUG);
    expect(PILOT_IDENTITY.projectId).toBe(PILOT_PROJECT_ID);
    expect(PILOT_IDENTITY.documentOnly).toBe(true);
    expect(PILOT_IDENTITY.hardCodeInBusinessLogic).toBe(false);
  });

  it("exposes eight non-executable authorization templates", () => {
    expect(FOUNDER_AUTHORIZATION_TEMPLATES).toHaveLength(8);
    expect(FOUNDER_AUTHORIZATION_TEMPLATES.every((t) => t.executable === false)).toBe(true);
    expect(FOUNDER_AUTHORIZATION_TEMPLATES.map((t) => t.id)).toEqual([
      "secure_key_configuration",
      "one_time_models_api_check",
      "one_time_live_run_authorization",
      "exactly_one_pilot_task_queue",
      "switch_enablement",
      "exactly_one_generation_attempt",
      "post_run_switch_off",
      "evidence_acceptance",
    ]);
    for (const t of FOUNDER_AUTHORIZATION_TEMPLATES) {
      expect(t.approvedModel).toBe(OPENAI_PILOT_MODEL_ID);
      expect(t.approvedSnapshot).toBe(OPENAI_PILOT_MODEL_SNAPSHOT);
      if (t.maximumCostMicrousd != null) {
        expect(t.maximumCostMicrousd).toBeLessThanOrEqual(100_000);
      }
    }
  });

  it("Founder checklist has no secret field and no Run now metadata", () => {
    const checklist = buildFirstLiveRunFounderChecklist();
    expect(checklist.runNowActionPresent).toBe(false);
    expect(checklist.secretInputPresent).toBe(false);
    expect(checklist.apiKeyFieldPresent).toBe(false);
    expect(checklist.switchEnableControlsPresent).toBe(false);
    expect(checklist.allocationControlsPresent).toBe(false);
    expect(checklist.automaticAuthorizationPresent).toBe(false);
    expect(checklist.nextManualFounderAction.phase).toBe(1);
    expect(checklist.prohibitedActions.some((a) => /Run now/i.test(a))).toBe(true);

    const privacy = assertNoSecretFieldsInPacket(checklist);
    expect(privacy.ok).toBe(true);
    const blob = JSON.stringify(buildFirstLiveRunReadinessPacket());
    expect(blob).not.toMatch(/sk-[a-zA-Z0-9]{8,}/);
    expect(blob).not.toContain('"apiKey"');
  });

  it("aligns envelope with PILOT_POLICY caps", () => {
    const env = buildBoundedTaskEnvelopeTemplate();
    expect(env.maximumInputTokens).toBe(PILOT_POLICY.maxInputTokens);
    expect(env.maximumOutputTokens).toBe(PILOT_POLICY.maxOutputTokens);
    expect(env.maximumTotalTokens).toBe(PILOT_POLICY.maxTotalTokens);
    expect(env.providerTimeoutMs).toBe(PILOT_POLICY.maxProviderTimeoutMs);
    expect(env.wallTimeoutMs).toBe(PILOT_POLICY.maxWallClockMs);
  });
});
