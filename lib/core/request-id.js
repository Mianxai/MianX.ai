// Correlation IDs and structured, redacted operational logging.
//
// Request IDs are generated server-side (or accepted when they look like a
// safe token) and returned on response headers. Logs never include secrets,
// passwords, tokens, or raw provider payloads.

import { randomUUID } from "crypto";

const SAFE_ID = /^[A-Za-z0-9._-]{8,128}$/;
const SECRET_KEYS = /^(authorization|cookie|x-api-key|api[_-]?key|password|secret|token|service_role)/i;

export function createRequestId(incoming) {
  if (typeof incoming === "string" && SAFE_ID.test(incoming)) return incoming;
  try {
    return randomUUID();
  } catch {
    return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function requestIdFromHeaders(req) {
  const incoming =
    req?.headers?.get?.("x-request-id") ||
    req?.headers?.get?.("x-correlation-id") ||
    null;
  return createRequestId(incoming);
}

function redactValue(key, value) {
  if (SECRET_KEYS.test(String(key))) return "[redacted]";
  if (typeof value === "string" && value.length > 500) {
    return `${value.slice(0, 500)}…[truncated]`;
  }
  return value;
}

export function redact(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((v) => redact(v));
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === "object") out[k] = redact(v);
    else out[k] = redactValue(k, v);
  }
  return out;
}

/**
 * Structured JSON log line. Never throws.
 */
export function logOp(level, message, fields = {}) {
  try {
    const line = JSON.stringify({
      ts: new Date().toISOString(),
      level,
      msg: String(message).slice(0, 500),
      ...redact(fields),
    });
    if (level === "error") console.error(line);
    else if (level === "warn") console.warn(line);
    else console.info(line);
  } catch {
    /* never break the request for logging */
  }
}

/**
 * Attach X-Request-Id to a NextResponse and return it.
 */
export function withRequestId(res, requestId) {
  try {
    res.headers.set("X-Request-Id", requestId);
  } catch {
    /* ignore immutable headers */
  }
  return res;
}
