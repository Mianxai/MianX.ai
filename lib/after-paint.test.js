import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { afterNextPaint } from "./after-paint";

describe("afterNextPaint", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("resolves after two animation frames when rAF is available", async () => {
    const frames = [];
    vi.stubGlobal("requestAnimationFrame", (cb) => {
      frames.push(cb);
      return frames.length;
    });
    const done = vi.fn();
    const p = afterNextPaint().then(done);
    expect(done).not.toHaveBeenCalled();
    expect(frames).toHaveLength(1);
    frames[0](0);
    expect(frames).toHaveLength(2);
    frames[1](16);
    await p;
    expect(done).toHaveBeenCalledTimes(1);
  });

  it("falls back to setTimeout(0) when rAF is unavailable", async () => {
    vi.stubGlobal("requestAnimationFrame", undefined);
    const done = vi.fn();
    const p = afterNextPaint().then(done);
    expect(done).not.toHaveBeenCalled();
    await vi.runAllTimersAsync();
    await p;
    expect(done).toHaveBeenCalledTimes(1);
  });
});
