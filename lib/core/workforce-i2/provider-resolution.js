/**
 * Provider resolution — OpenRouter as system default; one-key activation.
 */

import { isProviderConfigured } from "../config";
import { DEFAULT_OPENROUTER } from "./constants";
import { openRouterConfig, isOpenRouterConfigured } from "../real-agent/openrouter";

/**
 * Precedence:
 * 1. task-required provider capability
 * 2. project policy
 * 3. organization policy
 * 4. system default OpenRouter policy
 * 5. fail closed
 */
export function resolveProviderRoute({
  taskRequiredProvider = null,
  projectPolicy = null,
  organizationPolicy = null,
  requireStructured = true,
  requireTools = false,
} = {}) {
  const openrouter = isOpenRouterConfigured();
  const anthropic = isProviderConfigured("anthropic");

  if (taskRequiredProvider === "anthropic" && !anthropic) {
    return {
      ok: false,
      status: "provider_unavailable",
      reason: "TASK_REQUIRES_ANTHROPIC",
      founderExplanation: "This task requires Anthropic, which is not configured.",
    };
  }
  if (taskRequiredProvider === "openrouter" && !openrouter) {
    return {
      ok: false,
      status: "provider_unavailable",
      reason: "OPENROUTER_NOT_CONFIGURED",
      founderExplanation: "Add OPENROUTER_API_KEY to activate real agents.",
    };
  }

  const preferred =
    taskRequiredProvider ||
    projectPolicy?.provider ||
    organizationPolicy?.provider ||
    "openrouter";

  if (preferred === "openrouter") {
    if (!openrouter) {
      // If Anthropic is configured as legacy, still prefer fail messaging for one-key path
      // unless project explicitly asked for anthropic.
      if (anthropic && projectPolicy?.allowAnthropicFallback) {
        return {
          ok: true,
          provider: "anthropic",
          model: projectPolicy.model || null,
          freeOnly: false,
          oneKeyDefault: false,
          note: "Legacy Anthropic allowed by project policy only.",
        };
      }
      return {
        ok: false,
        status: "provider_unavailable",
        reason: "OPENROUTER_NOT_CONFIGURED",
        founderExplanation:
          "Add OPENROUTER_API_KEY. Safe defaults use free-only routing. Paid fallback stays disabled.",
        defaults: DEFAULT_OPENROUTER,
      };
    }
    const cfg = openRouterConfig();
    return {
      ok: true,
      provider: "openrouter",
      model: process.env.OPENROUTER_DEFAULT_MODEL || DEFAULT_OPENROUTER.defaultModel,
      freeOnly:
        process.env.OPENROUTER_FREE_ONLY !== "false" && DEFAULT_OPENROUTER.freeOnly,
      paidFallbackEnabled: false,
      requireStructured,
      requireTools,
      oneKeyDefault: true,
      appName: process.env.OPENROUTER_APP_NAME || DEFAULT_OPENROUTER.appName,
      openRouterHealth: {
        paidFallbackEnabled: cfg.paidFallbackEnabled,
      },
    };
  }

  if (preferred === "anthropic" && anthropic) {
    return { ok: true, provider: "anthropic", oneKeyDefault: false };
  }

  return {
    ok: false,
    status: "provider_unavailable",
    reason: "NO_COMPATIBLE_PROVIDER",
    founderExplanation: "No compatible provider configured. Add OPENROUTER_API_KEY.",
  };
}

export function oneKeyActivationStatus() {
  const keyPresent = isOpenRouterConfigured();
  const route = resolveProviderRoute({});
  return {
    requiredKey: "OPENROUTER_API_KEY",
    keyPresent,
    freeOnlyDefault: true,
    paidFallbackEnabled: false,
    defaults: DEFAULT_OPENROUTER,
    route,
    founderPrimaryAction: keyPresent
      ? "Run Controlled Workforce Activation Check"
      : "Add OpenRouter API Key",
    rolesNeedManualProviderRewrite: false,
    note: "Compatible role contracts use provider-neutral capability profiles; OpenRouter is the system default when the key is present.",
  };
}
