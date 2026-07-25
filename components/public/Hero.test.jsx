// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Hero from "./Hero";

// Stands in for the real scene so each failure mode can be triggered
// deterministically without a GPU.
const scene = vi.hoisted(() => ({ behaviour: "ready" }));

vi.mock("./HeroScene", () => ({
  default: ({ onUnavailable, onReady }) => {
    if (scene.behaviour === "throws") {
      throw new Error("THREE.WebGLRenderer: Error creating WebGL context.");
    }
    if (scene.behaviour === "unavailable") {
      onUnavailable?.("no-webgl2");
      return null;
    }
    onReady?.();
    return <div id="hero-canvas" />;
  },
}));

function heroSection() {
  return document.getElementById("hero");
}

function expectHeroContentIsUsable() {
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /talk to us/i })).toHaveAttribute("href", "#contact");
  expect(screen.getByRole("link", { name: /see the platform/i })).toHaveAttribute("href", "#platform");
  expect(screen.getByText(/AI-native Business Operating System/i)).toBeInTheDocument();
  expect(screen.getByText("Locked Roadmap Steps")).toBeInTheDocument();
}

describe("Hero WebGL fallback", () => {
  beforeEach(() => {
    scene.behaviour = "ready";
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("server-renders the static composition and hero content before any scene mounts", () => {
    scene.behaviour = "unavailable";
    render(<Hero />);

    expect(document.querySelector(".hero-atmosphere")).not.toBeNull();
    expect(document.querySelector(".hero-lattice")).not.toBeNull();
    expect(document.querySelectorAll(".hero-orbit").length).toBeGreaterThan(0);
    expectHeroContentIsUsable();
  });

  it("marks the hero as fallback and keeps every CTA working when WebGL is unavailable", async () => {
    scene.behaviour = "unavailable";
    render(<Hero />);

    await waitFor(() => expect(heroSection()).toHaveAttribute("data-scene", "fallback"));
    expect(document.querySelector(".hero-lattice")).not.toBeNull();
    expect(document.getElementById("hero-canvas")).toBeNull();
    expectHeroContentIsUsable();
  });

  it("catches a scene render crash without taking the hero down with it", async () => {
    scene.behaviour = "throws";
    // React re-dispatches a caught boundary error so devtools can see it, which
    // jsdom then reports as uncaught. Acknowledge only this expected throw; any
    // other error still surfaces.
    const acknowledgeExpectedThrow = (event) => {
      if (event.error?.message?.includes("Error creating WebGL context")) {
        event.preventDefault();
      }
    };
    window.addEventListener("error", acknowledgeExpectedThrow);

    try {
      render(<Hero />);

      await waitFor(() => expect(heroSection()).toHaveAttribute("data-scene", "fallback"));
      expect(document.querySelector(".hero-lattice")).not.toBeNull();
      expectHeroContentIsUsable();
    } finally {
      window.removeEventListener("error", acknowledgeExpectedThrow);
    }
  });

  it("marks the hero as enhanced once the scene paints, keeping the static layers mounted", async () => {
    render(<Hero />);

    await waitFor(() => expect(heroSection()).toHaveAttribute("data-scene", "enhanced"));
    // Dimmed by CSS, never unmounted — losing the context later must not leave a hole.
    expect(document.querySelector(".hero-atmosphere")).not.toBeNull();
    expect(document.querySelector(".hero-lattice")).not.toBeNull();
    expectHeroContentIsUsable();
  });

  it("keeps decorative layers out of the accessibility tree", () => {
    scene.behaviour = "unavailable";
    render(<Hero />);

    expect(document.querySelector(".hero-atmosphere")).toHaveAttribute("aria-hidden", "true");
    expect(document.querySelector(".hero-lattice")).toHaveAttribute("aria-hidden", "true");
  });
});
