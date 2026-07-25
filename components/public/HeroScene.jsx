"use client";

import { useEffect, useRef } from "react";
import {
  createWebGL2Context,
  detectWebGL2Support,
  getSceneBudget,
  prefersReducedMotion,
} from "./webgl";

// Read from the token layer so the scene can never drift from
// design/MIANX-BRAND-SYSTEM.md. The literals are only a boot-order safety net.
const BRAND_COLORS = {
  sapphire: ["--mx-primary", "#1677ff"],
  cyan: ["--mx-cyan", "#38c7ff"],
  titanium: ["--mx-titanium", "#c9d2df"],
};

function readBrandColors(THREE) {
  const styles = getComputedStyle(document.documentElement);
  return Object.fromEntries(
    Object.entries(BRAND_COLORS).map(([key, [token, fallback]]) => [
      key,
      new THREE.Color(styles.getPropertyValue(token).trim() || fallback),
    ])
  );
}

// Shared across mounts so a remount (including React Strict Mode's double
// invocation) reuses the one in-flight import instead of racing a second one.
let threeModule = null;

function loadThree() {
  if (!threeModule) {
    threeModule = import("three").catch((error) => {
      // Don't cache the rejection — a failed chunk load may succeed later.
      threeModule = null;
      throw error;
    });
  }
  return threeModule;
}

// Animated wireframe hero background, ported from the approved design
// (design/approved/final-website/mianx_website_public.html).
//
// This is a pure enhancement layered over the static composition Hero.jsx
// server-renders: every failure path calls `onUnavailable` and leaves the
// static hero in place. Nothing in here is allowed to reject or throw past
// this component — a missing GPU is a normal browsing condition, not an
// application error.
export default function HeroScene({ onUnavailable, onReady }) {
  const mountRef = useRef(null);
  // Kept in refs so a changed callback identity never re-runs (and so never
  // double-builds) the scene.
  const callbacks = useRef({ onUnavailable, onReady });
  callbacks.current = { onUnavailable, onReady };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let reported = false;
    const teardown = [];

    function cleanup() {
      while (teardown.length) {
        const fn = teardown.pop();
        try {
          fn();
        } catch {
          // Teardown is best effort; one failing disposal must not strand the
          // rest of the cleanup (or leak the renderer).
        }
      }
    }

    function fallBack(reason, error) {
      if (reported) return;
      reported = true;
      // Logged, not swallowed: the failure is handled, but a silent downgrade
      // would hide a real regression from the next person debugging this.
      console.warn(
        `[Mianx] Hero 3D scene unavailable (${reason}) — showing the static brand hero.`,
        error ?? ""
      );
      callbacks.current.onUnavailable?.(reason);
    }

    const budget = getSceneBudget();
    const contextAttributes = {
      alpha: true,
      antialias: budget.antialias,
      powerPreference: "default",
    };

    const support = detectWebGL2Support(contextAttributes);
    if (!support.supported) {
      fallBack(support.reason, support.error);
      return;
    }

    async function build() {
      const THREE = await loadThree();
      if (cancelled) return;

      // A fresh canvas per effect run: React Strict Mode invokes effects twice
      // in development, and a canvas whose context was force-lost during
      // teardown can never hand out another one.
      const canvas = document.createElement("canvas");
      canvas.id = "hero-canvas";
      canvas.setAttribute("aria-hidden", "true");
      mount.replaceChildren(canvas);
      teardown.push(() => canvas.remove());

      // The pre-flight probe can pass on a device where the real canvas still
      // fails, so the context is created and checked here before three.js is
      // given anything to fail on.
      const { gl, reason, error } = createWebGL2Context(canvas, contextAttributes);
      if (!gl) {
        cleanup();
        fallBack(reason, error);
        return;
      }

      const renderer = new THREE.WebGLRenderer({ canvas, context: gl, ...contextAttributes });
      teardown.push(() => {
        renderer.dispose();
        renderer.forceContextLoss?.();
      });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = 8;

      const geometries = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TetrahedronGeometry(1, 0),
        new THREE.DodecahedronGeometry(1, 0),
      ];
      const brand = readBrandColors(THREE);
      const materials = [
        new THREE.MeshBasicMaterial({ color: brand.sapphire, wireframe: true, transparent: true, opacity: 0.3 }),
        new THREE.MeshBasicMaterial({ color: brand.cyan, wireframe: true, transparent: true, opacity: 0.2 }),
        new THREE.MeshBasicMaterial({ color: brand.titanium, wireframe: true, transparent: true, opacity: 0.12 }),
      ];

      const shapes = [];
      for (let i = 0; i < budget.shapeCount; i++) {
        const mesh = new THREE.Mesh(
          geometries[i % geometries.length],
          materials[i % materials.length]
        );
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 15;
        mesh.position.z = (Math.random() - 0.5) * 10 - 5;
        mesh.scale.setScalar(Math.random() * 0.8 + 0.3);
        mesh.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01,
          },
          floatSpeed: Math.random() * 0.002 + 0.001,
          floatOffset: Math.random() * Math.PI * 2,
        };
        scene.add(mesh);
        shapes.push(mesh);
      }

      const positions = new Float32Array(budget.particleCount * 3);
      for (let i = 0; i < positions.length; i++) positions[i] = (Math.random() - 0.5) * 30;
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: brand.sapphire,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      teardown.push(() => {
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
        particleGeometry.dispose();
        particleMaterial.dispose();
        scene.clear();
      });

      let mouseX = 0;
      let mouseY = 0;
      let time = 0;

      function resize() {
        const width = mount.clientWidth || window.innerWidth || 1;
        const height = mount.clientHeight || window.innerHeight || 1;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, budget.maxPixelRatio));
        renderer.setSize(width, height, false);
      }

      function renderFrame() {
        time += 0.01;
        shapes.forEach((shape) => {
          const { rotationSpeed, floatSpeed, floatOffset } = shape.userData;
          shape.rotation.x += rotationSpeed.x;
          shape.rotation.y += rotationSpeed.y;
          shape.rotation.z += rotationSpeed.z;
          shape.position.y += Math.sin(time + floatOffset) * floatSpeed;
        });
        particles.rotation.y = time * 0.05 + mouseX * 0.05;
        particles.rotation.x = mouseY * 0.1;
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
        renderer.render(scene, camera);
      }

      let raf = 0;
      let running = false;
      // Animating a hero nobody is looking at burns battery for nothing, so
      // the loop is gated on visibility as well as on user preference.
      let onScreen = true;
      let pageVisible = true;
      let staticOnly = prefersReducedMotion();

      function loop() {
        renderFrame();
        raf = requestAnimationFrame(loop);
      }

      function stop() {
        if (!running) return;
        running = false;
        cancelAnimationFrame(raf);
        raf = 0;
      }

      function sync() {
        if (cancelled) return;
        const shouldAnimate = !staticOnly && onScreen && pageVisible;
        if (shouldAnimate && !running) {
          running = true;
          loop();
        } else if (!shouldAnimate) {
          stop();
          // A single frame keeps the composition present instead of blank
          // whenever animation is off rather than merely paused.
          if (staticOnly && onScreen && pageVisible) renderFrame();
        }
      }

      teardown.push(stop);

      // Losing the GPU context mid-session is recoverable for us: hand the
      // hero back to the static composition rather than leaving a frozen frame.
      function handleContextLost(event) {
        event.preventDefault();
        cleanup();
        fallBack("context-lost");
      }
      canvas.addEventListener("webglcontextlost", handleContextLost);
      teardown.push(() => canvas.removeEventListener("webglcontextlost", handleContextLost));

      if (budget.parallax) {
        const handleMouseMove = (event) => {
          mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
          mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        teardown.push(() => window.removeEventListener("mousemove", handleMouseMove));
      }

      const handleVisibility = () => {
        pageVisible = document.visibilityState !== "hidden";
        sync();
      };
      document.addEventListener("visibilitychange", handleVisibility);
      teardown.push(() => document.removeEventListener("visibilitychange", handleVisibility));

      const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
      if (motionQuery?.addEventListener) {
        const handleMotionChange = (event) => {
          staticOnly = event.matches;
          sync();
        };
        motionQuery.addEventListener("change", handleMotionChange);
        teardown.push(() => motionQuery.removeEventListener("change", handleMotionChange));
      }

      if (typeof ResizeObserver === "function") {
        const resizeObserver = new ResizeObserver(() => {
          resize();
          if (staticOnly) renderFrame();
        });
        resizeObserver.observe(mount);
        teardown.push(() => resizeObserver.disconnect());
      } else {
        const handleResize = () => {
          resize();
          if (staticOnly) renderFrame();
        };
        window.addEventListener("resize", handleResize);
        teardown.push(() => window.removeEventListener("resize", handleResize));
      }

      if (typeof IntersectionObserver === "function") {
        const visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
          },
          { threshold: 0 }
        );
        visibilityObserver.observe(mount);
        teardown.push(() => visibilityObserver.disconnect());
      }

      resize();
      // sync() paints the first frame in both modes: one static frame under
      // reduced motion, or the start of the animation loop otherwise.
      sync();
      callbacks.current.onReady?.();
    }

    // The only place a scene failure can surface. Without this, three.js's
    // constructor throw escaped as an unhandled rejection and took the whole
    // client-side app down with it.
    build().catch((error) => {
      cleanup();
      fallBack("scene-init-failed", error);
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div className="hero-canvas-mount" ref={mountRef} aria-hidden="true" />;
}
