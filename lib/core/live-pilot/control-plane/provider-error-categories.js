/**
 * Sanitized OpenAI / provider error categorization for the one-agent pilot.
 * Mocks and fixtures only in tests — never logs raw provider bodies that may
 * contain sensitive metadata.
 */

export const PROVIDER_FAILURE_CATEGORY = Object.freeze({
  BILLING_INSUFFICIENT_QUOTA: "billing_insufficient_quota",
  BILLING_NOT_ACTIVE: "billing_not_active",
  BILLING_PAYMENT_REQUIRED: "billing_payment_required",
  ACCOUNT_DEACTIVATED: "account_deactivated",
  RATE_LIMIT: "rate_limit_exceeded",
  MODEL_NOT_AVAILABLE: "model_not_available",
  AUTH_FAILURE: "provider_auth_failure",
  TIMEOUT: "provider_timeout",
  SERVER_ERROR: "provider_server_error",
  UNKNOWN: "provider_error_unknown",
});

export const BILLING_RELATED_CATEGORIES = Object.freeze([
  PROVIDER_FAILURE_CATEGORY.BILLING_INSUFFICIENT_QUOTA,
  PROVIDER_FAILURE_CATEGORY.BILLING_NOT_ACTIVE,
  PROVIDER_FAILURE_CATEGORY.BILLING_PAYMENT_REQUIRED,
  PROVIDER_FAILURE_CATEGORY.ACCOUNT_DEACTIVATED,
]);

/**
 * Map provider-ish error shapes to a durable sanitized category.
 * Accepts mock objects only — does not call the network.
 *
 * @param {object|null|undefined} err
 * @returns {{
 *   category: string,
 *   normalizedErrorCode: string,
 *   retryable: false,
 *   operatorBlocker: string,
 *   billingRelated: boolean,
 *   sanitizeOk: true,
 *   rawProviderBodyIncluded: false,
 * }}
 */
export function categorizeProviderError(err) {
  const status = Number(err?.status || err?.statusCode || err?.response?.status || 0) || null;
  const code = String(
    err?.code || err?.error?.code || err?.type || err?.error?.type || ""
  )
    .trim()
    .toLowerCase();
  const message = String(err?.message || err?.error?.message || "").toLowerCase();

  let category = PROVIDER_FAILURE_CATEGORY.UNKNOWN;
  let normalizedErrorCode = "PROVIDER_ERROR";

  if (
    code === "insufficient_quota" ||
    /insufficient[_ ]quota/.test(message) ||
    /exceeded.*quota/.test(message)
  ) {
    category = PROVIDER_FAILURE_CATEGORY.BILLING_INSUFFICIENT_QUOTA;
    normalizedErrorCode = "BILLING_INSUFFICIENT_QUOTA";
  } else if (
    code === "billing_not_active" ||
    /billing[_ ]not[_ ]active/.test(message)
  ) {
    category = PROVIDER_FAILURE_CATEGORY.BILLING_NOT_ACTIVE;
    normalizedErrorCode = "BILLING_NOT_ACTIVE";
  } else if (
    code === "payment_required" ||
    status === 402 ||
    /payment[_ ]required/.test(message)
  ) {
    category = PROVIDER_FAILURE_CATEGORY.BILLING_PAYMENT_REQUIRED;
    normalizedErrorCode = "BILLING_PAYMENT_REQUIRED";
  } else if (
    code === "account_deactivated" ||
    /account[_ ]deactivated/.test(message) ||
    /deactivated/.test(message)
  ) {
    category = PROVIDER_FAILURE_CATEGORY.ACCOUNT_DEACTIVATED;
    normalizedErrorCode = "ACCOUNT_DEACTIVATED";
  } else if (
    code === "rate_limit_exceeded" ||
    status === 429 ||
    /rate[_ ]limit/.test(message)
  ) {
    category = PROVIDER_FAILURE_CATEGORY.RATE_LIMIT;
    normalizedErrorCode = "PROVIDER_RATE_LIMITED";
  } else if (
    code === "model_not_available" ||
    code === "model_not_found" ||
    /model.*(not available|not found|does not exist)/.test(message)
  ) {
    category = PROVIDER_FAILURE_CATEGORY.MODEL_NOT_AVAILABLE;
    normalizedErrorCode = "MODEL_NOT_AVAILABLE";
  } else if (status === 401 || status === 403) {
    category = PROVIDER_FAILURE_CATEGORY.AUTH_FAILURE;
    normalizedErrorCode = "PROVIDER_AUTH_FAILURE";
  } else if (
    err?.name === "AbortError" ||
    /timeout/i.test(String(err?.message || ""))
  ) {
    category = PROVIDER_FAILURE_CATEGORY.TIMEOUT;
    normalizedErrorCode = "PROVIDER_TIMEOUT";
  } else if (status >= 500) {
    category = PROVIDER_FAILURE_CATEGORY.SERVER_ERROR;
    normalizedErrorCode = "PROVIDER_5XX";
  }

  const billingRelated = BILLING_RELATED_CATEGORIES.includes(category);

  return {
    category,
    normalizedErrorCode,
    retryable: false,
    automaticRetry: false,
    operatorBlocker: billingRelated
      ? `Billing blocker: ${category.replace(/_/g, " ")}. Add credits / activate billing, then obtain separate Founder authorization before any Models API or generation attempt.`
      : `Provider blocker: ${category.replace(/_/g, " ")}. Manual review required — no automatic retry.`,
    billingRelated,
    sanitizeOk: true,
    rawProviderBodyIncluded: false,
    // Durable outcome flags for control-plane / evidence (fixtures)
    authorizationReusable: false,
    markAgentActive: false,
    markAgentLiveTested: false,
    founderProofChanged: false,
    founderFinalReviewChanged: false,
    switchesMustRemainOrReturnOff: true,
  };
}

/**
 * Apply fail-closed billing / provider failure policy to a run outcome fixture.
 * Does not mutate Production switches or database.
 */
export function applyBillingFailurePolicy(categorized, input = {}) {
  const cat = categorized || categorizeProviderError(input.error);
  return {
    ...cat,
    providerCallCounted: input.providerCallAttempted === true,
    durableFailureCategory: cat.category,
    blocked: true,
    anotherAttemptAllowed: false,
    switchesOffRequired: true,
  };
}
