/**
 * Server-only API key presence check.
 * Allowed output ONLY: { apiKeyConfigured: true|false }.
 * Forbidden: key value, prefix, suffix, length, hash, env dump, headers,
 * providerName (use adapter separately), Authorization header.
 */

import { isOpenAIApiKeyConfigured } from "../openai-adapter";

/**
 * @returns {{ apiKeyConfigured: boolean }}
 */
export function getApiKeyPresenceStatus() {
  return {
    apiKeyConfigured: isOpenAIApiKeyConfigured(),
  };
}

/** Assert response shape never includes secret material. */
export function assertKeyPresencePrivacy(payload) {
  const blob = JSON.stringify(payload || {});
  if (/sk-[a-zA-Z0-9]{8,}/.test(blob)) {
    return { ok: false, code: "SECRET_LEAK_PATTERN" };
  }
  if (/OPENAI_API_KEY\s*[:=]/i.test(blob) && /sk-/i.test(blob)) {
    return { ok: false, code: "ENV_DUMP_DETECTED" };
  }
  const keys = payload && typeof payload === "object" ? Object.keys(payload) : [];
  if (keys.some((k) => k !== "apiKeyConfigured")) {
    return { ok: false, code: "UNEXPECTED_FIELDS" };
  }
  for (const forbidden of [
    "apiKey",
    "api_key",
    "keyPrefix",
    "keySuffix",
    "keyLength",
    "keyHash",
    "Authorization",
    "providerName",
    "calledOpenAI",
  ]) {
    if (
      payload &&
      Object.prototype.hasOwnProperty.call(payload, forbidden)
    ) {
      return { ok: false, code: `FORBIDDEN_FIELD:${forbidden}` };
    }
  }
  return { ok: true };
}
