import { describe, it, expect } from "vitest";
import { buildKnowledgeView } from "./build.js";

describe("buildKnowledgeView catalogue closeout", () => {
  it("fills global_templates from overviewCounts", async () => {
    const view = await buildKnowledgeView({ projectId: null });
    expect(view.catalogue_counts).toBeTruthy();
    expect(Object.values(view.catalogue_counts).some((n) => n > 0)).toBe(true);
    expect(view.sections.global_templates.items.length).toBeGreaterThan(0);
    expect(view.sections.integration_evidence.action_label).toBe(
      "Open Founder Proof Evidence"
    );
    expect(view.sections.integration_evidence.note).toMatch(/Founder Proof/);
  });
});
