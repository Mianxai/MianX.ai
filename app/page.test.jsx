// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingPage from "./page";

// HeroCanvas is covered by its own WebGL tests; stub it here so page tests
// lock content/structure without needing a GPU.
vi.mock("@/components/HeroCanvas", () => ({
  default: () => null,
}));

vi.mock("gsap", () => ({
  default: {
    registerPlugin: () => {},
    context: () => ({ revert: () => {} }),
    utils: { toArray: () => [] },
    fromTo: () => {},
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

describe("Founder-approved Industry OS homepage", () => {
  it("keeps the metallic MX logo asset path", () => {
    render(<LandingPage />);
    const logo = document.querySelector('img[src="/mianx-logo.png"]');
    expect(logo).toBeTruthy();
    expect(logo).toHaveAttribute("width", "40");
    expect(logo).toHaveAttribute("height", "40");
  });

  it("shows the exact Industry Operating Systems hero", () => {
    render(<LandingPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /AI-Powered\s*Industry Operating Systems/i
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("keeps the approved navigation labels and Get a Demo CTA", () => {
    render(<LandingPage />);
    const nav = document.querySelector("nav.navbar");
    expect(nav).toBeTruthy();
    expect(nav.classList.contains("navbar--top")).toBe(true);
    const hrefs = {
      Services: "#services",
      Industries: "#industries",
      Partners: "#partners",
      Testimonials: "#testimonials",
      Contact: "#contact",
    };
    for (const [label, href] of Object.entries(hrefs)) {
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
    expect(within(nav).getByRole("link", { name: /get a demo/i })).toHaveAttribute(
      "href",
      "#contact"
    );
  });

  it("preserves section order and approved statistics", () => {
    render(<LandingPage />);
    expect(
      ["hero", "how-it-works", "services", "industries", "partners", "testimonials", "contact"].map(
        (id) => document.getElementById(id)?.id
      )
    ).toEqual([
      "hero",
      "how-it-works",
      "services",
      "industries",
      "partners",
      "testimonials",
      "contact",
    ]);
    const heroStats = document.querySelector(".hero-stats");
    expect(heroStats).toBeTruthy();
    expect(within(heroStats).getByText("Live Partners")).toBeInTheDocument();
    expect(within(heroStats).getByText("Industries")).toBeInTheDocument();
    expect(within(heroStats).getByText("Cities Covered")).toBeInTheDocument();
    expect(within(heroStats).getByText("Active Users")).toBeInTheDocument();
    expect(within(heroStats).getByText("2+")).toBeInTheDocument();
    expect(within(heroStats).getByText("10+")).toBeInTheDocument();
    expect(within(heroStats).getByText("81+")).toBeInTheDocument();
    expect(within(heroStats).getByText("500+")).toBeInTheDocument();
  });

  it("keeps the contact form present and interactive", async () => {
    render(<LandingPage />);
    const name = screen.getByLabelText(/full name/i);
    await userEvent.type(name, "Ada Lovelace");
    expect(name).toHaveValue("Ada Lovelace");
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^industry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell us about your needs/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /request free demo/i })).toBeEnabled();
  });

  it("homepage remains usable when the 3D canvas is absent", () => {
    render(<LandingPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get a free demo/i })).toHaveAttribute(
      "href",
      "#contact"
    );
    expect(document.getElementById("hero-canvas")).toBeNull();
  });
});
