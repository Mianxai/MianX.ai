// Capability detection for the optional Three.js hero enhancement.
// three.js (r163+) requests "webgl2" only — probing WebGL1 green-lights
// devices that cannot run the scene.

export const UNSUPPORTED = {
  NO_DOCUMENT: "no-document",
  NO_WEBGL2: "no-webgl2",
  PROBE_THREW: "probe-threw",
};

function releaseProbeContext(gl) {
  try {
    gl?.getExtension?.("WEBGL_lose_context")?.loseContext?.();
  } catch {
    // Best effort.
  }
}

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
