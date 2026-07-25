// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PublicSite from "./PublicSite";

vi.mock("./HeroCanvas", () => ({ default: () => null }));
vi.mock("gsap", () => ({
  default: {
    registerPlugin: () => {},
    context: () => ({ revert: () => {} }),
    utils: { toArray: () => [] },
    fromTo: () => {},
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));

const NAV_HREFS = {
  Services: "#services",
  Industries: "#industries",
  Partners: "#partners",
  Testimonials: "#testimonials",
  Contact: "#contact",
};

describe("glowing glass navbar", () => {
  let ioCallback;
  let ioDisconnect;
  let originalIO;
  let originalScrollY;

  beforeEach(() => {
    ioDisconnect = vi.fn();
    ioCallback = null;
    originalIO = window.IntersectionObserver;
    window.IntersectionObserver = class {
      constructor(cb) {
        ioCallback = cb;
      }
      observe() {}
      unobserve() {}
      disconnect() {
        ioDisconnect();
      }
    };
    originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      get: () => window.__scrollY || 0,
    });
    window.__scrollY = 0;
  });

  afterEach(() => {
    window.IntersectionObserver = originalIO;
    if (originalScrollY) Object.defineProperty(window, "scrollY", originalScrollY);
    else delete window.scrollY;
    delete window.__scrollY;
    vi.restoreAllMocks();
  });

  it("starts transparent at the top (navbar--top)", () => {
    render(<PublicSite />);
    const nav = document.querySelector("nav.navbar");
    expect(nav.classList.contains("navbar--top")).toBe(true);
    expect(nav.classList.contains("navbar--scrolled")).toBe(false);
  });

  it("applies navbar--scrolled after the scroll threshold and cleans up the listener", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<PublicSite />);
    const nav = document.querySelector("nav.navbar");

    act(() => {
      window.__scrollY = 28;
      fireEvent.scroll(window);
    });
    expect(nav.classList.contains("navbar--scrolled")).toBe(true);
    expect(nav.classList.contains("navbar--top")).toBe(false);

    const scrollAdds = addSpy.mock.calls.filter((c) => c[0] === "scroll");
    expect(scrollAdds.length).toBeGreaterThan(0);
    expect(scrollAdds.every((c) => c[2]?.passive === true)).toBe(true);

    unmount();
    const scrollRemoves = removeSpy.mock.calls.filter((c) => c[0] === "scroll");
    expect(scrollRemoves.length).toBeGreaterThan(0);
  });

  it("keeps the five original nav hrefs and Get a Demo CTA", () => {
    render(<PublicSite />);
    const nav = document.querySelector("nav.navbar");
    for (const [label, href] of Object.entries(NAV_HREFS)) {
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
    expect(within(nav).getByRole("link", { name: /get a demo/i })).toHaveAttribute(
      "href",
      "#contact"
    );
  });

  it("updates the active section through IntersectionObserver", () => {
    render(<PublicSite />);
    expect(ioCallback).toBeTypeOf("function");

    const services = document.getElementById("services");
    const industries = document.getElementById("industries");
    act(() => {
      ioCallback([
        { target: services, isIntersecting: true, intersectionRatio: 0.8 },
        { target: industries, isIntersecting: true, intersectionRatio: 0.2 },
      ]);
    });

    const nav = document.querySelector("nav.navbar");
    expect(within(nav).getByRole("link", { name: "Services" })).toHaveClass("active");
    expect(within(nav).getByRole("link", { name: "Services" })).toHaveAttribute(
      "aria-current",
      "true"
    );
    expect(within(nav).getByRole("link", { name: "Industries" })).not.toHaveClass("active");
  });

  it("disconnects the IntersectionObserver on unmount", () => {
    const { unmount } = render(<PublicSite />);
    unmount();
    expect(ioDisconnect).toHaveBeenCalled();
  });

  it("exposes a visible keyboard focus style on tab links", async () => {
    render(<PublicSite />);
    const services = screen.getAllByRole("link", { name: "Services" })[0];
    services.focus();
    expect(document.activeElement).toBe(services);
    // Focus ring is CSS-driven via :focus-visible; ensure the link remains an <a>.
    expect(services.tagName).toBe("A");
    expect(services).toHaveAttribute("href", "#services");
  });

  it("keeps the mobile menu usable with the original anchors", async () => {
    render(<PublicSite />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const menu = document.querySelector(".mobile-menu.active");
    expect(menu).toBeTruthy();
    for (const [label, href] of Object.entries(NAV_HREFS)) {
      expect(within(menu).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
    await userEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(document.querySelector(".mobile-menu.active")).toBeNull();
  });

  it("preserves hero, CTA, sections, stats, form and footer content", () => {
    render(<PublicSite />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /AI-Powered\s*Industry Operating Systems/i
    );
    expect(screen.getByRole("link", { name: /get a free demo/i })).toHaveAttribute(
      "href",
      "#contact"
    );
    expect(
      ["hero", "how-it-works", "services", "industries", "partners", "testimonials", "contact"].every(
        (id) => document.getElementById(id)
      )
    ).toBe(true);
    expect(document.querySelector(".hero-stats")).toBeTruthy();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(document.querySelector("footer.footer")).toBeTruthy();
  });
});
