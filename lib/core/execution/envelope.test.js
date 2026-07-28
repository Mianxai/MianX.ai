import { describe, it, expect } from "vitest";
import {
  buildExecutionInput,
  buildExecutionResult,
} from "./envelope";

describe("execution envelope", () => {
  it("rejects missing project scope and unknown agents", () => {
    expect(() =>
      buildExecutionInput({ agent_slug: "executive-ceo" })
    ).toThrow(/project/i);
    expect(() =>
      buildExecutionInput({
        project_id: "p1",
        agent_slug: "not-a-real-agent-xyz",
      })
    ).toThrow(/unknown|executable/i);
  });

  it("blocks capability escalation and secret-like input keys", () => {
    expect(() =>
      buildExecutionInput({
        project_id: "p1",
        agent_slug: "research",
        requested_capabilities: ["approve_production_action"],
      })
    ).toThrow(/escalation|permitted/i);
    expect(() =>
      buildExecutionInput({
        project_id: "p1",
        agent_slug: "research",
        input: { api_key: "x" },
      })
    ).toThrow(/not allowed/i);
  });

  it("builds a valid input and result envelope", () => {
    const input = buildExecutionInput({
      project_id: "p1",
      agent_slug: "research",
      requested_capabilities: ["research_summary"],
      constraints: ["advisory only"],
    });
    expect(input.envelope_version).toBe(1);
    expect(input.agent_slug).toBe("research");
    const result = buildExecutionResult({
      status: "succeeded",
      structured_output: { summary: "ok" },
      memory_candidates: [{ type: "fact" }],
    });
    expect(result.status).toBe("succeeded");
    expect(result.structured_output.summary).toBe("ok");
  });
});
