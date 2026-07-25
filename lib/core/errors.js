// Standardized error handling for Mianx Core. Every API route returns errors
// in one shape: { error: { code, message, details? } } with a matching HTTP
// status, so clients (and the admin UI) can handle failures uniformly and no
// internal/secret detail leaks to the browser.

import { NextResponse } from "next/server";

export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const ERROR_CODES = {
  BAD_REQUEST: "BAD_REQUEST",
  INVALID_JSON: "INVALID_JSON",
  VALIDATION: "VALIDATION_FAILED",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  INVALID_TRANSITION: "INVALID_TRANSITION",
  APPROVAL_REQUIRED: "APPROVAL_REQUIRED",
  RATE_LIMITED: "RATE_LIMITED",
  NOT_CONFIGURED: "NOT_CONFIGURED",
  PROVIDER_ERROR: "PROVIDER_ERROR",
  INTERNAL: "INTERNAL",
};

export function badRequest(message, details) {
  return new ApiError(400, ERROR_CODES.BAD_REQUEST, message, details);
}
export function validationError(message, fieldErrors) {
  return new ApiError(400, ERROR_CODES.VALIDATION, message, fieldErrors);
}
export function unauthorized(message = "Authentication required.") {
  return new ApiError(401, ERROR_CODES.UNAUTHORIZED, message);
}
export function forbidden(message = "You do not have access to this resource.") {
  return new ApiError(403, ERROR_CODES.FORBIDDEN, message);
}
export function notFound(message = "Resource not found.") {
  return new ApiError(404, ERROR_CODES.NOT_FOUND, message);
}
export function conflict(message, details) {
  return new ApiError(409, ERROR_CODES.CONFLICT, message, details);
}
export function invalidTransition(message, details) {
  return new ApiError(409, ERROR_CODES.INVALID_TRANSITION, message, details);
}
export function notConfigured(message, code = ERROR_CODES.NOT_CONFIGURED) {
  return new ApiError(503, code, message);
}

// Normalizes any thrown value into a safe { status, body } pair. Unknown
// errors are collapsed to a generic 500 that never echoes internal messages
// or stack traces to the client.
export function normalizeError(err) {
  if (err instanceof ApiError) {
    const body = { error: { code: err.code, message: err.message } };
    if (err.details !== undefined) body.error.details = err.details;
    return { status: err.status, body };
  }
  // Log server-side only; do not leak details to the response.
  console.error("[mianx-core] unhandled error:", err);
  return {
    status: 500,
    body: {
      error: {
        code: ERROR_CODES.INTERNAL,
        message: "An unexpected error occurred.",
      },
    },
  };
}

export function errorResponse(err) {
  const { status, body } = normalizeError(err);
  return NextResponse.json(body, { status });
}

// Wraps an async route handler so any thrown ApiError/unknown error becomes a
// standardized JSON response instead of an unhandled 500 HTML page.
export function withErrorHandling(handler) {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (err) {
      return errorResponse(err);
    }
  };
}
