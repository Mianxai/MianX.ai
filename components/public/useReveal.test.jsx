// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Reveal from "./Reveal";

function mockMatchMedia(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

// jsdom has no real IntersectionObserver; stub one so the "normal motion"
// branch can be exercised deterministically by invoking the callback.
class FakeIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(el) {
    this.callback([{ isIntersecting: true, target: el }]);
  }
  unobserve() {}
  disconnect() {}
}

describe("Reveal / useReveal reduced-motion behavior", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("is immediately visible (no animation gating) when prefers-reduced-motion is set", () => {
    mockMatchMedia(true);
    render(<Reveal>content</Reveal>);
    expect(screen.getByText("content")).toHaveClass("active");
  });

  it("becomes visible once intersecting when motion is allowed", () => {
    mockMatchMedia(false);
    window.IntersectionObserver = FakeIntersectionObserver;
    render(<Reveal>content</Reveal>);
    expect(screen.getByText("content")).toHaveClass("active");
  });
});
