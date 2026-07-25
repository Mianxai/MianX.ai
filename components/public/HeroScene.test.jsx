// @vitest-environment jsdom
import { StrictMode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act, waitFor } from "@testing-library/react";
import HeroScene from "./HeroScene";

// Mirrors three.js r185: WebGLRenderer asks the canvas for a "webgl2" context
// and throws this exact message when it gets null. `throwOnConstruct` reproduces
// the production crash.
const mock = vi.hoisted(() => ({
  state: { throwOnConstruct: false, renderers: [] },
}));

vi.mock("three", () => {
  class Object3D {
    constructor() {
      this.position = { x: 0, y: 0, z: 0 };
      this.rotation = { x: 0, y: 0, z: 0 };
      this.scale = { setScalar: vi.fn() };
      this.userData = {};
    }
  }
  class Scene {
    constructor() {
      this.children = [];
    }
    add(child) {
      this.children.push(child);
    }
    clear() {
      this.children = [];
    }
  }
  class PerspectiveCamera extends Object3D {
    updateProjectionMatrix() {}
  }
  class WebGLRenderer {
    constructor(parameters) {
      if (mock.state.throwOnConstruct) {
        throw new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
      this.parameters = parameters;
      this.render = vi.fn();
      this.setSize = vi.fn();
      this.setPixelRatio = vi.fn();
      this.dispose = vi.fn();
      this.forceContextLoss = vi.fn();
      mock.state.renderers.push(this);
    }
  }
  class Disposable {
    constructor() {
      this.dispose = vi.fn();
    }
  }
  class BufferGeometry extends Disposable {
    setAttribute() {}
  }
  return {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Color: class {
      constructor(value) {
        this.value = value;
      }
    },
    BufferGeometry,
    BufferAttribute: class {},
    Mesh: class extends Object3D {},
    Points: class extends Object3D {},
    IcosahedronGeometry: Disposable,
    OctahedronGeometry: Disposable,
    TetrahedronGeometry: Disposable,
    DodecahedronGeometry: Disposable,
    MeshBasicMaterial: Disposable,
    PointsMaterial: Disposable,
  };
});

const realGetContext = HTMLCanvasElement.prototype.getContext;

function setWebGL2({ available }) {
  HTMLCanvasElement.prototype.getContext = vi.fn((name) =>
    name === "webgl2" && available
      ? { getExtension: () => ({ loseContext: vi.fn() }) }
      : null
  );
}

function setReducedMotion(reduced) {
  window.matchMedia = vi.fn((query) => ({
    matches: query.includes("prefers-reduced-motion") ? reduced : false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

function heroCanvas() {
  return document.getElementById("hero-canvas");
}

describe("HeroScene progressive enhancement", () => {
  beforeEach(() => {
    mock.state.throwOnConstruct = false;
    mock.state.renderers = [];
    setWebGL2({ available: true });
    setReducedMotion(false);
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = realGetContext;
    vi.restoreAllMocks();
  });

  // The production defect: three.js threw inside an un-awaited async IIFE, so
  // the rejection escaped React entirely and took the page down. This test
  // passing at all is the proof that the rejection is now handled — Vitest
  // fails a file on any unhandled rejection.
  it("reports the failure and renders no canvas when WebGLRenderer cannot create a context", async () => {
    mock.state.throwOnConstruct = true;
    const onUnavailable = vi.fn();
    const onReady = vi.fn();

    render(<HeroScene onUnavailable={onUnavailable} onReady={onReady} />);

    await waitFor(() => expect(onUnavailable).toHaveBeenCalledWith("scene-init-failed"));
    expect(onReady).not.toHaveBeenCalled();
    expect(heroCanvas()).toBeNull();
    // Handled, not suppressed: the downgrade is still reported to the console.
    expect(console.warn).toHaveBeenCalled();
  });

  // The realistic production case: the cheap pre-flight probe succeeds, but the
  // real hero canvas cannot produce a context. three.js must never see it.
  it("falls back without invoking three.js when only the probe succeeds", async () => {
    let probesLeft = 1;
    HTMLCanvasElement.prototype.getContext = vi.fn((name) =>
      name === "webgl2" && probesLeft-- > 0
        ? { getExtension: () => ({ loseContext: vi.fn() }) }
        : null
    );
    const onUnavailable = vi.fn();

    render(<HeroScene onUnavailable={onUnavailable} onReady={vi.fn()} />);

    await waitFor(() => expect(onUnavailable).toHaveBeenCalledWith("no-webgl2"));
    expect(mock.state.renderers).toHaveLength(0);
    expect(heroCanvas()).toBeNull();
  });

  it("never constructs a renderer when webgl2 is unavailable", async () => {
    setWebGL2({ available: false });
    const onUnavailable = vi.fn();

    render(<HeroScene onUnavailable={onUnavailable} />);

    await waitFor(() => expect(onUnavailable).toHaveBeenCalledWith("no-webgl2"));
    expect(mock.state.renderers).toHaveLength(0);
    expect(heroCanvas()).toBeNull();
  });

  it("mounts the canvas and paints a frame when webgl2 is available", async () => {
    const onUnavailable = vi.fn();
    const onReady = vi.fn();

    render(<HeroScene onUnavailable={onUnavailable} onReady={onReady} />);

    await waitFor(() => expect(onReady).toHaveBeenCalled());
    expect(onUnavailable).not.toHaveBeenCalled();
    expect(heroCanvas()).not.toBeNull();
    expect(mock.state.renderers[0].render).toHaveBeenCalled();
  });

  it("paints one static frame instead of starting a loop under reduced motion", async () => {
    setReducedMotion(true);
    const raf = vi.spyOn(window, "requestAnimationFrame");

    render(<HeroScene onReady={vi.fn()} />);

    await waitFor(() => expect(mock.state.renderers).toHaveLength(1));
    expect(mock.state.renderers[0].render).toHaveBeenCalledTimes(1);
    expect(raf).not.toHaveBeenCalled();
  });

  it("creates exactly one renderer under React Strict Mode double-mounting", async () => {
    render(
      <StrictMode>
        <HeroScene onReady={vi.fn()} />
      </StrictMode>
    );

    await waitFor(() => expect(mock.state.renderers).toHaveLength(1));
    expect(document.querySelectorAll("#hero-canvas")).toHaveLength(1);
  });

  it("falls back to the static hero when the GPU context is lost mid-session", async () => {
    const onUnavailable = vi.fn();
    render(<HeroScene onUnavailable={onUnavailable} onReady={vi.fn()} />);
    await waitFor(() => expect(heroCanvas()).not.toBeNull());

    const canvas = heroCanvas();
    await act(async () => {
      canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
    });

    expect(onUnavailable).toHaveBeenCalledWith("context-lost");
    expect(heroCanvas()).toBeNull();
  });

  it("disposes the renderer, geometries, materials and listeners on unmount", async () => {
    setReducedMotion(true);
    const { unmount } = render(<HeroScene onReady={vi.fn()} />);
    await waitFor(() => expect(mock.state.renderers).toHaveLength(1));

    const renderer = mock.state.renderers[0];
    const framesBeforeUnmount = renderer.render.mock.calls.length;
    unmount();

    expect(renderer.dispose).toHaveBeenCalled();
    expect(renderer.forceContextLoss).toHaveBeenCalled();
    expect(heroCanvas()).toBeNull();

    // Listeners are gone, so post-unmount events cannot resurrect the loop.
    window.dispatchEvent(new Event("resize"));
    document.dispatchEvent(new Event("visibilitychange"));
    expect(renderer.render).toHaveBeenCalledTimes(framesBeforeUnmount);
  });

  it("cancels the animation frame on unmount", async () => {
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(<HeroScene onReady={vi.fn()} />);
    await waitFor(() => expect(mock.state.renderers).toHaveLength(1));

    unmount();
    expect(cancel).toHaveBeenCalled();
  });
});
