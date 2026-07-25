import { describe, it, expect } from "vitest";
import {
  AGENT_DEFINITIONS,
  listAgentDefinitions,
  getAgentDefinition,
  toAgentDefinitionRow,
  validateAgentInput,
  PROTECTED_CAPABILITIES,
} from "./agents";

describe("agent registry", () => {
  it("seeds exactly the three truthful first agents", () => {
    const slugs = AGENT_DEFINITIONS.map((a) => a.slug).sort();
    expect(slugs).toEqual(["lead-intelligence", "qa-review", "research"]);
  });

  it("each definition declares the required contract fields", () => {
    for (const def of AGENT_DEFINITIONS) {
      expect(def.slug).toBeTruthy();
      expect(def.name).toBeTruthy();
      expect(def.purpose).toBeTruthy();
      expect(Array.isArray(def.allowedCapabilities)).toBe(true);
      expect(Array.isArray(def.prohibitedCapabilities)).toBe(true);
      expect(def.inputSchema).toBeTypeOf("object");
      expect(def.outputSchema).toBeTypeOf("object");
      expect(def.defaultProvider).toBeTruthy();
      expect(def.defaultModel).toBeTruthy();
      expect(typeof def.version).toBe("number");
      expect(def.lifecycleStatus).toBe("active");
      expect(typeof def.requiresHumanApproval).toBe("boolean");
    }
  });

  it("never grants a protected capability to a seed agent", () => {
    for (const def of AGENT_DEFINITIONS) {
      for (const cap of def.allowedCapabilities) {
        expect(PROTECTED_CAPABILITIES).not.toContain(cap);
      }
    }
  });

  it("QA agent explicitly prohibits approving production actions", () => {
    const qa = getAgentDefinition("qa-review");
    expect(qa.prohibitedCapabilities).toContain("approve_production_action");
  });

  it("maps a definition to a snake_case DB row", () => {
    const row = toAgentDefinitionRow(getAgentDefinition("research"));
    expect(row.slug).toBe("research");
    expect(row.allowed_capabilities).toBeInstanceOf(Array);
    expect(row.input_schema).toBeTypeOf("object");
    expect(row.requires_human_approval).toBe(false);
  });

  it("listAgentDefinitions returns copies (immutability)", () => {
    const list = listAgentDefinitions();
    list[0].name = "mutated";
    expect(getAgentDefinition(list[0].slug).name).not.toBe("mutated");
  });
});

describe("validateAgentInput", () => {
  const lead = getAgentDefinition("lead-intelligence");

  it("accepts valid input", () => {
    const { valid } = validateAgentInput(lead, { email: "a@b.co", message: "hi" });
    expect(valid).toBe(true);
  });
  it("flags missing required fields", () => {
    const { valid, errors } = validateAgentInput(lead, { email: "a@b.co" });
    expect(valid).toBe(false);
    expect(errors.message).toBeTruthy();
  });
  it("flags an invalid email", () => {
    const { valid, errors } = validateAgentInput(lead, {
      email: "nope",
      message: "hi",
    });
    expect(valid).toBe(false);
    expect(errors.email).toBeTruthy();
  });
  it("enforces string maxLength", () => {
    const { valid, errors } = validateAgentInput(lead, {
      email: "a@b.co",
      message: "x".repeat(5000),
    });
    expect(valid).toBe(false);
    expect(errors.message).toMatch(/at most/);
  });
});
