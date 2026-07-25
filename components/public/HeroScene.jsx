"use client";

import { useEffect, useRef, useState } from "react";

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Three.js animated wireframe hero background, ported from the approved
// design (design/approved/final-website/mianx_website_public.html). Loaded
// only on the client (see Hero.jsx's next/dynamic import with ssr: false) so
// it never touches SSR/`next build`. Skips rendering entirely — falling back
// to the CSS gradient behind it — when WebGL isn't available, and renders a
// single static frame instead of an animation loop when the user prefers
// reduced motion.
export default function HeroScene() {
  const canvasRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setSupported(false);
      return;
    }

    let renderer;
    let raf;
    let disposed = false;
    const cleanupFns = [];

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const geometries = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TetrahedronGeometry(1, 0),
        new THREE.DodecahedronGeometry(1, 0),
      ];
      const material = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.3 });
      const material2 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.2 });

      const shapes = [];
      for (let i = 0; i < 15; i++) {
        const geo = geometries[Math.floor(Math.random() * geometries.length)];
        const mat = Math.random() > 0.5 ? material : material2;
        const mesh = new THREE.Mesh(geo, mat);
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

      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - 0.5) * 30;
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({ color: 0x6366f1, size: 0.05, transparent: true, opacity: 0.6 });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);
      camera.position.z = 8;

      let mouseX = 0;
      let mouseY = 0;
      function handleMouseMove(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      }
      if (!prefersReducedMotion) {
        window.addEventListener("mousemove", handleMouseMove);
        cleanupFns.push(() => window.removeEventListener("mousemove", handleMouseMove));
      }

      let time = 0;
      function renderFrame() {
        time += 0.01;
        shapes.forEach((shape) => {
          shape.rotation.x += shape.userData.rotationSpeed.x;
          shape.rotation.y += shape.userData.rotationSpeed.y;
          shape.rotation.z += shape.userData.rotationSpeed.z;
          shape.position.y += Math.sin(time + shape.userData.floatOffset) * shape.userData.floatSpeed;
        });
        particles.rotation.y = time * 0.05;
        particles.rotation.x = mouseY * 0.1;
        particles.rotation.y += mouseX * 0.05;
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
        renderer.render(scene, camera);
      }

      if (prefersReducedMotion) {
        renderFrame();
      } else {
        const animate = () => {
          renderFrame();
          raf = requestAnimationFrame(animate);
        };
        animate();
      }

      function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (prefersReducedMotion) renderFrame();
      }
      window.addEventListener("resize", handleResize);
      cleanupFns.push(() => window.removeEventListener("resize", handleResize));

      cleanupFns.push(() => {
        cancelAnimationFrame(raf);
        renderer.dispose();
        geometries.forEach((g) => g.dispose());
        material.dispose();
        material2.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
      });
    })();

    return () => {
      disposed = true;
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  if (!supported) return null;
  return <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}
