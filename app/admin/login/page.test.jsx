// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const push = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh, replace: vi.fn() }),
  usePathname: () => "/admin/login",
}));

const signInWithPassword = vi.fn();
let configured = true;

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: () => configured,
  getSupabase: () => ({
    auth: { signInWithPassword },
  }),
}));

import AdminLoginPage from "./page";

describe("Admin login page", () => {
  beforeEach(() => {
    push.mockClear();
    refresh.mockClear();
    signInWithPassword.mockReset();
    configured = true;
    document.cookie = "sb-access-token=; path=/; max-age=0";
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the approved MX asset and Admin Control Center branding", () => {
    render(<AdminLoginPage />);
    const logo = document.querySelector("img.login-machine-core");
    expect(logo).not.toBeNull();
    expect(logo.getAttribute("src")).toBe("/mianx-logo.png");
    expect(screen.getByText("MianX.ai")).toBeInTheDocument();
    expect(screen.getByText("Admin Control Center")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
    // No gradient "M" placeholder tile.
    expect(document.querySelector(".logo-icon")).toBeNull();
  });

  it("provides proper email + password fields with autocomplete", () => {
    render(<AdminLoginPage />);
    const email = screen.getByLabelText(/email address/i);
    const password = screen.getByLabelText(/^password$/i);
    expect(email).toHaveAttribute("type", "email");
    expect(email).toHaveAttribute("autocomplete", "email");
    expect(password).toHaveAttribute("type", "password");
    expect(password).toHaveAttribute("autocomplete", "current-password");
  });

  it("toggles password visibility with an accessible control", async () => {
    const user = userEvent.setup();
    render(<AdminLoginPage />);
    const password = screen.getByLabelText(/^password$/i);
    expect(password).toHaveAttribute("type", "password");
    const toggle = screen.getByRole("button", { name: /show password/i });
    await user.click(toggle);
    expect(password).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: /hide password/i })
    ).toBeInTheDocument();
  });

  it("shows an accessible error and focuses the first invalid field on empty submit", async () => {
    const user = userEvent.setup();
    render(<AdminLoginPage />);
    await user.click(screen.getByTestId("login-submit"));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/valid email/i);
    expect(screen.getByLabelText(/email address/i)).toHaveFocus();
    expect(signInWithPassword).not.toHaveBeenCalled();
  });

  it("signs in, sets the session cookie, and navigates on success", async () => {
    const user = userEvent.setup();
    signInWithPassword.mockResolvedValue({
      data: { session: { access_token: "tkn-123", expires_in: 3600 } },
      error: null,
    });
    render(<AdminLoginPage />);
    await user.type(screen.getByLabelText(/email address/i), "admin@mianx.ai");
    await user.type(screen.getByLabelText(/^password$/i), "correct horse");
    await user.click(screen.getByTestId("login-submit"));

    await waitFor(() =>
      expect(signInWithPassword).toHaveBeenCalledWith({
        email: "admin@mianx.ai",
        password: "correct horse",
      })
    );
    await waitFor(() => expect(push).toHaveBeenCalledWith("/admin"));
    expect(document.cookie).toContain("sb-access-token=tkn-123");
  });

  it("submits with the Enter key", async () => {
    const user = userEvent.setup();
    signInWithPassword.mockResolvedValue({
      data: { session: { access_token: "tkn-xyz", expires_in: 3600 } },
      error: null,
    });
    render(<AdminLoginPage />);
    await user.type(screen.getByLabelText(/email address/i), "admin@mianx.ai");
    await user.type(screen.getByLabelText(/^password$/i), "pw{Enter}");
    await waitFor(() => expect(signInWithPassword).toHaveBeenCalled());
  });

  it("keeps the form usable and shows the error on failed sign in", async () => {
    const user = userEvent.setup();
    signInWithPassword.mockResolvedValue({
      data: {},
      error: new Error("Invalid login credentials"),
    });
    render(<AdminLoginPage />);
    await user.type(screen.getByLabelText(/email address/i), "admin@mianx.ai");
    await user.type(screen.getByLabelText(/^password$/i), "wrong");
    await user.click(screen.getByTestId("login-submit"));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/invalid login credentials/i);
    // Button is re-enabled so the user can retry.
    expect(screen.getByTestId("login-submit")).not.toBeDisabled();
    expect(push).not.toHaveBeenCalled();
  });

  it("does not delay navigation with an animation timer", async () => {
    const user = userEvent.setup();
    signInWithPassword.mockResolvedValue({
      data: { session: { access_token: "fast", expires_in: 3600 } },
      error: null,
    });
    render(<AdminLoginPage />);
    await user.type(screen.getByLabelText(/email address/i), "admin@mianx.ai");
    await user.type(screen.getByLabelText(/^password$/i), "pw");
    await user.click(screen.getByTestId("login-submit"));
    // push happens as soon as auth resolves — no fake-timer advancement needed.
    await waitFor(() => expect(push).toHaveBeenCalledWith("/admin"));
  });

  it("disables sign-in and warns when Supabase is not configured", () => {
    configured = false;
    render(<AdminLoginPage />);
    expect(screen.getByTestId("login-submit")).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent(/configuration error/i);
  });
});
