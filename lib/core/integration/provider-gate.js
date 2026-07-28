/**
 * Provider gating — no fabricated live execution.
 */

import { isProviderConfigured, providerOperationalStatus } from "../config.js";

export function assessProviderGate({
  execution_mode = "deterministic_simulation",
  founder_enabled_live = false,
  founder_approved = false,
  budget_present = false,
} = {}) {
  const configured = isProviderConfigured("anthropic");
  const status = providerOperationalStatus("anthropic");

  if (execution_mode === "deterministic_simulation") {
    return {
      mode: execution_mode,
      simulation_available: true,
      live_execution_ready: false,
      live_execution_blocked: true,
      block_reason: null,
      provider_status: status,
      provider_configured: configured,
      provider_called: false,
      fabricated_completion: false,
      paid_request_issued: false,
    };
  }

  const blockers = [];
  if (!configured) blockers.push("provider_unconfigured");
  if (!founder_enabled_live) blockers.push("founder_live_mode_not_enabled");
  if (!founder_approved) blockers.push("founder_approval_missing");
  if (!budget_present) blockers.push("execution_budget_missing");
  if (status === "circuit_open") blockers.push("circuit_open");

  const ready = blockers.length === 0;

  return {
    mode: execution_mode,
    simulation_available: true,
    live_execution_ready: ready,
    live_execution_blocked: !ready,
    block_reason: ready ? null : blockers.join(","),
    blockers,
    provider_status: status,
    provider_configured: configured,
    provider_called: false,
    fabricated_completion: false,
    paid_request_issued: false,
    secrets_exposed: false,
  };
}

export function blockLiveWithoutProvider(run) {
  if (run.execution_mode !== "live_provider") {
    return { ok: true, ...assessProviderGate({ execution_mode: run.execution_mode }) };
  }
  const gate = assessProviderGate({
    execution_mode: "live_provider",
    founder_enabled_live: Boolean(run.payload?.founder_enabled_live),
    founder_approved: run.status === "simulating" || run.current_stage === "approved_for_simulation",
    budget_present: Boolean(run.payload?.budget_present),
  });
  return { ok: gate.live_execution_ready, ...gate };
}
