/**
 * Strict structured output contract for the Architecture Reviewer pilot.
 */

import { PILOT_POLICY } from "./constants";

export const PILOT_OUTPUT_REQUIRED_FIELDS = Object.freeze([
  "summary",
  "architectureFindings",
  "securityFindings",
  "reliabilityFindings",
  "dataIsolationFindings",
  "operationalRisks",
  "recommendations",
  "blockers",
  "confidence",
  "requiresFounderDecision",
]);

const SECRET_LIKE =
  /(api[_-]?key|sk-[a-z0-9]{10,}|bearer\s+[a-z0-9._-]{16,}|service_role|supabase.*secret)/i;
const TOOL_CALL_LIKE =
  /(tool_call|function_call|run_shell|execute_sql|git\s+push|deploy_production)/i;
const OVERRIDE_LIKE =
  /(ignore (previous|all) instructions|disregard system prompt|you are now)/i;

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return null;
  return null;
}

function asString(value) {
  if (typeof value === "string") return value;
  return null;
}

/**
 * Validate pilot structured output. Failures must NOT mark live-tested.
 */
export function validatePilotStructuredOutput(raw, { maxChars = 24_000 } = {}) {
  const errors = [];
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, errors: ["output_not_object"], value: null };
  }

  const serialized = JSON.stringify(raw);
  if (serialized.length > maxChars) {
    errors.push("output_excessive");
  }

  for (const field of PILOT_OUTPUT_REQUIRED_FIELDS) {
    if (!(field in raw)) errors.push(`missing_${field}`);
  }

  const summary = asString(raw.summary);
  if (summary != null && summary.length > 4000) errors.push("summary_too_long");
  if (summary != null && SECRET_LIKE.test(summary)) errors.push("secrets_detected");
  if (summary != null && TOOL_CALL_LIKE.test(summary)) errors.push("tool_call_attempt");
  if (summary != null && OVERRIDE_LIKE.test(summary)) errors.push("instruction_override");

  for (const listField of [
    "architectureFindings",
    "securityFindings",
    "reliabilityFindings",
    "dataIsolationFindings",
    "operationalRisks",
    "recommendations",
    "blockers",
  ]) {
    if (listField in raw && asArray(raw[listField]) == null) {
      errors.push(`${listField}_not_array`);
    }
  }

  if ("confidence" in raw) {
    const c = Number(raw.confidence);
    if (!Number.isFinite(c) || c < 0 || c > 1) errors.push("confidence_out_of_range");
  }

  if ("requiresFounderDecision" in raw && typeof raw.requiresFounderDecision !== "boolean") {
    errors.push("requiresFounderDecision_not_boolean");
  }

  const blob = serialized;
  if (SECRET_LIKE.test(blob)) errors.push("secrets_detected");
  if (TOOL_CALL_LIKE.test(blob)) errors.push("tool_call_attempt");
  if (OVERRIDE_LIKE.test(blob)) errors.push("instruction_override");

  // Rough token ceiling: reject if output text would blow policy.
  const approxTokens = Math.ceil(blob.length / 4);
  if (approxTokens > PILOT_POLICY.maxOutputTokens) {
    errors.push("output_token_estimate_exceeded");
  }

  if (errors.length) {
    return { ok: false, errors, value: null };
  }

  return {
    ok: true,
    errors: [],
    value: {
      summary: String(raw.summary),
      architectureFindings: [...raw.architectureFindings],
      securityFindings: [...raw.securityFindings],
      reliabilityFindings: [...raw.reliabilityFindings],
      dataIsolationFindings: [...raw.dataIsolationFindings],
      operationalRisks: [...raw.operationalRisks],
      recommendations: [...raw.recommendations],
      blockers: [...raw.blockers],
      confidence: Number(raw.confidence),
      requiresFounderDecision: Boolean(raw.requiresFounderDecision),
    },
  };
}

export function parsePilotOutputText(text) {
  if (typeof text !== "string" || !text.trim()) {
    return { ok: false, errors: ["empty_response"], value: null };
  }
  if (SECRET_LIKE.test(text) || TOOL_CALL_LIKE.test(text) || OVERRIDE_LIKE.test(text)) {
    return {
      ok: false,
      errors: ["unsafe_response_text"],
      value: null,
    };
  }
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start < 0 || end <= start) {
      return { ok: false, errors: ["no_json_object"], value: null };
    }
    const parsed = JSON.parse(text.slice(start, end + 1));
    return validatePilotStructuredOutput(parsed);
  } catch {
    return { ok: false, errors: ["json_parse_error"], value: null };
  }
}
