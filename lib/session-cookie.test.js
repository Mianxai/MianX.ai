import { describe, it, expect } from "vitest";
import {
  isAccessTokenStructurallyValid,
  readJwtPayload,
} from "./session-cookie";

function makeToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString(
    "base64url"
  );
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.sig`;
}

describe("session cookie hygiene", () => {
  it("rejects missing, malformed, and expired tokens", () => {
    expect(isAccessTokenStructurallyValid("")).toBe(false);
    expect(isAccessTokenStructurallyValid("not-a-jwt")).toBe(false);
    expect(
      isAccessTokenStructurallyValid(
        makeToken({ exp: Math.floor(Date.now() / 1000) - 60 })
      )
    ).toBe(false);
  });

  it("accepts a structurally valid non-expired token without verifying signature", () => {
    const token = makeToken({
      sub: "user-1",
      exp: Math.floor(Date.now() / 1000) + 3600,
    });
    expect(isAccessTokenStructurallyValid(token)).toBe(true);
    expect(readJwtPayload(token).sub).toBe("user-1");
  });
});
