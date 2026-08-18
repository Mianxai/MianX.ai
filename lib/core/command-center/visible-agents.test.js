import { describe, it, expect } from "vitest";
import {
  selectVisibleNetworkAgents,
  partitionNetworkAgents,
} from "./visible-agents";

function agent(partial) {
  return {
    name: partial.slug,
    department: "engineering",
    status: "idle",
    ...partial,
  };
}

describe("visible network agents", () => {
  const catalog = [
    agent({ slug: "executive-ceo", department: "leadership", reportsTo: "founder" }),
    agent({ slug: "executive-cto", department: "leadership", reportsTo: "executive-ceo", hierarchyLevel: "L2" }),
    agent({ slug: "executive-cpo", department: "leadership", reportsTo: "executive-ceo", hierarchyLevel: "L2" }),
    agent({ slug: "delivery-engineer", department: "engineering", reportsTo: "executive-cto", status: "working" }),
    agent({ slug: "delivery-qa", department: "qa", reportsTo: "executive-cto" }),
    agent({ slug: "research", department: "research", reportsTo: "executive-chief-scientist" }),
    agent({ slug: "marketing-content", department: "marketing", reportsTo: "executive-cmo" }),
    agent({ slug: "finance-analyst", department: "finance", reportsTo: "executive-cfo" }),
    agent({ slug: "legal-counsel", department: "legal", reportsTo: "executive-clo" }),
    agent({ slug: "hr-partner", department: "hr", reportsTo: "executive-chro" }),
    agent({ slug: "ops-coordinator", department: "operations", reportsTo: "executive-coo" }),
    agent({ slug: "support-agent", department: "support", reportsTo: "executive-cso" }),
    agent({ slug: "seo-specialist", department: "seo", reportsTo: "executive-cmo" }),
    agent({ slug: "analytics-insights", department: "analytics", reportsTo: "executive-cpo" }),
    agent({ slug: "security-review", department: "security", reportsTo: "executive-ciso" }),
  ];

  it("bounds company view specialists and keeps CEO + C-suite", () => {
    const visible = selectVisibleNetworkAgents(catalog, { maxSpecialists: 5 });
    expect(visible.some((a) => a.slug === "executive-ceo")).toBe(true);
    expect(visible.some((a) => a.slug === "executive-cto")).toBe(true);
    expect(visible.some((a) => a.slug === "delivery-engineer")).toBe(true); // working first
    expect(visible.length).toBeLessThan(catalog.length);
    const { specialists } = partitionNetworkAgents(visible);
    expect(specialists.length).toBeLessThanOrEqual(5);
  });

  it("department drill-down shows only that department plus CEO", () => {
    const visible = selectVisibleNetworkAgents(catalog, {
      department: "engineering",
    });
    expect(visible.every((a) => a.department === "engineering" || a.slug === "executive-ceo")).toBe(
      true
    );
  });

  it("does not invent agents", () => {
    expect(selectVisibleNetworkAgents([])).toEqual([]);
  });
});
