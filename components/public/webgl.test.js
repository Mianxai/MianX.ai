// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  createWebGL2Context,
  detectWebGL2Support,
  getSceneBudget,
  prefersReducedMotion,
  UNSUPPORTED,
} from "./webgl";

const realGetContext = HTMLCanvasElement.prototype.getContext;

function stubGetContext(impl) {
  HTMLCanvasElement.prototype.getContext = vi.fn(impl);
}

function fakeGl(loseContext = vi.fn()) {
  return { getExtension: vi.fn(() => ({ loseContext })) };
}

function stubMatchMedia(map) {
  window.matchMedia = vi.fn((query) => ({
    matches: Boolean(map[query]),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe("detectWebGL2Support", () => {
  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = realGetContext;
    vi.restoreAllMocks();
  });

  it("probes for webgl2 — the only context three.js requests — not webgl1", () => {
    const requested = [];
    stubGetContext((name) => {
      requested.push(name);
      return name === "webgl2" ? fakeGl() : null;
    });

    expect(detectWebGL2Support()).toMatchObject({ supported: true });
    expect(requested).toEqual(["webgl2"]);
  });

  it("reports unsupported when webgl2 is missing even if webgl1 works", () => {
    stubGetContext((name) => (name === "webgl2" ? null : fakeGl()));

    expect(detectWebGL2Support()).toEqual({
      supported: false,
      reason: UNSUPPORTED.NO_WEBGL2,
    });
  });

  it("reports unsupported instead of throwing when getContext itself throws", () => {
    stubGetContext(() => {
      throw new Error("context creation blocked");
    });

    const result = detectWebGL2Support();
    expect(result.supported).toBe(false);
    expect(result.reason).toBe(UNSUPPORTED.PROBE_THREW);
  });

  it("releases the probe context so it cannot starve the real hero canvas", () => {
    const loseContext = vi.fn();
    stubGetContext(() => fakeGl(loseContext));

    detectWebGL2Support();
    expect(loseContext).toHaveBeenCalledTimes(1);
  });

  it("forwards the caller's context attributes to the probe", () => {
    const getContext = vi.fn(() => fakeGl());
    HTMLCanvasElement.prototype.getContext = getContext;

    detectWebGL2Support({ alpha: true, antialias: false });
    expect(getContext).toHaveBeenCalledWith("webgl2", { alpha: true, antialias: false });
  });
});

describe("createWebGL2Context", () => {
  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = realGetContext;
    vi.restoreAllMocks();
  });

  it("returns the context so three.js never has to create (or fail to create) one", () => {
    const gl = fakeGl();
    stubGetContext((name) => (name === "webgl2" ? gl : null));

    expect(createWebGL2Context(document.createElement("canvas"), { alpha: true })).toEqual({ gl });
  });

  it("returns a reason instead of throwing when the real canvas yields no context", () => {
    stubGetContext(() => null);

    expect(createWebGL2Context(document.createElement("canvas"))).toEqual({
      gl: null,
      reason: UNSUPPORTED.NO_WEBGL2,
    });
  });

  it("returns a reason instead of throwing when getContext throws", () => {
    stubGetContext(() => {
      throw new Error("GPU blocklisted");
    });

    const result = createWebGL2Context(document.createElement("canvas"));
    expect(result.gl).toBeNull();
    expect(result.reason).toBe(UNSUPPORTED.PROBE_THREW);
  });
});

describe("prefersReducedMotion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("follows the prefers-reduced-motion media query", () => {
    stubMatchMedia({ "(prefers-reduced-motion: reduce)": true });
    expect(prefersReducedMotion()).toBe(true);

    stubMatchMedia({});
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe("getSceneBudget", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses the full budget with pointer parallax on a capable desktop", () => {
    stubMatchMedia({});
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1440);
    vi.spyOn(window, "navigator", "get").mockReturnValue({ hardwareConcurrency: 12 });

    expect(getSceneBudget()).toEqual({
      shapeCount: 15,
      particleCount: 200,
      maxPixelRatio: 2,
      antialias: true,
      parallax: true,
    });
  });

  it("cuts geometry, particles, pixel ratio, antialiasing and parallax on a phone", () => {
    stubMatchMedia({ "(pointer: coarse)": true });
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(390);
    vi.spyOn(window, "navigator", "get").mockReturnValue({ hardwareConcurrency: 4 });

    const budget = getSceneBudget();
    expect(budget.shapeCount).toBeLessThan(15);
    expect(budget.particleCount).toBeLessThan(200);
    expect(budget.maxPixelRatio).toBeLessThan(2);
    expect(budget.antialias).toBe(false);
    expect(budget.parallax).toBe(false);
  });

  it("reduces cost on a low-memory device even at a desktop viewport", () => {
    stubMatchMedia({});
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1920);
    vi.spyOn(window, "navigator", "get").mockReturnValue({
      deviceMemory: 2,
      hardwareConcurrency: 16,
    });

    expect(getSceneBudget().shapeCount).toBeLessThan(15);
  });
});
