// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDelayedVisible } from "./useDelayedVisible";

describe("useDelayedVisible smart-loading policy", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not show the loader immediately", () => {
    const { result } = renderHook(() =>
      useDelayedVisible(true, { delay: 180, minVisible: 250 })
    );
    expect(result.current).toBe(false);
  });

  it("never shows a loader for a fast request that resolves before the delay", () => {
    const { result, rerender } = renderHook(
      ({ active }) => useDelayedVisible(active, { delay: 180, minVisible: 250 }),
      { initialProps: { active: true } }
    );
    // Content arrives at 120ms — before the 180ms threshold.
    act(() => {
      vi.advanceTimersByTime(120);
    });
    rerender({ active: false });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe(false);
  });

  it("shows the loader once a slow request passes the delay threshold", () => {
    const { result } = renderHook(() =>
      useDelayedVisible(true, { delay: 180, minVisible: 250 })
    );
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe(true);
  });

  it("keeps the loader visible for the minimum duration to avoid flicker", () => {
    const { result, rerender } = renderHook(
      ({ active }) => useDelayedVisible(active, { delay: 180, minVisible: 250 }),
      { initialProps: { active: true } }
    );
    act(() => {
      vi.advanceTimersByTime(200); // loader now visible
    });
    expect(result.current).toBe(true);

    // Content arrives 50ms after the loader appeared.
    rerender({ active: false });
    act(() => {
      vi.advanceTimersByTime(50);
    });
    // Still visible — min duration not yet elapsed.
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe(false);
  });

  it("hides immediately once min duration has already elapsed", () => {
    const { result, rerender } = renderHook(
      ({ active }) => useDelayedVisible(active, { delay: 100, minVisible: 200 }),
      { initialProps: { active: true } }
    );
    act(() => {
      vi.advanceTimersByTime(100); // visible
      vi.advanceTimersByTime(300); // well past minVisible
    });
    expect(result.current).toBe(true);
    rerender({ active: false });
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(result.current).toBe(false);
  });
});
