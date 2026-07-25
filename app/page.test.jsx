// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingPage from "./page";

// The hero mounts a dynamically-imported Three.js scene; stub it out so the
// test focuses on page structure/content rather than WebGL.
vi.mock("@/components/public/HeroScene", () => ({
  default: () => null,
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
