import { describe, it, expect } from "vitest";
import { validateLeadSubmission, buildLeadPatch, LEAD_STATUSES } from "./leads";

describe("validateLeadSubmission", () => {
  it("accepts a well-formed submission", () => {
    const { valid, data } = validateLeadSubmission({
      name: "Jane Doe",
      email: "jane@example.com",
      company: "Acme",
      phone: "+1 555 0100",
      industry: "restaurant",
      message: "We need help.",
    });
    expect(valid).toBe(true);
    expect(data.name).toBe("Jane Doe");
    expect(data.industry).toBe("restaurant");
  });

  it("requires name, email, industry, and message", () => {
    const { valid, errors } = validateLeadSubmission({});
    expect(valid).toBe(false);
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.industry).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it("rejects an invalid email", () => {
    const { valid, errors } = validateLeadSubmission({
      name: "Jane",
      email: "not-an-email",
      industry: "restaurant",
      message: "hi",
    });
    expect(valid).toBe(false);
    expect(errors.email).toBeTruthy();
  });

  it("rejects an unknown industry instead of inventing a mapping", () => {
    const { valid, errors } = validateLeadSubmission({
      name: "Jane",
      email: "jane@example.com",
      message: "hi",
      industry: "underwater-basket-weaving",
    });
    expect(valid).toBe(false);
    expect(errors.industry).toBeTruthy();
  });

  it("rejects fields that exceed published length limits", () => {
    const longMessage = "x".repeat(5000);
    const { valid, errors } = validateLeadSubmission({
      name: "  Jane  ",
      email: "jane@example.com",
      industry: "restaurant",
      message: longMessage,
    });
    expect(valid).toBe(false);
    expect(errors.message).toBeTruthy();
  });

  it("trims accepted fields", () => {
    const { valid, data } = validateLeadSubmission({
      name: "  Jane  ",
      email: "jane@example.com",
      industry: "restaurant",
      message: "  Hello  ",
    });
    expect(valid).toBe(true);
    expect(data.name).toBe("Jane");
    expect(data.message).toBe("Hello");
  });

  it("flags a tripped honeypot without exposing it as a normal validation error", () => {
    const { valid, honeypotTripped, errors } = validateLeadSubmission({
      name: "Bot",
      email: "bot@example.com",
      industry: "other",
      message: "spam",
      website: "http://spam.example",
    });
    expect(valid).toBe(false);
    expect(honeypotTripped).toBe(true);
    expect(errors).toEqual({});
  });

  it("renders malicious script-like text as inert data, never HTML — validation does not execute or strip it, callers must render as text", () => {
    const payload = '<script>alert(1)</script>';
    const { data } = validateLeadSubmission({
      name: "Jane",
      email: "jane@example.com",
      industry: "restaurant",
      message: payload,
    });
    // The raw string is preserved (not executed, not silently dropped) so
    // that when React renders it later, it shows as literal escaped text.
    expect(data.message).toBe(payload);
  });
});

describe("buildLeadPatch", () => {
  it("allows every locked status", () => {
    for (const status of LEAD_STATUSES) {
      const { patch, errors } = buildLeadPatch({ status });
      expect(errors).toEqual({});
      expect(patch.status).toBe(status);
    }
  });

  it("rejects a status outside the locked set", () => {
    const { errors, hasFields } = buildLeadPatch({ status: "qualified" });
    expect(errors.status).toBeTruthy();
    expect(hasFields).toBe(false);
  });

  it("converts archived:true into a server-generated archived_at timestamp", () => {
    const { patch } = buildLeadPatch({ archived: true });
    expect(typeof patch.archived_at).toBe("string");
  });

  it("converts archived:false into null (un-archive)", () => {
    const { patch } = buildLeadPatch({ archived: false });
    expect(patch.archived_at).toBeNull();
  });

  it("ignores fields outside the allowlist entirely (mass-assignment protection)", () => {
    const { patch } = buildLeadPatch({
      status: "contacted",
      id: "attacker-controlled",
      created_at: "2000-01-01",
      email: "new-email@example.com",
    });
    expect(patch).toEqual({ status: "contacted" });
  });

  it("validates the shape of an analysis payload before accepting it", () => {
    const good = buildLeadPatch({
      analysis: { score: 80, temperature: "hot", summary: "s", reply: "r", actions: ["a"] },
    });
    expect(good.errors).toEqual({});
    expect(good.patch.analysis.score).toBe(80);

    const bad = buildLeadPatch({ analysis: { score: "80" } });
    expect(bad.errors.analysis).toBeTruthy();
  });

  it("returns hasFields:false for an empty/unrecognized body", () => {
    const { hasFields } = buildLeadPatch({ nonsense: true });
    expect(hasFields).toBe(false);
  });
});
