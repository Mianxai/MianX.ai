// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FounderOnboardingTour, {
  FOUNDER_TOUR_STEPS,
  tourStorageKey,
} from "./FounderOnboardingTour";
import { buildPageTips } from "./FounderHelpDrawer";
import { buildReadinessCategories } from "./ProductionReadinessCentre";
import { FOUNDER_GLOSSARY } from "@/lib/core/integration/founder-labels";

describe("FounderOnboardingTour", () => {
  it("has nine steps and advances with Next", async () => {
    expect(FOUNDER_TOUR_STEPS).toHaveLength(9);
    expect(tourStorageKey("u1")).toBe("mianx.founder.tour.v1.u1");
    const user = userEvent.setup();
    render(<FounderOnboardingTour open userId="anon" onClose={() => {}} />);
    expect(screen.getByTestId("founder-tour")).toBeTruthy();
    expect(screen.getByText(/Step 1 of 9/i)).toBeTruthy();
    await user.click(screen.getByTestId("founder-tour-next"));
    expect(screen.getByText(/Step 2 of 9/i)).toBeTruthy();
  });
});

describe("FounderHelpDrawer page tips", () => {
  it("returns integration-specific tips", () => {
    const tips = buildPageTips("/admin/integration", {
      proofState: { state: "no_proof", title: "No proof" },
    });
    expect(tips.some((t) => /Plan approval/i.test(t))).toBe(true);
    expect(tips.some((t) => /Anthropic/i.test(t))).toBe(true);
  });
});

describe("ProductionReadinessCentre categories", () => {
  it("marks live AI optional when provider unconfigured", () => {
    const cats = buildReadinessCategories({
      provider: { status: "unconfigured" },
      rateLimit: { durable: false },
      schedule: { mode: "manual", platform: "github_actions" },
    });
    const live = cats.find((c) => c.id === "live_ai");
    expect(live.tone).toBe("optional");
    expect(live.detail).toMatch(/not required for the deterministic Founder Proof/i);
    const core = cats.find((c) => c.id === "core");
    expect(core.detail).toMatch(/single-instance testing/i);
  });
});

describe("FOUNDER_GLOSSARY expansion", () => {
  it("includes Phase H.3 glossary terms", () => {
    const terms = FOUNDER_GLOSSARY.map((e) => e.term);
    expect(terms).toContain("Deterministic simulation");
    expect(terms).toContain("Live provider execution");
    expect(terms).toContain("Agent definition");
    expect(terms).toContain("Agent instance");
    expect(terms).toContain("Workflow definition");
    expect(terms).toContain("Workflow instance");
    expect(terms).toContain("Queue");
    expect(terms).toContain("Runtime run");
    expect(terms).toContain("Memory candidate");
    expect(terms).toContain("Learning candidate");
    expect(terms).toContain("Protected action");
    expect(terms).toContain("Final Founder approval");
  });
});
