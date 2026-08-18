import { describe, it, expect } from "vitest";
import { leadsToCsv } from "./csv";

describe("leadsToCsv", () => {
  it("builds a header row plus one row per lead", () => {
    const csv = leadsToCsv([
      { id: "1", name: "Jane", email: "jane@example.com", company: "Acme", phone: "555", industry: "restaurant", need: "hi", status: "new", created_at: "2026-01-01" },
    ]);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("Name");
    expect(lines[1]).toContain("Jane");
  });

  it("escapes commas and quotes safely", () => {
    const csv = leadsToCsv([
      { id: "1", name: 'Jane "The Boss" Doe', email: "jane@example.com", company: "Acme, Inc.", need: "hello, world" },
    ]);
    expect(csv).toContain('"Jane ""The Boss"" Doe"');
    expect(csv).toContain('"Acme, Inc."');
  });

  it("does not throw or execute anything for script-like content — it is plain escaped CSV text", () => {
    const csv = leadsToCsv([
      { id: "1", name: "Jane", email: "jane@example.com", need: "<script>alert(1)</script>" },
    ]);
    expect(csv).toContain("<script>alert(1)</script>");
  });
});
