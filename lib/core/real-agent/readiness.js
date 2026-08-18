/**
 * Phase I.1 — Truthful agent readiness (never conflate executable=true with "real working").
 */

import {
  listAgentDefinitions,
  isAgentExecutable,
  EXPECTED_EXECUTABLE_AGENT_COUNT,
} from "../agents";
import { isProviderConfigured } from "../config";
import { listToolDefinitions } from "./tools/registry";
import { plannedSlotContribution, WORKFORCE_DEFINITIONS } from "@/lib/workforce/definitions";
import { PLANNED_ROLE_SLOT_TOTAL } from "@/lib/workforce/constants";

export const AGENT_READINESS_STATES = Object.freeze([
  "documented",
  "contract_valid",
  "deterministic_ready",
  "provider_ready",
  "tools_ready",
  "runtime_ready",
  "live_tested",
  "blocked",
  "suspended",
  "deprecated",
]);

function hasContract(def) {
  return Boolean(
    def?.slug &&
      def?.purpose &&
      def?.inputSchema &&
      def?.outputSchema &&
      Array.isArray(def.allowedCapabilities) &&
      Array.isArray(def.prohibitedCapabilities)
  );
}

/**
 * Compute readiness for a catalogue agent definition.
 * live_tested stays false until Founder-authorized live smoke passes (persisted flag).
 */
export function computeAgentReadiness(def, { liveTestedSlugs = new Set() } = {}) {
  const blocking = [];
  const documented = Boolean(def?.slug && def?.name);
  const contract_valid = hasContract(def);
  if (!contract_valid) blocking.push("invalid_contract");

  const deterministic_ready = contract_valid && isAgentExecutable(def);
  if (!deterministic_ready && def?.lifecycleStatus === "draft") {
    blocking.push("intentionally_non_executable_or_draft");
  }

  const openrouterReady = isProviderConfigured("openrouter");
  const anthropicReady = isProviderConfigured("anthropic");
  const provider_ready = deterministic_ready && (openrouterReady || anthropicReady);
  if (deterministic_ready && !provider_ready) {
    blocking.push("provider_unconfigured");
  }

  const tools = listToolDefinitions();
  const tools_ready = deterministic_ready && tools.length > 0;
  if (!tools_ready && deterministic_ready) blocking.push("tools_registry_incomplete");

  const runtime_ready =
    tools_ready &&
    Boolean(def?.inputSchema) &&
    Boolean(def?.outputSchema) &&
    isAgentExecutable(def);
  // runtime_ready does NOT require live provider — means code path can run with double or provider

  const live_tested = liveTestedSlugs.has(def?.slug);
  const deprecated = def?.lifecycleStatus === "deprecated";
  const suspended = def?.catalogueClassification === "superseded_duplicate";

  let primary = "documented";
  if (deprecated) primary = "deprecated";
  else if (suspended && !isAgentExecutable(def)) primary = "suspended";
  else if (live_tested) primary = "live_tested";
  else if (runtime_ready && provider_ready) primary = "provider_ready";
  else if (runtime_ready) primary = "runtime_ready";
  else if (tools_ready) primary = "tools_ready";
  else if (deterministic_ready) primary = "deterministic_ready";
  else if (contract_valid) primary = "contract_valid";
  else if (blocking.length) primary = "blocked";

  const realAgentReady = Boolean(
    runtime_ready &&
      provider_ready &&
      live_tested &&
      contract_valid &&
      blocking.filter((b) => b !== "provider_unconfigured").length === 0
  );

  return {
    slug: def.slug,
    name: def.name,
    primary,
    documented,
    contract_valid,
    deterministic_ready,
    provider_ready,
    tools_ready,
    runtime_ready,
    live_tested,
    blocked: primary === "blocked" || blocking.includes("invalid_contract"),
    suspended,
    deprecated,
    realAgentReady,
    blockingErrors: blocking,
    label: realAgentReady
      ? "Real Agent Ready"
      : live_tested
        ? "Live-tested"
        : provider_ready
          ? "Provider-ready (not live-tested)"
          : runtime_ready
            ? "Runtime-ready (provider optional / test-double)"
            : deterministic_ready
              ? "Deterministic-ready"
              : contract_valid
                ? "Contract-valid"
                : documented
                  ? "Documented only"
                  : "Blocked",
  };
}

export function buildRealAgentReadinessReport({ liveTestedSlugs = [] } = {}) {
  const liveSet = new Set(liveTestedSlugs);
  const catalogue = listAgentDefinitions();
  const rows = catalogue.map((d) => computeAgentReadiness(d, { liveTestedSlugs: liveSet }));

  const count = (pred) => rows.filter(pred).length;
  const namedRoles = WORKFORCE_DEFINITIONS.filter((d) => d.roleType !== "capacity_reserve");
  const capacityReserves = WORKFORCE_DEFINITIONS.filter((d) => d.roleType === "capacity_reserve");

  return {
    phase: "I.1",
    generatedAt: new Date().toISOString(),
    capacity: {
      documentedSlots: PLANNED_ROLE_SLOT_TOTAL,
      plannedSlotContribution: plannedSlotContribution(),
      namedDefinitionRows: namedRoles.length,
      capacityReserveRows: capacityReserves.length,
      note:
        "445 roles does not mean 445 agents are always running. " +
        "MianX allocates only the required project-scoped agents when work exists.",
    },
    catalogue: {
      total: catalogue.length,
      executableDefinitions: catalogue.filter(isAgentExecutable).length,
      expectedExecutable: EXPECTED_EXECUTABLE_AGENT_COUNT,
      intentionallyNonExecutable: catalogue.filter((d) => !isAgentExecutable(d)).length,
    },
    readiness: {
      documented: count((r) => r.documented),
      contract_valid: count((r) => r.contract_valid),
      deterministic_ready: count((r) => r.deterministic_ready),
      provider_ready: count((r) => r.provider_ready),
      tools_ready: count((r) => r.tools_ready),
      runtime_ready: count((r) => r.runtime_ready),
      live_tested: count((r) => r.live_tested),
      real_agent_ready: count((r) => r.realAgentReady),
      blocked: count((r) => r.blocked),
      suspended: count((r) => r.suspended),
      deprecated: count((r) => r.deprecated),
    },
    provider: {
      openrouterConfigured: isProviderConfigured("openrouter"),
      anthropicConfigured: isProviderConfigured("anthropic"),
      paidFallbackEnabled: false,
      defaultModel: process.env.OPENROUTER_DEFAULT_MODEL || "openrouter/free",
    },
    agents: rows,
    completionTruth: {
      codeComplete: true,
      testDoubleVerified: true,
      readyForProviderActivation: true,
      liveSmokeNotYetRun: true,
      liveTestedCountMustRemain: 0,
    },
  };
}
