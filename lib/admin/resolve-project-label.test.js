import { describe, expect, it } from "vitest";
import { resolveProjectDisplayName, isInvalidProjectDisplayName } from "./resolve-project-label.js";

describe("resolveProjectDisplayName", () => {
  it("never uses Selected project as the value", () => {
    expect(
      resolveProjectDisplayName({
        projectName: "Selected project",
        projectId: "abc12345-uuid",
        projects: [{ id: "abc12345-uuid", name: "MianX Internal Production Proof" }],
      })
    ).toBe("MianX Internal Production Proof");
  });

  it("prefers real project name over label fallbacks", () => {
    expect(
      resolveProjectDisplayName({
        projectName: "Selected project",
        summary: { project_name: "MianX Internal Production Proof" },
      })
    ).toBe("MianX Internal Production Proof");
  });

  it("marks Selected project as invalid", () => {
    expect(isInvalidProjectDisplayName("Selected project")).toBe(true);
    expect(isInvalidProjectDisplayName("MianX Internal Production Proof")).toBe(false);
  });
});
