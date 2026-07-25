// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import DelayedLoader from "./DelayedLoader";

describe("DelayedLoader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders nothing before the delay threshold", () => {
    const { container } = render(
      <DelayedLoader active variant="section" label="Loading…" />
    );
    expect(container.querySelector(".mx-loader")).toBeNull();
  });

  it("renders the branded loader after the delay threshold", () => {
    const { container } = render(
      <DelayedLoader active variant="section" label="Loading…" delay={150} />
    );
    act(() => {
      vi.advanceTimersByTime(160);
    });
    expect(container.querySelector(".mx-loader")).not.toBeNull();
  });

  it("centres the loader in an admin loading region by default", () => {
    const { container } = render(
      <DelayedLoader active variant="section" label="Loading…" delay={0} />
    );
    act(() => {
      vi.advanceTimersByTime(10);
    });
    const region = container.querySelector("[data-testid='admin-loading-region']");
    expect(region).not.toBeNull();
    expect(region.querySelector(".mx-loader")).not.toBeNull();
  });

  it("omits the region wrapper when region is false", () => {
    const { container } = render(
      <DelayedLoader active variant="page" label="Loading…" delay={0} region={false} />
    );
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(container.querySelector("[data-testid='admin-loading-region']")).toBeNull();
    expect(container.querySelector(".mx-loader")).not.toBeNull();
  });

  it("never renders when inactive", () => {
    const { container } = render(
      <DelayedLoader active={false} variant="section" label="Loading…" />
    );
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(container.querySelector(".mx-loader")).toBeNull();
  });
});
