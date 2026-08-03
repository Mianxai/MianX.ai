/**
 * Server-only API key presence check.
 * Allowed output: apiKeyConfigured true|false.
 * Forbidden: key value, prefix, suffix, length, hash, env dump, headers.
 */

import { isOpenAIApiKeyConfigured } from "../openai-adapter";
import { resolveConfiguredProviderName } from "../adapter";

/**
 * @returns {{
 *   apiKeyConfigured: boolean,
 *   providerName: string,
 *   calledOpenAI: false,
 * }}
 */
export function getApiKeyPresenceStatus() {
  return {
    apiKeyConfigured: isOpenAIApiKeyConfigured(),
    providerName: resolveConfiguredProviderName(),
    calledOpenAI: false,
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
  for (const forbidden of [
    "apiKey",
    "api_key",
    "keyPrefix",
    "keySuffix",
    "keyLength",
    "keyHash",
    "Authorization",
  ]) {
    if (
      payload &&
      Object.prototype.hasOwnProperty.call(payload, forbidden) &&
      payload[forbidden] != null &&
      payload[forbidden] !== false
    ) {
      return { ok: false, code: `FORBIDDEN_FIELD:${forbidden}` };
    }
  }
  return { ok: true };
}
