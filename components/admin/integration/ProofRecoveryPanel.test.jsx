// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProofRecoveryPanel from "./ProofRecoveryPanel";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("ProofRecoveryPanel", () => {
  it("renders no_proof with confirm before start href", async () => {
    const user = userEvent.setup();
    render(
      <ProofRecoveryPanel
        projectId="proj-1"
        founderProofUi={{
          state: "no_proof",
          caseId: "empty",
          title: "No active Founder Proof",
          explanation: "Start only when ready.",
          willHappen: ["Creates a new run after confirmation."],
          willNotHappen: ["Does not call Anthropic"],
          primaryCta: {
            id: "start_new_proof",
            label: "Start Founder Proof",
            href: "/admin/integration?project_id=proj-1&tab=objective",
            requiresConfirmation: true,
          },
        }}
      />
    );
    expect(screen.getByTestId("proof-recovery-panel")).toBeTruthy();
    await user.click(screen.getByTestId("proof-recovery-start_new_proof"));
    expect(screen.getByTestId("proof-recovery-confirm")).toBeTruthy();
    expect(screen.getByTestId("proof-recovery-confirm-start")).toHaveAttribute(
      "href",
      "/admin/integration?project_id=proj-1&tab=objective"
    );
  });

  it("error state offers retry/diagnostics/copy and not start new", () => {
    const onRetry = vi.fn();
    render(
      <ProofRecoveryPanel
        projectId="proj-1"
        onRetry={onRetry}
        founderProofUi={{
          state: "resolver_error",
          title: "Could not verify",
          explanation: "Resolver failed",
          willNotHappen: ["Do not start a new proof while status is uncertain."],
        }}
      />
    );
    expect(screen.getByTestId("proof-recovery-retry")).toBeTruthy();
    expect(screen.getByTestId("proof-recovery-diagnostics")).toBeTruthy();
    expect(screen.getByTestId("proof-recovery-copy-ref")).toBeTruthy();
    expect(screen.queryByTestId("proof-recovery-start_new_proof")).toBeNull();
  });

  it("resume is navigation-only link", () => {
    render(
      <ProofRecoveryPanel
        projectId="proj-1"
        founderProofUi={{
          state: "awaiting_plan_approval",
          caseId: "resumable_historical",
          title: "Resume Founder Proof",
          explanation: "Resume realigns selection only.",
          primaryCta: {
            id: "resume_proof",
            label: "Resume Founder Proof",
            href: "/admin/integration?project_id=proj-1&run_id=r1",
          },
        }}
      />
    );
    const link = screen.getByTestId("proof-recovery-resume_proof");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute(
      "href",
      "/admin/integration?project_id=proj-1&run_id=r1"
    );
  });
});
