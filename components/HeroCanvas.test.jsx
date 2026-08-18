// @vitest-environment jsdom
import { StrictMode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act, waitFor } from "@testing-library/react";
import HeroCanvas from "./HeroCanvas";

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
  class Disposable {
    constructor() {
      this.dispose = vi.fn();
      this.opacity = 0.3;
    }
  }
  class BufferGeometry extends Disposable {
    setAttribute() {}
  }
  return {
    Scene: class {
      add() {}
      clear() {}
    },
    PerspectiveCamera: class extends Object3D {
      updateProjectionMatrix() {}
      lookAt() {}
    },
    WebGLRenderer: class {
      constructor() {
        if (mock.state.throwOnConstruct) {
          throw new Error("THREE.WebGLRenderer: Error creating WebGL context.");
        }
        this.render = vi.fn();
        this.setSize = vi.fn();
        this.setPixelRatio = vi.fn();
        this.dispose = vi.fn();
        this.forceContextLoss = vi.fn();
        mock.state.renderers.push(this);
      }
    },
    BufferGeometry,
    BufferAttribute: class {},
    Mesh: class extends Object3D {
      constructor(_geo, material) {
        super();
        this.material = material;
      }
    },
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

describe("HeroCanvas progressive enhancement", () => {
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

  it("falls back when WebGL is unavailable", async () => {
    setWebGL2({ available: false });
    const onUnavailable = vi.fn();
    render(<HeroCanvas onUnavailable={onUnavailable} />);
    await waitFor(() => expect(onUnavailable).toHaveBeenCalledWith("no-webgl2"));
    expect(mock.state.renderers).toHaveLength(0);
    expect(heroCanvas()).toBeNull();
  });

  it("falls back when getContext throws", async () => {
    HTMLCanvasElement.prototype.getContext = vi.fn(() => {
      throw new Error("blocked");
    });
    const onUnavailable = vi.fn();
    render(<HeroCanvas onUnavailable={onUnavailable} />);
    await waitFor(() => expect(onUnavailable).toHaveBeenCalled());
    expect(mock.state.renderers).toHaveLength(0);
  });

  it("catches renderer initialization failure without crashing", async () => {
    mock.state.throwOnConstruct = true;
    const onUnavailable = vi.fn();
    render(<HeroCanvas onUnavailable={onUnavailable} onReady={vi.fn()} />);
    await waitFor(() => expect(onUnavailable).toHaveBeenCalledWith("scene-init-failed"));
    expect(heroCanvas()).toBeNull();
  });

  it("falls back without constructing when only the probe succeeds", async () => {
    let probesLeft = 1;
    HTMLCanvasElement.prototype.getContext = vi.fn((name) =>
      name === "webgl2" && probesLeft-- > 0
        ? { getExtension: () => ({ loseContext: vi.fn() }) }
        : null
    );
    const onUnavailable = vi.fn();
    render(<HeroCanvas onUnavailable={onUnavailable} />);
    await waitFor(() => expect(onUnavailable).toHaveBeenCalledWith("no-webgl2"));
    expect(mock.state.renderers).toHaveLength(0);
  });

  it("mounts and paints when webgl2 is available", async () => {
    const onReady = vi.fn();
    render(<HeroCanvas onReady={onReady} />);
    await waitFor(() => expect(onReady).toHaveBeenCalled());
    expect(heroCanvas()).not.toBeNull();
    expect(mock.state.renderers[0].render).toHaveBeenCalled();
  });

  it("paints one static frame under reduced motion", async () => {
    setReducedMotion(true);
    const raf = vi.spyOn(window, "requestAnimationFrame");
    render(<HeroCanvas onReady={vi.fn()} />);
    await waitFor(() => expect(mock.state.renderers).toHaveLength(1));
    expect(mock.state.renderers[0].render).toHaveBeenCalledTimes(1);
    expect(raf).not.toHaveBeenCalled();
  });

  it("creates exactly one renderer under React Strict Mode", async () => {
    render(
      <StrictMode>
        <HeroCanvas onReady={vi.fn()} />
      </StrictMode>
    );
    await waitFor(() => expect(mock.state.renderers).toHaveLength(1));
    expect(document.querySelectorAll("#hero-canvas")).toHaveLength(1);
  });

  it("falls back on context loss", async () => {
    const onUnavailable = vi.fn();
    render(<HeroCanvas onUnavailable={onUnavailable} onReady={vi.fn()} />);
    await waitFor(() => expect(heroCanvas()).not.toBeNull());
    await act(async () => {
      heroCanvas().dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
    });
    expect(onUnavailable).toHaveBeenCalledWith("context-lost");
    expect(heroCanvas()).toBeNull();
  });

  it("disposes resources on unmount", async () => {
    setReducedMotion(true);
    const { unmount } = render(<HeroCanvas onReady={vi.fn()} />);
    await waitFor(() => expect(mock.state.renderers).toHaveLength(1));
    const renderer = mock.state.renderers[0];
    unmount();
    expect(renderer.dispose).toHaveBeenCalled();
    expect(renderer.forceContextLoss).toHaveBeenCalled();
    expect(heroCanvas()).toBeNull();
  });

  it("cancels animation frames on unmount while animating", async () => {
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(<HeroCanvas onReady={vi.fn()} />);
    await waitFor(() => expect(mock.state.renderers).toHaveLength(1));
    unmount();
    expect(cancel).toHaveBeenCalled();
  });
});
