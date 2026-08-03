/**
 * Mission C — first-live-run readiness packet (fixtures / documentation as data).
 * No network. No key configuration. No authorization creation. No switch mutation.
 */

import {
  PILOT_AGENT_SLUG,
  PILOT_AGENT_NAME,
  PILOT_PROJECT_ID,
  PILOT_PROJECT_NAME,
  PILOT_POLICY,
  ENV_LIVE_AGENT_EXECUTION_ENABLED,
  ENV_LIVE_AGENT_PILOT_ENABLED,
} from "../constants";
import {
  OPENAI_PILOT_MODEL_ID,
  OPENAI_PILOT_MODEL_SNAPSHOT,
} from "../model-registry";
import { PILOT_COST_BOUNDS, PILOT_TOKEN_CAPS } from "./billing-path-readiness";
import { getApiKeyPresenceStatus } from "./key-presence";
import { getAccountAccessStatus } from "./model-access-verification";
import { getBillingPathReadinessStatus } from "./billing-path-readiness";
import { resolveConfiguredProviderName } from "../adapter";
import {
  isGlobalLiveExecutionEnabled,
  isPilotLiveExecutionEnabled,
} from "../policy";
import {
  countActivePilotLeases,
  countQueuedPilotTasks,
  getLivePilotStoreSnapshot,
} from "../store";
import { listLiveRunAuthorizationFixtures } from "./authorization";
import { EVIDENCE_REQUIRED_FIELDS } from "../dry-run/evidence-contract";

export const FIRST_LIVE_RUN_PACKET_VERSION = "2026-08-03-mission-c";
export const PR87_MERGE_COMMIT = "8a2b6f5e874b25419a1cfd66dca26da1406d262e";

/** Pilot identity — documentation only; reuse constants, do not duplicate IDs elsewhere. */
export const PILOT_IDENTITY = Object.freeze({
  agentSlug: PILOT_AGENT_SLUG,
  agentName: PILOT_AGENT_NAME,
  projectId: PILOT_PROJECT_ID,
  projectName: PILOT_PROJECT_NAME,
  documentOnly: true,
  hardCodeInBusinessLogic: false,
});

export const SWITCH_ORDER = Object.freeze({
  enable: Object.freeze([
    { order: 1, switch: ENV_LIVE_AGENT_EXECUTION_ENABLED, label: "Execution switch" },
    { order: 2, switch: ENV_LIVE_AGENT_PILOT_ENABLED, label: "Pilot switch" },
  ]),
  disable: Object.freeze([
    { order: 1, switch: ENV_LIVE_AGENT_PILOT_ENABLED, label: "Pilot switch" },
    { order: 2, switch: ENV_LIVE_AGENT_EXECUTION_ENABLED, label: "Execution switch" },
  ]),
});

export const ROLLBACK_CLASSES = Object.freeze([
  {
    id: "before_key_configuration",
    description: "Before OPENAI_API_KEY is added in Vercel",
    actions: [
      "Do not proceed with Models API or generation",
      "Keep switches false",
      "Keep allocation/queue at 0",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "after_key_configuration",
    description: "After key saved in Vercel Production sensitive env",
    actions: [
      "Redeploy Production",
      "Verify only apiKeyConfigured boolean",
      "Do not enable switches",
      "Rotate/remove key in Vercel if mis-target project",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "before_model_check",
    description: "Before any Models API attempt",
    actions: [
      "Remove or rotate OPENAI_API_KEY in Vercel if misconfigured",
      "Leave accountAccessStatus not_checked",
      "Keep switches false",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "after_failed_model_check",
    description: "After failed or mismatch model-access check",
    actions: [
      "Revoke Models-API-only authorization",
      "Do not enable switches",
      "Record sanitized failure status only",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "before_authorization",
    description: "Before creating a one-time live-run authorization",
    actions: [
      "Confirm accountAccessStatus verified and billing path ready",
      "Do not allocate or queue yet",
      "Keep switches false",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "before_allocation",
    description: "Before allocating the single pilot agent",
    actions: [
      "Confirm one-time authorization exists and matches envelope",
      "Do not queue or enable switches",
      "Abort if a second agent would be allocated",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "before_queue",
    description: "Before queueing the single pilot task",
    actions: [
      "Cancel draft authorization if envelope wrong",
      "Deallocate if allocation happened prematurely",
      "Keep queue at 0",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "after_queue_before_provider",
    description: "Task queued but provider not yet invoked",
    actions: [
      "Arm kill switch",
      "Cancel queued run",
      "Disable switches in reverse order (pilot then execution)",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "after_authorization_consumption",
    description: "Authorization consumed at attempt boundary",
    actions: [
      "Do not un-consume authorization",
      "Do not issue duplicate attempt on same authorization",
      "Founder may issue new authorization only after explicit review",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "after_provider_response",
    description: "Provider returned (success or failure)",
    actions: [
      "Disable pilot switch then execution switch immediately",
      "Retain durable evidence and run terminal state",
      "Never delete request id / usage / cost records",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "evidence_persistence_failure",
    description: "Provider may have responded but evidence incomplete",
    actions: [
      "Enter manual-review / indeterminate state",
      "Do not auto-retry",
      "Do not mark live-tested",
      "Disable switches",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
  {
    id: "indeterminate_attempt",
    description: "Uncertain whether provider was invoked",
    actions: [
      "Manual review required",
      "No automatic retry",
      "No second provider attempt without new Founder authorization",
      "Preserve partial evidence if any",
    ],
    evidenceRetention: "preserve_all",
    deleteHistoricalEvidence: false,
  },
]);

/** Shared prohibitions required on every Founder approval template. */
export const REQUIRED_TEMPLATE_PROHIBITIONS = Object.freeze([
  "extra_calls",
  "extra_tasks",
  "unrelated_migrations",
  "database_resets_or_repairs",
  "unrelated_environment_changes",
  "founder_proof_changes",
  "founder_final_review_changes",
]);

function withRequiredProhibits(list) {
  return [...new Set([...REQUIRED_TEMPLATE_PROHIBITIONS, ...list])];
}

export const FOUNDER_AUTHORIZATION_TEMPLATES = Object.freeze([
  {
    id: "secure_key_configuration",
    title: "Secure key configuration confirmation",
    repository: "Mianxai/MianX.ai",
    projectScope: "Production Vercel project for https://mian-x-ai.vercel.app only",
    pilotProjectIdEvidence: PILOT_PROJECT_ID,
    scope: "Configure OPENAI_API_KEY in Vercel Production sensitive env only",
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    taskOrEnvelope: "none — configuration only",
    maximumCostMicrousd: PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd,
    expiresInMinutes: 60,
    prohibits: withRequiredProhibits([
      "pasting_key_into_admin_or_chat",
      "preview_or_development_env_without_separate_approval",
    ]),
    executable: false,
  },
  {
    id: "one_time_models_api_check",
    title: "One-time Models API check",
    repository: "Mianxai/MianX.ai",
    projectScope: `Pilot project evidence ${PILOT_PROJECT_ID}`,
    scope: "Exactly one authenticated Models API list/check for approved model/snapshot",
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    taskOrEnvelope: "Models API verification only — not generation",
    maximumCostMicrousd: 0,
    expiresInMinutes: 15,
    prohibits: withRequiredProhibits([
      "generation_call",
      "extra_models_api_calls",
      "full_model_list_to_browser",
    ]),
    executable: false,
  },
  {
    id: "one_time_live_run_authorization",
    title: "One-time live-run authorization",
    repository: "Mianxai/MianX.ai",
    projectScope: `Pilot project evidence ${PILOT_PROJECT_ID}`,
    scope: "Single one-time authorization for one bounded pilot task envelope",
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    taskOrEnvelope: "Bounded architecture-review envelope; one concurrency; one attempt",
    maximumCostMicrousd: PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd,
    expiresInMinutes: 15,
    prohibits: withRequiredProhibits([
      "switch_enablement_without_separate_template",
    ]),
    executable: false,
  },
  {
    id: "exactly_one_pilot_agent_allocation",
    title: "Exactly one pilot-agent allocation",
    repository: "Mianxai/MianX.ai",
    projectScope: `Pilot project evidence ${PILOT_PROJECT_ID}`,
    scope: `Allocate only ${PILOT_AGENT_SLUG} once`,
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    taskOrEnvelope: "Allocation only — no queue or generation",
    maximumCostMicrousd: PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd,
    expiresInMinutes: 15,
    prohibits: withRequiredProhibits([
      "second_agent_allocation",
      "activation_without_authorization",
    ]),
    executable: false,
  },
  {
    id: "exactly_one_pilot_task_queue",
    title: "Exactly one pilot task queue",
    repository: "Mianxai/MianX.ai",
    projectScope: `Pilot project evidence ${PILOT_PROJECT_ID}`,
    scope: "Queue one task matching authorization envelope on pilot project only",
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    taskOrEnvelope: "Exactly one queued task; max attempts 1; concurrency 1",
    maximumCostMicrousd: PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd,
    expiresInMinutes: 15,
    prohibits: withRequiredProhibits([
      "second_queued_task",
      "auto_retry",
      "scheduler_auto_create",
    ]),
    executable: false,
  },
  {
    id: "switch_enablement",
    title: "Switch enablement",
    repository: "Mianxai/MianX.ai",
    projectScope: `Pilot project evidence ${PILOT_PROJECT_ID}`,
    scope: "Enable LIVE_AGENT_EXECUTION_ENABLED then LIVE_AGENT_PILOT_ENABLED",
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    taskOrEnvelope: "Requires phases 1–9 complete including authorization, allocation, queue",
    maximumCostMicrousd: PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd,
    expiresInMinutes: 15,
    prohibits: withRequiredProhibits([
      "enable_without_phases_1_9",
      "extra_generation_calls",
    ]),
    executable: false,
  },
  {
    id: "exactly_one_generation_attempt",
    title: "Exactly one generation attempt",
    repository: "Mianxai/MianX.ai",
    projectScope: `Pilot project evidence ${PILOT_PROJECT_ID}`,
    scope: "One OpenAI Responses create with tools:[] store:false",
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    taskOrEnvelope: "Single Responses attempt within authorized token/cost envelope",
    maximumCostMicrousd: PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd,
    expiresInMinutes: 15,
    prohibits: withRequiredProhibits([
      "second_attempt",
      "streaming",
      "tools",
      "store_true",
    ]),
    executable: false,
  },
  {
    id: "post_run_switch_off",
    title: "Post-run switch-off",
    repository: "Mianxai/MianX.ai",
    projectScope: `Pilot project evidence ${PILOT_PROJECT_ID}`,
    scope: "Disable pilot switch then execution switch after run or abort",
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    taskOrEnvelope: "Immediate post-run or abort switch-off",
    maximumCostMicrousd: null,
    expiresInMinutes: 60,
    prohibits: withRequiredProhibits([
      "leaving_switches_on_by_default",
      "deleting_evidence",
    ]),
    executable: false,
  },
  {
    id: "evidence_acceptance",
    title: "Evidence acceptance",
    repository: "Mianxai/MianX.ai",
    projectScope: `Pilot project evidence ${PILOT_PROJECT_ID}`,
    scope: "Accept or reject durable first-call evidence without altering Founder Proof/Final Review",
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    taskOrEnvelope: "Evidence review only",
    maximumCostMicrousd: PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd,
    expiresInMinutes: 1440,
    prohibits: withRequiredProhibits([
      "fabricating_success",
      "incrementing_live_tested_without_genuine_gate",
      "deleting_evidence",
    ]),
    executable: false,
  },
]);

export const FOUNDER_ACTION_PHASES = Object.freeze([
  {
    phase: 1,
    title: "Secure key configuration",
    owner: "Founder",
    mutationRequired: true,
    authorizationRequired: "Founder secure key configuration confirmation",
    action:
      "Founder manually adds OPENAI_API_KEY through Vercel sensitive Production environment UI.",
    evidence: "Vercel env saved; redeploy scheduled",
    rollback: "Remove or rotate key in Vercel Production",
    stopCondition: "Key cannot be stored as sensitive Production env",
    completed: false,
  },
  {
    phase: 2,
    title: "Redeploy and key-presence verification",
    owner: "Founder",
    mutationRequired: false,
    authorizationRequired: "Founder",
    action: "Production redeploy and safe boolean key-presence verification.",
    evidence: "apiKeyConfigured true|false only (never secret material)",
    rollback: "Remove key; redeploy",
    stopCondition: "Presence check would expose secret fragments",
    completed: false,
  },
  {
    phase: 3,
    title: "Authorize model-access check",
    owner: "Founder",
    mutationRequired: false,
    authorizationRequired: "One-time Models API check template",
    action: "Founder separately authorizes exactly one account model-access check.",
    evidence: "Signed Models-API-only authorization record",
    rollback: "Revoke authorization; leave accountAccessStatus not_checked",
    stopCondition: "Key absent or store unavailable",
    completed: false,
  },
  {
    phase: 4,
    title: "Execute model-access check",
    owner: "Founder-authorized server path",
    mutationRequired: true,
    authorizationRequired: "Phase 3 authorization",
    action: "Run exactly one model-access check for approved model/snapshot.",
    evidence: "accountAccessStatus verified|unavailable|mismatch|failed",
    rollback: "Revert to not_checked; revoke authorization",
    stopCondition: "Model missing or mismatch",
    completed: false,
  },
  {
    phase: 5,
    title: "Review model-access result",
    owner: "Founder",
    mutationRequired: false,
    authorizationRequired: "Founder",
    action: "Review model-access result.",
    evidence: "Founder written review note",
    rollback: "Do not proceed to billing verification",
    stopCondition: "accountAccessStatus !== verified",
    completed: false,
  },
  {
    phase: 6,
    title: "Billing path and cost envelope",
    owner: "Founder",
    mutationRequired: false,
    authorizationRequired: "Founder",
    action: "Verify billing path and cost envelope.",
    evidence: "billingModeStatus standard; cost within 100000 µUSD ceiling",
    rollback: "billingModeStatus unknown blocks generation",
    stopCondition: "Cannot prove cost bound at pilot caps",
    completed: false,
  },
  {
    phase: 7,
    title: "One-time live-run authorization",
    owner: "Founder",
    mutationRequired: true,
    authorizationRequired: "One-time live-run authorization template",
    action: "Create exactly one one-time live-run authorization.",
    evidence: "Single authorized row with envelope hash and expiry",
    rollback: "Revoke authorization; no provider call",
    stopCondition: "Envelope mismatch or duplicate outstanding auth",
    completed: false,
  },
  {
    phase: 8,
    title: "Allocate pilot agent",
    owner: "Founder",
    mutationRequired: true,
    authorizationRequired: "Founder",
    action: "Allocate exactly one approved pilot agent.",
    evidence: "allocated=1 for pilot slug only",
    rollback: "Deallocate",
    stopCondition: "Second agent allocation requested",
    completed: false,
  },
  {
    phase: 9,
    title: "Queue bounded pilot task",
    owner: "Founder",
    mutationRequired: true,
    authorizationRequired: "Exactly one pilot task queue template",
    action: "Queue exactly one bounded pilot task.",
    evidence: "queueCount=1; task envelope matches authorization",
    rollback: "Cancel task; kill switch",
    stopCondition: "Queue depth would exceed 1",
    completed: false,
  },
  {
    phase: 10,
    title: "Enable execution switch",
    owner: "Founder",
    mutationRequired: true,
    authorizationRequired: "Switch enablement template",
    action: "Enable execution switch (LIVE_AGENT_EXECUTION_ENABLED).",
    evidence: "executionSwitch true; preflight blockers cleared",
    rollback: "Set execution switch false",
    stopCondition: "Any preflight blocker remains",
    completed: false,
  },
  {
    phase: 11,
    title: "Enable pilot switch",
    owner: "Founder",
    mutationRequired: true,
    authorizationRequired: "Switch enablement template",
    action: "Enable pilot switch (LIVE_AGENT_PILOT_ENABLED).",
    evidence: "pilotSwitch true after execution switch",
    rollback: "Disable pilot then execution",
    stopCondition: "Execution switch not enabled first",
    completed: false,
  },
  {
    phase: 12,
    title: "Single Responses generation attempt",
    owner: "Founder-authorized runtime",
    mutationRequired: true,
    authorizationRequired: "Exactly one generation attempt template",
    action: "Run exactly one Responses generation attempt.",
    evidence: "providerRequestId, usage, cost, schema validation",
    rollback: "Kill switch; disable switches",
    stopCondition: "Any gate failure before network",
    completed: false,
  },
  {
    phase: 13,
    title: "Immediate switch disable",
    owner: "Founder",
    mutationRequired: true,
    authorizationRequired: "Post-run switch-off template",
    action: "Immediately disable both switches (pilot then execution).",
    evidence: "Both switches false",
    rollback: "N/A",
    stopCondition: "N/A",
    completed: false,
  },
  {
    phase: 14,
    title: "Evidence verification",
    owner: "Founder",
    mutationRequired: false,
    authorizationRequired: "Evidence acceptance template",
    action:
      "Verify durable response, request ID, usage, cost, checksum and terminal evidence.",
    evidence: "Evidence row complete; checksum valid",
    rollback: "Manual review; never delete evidence",
    stopCondition: "Missing required evidence fields",
    completed: false,
  },
  {
    phase: 15,
    title: "Live-tested decision",
    owner: "Founder",
    mutationRequired: false,
    authorizationRequired: "Founder",
    action: "Decide whether the agent may be marked live-tested.",
    evidence: "Explicit Founder decision record",
    rollback: "Leave liveTested false",
    stopCondition: "Evidence incomplete or indeterminate attempt",
    completed: false,
  },
]);

export const FIRST_CALL_PASS_CRITERIA = Object.freeze([
  "exactly_one_provider_attempt",
  "provider_request_id_captured",
  "strict_schema_passes",
  "durable_output_saved",
  "token_usage_saved",
  "estimated_cost_saved",
  "cost_within_authorization",
  "latency_saved",
  "evidence_checksum_valid",
  "authorization_consumed_once",
  "no_duplicate_tick_call",
  "no_second_attempt",
  "switches_disabled_after_run",
  "founder_proof_unchanged",
  "founder_final_review_unchanged",
]);

export const FIRST_CALL_FAIL_OR_MANUAL_REVIEW = Object.freeze([
  "missing_provider_request_id",
  "schema_failure",
  "token_mismatch",
  "cost_mismatch",
  "evidence_checksum_mismatch",
  "persistence_ambiguity",
  "provider_timeout",
  "wall_timeout",
  "uncertain_provider_attempt_state",
  "duplicate_execution_indication",
]);

export const FIRST_CALL_ACCEPTANCE_CRITERIA = Object.freeze({
  pass: FIRST_CALL_PASS_CRITERIA,
  automaticFailOrManualReview: FIRST_CALL_FAIL_OR_MANUAL_REVIEW,
  noAutomaticRetryOnUncertain: true,
  duplicateCallProhibited: true,
  uncertainCallRequiresManualReview: true,
});

const BLOCKER_FIELD_DEFS = Object.freeze([
  {
    key: "authorizationStore",
    label: "Authorization store",
    owner: "Platform (migration applied)",
    requiredValue: "available",
    mutationRequired: false,
    authorizationRequired: "Founder migration apply (complete)",
    evidence: "Table pilot_live_run_authorizations present",
    rollback: "Not recommended; store must remain for future auth",
    stopCondition: "Store unavailable",
  },
  {
    key: "authorizationRows",
    label: "Authorization rows",
    owner: "Founder",
    requiredValue: "1 authorized row at attempt time (currently 0)",
    mutationRequired: true,
    authorizationRequired: "One-time live-run authorization template",
    evidence: "COUNT authorized rows = 0 until Phase 7",
    rollback: "Revoke authorization",
    stopCondition: "Duplicate outstanding authorized row",
  },
  {
    key: "providerConfigured",
    label: "Provider configured",
    owner: "Founder",
    requiredValue: "openai",
    mutationRequired: true,
    authorizationRequired: "Secure key configuration",
    evidence: "providerName openai after key + model env",
    rollback: "Remove key",
    stopCondition: "providerName remains none",
  },
  {
    key: "apiKeyConfigured",
    label: "API key configured",
    owner: "Founder",
    requiredValue: true,
    mutationRequired: true,
    authorizationRequired: "Secure key configuration confirmation",
    evidence: "apiKeyConfigured boolean only",
    rollback: "Remove Vercel env",
    stopCondition: "Key absent",
  },
  {
    key: "officialCatalogStatus",
    label: "Official catalog status",
    owner: "Platform docs",
    requiredValue: "verified",
    mutationRequired: false,
    authorizationRequired: "None (docs verified)",
    evidence: "Registry gpt-5.4-mini + snapshot",
    rollback: "Revert doc verification if catalog changes",
    stopCondition: "Catalog mismatch",
  },
  {
    key: "accountAccessStatus",
    label: "Account access status",
    owner: "Founder-authorized check",
    requiredValue: "verified",
    mutationRequired: true,
    authorizationRequired: "One-time Models API check",
    evidence: "Models API result persisted",
    rollback: "not_checked",
    stopCondition: "unavailable or mismatch",
  },
  {
    key: "approvedModel",
    label: "Approved model",
    owner: "Platform policy",
    requiredValue: OPENAI_PILOT_MODEL_ID,
    mutationRequired: false,
    authorizationRequired: "Allowlist",
    evidence: "PILOT_POLICY allowlist",
    rollback: "Unset LIVE_AGENT_OPENAI_MODEL",
    stopCondition: "Model not allowlisted",
  },
  {
    key: "approvedSnapshot",
    label: "Approved snapshot",
    owner: "Platform policy",
    requiredValue: OPENAI_PILOT_MODEL_SNAPSHOT,
    mutationRequired: false,
    authorizationRequired: "Allowlist",
    evidence: "Registry snapshot id",
    rollback: "Revert env to alias",
    stopCondition: "Snapshot mismatch",
  },
  {
    key: "officialPricingStatus",
    label: "Official pricing status",
    owner: "Platform docs",
    requiredValue: "verified",
    mutationRequired: false,
    authorizationRequired: "None (docs verified)",
    evidence: "Official pricing retrieval 2026-08-03",
    rollback: "unverified if prices change",
    stopCondition: "Pricing not verifiable",
  },
  {
    key: "billingPathStatus",
    label: "Billing-path status",
    owner: "Founder",
    requiredValue: "standard",
    mutationRequired: true,
    authorizationRequired: "Founder billing verification",
    evidence: "billingModeStatus standard",
    rollback: "unknown blocks generation",
    stopCondition: "billing unknown",
  },
  {
    key: "schedulerHealth",
    label: "Scheduler health",
    owner: "Platform",
    requiredValue: "healthy",
    mutationRequired: false,
    authorizationRequired: "None",
    evidence: "supabase_cron / supabase_primary_active",
    rollback: "Pause scheduler",
    stopCondition: "scheduler unhealthy",
  },
  {
    key: "executionSwitch",
    label: "Execution switch",
    owner: "Founder",
    requiredValue: true,
    mutationRequired: true,
    authorizationRequired: "Switch enablement template",
    evidence: "LIVE_AGENT_EXECUTION_ENABLED true at attempt",
    rollback: "Set false in Vercel",
    stopCondition: "Enabled before gates pass",
  },
  {
    key: "pilotSwitch",
    label: "Pilot switch",
    owner: "Founder",
    requiredValue: true,
    mutationRequired: true,
    authorizationRequired: "Switch enablement template",
    evidence: "LIVE_AGENT_PILOT_ENABLED true after execution switch",
    rollback: "Set false in Vercel",
    stopCondition: "Pilot enabled before execution switch",
  },
  {
    key: "pilotAgentAllocation",
    label: "Pilot agent allocation",
    owner: "Founder",
    requiredValue: "1 allocated / 0 active / 0 live-tested until evidence accepted",
    mutationRequired: true,
    authorizationRequired: "Founder allocation",
    evidence: "Workforce counters",
    rollback: "Deallocate",
    stopCondition: "More than one allocation",
  },
  {
    key: "queueCount",
    label: "Queue count",
    owner: "Founder",
    requiredValue: "1 at run (currently 0)",
    mutationRequired: true,
    authorizationRequired: "Exactly one pilot task queue",
    evidence: "queueCount",
    rollback: "Cancel queued task",
    stopCondition: "queue > 1",
  },
  {
    key: "concurrentRuns",
    label: "Concurrent runs",
    owner: "Runtime",
    requiredValue: 0,
    mutationRequired: false,
    authorizationRequired: "Concurrency policy",
    evidence: "concurrentRuns = 0 pre-run",
    rollback: "Kill switch",
    stopCondition: "concurrent > 0 before attempt",
  },
  {
    key: "oneTimeLiveRunAuthorization",
    label: "One-time live-run authorization",
    owner: "Founder",
    requiredValue: "authorized (not consumed until attempt)",
    mutationRequired: true,
    authorizationRequired: "One-time live-run authorization template",
    evidence: "Authorization row status",
    rollback: "Revoke",
    stopCondition: "Missing or expired",
  },
  {
    key: "evidenceStore",
    label: "Evidence store",
    owner: "Platform",
    requiredValue: "available",
    mutationRequired: false,
    authorizationRequired: "None",
    evidence: "Durable evidence contract ready",
    rollback: "Never delete historical evidence",
    stopCondition: "Store unavailable",
  },
  {
    key: "providerCallAllowed",
    label: "Provider-call allowed",
    owner: "Control plane",
    requiredValue: true,
    mutationRequired: false,
    authorizationRequired: "All gates + authorization",
    evidence: "execution lock evaluation",
    rollback: "Fail closed",
    stopCondition: "Any blocker",
  },
  {
    key: "liveExecutionReady",
    label: "Live execution ready",
    owner: "Control plane",
    requiredValue: true,
    mutationRequired: false,
    authorizationRequired: "All gates + evidence path",
    evidence: "Admin status",
    rollback: "Disable switches",
    stopCondition: "Any blocker",
  },
  {
    key: "founderFinalReviewIndependence",
    label: "Founder Final Review independence",
    owner: "Governance",
    requiredValue: "independent — not approved by pilot run",
    mutationRequired: false,
    authorizationRequired: "Separate Founder Final Review process",
    evidence: "Founder Final Review status unchanged",
    rollback: "N/A",
    stopCondition: "Pilot run must not auto-approve Final Review",
  },
]);

function readCurrentBlockerValues(input = {}) {
  const presence = getApiKeyPresenceStatus();
  const providerName = resolveConfiguredProviderName() || "none";
  const account = getAccountAccessStatus();
  const billing = getBillingPathReadinessStatus();
  const store = getLivePilotStoreSnapshot();
  const auths = listLiveRunAuthorizationFixtures();
  const realAuth =
    input.authorizationRowCount != null
      ? Number(input.authorizationRowCount)
      : auths.filter((a) => a.status === "authorized").length;
  const authStoreStatus = input.authorizationStoreStatus || "available";
  const workforce = input.workforce || {};

  return {
    authorizationStore: authStoreStatus,
    authorizationRows: realAuth,
    providerConfigured: providerName,
    apiKeyConfigured: presence.apiKeyConfigured === true,
    officialCatalogStatus: "verified",
    accountAccessStatus: account.accountAccessStatus,
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    officialPricingStatus: billing.officialPricingStatus,
    billingPathStatus: billing.billingModeStatus,
    schedulerHealth: input.schedulerHealth || "healthy",
    executionSwitch: isGlobalLiveExecutionEnabled(),
    pilotSwitch: isPilotLiveExecutionEnabled(),
    pilotAgentAllocation: `${Number(workforce.allocatedSeats || 0)}/${Number(workforce.activeInstances || 0)}/${Number(workforce.liveTestedSeats || 0)}`,
    queueCount: Number(input.queuedPilotTasks ?? countQueuedPilotTasks()),
    concurrentRuns: Number(input.concurrentPilotRuns ?? countActivePilotLeases()),
    oneTimeLiveRunAuthorization:
      auths.find((a) => a.status === "authorized")?.authorizationId || "none",
    evidenceStore: Array.isArray(store?.evidence) ? "available" : "available",
    providerCallAllowed: false,
    liveExecutionReady: false,
    founderFinalReviewIndependence: "independent",
  };
}

/**
 * @param {object} [input]
 * @returns {{ version: string, rows: object[], blockers: string[], providerCallAllowed: false, liveExecutionReady: false }}
 */
export function buildFirstLiveRunBlockerMatrix(input = {}) {
  const current = readCurrentBlockerValues(input);
  const rows = BLOCKER_FIELD_DEFS.map((def) => ({
    key: def.key,
    label: def.label,
    currentValue: current[def.key],
    requiredValue: def.requiredValue,
    owner: def.owner,
    mutationRequired: def.mutationRequired,
    authorizationRequired: def.authorizationRequired,
    evidence: def.evidence,
    rollback: def.rollback,
    stopCondition: def.stopCondition,
    blocking:
      def.key === "authorizationStore"
        ? current.authorizationStore !== "available"
        : def.key === "authorizationRows"
          ? current.authorizationRows !== 0 && current.authorizationRows !== 1
          : def.key === "providerConfigured"
            ? current.providerConfigured !== "openai"
            : def.key === "apiKeyConfigured"
              ? current.apiKeyConfigured !== true
              : def.key === "accountAccessStatus"
                ? current.accountAccessStatus !== "verified"
                : def.key === "billingPathStatus"
                  ? current.billingPathStatus !== "standard"
                  : def.key === "executionSwitch" || def.key === "pilotSwitch"
                    ? current[def.key] !== true
                    : def.key === "queueCount"
                      ? current.queueCount !== 0 && current.queueCount !== 1
                      : def.key === "oneTimeLiveRunAuthorization"
                        ? current.oneTimeLiveRunAuthorization === "none"
                        : def.key === "providerCallAllowed" || def.key === "liveExecutionReady"
                          ? current[def.key] !== true
                          : false,
  }));

  const blockers = rows.filter((r) => r.blocking).map((r) => r.key);

  return {
    version: FIRST_LIVE_RUN_PACKET_VERSION,
    pr87MergeCommit: PR87_MERGE_COMMIT,
    rows,
    blockers,
    providerCallAllowed: false,
    liveExecutionReady: false,
    genuineProviderCalls: 0,
    authenticatedModelsApiCalls: 0,
  };
}

export function buildBoundedTaskEnvelopeTemplate() {
  return Object.freeze({
    taskPurpose:
      "Perform one read-only architectural risk review of a Founder-approved internal task and return strict structured output.",
    allowedInput:
      "Single bounded task description, architecture context, and explicit review questions approved by Founder.",
    prohibitedInput:
      "Secrets, credentials, production customer data, unrelated projects, shell commands, deploy instructions, or multi-task batches.",
    maximumInputCharacters: 16000,
    maximumInputTokens: PILOT_TOKEN_CAPS.maximumInputTokens,
    maximumOutputTokens: PILOT_TOKEN_CAPS.maximumOutputTokens,
    maximumTotalTokens: PILOT_TOKEN_CAPS.maximumTotalTokens,
    approvedProvider: "openai",
    approvedModel: OPENAI_PILOT_MODEL_ID,
    approvedSnapshot: OPENAI_PILOT_MODEL_SNAPSHOT,
    tools: [],
    store: false,
    maximumCostMicrousd: PILOT_COST_BOUNDS.maximumFounderCeilingMicroUsd,
    standardEstimateMicrousd: PILOT_COST_BOUNDS.standardUncachedEstimateMicroUsd,
    providerTimeoutMs: PILOT_POLICY.maxProviderTimeoutMs,
    wallTimeoutMs: PILOT_POLICY.maxWallClockMs,
    maxAttempts: 1,
    maxConcurrentRequests: 1,
    maxQueuedPilotTasks: 1,
    strictResponseSchema: true,
    expectedEvidenceFields: [...EVIDENCE_REQUIRED_FIELDS],
    pilotIdentity: { ...PILOT_IDENTITY },
    createRealTask: false,
    queueRealTask: false,
  });
}

export function getFounderActionPhases() {
  return FOUNDER_ACTION_PHASES.map((p) => ({ ...p }));
}

export function assertNoSecretFieldsInPacket(obj) {
  const blob = JSON.stringify(obj);
  // Env var *name* may appear in Founder instructions; secret *values* must not.
  if (/sk-[a-zA-Z0-9]{8,}/.test(blob)) {
    return { ok: false, reason: "forbidden_pattern:sk-" };
  }
  if (/"apiKey"\s*:/.test(blob) || /"api_key"\s*:/.test(blob)) {
    return { ok: false, reason: "forbidden_field:apiKey" };
  }
  if (/Bearer\s+[A-Za-z0-9._-]{8,}/.test(blob)) {
    return { ok: false, reason: "forbidden_pattern:Authorization" };
  }
  return { ok: true };
}

/**
 * Read-only Founder checklist for Admin (no controls).
 * @param {object} [input]
 */
export function buildFirstLiveRunFounderChecklist(input = {}) {
  const matrix = buildFirstLiveRunBlockerMatrix(input);
  const phases = getFounderActionPhases();
  const nextPhase = phases.find((p) => !p.completed) || phases[0];

  const completedFoundation = [
    { item: "Authorization store migration applied", done: matrix.rows.find((r) => r.key === "authorizationStore")?.currentValue === "available" },
    { item: "Official catalog verified (docs)", done: true },
    { item: "Official pricing verified (docs)", done: true },
    { item: "Scheduler healthy", done: matrix.rows.find((r) => r.key === "schedulerHealth")?.currentValue === "healthy" },
    { item: "Evidence store contract ready", done: true },
    { item: "Control plane preparation merged (PR #87)", done: true },
    { item: "Switches default off", done: !matrix.rows.find((r) => r.key === "executionSwitch")?.currentValue },
    { item: "Zero genuine provider calls", done: true },
  ];

  return {
    heading: "First live-run Founder checklist (read-only)",
    preparationOnly: true,
    runNowActionPresent: false,
    secretInputPresent: false,
    apiKeyFieldPresent: false,
    switchEnableControlsPresent: false,
    allocationControlsPresent: false,
    automaticAuthorizationPresent: false,
    completedFoundation,
    /** Always-visible Production zero-state (not only blocking keys). */
    baselineZeroState: {
      authorizationStore: matrix.rows.find((r) => r.key === "authorizationStore")?.currentValue,
      providerConfigured: matrix.rows.find((r) => r.key === "providerConfigured")?.currentValue,
      apiKeyConfigured: matrix.rows.find((r) => r.key === "apiKeyConfigured")?.currentValue,
      accountAccessStatus: matrix.rows.find((r) => r.key === "accountAccessStatus")?.currentValue,
      billingPathStatus: matrix.rows.find((r) => r.key === "billingPathStatus")?.currentValue,
      billingCreditStatus: "not_checked",
      billingModeStatus: "unknown",
      realAuthorization:
        matrix.rows.find((r) => r.key === "oneTimeLiveRunAuthorization")?.currentValue || "none",
      allocatedAgents: (() => {
        const raw = matrix.rows.find((r) => r.key === "pilotAgentAllocation")?.currentValue;
        if (typeof raw === "number") return raw;
        if (typeof raw === "string") return Number(raw.split("/")[0]) || 0;
        return 0;
      })(),
      queuedTasks: Number(matrix.rows.find((r) => r.key === "queueCount")?.currentValue ?? 0),
      concurrentRuns: Number(matrix.rows.find((r) => r.key === "concurrentRuns")?.currentValue ?? 0),
      executionSwitch: matrix.rows.find((r) => r.key === "executionSwitch")?.currentValue === true,
      pilotSwitch: matrix.rows.find((r) => r.key === "pilotSwitch")?.currentValue === true,
      providerCalls: 0,
      modelsApiCalls: 0,
      generationCalls: 0,
      providerCallAllowed: false,
      liveExecutionReady: false,
    },
    currentBlockers: matrix.blockers,
    blockerMatrixSummary: matrix.rows
      .filter((r) => r.blocking)
      .map((r) => ({ key: r.key, currentValue: r.currentValue, requiredValue: r.requiredValue })),
    nextManualFounderAction: {
      phase: nextPhase.phase,
      title: nextPhase.title,
      action: nextPhase.action,
    },
    prohibitedActions: [
      "Paste OPENAI_API_KEY into Admin, chat, or Terminal",
      "Enable live switches from this page",
      "Run now or trigger generation from Admin",
      "Allocate or activate agents from this page",
      "Create authorization automatically",
      "Approve or mutate Founder Final Review from pilot flow",
      "Auto-retry uncertain provider attempts",
      "Delete historical evidence on rollback",
    ],
    switchOrder: SWITCH_ORDER,
    taskEnvelope: buildBoundedTaskEnvelopeTemplate(),
    acceptanceCriteria: FIRST_CALL_ACCEPTANCE_CRITERIA,
    authorizationTemplates: FOUNDER_AUTHORIZATION_TEMPLATES.map((t) => ({ ...t })),
    rollbackClasses: ROLLBACK_CLASSES.map((r) => ({ ...r })),
    founderProofIndependent: true,
    founderFinalReviewIndependent: true,
    providerCallAllowed: false,
    liveExecutionReady: false,
    genuineProviderCalls: 0,
    authenticatedModelsApiCalls: 0,
  };
}

export function buildFirstLiveRunReadinessPacket(input = {}) {
  return {
    version: FIRST_LIVE_RUN_PACKET_VERSION,
    pr87MergeCommit: PR87_MERGE_COMMIT,
    pilotIdentity: { ...PILOT_IDENTITY },
    blockerMatrix: buildFirstLiveRunBlockerMatrix(input),
    founderActionPhases: getFounderActionPhases(),
    taskEnvelope: buildBoundedTaskEnvelopeTemplate(),
    acceptanceCriteria: FIRST_CALL_ACCEPTANCE_CRITERIA,
    switchOrder: SWITCH_ORDER,
    rollbackClasses: ROLLBACK_CLASSES,
    authorizationTemplates: FOUNDER_AUTHORIZATION_TEMPLATES.map((t) => ({ ...t })),
    founderChecklist: buildFirstLiveRunFounderChecklist(input),
    documentPath: "doc/ONE-AGENT-FIRST-LIVE-RUN-READINESS-PACKET.md",
    previewTruthOnly: true,
    noNetwork: true,
    noProductionMutation: true,
  };
}
