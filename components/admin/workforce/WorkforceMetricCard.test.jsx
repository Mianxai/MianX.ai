/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkforceMetricCard from "./WorkforceMetricCard";

describe("WorkforceMetricCard", () => {
  it("renders trusted zero as 0", () => {
    render(
      <WorkforceMetricCard label="Allocated" value={0} testId="m-alloc" />
    );
    expect(screen.getByTestId("m-alloc")).toHaveTextContent("0");
    expect(screen.getByTestId("m-alloc")).toHaveAttribute("data-metric-state", "ready");
  });

  it("renders missing as Unavailable", () => {
    render(
      <WorkforceMetricCard label="Active" value={null} testId="m-active" />
    );
    expect(screen.getByTestId("m-active")).toHaveTextContent("Unavailable");
  });

  it("renders Loading… with aria-busy", () => {
    render(
      <WorkforceMetricCard
        label="Ready"
        state="loading"
        testId="m-ready"
      />
    );
    expect(screen.getByTestId("m-ready")).toHaveTextContent("Loading…");
    expect(screen.getByTestId("m-ready")).toHaveAttribute("aria-busy", "true");
  });

  it("renders 445 without implying active", () => {
    render(
      <WorkforceMetricCard
        label="Registered"
        value={445}
        proves="Registered capacity — not active agents"
        testId="m-reg"
      />
    );
    expect(screen.getByTestId("m-reg")).toHaveTextContent("445");
    expect(screen.getByTestId("m-reg-proves")).toHaveTextContent(/not active/i);
  });

  it("error state does not invent zero", () => {
    render(
      <WorkforceMetricCard label="Live-tested" state="error" testId="m-lt" />
    );
    expect(screen.getByTestId("m-lt")).toHaveTextContent("Unavailable");
    expect(screen.getByTestId("m-lt")).not.toHaveTextContent(/^0$/);
  });
});
