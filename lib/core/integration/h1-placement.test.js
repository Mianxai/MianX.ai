/**
 * H.1 placement + safety invariants (source-level, no production mutation).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd());

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

describe("H.1 Quick Start placement", () => {
  it("full Quick Start only on Command Center and Founder Proof IntegrationClient", () => {
    const cc = read("components/admin/command-center/CommandCenterClient.jsx");
    const integ = read("components/admin/integration/IntegrationClient.jsx");
    expect(cc).toMatch(/FounderQuickStart/);
    expect(integ).toMatch(/FounderQuickStart/);
    // Agents path must not mount Quick Start
    expect(cc).toMatch(/!agentsPage[\s\S]*FounderQuickStart|agentsPage[\s\S]*null/);

    const secondary = [
      "components/admin/workforce/WorkforceClient.jsx",
      "components/admin/objectives/ObjectivesClient.jsx",
      "components/admin/inbox/InboxClient.jsx",
      "components/admin/ceo-brief/CeoBriefClient.jsx",
      "components/admin/company-builder/CompanyBuilderClient.jsx",
      "components/admin/departments/DepartmentsClient.jsx",
      "components/admin/workflows/WorkflowsClient.jsx",
    ];
    for (const file of secondary) {
      const src = read(file);
      expect(src).not.toMatch(/FounderQuickStart/);
      expect(src).toMatch(/FounderActionBanner/);
    }
  });

  it("Advanced Operations toggle has button semantics", () => {
    const shell = read("components/admin/AdminShell.jsx");
    expect(shell).toMatch(/data-testid="advanced-ops-toggle"/);
    expect(shell).toMatch(/aria-expanded=\{advancedOpsOpen\}/);
    expect(shell).toMatch(/type="button"/);
  });

  it("plan review keeps technical details collapsed by default", () => {
    const plan = read("components/admin/integration/IntegrationPlanReview.jsx");
    expect(plan).toMatch(/<details[^>]*data-testid="plan-technical-details"/);
    expect(plan).not.toMatch(/<details[^>]*open/);
    expect(plan).toMatch(/founder-risk-card/);
    expect(plan).not.toMatch(/JSON\.stringify\(r\)/);
  });

  it("does not auto-start simulation on plan approve copy", () => {
    const plan = read("components/admin/integration/IntegrationPlanReview.jsx");
    expect(plan).toMatch(/does not start simulation/i);
    expect(plan).toMatch(/Simulation (will not|does not) start/i);
  });
});
