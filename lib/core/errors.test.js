import { describe, it, expect, vi } from "vitest";
import {
  ApiError,
  ERROR_CODES,
  badRequest,
  unauthorized,
  notConfigured,
  normalizeError,
  withErrorHandling,
} from "./errors";

describe("error normalization", () => {
  it("preserves ApiError status/code/message and details", () => {
    const err = badRequest("bad", { field: "x" });
    const { status, body } = normalizeError(err);
    expect(status).toBe(400);
    expect(body.error.code).toBe(ERROR_CODES.BAD_REQUEST);
    expect(body.error.message).toBe("bad");
    expect(body.error.details).toEqual({ field: "x" });
  });

  it("collapses unknown errors into a generic 500 without leaking detail", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { status, body } = normalizeError(new Error("secret db dsn leaked"));
    expect(status).toBe(500);
    expect(body.error.code).toBe(ERROR_CODES.INTERNAL);
    expect(JSON.stringify(body)).not.toMatch(/secret db dsn/);
    spy.mockRestore();
  });

  it("notConfigured yields a 503 with a custom code", () => {
    const err = notConfigured("no key", "ANTHROPIC_NOT_CONFIGURED");
    expect(err.status).toBe(503);
    expect(err.code).toBe("ANTHROPIC_NOT_CONFIGURED");
  });

  it("unauthorized yields a 401", () => {
    expect(unauthorized().status).toBe(401);
  });
});

describe("withErrorHandling", () => {
  it("returns a standardized JSON response when the handler throws", async () => {
    const handler = withErrorHandling(async () => {
      throw new ApiError(404, ERROR_CODES.NOT_FOUND, "nope");
    });
    const res = await handler();
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error.code).toBe(ERROR_CODES.NOT_FOUND);
  });

  it("passes through a successful response", async () => {
    const handler = withErrorHandling(async () => ({ ok: true }));
    expect(await handler()).toEqual({ ok: true });
  });
});
