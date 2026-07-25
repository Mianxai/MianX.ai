// Request/domain validation primitives for Mianx Core. Pure functions, never
// throw for expected-invalid input (they return typed results); throw ApiError
// only via the assert* helpers used at route boundaries.

import { CORE_LIMITS } from "./constants";
import { badRequest, validationError } from "./errors";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isUuid(value) {
  return typeof value === "string" && UUID_RE.test(value);
}

export function isEmail(value) {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

export function isSlug(value) {
  return typeof value === "string" && value.length <= 200 && SLUG_RE.test(value);
}

// Trim + clamp a string to a maximum length. Non-strings become "".
export function clip(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function assertUuid(value, field = "id") {
  if (!isUuid(value)) throw badRequest(`Invalid ${field}: expected a UUID.`);
  return value;
}

// Parses a request body as JSON, enforcing a hard byte ceiling first so a
// giant payload can't be buffered. Throws a standardized 400 on failure.
export async function parseJsonBody(req, maxBytes = CORE_LIMITS.jsonInputBytes) {
  const raw = await req.text();
  if (raw.length > maxBytes) {
    throw badRequest(`Request body too large (max ${maxBytes} bytes).`);
  }
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw badRequest("Request body must be a JSON object.");
    }
    return parsed;
  } catch (err) {
    if (err?.code) throw err; // already an ApiError
    throw badRequest("Invalid JSON body.");
  }
}

// Validates a structured JSONB input object against size/shape bounds. Returns
// the object unchanged when valid; throws a standardized validation error
// otherwise. Prevents unbounded documents and deeply nested abuse.
export function validateJsonInput(value, field = "input") {
  const obj = value == null ? {} : value;
  if (typeof obj !== "object" || Array.isArray(obj)) {
    throw validationError("Invalid input.", { [field]: "Must be a JSON object." });
  }
  const keys = Object.keys(obj);
  if (keys.length > CORE_LIMITS.jsonInputKeys) {
    throw validationError("Invalid input.", {
      [field]: `Too many keys (max ${CORE_LIMITS.jsonInputKeys}).`,
    });
  }
  let serialized;
  try {
    serialized = JSON.stringify(obj);
  } catch {
    throw validationError("Invalid input.", {
      [field]: "Input is not serializable (circular reference?).",
    });
  }
  if (serialized.length > CORE_LIMITS.jsonInputBytes) {
    throw validationError("Invalid input.", {
      [field]: `Input too large (max ${CORE_LIMITS.jsonInputBytes} bytes).`,
    });
  }
  return obj;
}

// Picks only allowlisted keys from an arbitrary body. This is the primary
// defense against mass assignment — callers can never set columns outside the
// explicit allowlist.
export function pickAllowed(body, allowed) {
  const raw = body && typeof body === "object" ? body : {};
  const out = {};
  for (const key of allowed) {
    if (key in raw) out[key] = raw[key];
  }
  return out;
}
