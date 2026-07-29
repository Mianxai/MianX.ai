// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FounderQuickStart from "./FounderQuickStart";
import FounderActionBanner from "./FounderActionBanner";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("FounderQuickStart compactness", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows current + next by default and can expand all 9", async () => {
    const user = userEvent.setup();
    const run = {
      current_stage: "founder_approval_required",
      status: "awaiting_plan_approval",
    };
    render(<FounderQuickStart run={run} hasProject />);
    expect(screen.getByTestId("quick-start-progress").textContent).toMatch(/of 9/);
    // Default: only current + next visible
    expect(screen.getByTestId("quick-start-plan")).toBeTruthy();
    expect(screen.queryByTestId("quick-start-final")).toBeNull();

    await user.click(screen.getByTestId("quick-start-toggle-all"));
    expect(screen.getByTestId("quick-start-final")).toBeTruthy();
    expect(screen.getByTestId("quick-start-toggle-all").getAttribute("aria-expanded")).toBe(
      "true"
    );
  });
});

describe("FounderActionBanner", () => {
  it("renders compact CTA without Quick Start", () => {
    render(
      <FounderActionBanner
        projectId="proj-1"
        summary={{
          ok: true,
          next_founder_action: {
            label: "Review Plan",
            reason: "Waiting for Founder Plan Approval",
            href: "/admin/integration?tab=plan",
            severity: "action_required",
            id: "review_plan",
          },
          canonical_integration_run: {
            id: "run-1",
            stage: "founder_approval_required",
            proof_status: "awaiting_plan_approval",
            stage_label: "Waiting for Founder Plan Approval",
          },
        }}
      />
    );
    expect(screen.getByTestId("founder-action-banner")).toBeTruthy();
    expect(screen.getByTestId("founder-action-banner-badge").textContent).toMatch(
      /FOUNDER PROOF/
    );
    expect(screen.getByTestId("founder-action-banner-status").textContent).toMatch(
      /Waiting for Founder Plan Approval/i
    );
    expect(screen.getByTestId("founder-action-banner-explain").textContent).toMatch(
      /Simulation will not start automatically/i
    );
    expect(screen.getByTestId("founder-action-banner-cta").textContent).toMatch(/Review Plan/);
    expect(screen.queryByTestId("founder-quick-start")).toBeNull();
    expect(screen.queryByText(/What will not happen/i)).toBeNull();
    expect(screen.queryByText(/Current objective/i)).toBeNull();
  });
});
