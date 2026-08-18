// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LoginMachine from "./LoginMachine";

describe("LoginMachine", () => {
  it("uses the approved metallic MX asset as the core", () => {
    const { container } = render(<LoginMachine stage="idle" />);
    const core = container.querySelector("img.login-machine-core");
    expect(core).not.toBeNull();
    expect(core.getAttribute("src")).toBe("/mianx-logo.png");
    // Decorative only — no alt text exposed to AT.
    expect(core.getAttribute("alt")).toBe("");
  });

  it("is decorative and hidden from assistive tech", () => {
    const { container } = render(<LoginMachine stage="idle" />);
    const root = container.querySelector(".login-machine");
    expect(root.getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("reflects the interaction stage via a data attribute", () => {
    const { container, rerender } = render(<LoginMachine stage="email" />);
    expect(container.querySelector(".login-machine").getAttribute("data-stage")).toBe(
      "email"
    );
    rerender(<LoginMachine stage="ready" />);
    expect(container.querySelector(".login-machine").getAttribute("data-stage")).toBe(
      "ready"
    );
  });
});
