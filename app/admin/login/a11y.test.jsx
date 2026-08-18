// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/admin/login",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: () => true,
  getSupabase: () => ({ auth: { signInWithPassword: vi.fn() } }),
}));

import AdminLoginPage from "./page";

describe("admin login accessibility smoke", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("exposes labelled fields, landmark, and a primary submit control", async () => {
    render(<AdminLoginPage />);
    expect(screen.getByLabelText(/email address/i)).toBeTruthy();
    expect(screen.getByLabelText(/^password$/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeTruthy();
    expect(document.getElementById("login-heading")).toBeTruthy();
    await userEvent.tab();
    expect(document.activeElement).toBeTruthy();
  });
});
