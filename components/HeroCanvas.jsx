"use client";

import { useEffect, useRef } from "react";
import {
  createWebGL2Context,
  detectWebGL2Support,
  getSceneBudget,
  prefersReducedMotion,
} from "./webgl";

// Exact colours from the Founder-approved HeroCanvas (commit 3f3cc84).
const COLOR_PRIMARY = 0x6366f1;
const COLOR_ACCENT = 0x06b6d4;

let threeModule = null;

function loadThree() {
  if (!threeModule) {
    threeModule = import("three").catch((error) => {
      threeModule = null;
      throw error;
    });
  }
  return threeModule;
}

function createRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Three.js wireframe hero background from the approved Industry OS site.
// Progressive enhancement only — never crashes the page when WebGL is absent.
export default function HeroCanvas({ onUnavailable, onReady } = {}) {
  const mountRef = useRef(null);
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
        try {
          teardown.pop()();
        } catch {
          // Best-effort teardown.
        }
      }
    }

    function fallBack(reason, error) {
      if (reported) return;
      reported = true;
      console.warn(
        `[Mianx] Hero 3D scene unavailable (${reason}) — static hero remains.`,
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

      const canvas = document.createElement("canvas");
      canvas.id = "hero-canvas";
      canvas.setAttribute("aria-hidden", "true");
      mount.replaceChildren(canvas);
      teardown.push(() => canvas.remove());

      const { gl, reason, error } = createWebGL2Context(canvas, contextAttributes);
      if (!gl) {
        cleanup();
        fallBack(reason, error);
        return;
      }

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, context: gl, ...contextAttributes });
      } catch (initError) {
        cleanup();
        fallBack("scene-init-failed", initError);
        return;
      }

      teardown.push(() => {
        renderer.dispose();
        renderer.forceContextLoss?.();
      });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const baseCameraZ = 8;
      camera.position.z = baseCameraZ;

      const geometries = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TetrahedronGeometry(1, 0),
        new THREE.DodecahedronGeometry(1, 0),
      ];
      const materials = [
        new THREE.MeshBasicMaterial({
          color: COLOR_PRIMARY,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        }),
        new THREE.MeshBasicMaterial({
          color: COLOR_ACCENT,
          wireframe: true,
          transparent: true,
          opacity: 0.2,
        }),
      ];

      const rng = createRng(20260725);
      const shapes = [];
      for (let i = 0; i < budget.shapeCount; i++) {
        const mesh = new THREE.Mesh(
          geometries[i % geometries.length],
          materials[i % materials.length]
        );
        const ring = i % 2 === 0 ? 0 : 1;
        const radius = ring === 0 ? 5.5 + rng() * 3.5 : 8.5 + rng() * 4.5;
        const angle = (i / budget.shapeCount) * Math.PI * 2 + rng() * 0.45;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.y = (rng() - 0.5) * (ring === 0 ? 7 : 11);
        mesh.position.z = (rng() - 0.5) * 8 - 4;
        // Keep a soft clear zone behind hero copy / CTAs.
        if (Math.abs(mesh.position.x) < 2.2 && Math.abs(mesh.position.y) < 1.8) {
          mesh.position.x += mesh.position.x < 0 ? -3.2 : 3.2;
        }
        mesh.scale.setScalar(0.35 + rng() * 0.75);
        mesh.userData = {
          baseX: mesh.position.x,
          baseY: mesh.position.y,
          baseZ: mesh.position.z,
          rotationSpeed: {
            x: (rng() - 0.5) * 0.004,
            y: (rng() - 0.5) * 0.005,
            z: (rng() - 0.5) * 0.003,
          },
          floatAmp: 0.12 + rng() * 0.22,
          floatSpeed: 0.35 + rng() * 0.45,
          floatOffset: rng() * Math.PI * 2,
        };
        scene.add(mesh);
        shapes.push(mesh);
      }

      const positions = new Float32Array(budget.particleCount * 3);
      for (let i = 0; i < budget.particleCount; i++) {
        const a = rng() * Math.PI * 2;
        const r = 2 + rng() * 14;
        positions[i * 3] = Math.cos(a) * r;
        positions[i * 3 + 1] = (rng() - 0.5) * 16;
        positions[i * 3 + 2] = (rng() - 0.5) * 12 - 3;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: COLOR_PRIMARY,
        size: 0.05,
        transparent: true,
        opacity: 0.55,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      teardown.push(() => {
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        particleGeometry.dispose();
        particleMaterial.dispose();
        scene.clear();
      });

      let mouseX = 0;
      let mouseY = 0;
      let targetMouseX = 0;
      let targetMouseY = 0;
      let scrollDepth = 0;
      let targetScrollDepth = 0;
      let time = 0;
      let lastTs = 0;

      function resize() {
        const width = mount.clientWidth || window.innerWidth || 1;
        const height = mount.clientHeight || window.innerHeight || 1;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, budget.maxPixelRatio));
        renderer.setSize(width, height, false);
      }

      function renderFrame(dt = 1 / 60) {
        const step = Math.min(dt, 0.05);
        time += step;

        mouseX = lerp(mouseX, targetMouseX, 1 - Math.exp(-4 * step));
        mouseY = lerp(mouseY, targetMouseY, 1 - Math.exp(-4 * step));
        scrollDepth = lerp(scrollDepth, targetScrollDepth, 1 - Math.exp(-3 * step));

        shapes.forEach((shape) => {
          const d = shape.userData;
          shape.rotation.x += d.rotationSpeed.x * step * 60;
          shape.rotation.y += d.rotationSpeed.y * step * 60;
          shape.rotation.z += d.rotationSpeed.z * step * 60;
          const floatY = Math.sin(time * d.floatSpeed + d.floatOffset) * d.floatAmp;
          const floatX = Math.cos(time * d.floatSpeed * 0.7 + d.floatOffset) * d.floatAmp * 0.35;
          shape.position.x = d.baseX + floatX;
          shape.position.y = d.baseY + floatY;
          shape.position.z = d.baseZ + scrollDepth * 0.35 * (d.baseZ / -8);
        });

        materials[0].opacity = 0.3 + Math.sin(time * 0.85) * 0.04;
        materials[1].opacity = 0.2 + Math.sin(time * 0.85 + 1.2) * 0.035;

        particles.rotation.y = time * 0.035 + mouseX * 0.04;
        particles.rotation.x = mouseY * 0.06;
        particleMaterial.opacity = 0.5 + Math.sin(time * 0.6) * 0.08;

        camera.position.x = lerp(camera.position.x, mouseX * 0.45, 1 - Math.exp(-3 * step));
        camera.position.y = lerp(
          camera.position.y,
          -mouseY * 0.35 + scrollDepth * 0.15,
          1 - Math.exp(-3 * step)
        );
        camera.position.z = baseCameraZ + scrollDepth * 0.55;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      }

      let raf = 0;
      let running = false;
      let onScreen = true;
      let pageVisible = true;
      let staticOnly = prefersReducedMotion();

      function loop(ts) {
        const dt = lastTs ? (ts - lastTs) / 1000 : 1 / 60;
        lastTs = ts;
        renderFrame(dt);
        raf = requestAnimationFrame(loop);
      }

      function stop() {
        if (!running) return;
        running = false;
        cancelAnimationFrame(raf);
        raf = 0;
        lastTs = 0;
      }

      function sync() {
        if (cancelled) return;
        const shouldAnimate = !staticOnly && onScreen && pageVisible;
        if (shouldAnimate && !running) {
          running = true;
          renderFrame(1 / 60);
          raf = requestAnimationFrame(loop);
        } else if (!shouldAnimate) {
          stop();
          if (staticOnly && onScreen && pageVisible) renderFrame(1 / 60);
        }
      }

      teardown.push(stop);

      function handleContextLost(event) {
        event.preventDefault();
        cleanup();
        fallBack("context-lost");
      }
      canvas.addEventListener("webglcontextlost", handleContextLost);
      teardown.push(() => canvas.removeEventListener("webglcontextlost", handleContextLost));

      if (budget.parallax) {
        const handleMouseMove = (event) => {
          targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
          targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        teardown.push(() => window.removeEventListener("mousemove", handleMouseMove));
      }

      const handleScroll = () => {
        const rect = mount.getBoundingClientRect();
        const visible = Math.max(
          0,
          Math.min(rect.height, window.innerHeight - Math.max(0, rect.top))
        );
        const progress = rect.height > 0 ? 1 - visible / rect.height : 0;
        targetScrollDepth = easeOutCubic(Math.min(1, Math.max(0, progress))) * 2.2;
      };
      if (!staticOnly) {
        window.addEventListener("scroll", handleScroll, { passive: true });
        teardown.push(() => window.removeEventListener("scroll", handleScroll));
        handleScroll();
      }

      const handleVisibility = () => {
        pageVisible = document.visibilityState !== "hidden";
        sync();
      };
      document.addEventListener("visibilitychange", handleVisibility);
      teardown.push(() => document.removeEventListener("visibilitychange", handleVisibility));

      const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
      if (motionQuery?.addEventListener) {
        const onMotion = (event) => {
          staticOnly = event.matches;
          sync();
        };
        motionQuery.addEventListener("change", onMotion);
        teardown.push(() => motionQuery.removeEventListener("change", onMotion));
      }

      if (typeof ResizeObserver === "function") {
        const ro = new ResizeObserver(() => {
          resize();
          if (staticOnly) renderFrame(1 / 60);
        });
        ro.observe(mount);
        teardown.push(() => ro.disconnect());
      } else {
        const onResize = () => {
          resize();
          if (staticOnly) renderFrame(1 / 60);
        };
        window.addEventListener("resize", onResize);
        teardown.push(() => window.removeEventListener("resize", onResize));
      }

      if (typeof IntersectionObserver === "function") {
        const io = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
          },
          { threshold: 0 }
        );
        io.observe(mount);
        teardown.push(() => io.disconnect());
      }

      resize();
      sync();
      callbacks.current.onReady?.();
    }

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
