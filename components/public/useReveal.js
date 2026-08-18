"use client";

import { useEffect, useRef, useState } from "react";

// Lightweight scroll-reveal (IntersectionObserver + CSS transition) that
// reproduces the approved design's GSAP/ScrollTrigger "fade up on scroll"
// effect without adding gsap as a dependency — this repo doesn't otherwise
// need a full animation/timeline library, and IntersectionObserver already
// covers this single effect natively and cheaply. Automatically becomes a
// no-op reveal (always visible) when the user prefers reduced motion.
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}
