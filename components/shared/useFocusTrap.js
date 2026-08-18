"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Traps Tab/Shift+Tab focus inside `containerRef` while `active` is true,
// closes on Escape via `onClose`, and restores focus to whatever was
// focused before the trap activated once it deactivates. Used by the
// mobile nav menu and the admin lead-detail modal.
export function useFocusTrap(containerRef, active, onClose) {
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement;

    // Note: deliberately not filtering by `offsetParent !== null` — elements
    // inside a `position: fixed` ancestor (like our modal overlay) can have
    // a null offsetParent in some browsers even while fully visible, which
    // would incorrectly exclude every focusable element from the trap.
    const focusables = () => Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));

    const first = focusables()[0];
    (first || container).focus();

    function handleKeydown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown, true);
    return () => {
      document.removeEventListener("keydown", handleKeydown, true);
      previouslyFocused.current?.focus?.();
    };
  }, [active, containerRef, onClose]);
}
