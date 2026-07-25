// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingPage from "./page";

// The hero mounts a dynamically-imported Three.js scene. Stub it out as
// permanently unavailable — the homepage must be fully usable on a device with
// no WebGL, which is also the cheapest way to keep these tests off the GPU.
vi.mock("@/components/public/HeroScene", () => ({
  default: ({ onUnavailable }) => {
    onUnavailable?.("no-webgl2");
    return null;
  },
}));

describe("Public homepage", () => {
  it("renders without crashing and shows the locked positioning, not 'AI agent agency'", () => {
    render(<LandingPage />);
    expect(screen.getAllByText(/AI-native Business Operating System/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/AI agent agency/i)).not.toBeInTheDocument();
  });

  it("has exactly one h1 and a logical section heading structure", () => {
    render(<LandingPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(0);
  });

  it("has a skip-to-content target and main landmark", () => {
    render(<LandingPage />);
    expect(document.getElementById("main-content")).toBeTruthy();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("does not publish unsupported claims (live partner status, active-user counts, testimonials)", () => {
    render(<LandingPage />);
    expect(screen.queryByText(/live now/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/active users/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/within 24 hours/i)).not.toBeInTheDocument();
  });

  it("renders the lead-capture form with the required fields", () => {
    render(<LandingPage />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^industry$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell us about your needs/i)).toBeInTheDocument();
  });
});

describe("Public homepage without WebGL", () => {
  it("still renders every section, with the hero on its static fallback", async () => {
    render(<LandingPage />);

    await waitFor(() =>
      expect(document.getElementById("hero")).toHaveAttribute("data-scene", "fallback")
    );
    for (const id of ["hero", "platform", "capabilities", "roadmap", "contact"]) {
      expect(document.getElementById(id)).toBeTruthy();
    }
    expect(document.querySelector(".hero-lattice")).not.toBeNull();
    expect(document.getElementById("hero-canvas")).toBeNull();
  });

  it("keeps primary navigation and both hero CTAs functional", () => {
    render(<LandingPage />);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    for (const label of ["Platform", "Capabilities", "Roadmap", "Contact"]) {
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute(
        "href",
        `#${label.toLowerCase()}`
      );
    }
    expect(within(nav).getByRole("link", { name: /talk to us/i })).toHaveAttribute(
      "href",
      "#contact"
    );

    const hero = within(document.getElementById("hero"));
    expect(hero.getByRole("link", { name: /talk to us/i })).toHaveAttribute("href", "#contact");
    expect(hero.getByRole("link", { name: /see the platform/i })).toHaveAttribute(
      "href",
      "#platform"
    );
  });

  it("keeps the lead form interactive so a lead can still be captured", async () => {
    render(<LandingPage />);

    const name = screen.getByLabelText(/full name/i);
    await userEvent.type(name, "Ada Lovelace");
    expect(name).toHaveValue("Ada Lovelace");
    expect(screen.getByRole("button", { name: /send|submit/i })).toBeEnabled();
  });
});
