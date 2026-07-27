// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AgentListFallback from "./AgentListFallback";
import OverviewMetrics from "./OverviewMetrics";
import DepartmentRail from "./DepartmentRail";
import StatusChip from "./StatusChip";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/admin/command-center",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Command Center UI contracts", () => {
  it("exposes accessible status labels (not colour-only)", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <AgentListFallback
        agents={[
          {
            slug: "research",
            name: "Research Agent",
            department: "research",
            status: "working",
            workforceSlug: "runtime.research",
            live: { currentWorkflow: "business-growth", lastRunStatus: "running" },
          },
        ]}
        selectedSlug=""
        onSelect={onSelect}
      />
    );
    expect(screen.getByText(/Working/i)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /Research Agent/i }));
    expect(onSelect).toHaveBeenCalledWith("research");
  });

  it("StatusChip always includes a text label", () => {
    render(<StatusChip status="approval_required" />);
    expect(screen.getByText(/Approval required/i)).toBeTruthy();
  });

  it("shows Data unavailable for missing metrics", () => {
    render(
      <OverviewMetrics
        metrics={{
          activeAgents: { available: false, value: null, label: "Data unavailable" },
          idleAgents: { available: false, value: null, label: "Data unavailable" },
          waitingApproval: { available: false, value: null, label: "Data unavailable" },
          queuedJobs: { available: false, value: null, label: "Data unavailable" },
          runningJobs: { available: false, value: null, label: "Data unavailable" },
          failedJobs: { available: false, value: null, label: "Data unavailable" },
          activeWorkflows: { available: false, value: null, label: "Data unavailable" },
          blockedWorkflows: { available: false, value: null, label: "Data unavailable" },
          activeProjects: { available: false, value: null, label: "Data unavailable" },
        }}
      />
    );
    expect(screen.getAllByText("Data unavailable").length).toBeGreaterThanOrEqual(9);
  });

  it("lists all department buttons for keyboard navigation", () => {
    render(
      <DepartmentRail
        departments={[
          { slug: "leadership", name: "Leadership", agentCount: 11, activeInstances: 0 },
          { slug: "engineering", name: "Engineering", agentCount: 4, activeInstances: 1 },
        ]}
        active="all"
        onSelect={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /All departments/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Leadership/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Engineering/i })).toBeTruthy();
  });
});
