// Capability detection for the optional Three.js hero enhancement.
//
// three.js dropped its WebGL1 fallback in r163: `WebGLRenderer` requests a
// "webgl2" context only, and throws "THREE.WebGLRenderer: Error creating
// WebGL context." when it gets null. Probing for WebGL1 therefore green-lights
// devices that cannot run the scene at all, so this probe asks for exactly
// what three.js asks for.

// Reasons are returned rather than thrown so the caller can log one honest
// diagnostic and fall back, instead of failing silently.
export const UNSUPPORTED = {
  NO_DOCUMENT: "no-document",
  NO_WEBGL2: "no-webgl2",
  PROBE_THREW: "probe-threw",
};

function releaseProbeContext(gl) {
  // A probe context counts against the browser's live-context budget (~16 in
  // Chrome), so it must never be left to starve the real hero canvas.
  try {
    gl?.getExtension?.("WEBGL_lose_context")?.loseContext?.();
  } catch {
    // Best effort only — the browser reclaims it with the canvas either way.
  }
}

// Cheap pre-flight, run before three.js is even downloaded, so a device that
// cannot use the scene never pays for the module. It is a prediction, not a
// guarantee — createWebGL2Context is the authoritative check.
export function detectWebGL2Support(contextAttributes = {}) {
  if (typeof document === "undefined") {
    return { supported: false, reason: UNSUPPORTED.NO_DOCUMENT };
  }

  let gl = null;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    gl = canvas.getContext("webgl2", contextAttributes);
  } catch (error) {
    return { supported: false, reason: UNSUPPORTED.PROBE_THREW, error };
  } finally {
    releaseProbeContext(gl);
  }

  return gl
    ? { supported: true, reason: "webgl2" }
    : { supported: false, reason: UNSUPPORTED.NO_WEBGL2 };
}

// Owning context creation — rather than letting three.js do it — is what keeps
// "Error creating WebGL context." from ever being thrown: three.js skips its own
// creation when handed a context, so a null result becomes an ordinary fallback
// instead of an exception (and one less console error).
export function createWebGL2Context(canvas, contextAttributes = {}) {
  try {
    const gl = canvas.getContext("webgl2", contextAttributes);
    return gl ? { gl } : { gl: null, reason: UNSUPPORTED.NO_WEBGL2 };
  } catch (error) {
    return { gl: null, reason: UNSUPPORTED.PROBE_THREW, error };
  }
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

// Scene cost is chosen up front rather than measured, because a dropped-frame
// measurement would already have cost the user the bad first impression.
export function getSceneBudget() {
  if (typeof window === "undefined") return { ...FULL_BUDGET, parallax: false };

  const nav = window.navigator ?? {};
  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const narrowViewport = (window.innerWidth ?? 0) > 0 && window.innerWidth < 768;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const fewCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
  const savingData = nav.connection?.saveData === true;

  const constrained =
    coarsePointer || narrowViewport || lowMemory || fewCores || savingData;

  return {
    ...(constrained ? CONSTRAINED_BUDGET : FULL_BUDGET),
    // Pointer parallax is meaningless without a hovering pointer and costs a
    // high-frequency listener on touch devices.
    parallax: !coarsePointer,
  };
}

const FULL_BUDGET = {
  shapeCount: 15,
  particleCount: 200,
  maxPixelRatio: 2,
  antialias: true,
};

const CONSTRAINED_BUDGET = {
  shapeCount: 7,
  particleCount: 70,
  maxPixelRatio: 1.5,
  antialias: false,
};
