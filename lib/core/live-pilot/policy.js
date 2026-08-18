/**
 * Server-enforced pilot policy + environment switches (defaults OFF).
 */

import {
  ENV_LIVE_AGENT_EXECUTION_ENABLED,
  ENV_LIVE_AGENT_PILOT_ENABLED,
  PILOT_POLICY,
  PILOT_TOOL_PERMISSIONS,
} from "./constants";

function envFlagTrue(name) {
  return String(process.env[name] || "").trim() === "1" ||
    String(process.env[name] || "").trim().toLowerCase() === "true";
}

export function isGlobalLiveExecutionEnabled() {
  return envFlagTrue(ENV_LIVE_AGENT_EXECUTION_ENABLED);
}

export function isPilotLiveExecutionEnabled() {
  return envFlagTrue(ENV_LIVE_AGENT_PILOT_ENABLED);
}

export function getPilotPolicy() {
  return { ...PILOT_POLICY, toolPermissions: { ...PILOT_TOOL_PERMISSIONS } };
}

export function isModelAllowlisted(modelName) {
  if (!modelName) return false;
  return PILOT_POLICY.allowlistedModels.includes(String(modelName).trim());
}

export function assertTokenBudget({ inputTokens = 0, outputTokens = 0 } = {}) {
  const input = Number(inputTokens) || 0;
  const output = Number(outputTokens) || 0;
  const total = input + output;
  const violations = [];
  if (input > PILOT_POLICY.maxInputTokens) {
    violations.push(`input_tokens>${PILOT_POLICY.maxInputTokens}`);
  }
  if (output > PILOT_POLICY.maxOutputTokens) {
    violations.push(`output_tokens>${PILOT_POLICY.maxOutputTokens}`);
  }
  if (total > PILOT_POLICY.maxTotalTokens) {
    violations.push(`total_tokens>${PILOT_POLICY.maxTotalTokens}`);
  }
  return { ok: violations.length === 0, violations, total };
}

export function assertCostBudget(estimatedCostUsd) {
  const cost = Number(estimatedCostUsd);
  if (!Number.isFinite(cost) || cost < 0) {
    return { ok: false, violations: ["estimated_cost_invalid"] };
  }
  if (cost > PILOT_POLICY.maxEstimatedCostUsd) {
    return {
      ok: false,
      violations: [`estimated_cost>${PILOT_POLICY.maxEstimatedCostUsd}`],
    };
  }
  return { ok: true, violations: [] };
}
