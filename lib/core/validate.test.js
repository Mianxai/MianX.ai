import { describe, it, expect } from "vitest";
import {
  isUuid,
  isEmail,
  isSlug,
  clip,
  assertUuid,
  parseJsonBody,
  validateJsonInput,
  pickAllowed,
} from "./validate";
import { CORE_LIMITS } from "./constants";

const UUID = "11111111-1111-4111-8111-111111111111";

describe("validate primitives", () => {
  it("validates UUIDs", () => {
    expect(isUuid(UUID)).toBe(true);
    expect(isUuid("not-a-uuid")).toBe(false);
    expect(isUuid("")).toBe(false);
    expect(isUuid(null)).toBe(false);
  });

  it("validates emails and slugs", () => {
    expect(isEmail("a@b.co")).toBe(true);
    expect(isEmail("nope")).toBe(false);
    expect(isSlug("mianx-core")).toBe(true);
    expect(isSlug("Bad Slug")).toBe(false);
  });

  it("clips strings to a maximum length", () => {
    expect(clip("  hi  ", 10)).toBe("hi");
    expect(clip("abcdef", 3)).toBe("abc");
    expect(clip(42, 3)).toBe("");
  });

  it("assertUuid throws a 400 ApiError on malformed input", () => {
    expect(() => assertUuid("bad", "project_id")).toThrowError(/Invalid project_id/);
    try {
      assertUuid("bad");
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });
});

describe("pickAllowed (mass-assignment guard)", () => {
  it("keeps only allowlisted keys", () => {
    const out = pickAllowed(
      { status: "x", id: "hack", created_at: "hack", extra: 1 },
      ["status"]
    );
    expect(out).toEqual({ status: "x" });
  });
  it("tolerates non-object input", () => {
    expect(pickAllowed(null, ["a"])).toEqual({});
  });
});

describe("validateJsonInput", () => {
  it("accepts a small object", () => {
    expect(validateJsonInput({ a: 1 })).toEqual({ a: 1 });
  });
  it("treats null/undefined as empty object", () => {
    expect(validateJsonInput(null)).toEqual({});
  });
  it("rejects arrays", () => {
    expect(() => validateJsonInput([1, 2])).toThrowError(/Invalid input/);
  });
  it("rejects oversized payloads", () => {
    const big = { blob: "x".repeat(CORE_LIMITS.jsonInputBytes + 10) };
    try {
      validateJsonInput(big);
      throw new Error("should have thrown");
    } catch (e) {
      expect(e.status).toBe(400);
      expect(e.details.input).toMatch(/too large/i);
    }
  });
  it("rejects too many keys", () => {
    const obj = {};
    for (let i = 0; i < CORE_LIMITS.jsonInputKeys + 5; i++) obj[`k${i}`] = i;
    try {
      validateJsonInput(obj);
      throw new Error("should have thrown");
    } catch (e) {
      expect(e.status).toBe(400);
      expect(e.details.input).toMatch(/too many keys/i);
    }
  });
});

describe("parseJsonBody", () => {
  const makeReq = (raw) => ({ text: async () => raw });

  it("parses a valid JSON object", async () => {
    expect(await parseJsonBody(makeReq('{"a":1}'))).toEqual({ a: 1 });
  });
  it("returns {} for empty body", async () => {
    expect(await parseJsonBody(makeReq(""))).toEqual({});
  });
  it("rejects invalid JSON with a 400", async () => {
    await expect(parseJsonBody(makeReq("{bad"))).rejects.toMatchObject({ status: 400 });
  });
  it("rejects a JSON array body", async () => {
    await expect(parseJsonBody(makeReq("[1,2]"))).rejects.toMatchObject({ status: 400 });
  });
  it("rejects a body over the byte ceiling", async () => {
    const huge = JSON.stringify({ a: "x".repeat(CORE_LIMITS.jsonInputBytes + 100) });
    await expect(parseJsonBody(makeReq(huge))).rejects.toMatchObject({ status: 400 });
  });
});
