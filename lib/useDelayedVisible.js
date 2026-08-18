"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Centralized smart-loading visibility policy.
 *
 * Given an `active` flag (a genuine in-flight loading condition), this returns
 * whether a branded loader should actually be shown, applying two guards:
 *
 *  - `delay` (default 180ms): the loader is NOT shown immediately. If `active`
 *    turns false before the delay elapses (fast request / cached content), the
 *    loader never appears at all — no flash.
 *  - `minVisible` (default 250ms): once the loader HAS appeared, it stays for at
 *    least this long so it never flickers in and straight back out. This minimum
 *    only applies after the loader is already visible; it never delays content
 *    that arrived before the loader appeared.
 *
 * No artificial waits are introduced for content — only the loader's own
 * visibility is smoothed.
 *
 * @param {boolean} active
 * @param {{ delay?: number, minVisible?: number }} [options]
 * @returns {boolean} whether the loader should render now
 */
export function useDelayedVisible(active, options = {}) {
  const { delay = 180, minVisible = 250 } = options;
  const [visible, setVisible] = useState(false);
  const shownAtRef = useRef(0);
  const timersRef = useRef({ show: null, hide: null });

  useEffect(() => {
    const timers = timersRef.current;

    function clearShow() {
      if (timers.show) {
        clearTimeout(timers.show);
        timers.show = null;
      }
    }
    function clearHide() {
      if (timers.hide) {
        clearTimeout(timers.hide);
        timers.hide = null;
      }
    }

    if (active) {
      // A newer loading cycle supersedes any pending hide.
      clearHide();
      if (!visible && !timers.show) {
        timers.show = setTimeout(() => {
          timers.show = null;
          shownAtRef.current = Date.now();
          setVisible(true);
        }, Math.max(0, delay));
      }
      return () => {};
    }

    // active === false
    clearShow();
    if (visible) {
      const elapsed = Date.now() - shownAtRef.current;
      const remaining = Math.max(0, minVisible - elapsed);
      if (remaining === 0) {
        setVisible(false);
      } else if (!timers.hide) {
        timers.hide = setTimeout(() => {
          timers.hide = null;
          setVisible(false);
        }, remaining);
      }
    }
    return () => {};
  }, [active, visible, delay, minVisible]);

  // Unmount cleanup.
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      if (timers.show) clearTimeout(timers.show);
      if (timers.hide) clearTimeout(timers.hide);
    };
  }, []);

  return visible;
}

export default useDelayedVisible;
