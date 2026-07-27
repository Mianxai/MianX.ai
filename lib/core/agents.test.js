import { describe, it, expect } from "vitest";
import {
  AGENT_DEFINITIONS,
  listAgentDefinitions,
  listActiveAgentDefinitions,
  isAgentExecutable,
  getAgentDefinition,
  toAgentDefinitionRow,
  validateAgentInput,
  PROTECTED_CAPABILITIES,
} from "./agents";

const DRAFT_SLUGS = [
  "engineering-planning",
  "follow-up-draft",
  "release-readiness",
  "requirements-analyst",
  "security-review",
  "test-qa",
  "workflow-orchestrator",
];

describe("agent registry", () => {
  it("keeps wave-0 proof agents and wave-1 executives active", () => {
    const slugs = listActiveAgentDefinitions()
      .map((a) => a.slug)
      .sort();
    expect(slugs).toEqual(
      [
        "coding-executor",
        "delivery-architect",
        "delivery-engineer",
        "delivery-product",
        "delivery-qa",
        "delivery-review",
        "executive-ceo",
        "executive-chief-scientist",
        "executive-cfo",
        "executive-chro",
        "executive-ciso",
        "executive-clo",
        "executive-cmo",
        "executive-coo",
        "executive-cpo",
        "executive-cso",
        "executive-cto",
        "lead-intelligence",
        "platform-data-ai",
        "platform-devops",
        "platform-infra",
        "platform-security",
        "qa-review",
        "research",
      ].sort()
    );
  });

  it("exposes the draft agents in the catalog without activating them", () => {
    const drafts = listAgentDefinitions()
      .filter((a) => a.lifecycleStatus === "draft")
      .map((a) => a.slug)
      .sort();
    expect(drafts).toEqual(DRAFT_SLUGS);
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
      expect(["draft", "active", "deprecated"]).toContain(def.lifecycleStatus);
      expect(typeof def.requiresHumanApproval).toBe("boolean");
      expect(typeof def.enabledByDefault).toBe("boolean");
      expect(def.executionTimeoutMs).toBe(30000);
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

describe("agent lifecycle gating", () => {
  it.each(DRAFT_SLUGS)("%s is a disabled-by-default draft", (slug) => {
    const def = getAgentDefinition(slug);
    expect(def.lifecycleStatus).toBe("draft");
    expect(def.enabledByDefault).toBe(false);
    expect(isAgentExecutable(def)).toBe(false);
  });

  it.each(["lead-intelligence", "research", "qa-review"])(
    "%s stays active and executable",
    (slug) => {
      const def = getAgentDefinition(slug);
      expect(def.lifecycleStatus).toBe("active");
      expect(def.enabledByDefault).toBe(true);
      expect(isAgentExecutable(def)).toBe(true);
    }
  );

  it("treats a missing or deprecated definition as not executable", () => {
    expect(isAgentExecutable(null)).toBe(false);
    expect(isAgentExecutable(undefined)).toBe(false);
    expect(isAgentExecutable({ lifecycleStatus: "deprecated" })).toBe(false);
  });

  it("listActiveAgentDefinitions excludes every draft", () => {
    const active = listActiveAgentDefinitions();
    expect(active.every((a) => a.lifecycleStatus === "active")).toBe(true);
    expect(active.length).toBeLessThan(listAgentDefinitions().length);
  });

  it("the agents that touch protected ground require human approval", () => {
    for (const slug of ["security-review", "release-readiness", "follow-up-draft"]) {
      expect(getAgentDefinition(slug).requiresHumanApproval).toBe(true);
    }
  });

  it("no draft agent is granted a protected capability", () => {
    for (const slug of DRAFT_SLUGS) {
      const def = getAgentDefinition(slug);
      for (const cap of def.allowedCapabilities) {
        expect(PROTECTED_CAPABILITIES).not.toContain(cap);
      }
      expect(def.prohibitedCapabilities).toContain("send_email");
      expect(def.prohibitedCapabilities).toContain("approve_production_action");
    }
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
