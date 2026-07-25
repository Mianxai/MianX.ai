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

  it("probes webgl2 only", () => {
    const requested = [];
    stubGetContext((name) => {
      requested.push(name);
      return name === "webgl2" ? fakeGl() : null;
    });
    expect(detectWebGL2Support()).toMatchObject({ supported: true });
    expect(requested).toEqual(["webgl2"]);
  });

  it("reports unsupported when webgl2 is missing", () => {
    stubGetContext(() => null);
    expect(detectWebGL2Support()).toEqual({
      supported: false,
      reason: UNSUPPORTED.NO_WEBGL2,
    });
  });

  it("reports unsupported when getContext throws", () => {
    stubGetContext(() => {
      throw new Error("blocked");
    });
    const result = detectWebGL2Support();
    expect(result.supported).toBe(false);
    expect(result.reason).toBe(UNSUPPORTED.PROBE_THREW);
  });

  it("releases the probe context", () => {
    const loseContext = vi.fn();
    stubGetContext(() => fakeGl(loseContext));
    detectWebGL2Support();
    expect(loseContext).toHaveBeenCalledTimes(1);
  });
});

describe("createWebGL2Context", () => {
  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = realGetContext;
    vi.restoreAllMocks();
  });

  it("returns a reason instead of throwing when context creation fails", () => {
    stubGetContext(() => null);
    expect(createWebGL2Context(document.createElement("canvas"))).toEqual({
      gl: null,
      reason: UNSUPPORTED.NO_WEBGL2,
    });
  });
});

describe("prefersReducedMotion / getSceneBudget", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("follows prefers-reduced-motion", () => {
    stubMatchMedia({ "(prefers-reduced-motion: reduce)": true });
    expect(prefersReducedMotion()).toBe(true);
  });

  it("reduces cost and disables parallax on a phone", () => {
    stubMatchMedia({ "(pointer: coarse)": true });
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(390);
    const budget = getSceneBudget();
    expect(budget.shapeCount).toBeLessThan(15);
    expect(budget.parallax).toBe(false);
  });
});
