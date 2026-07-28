"use client";

import { useMemo, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { sanitizeAdminReturnTo } from "@/lib/admin-return-to";
import LoginMachine from "@/components/admin/LoginMachine";
import "./login.css";

function isValidEmail(value) {
  return /.+@.+\..+/.test(value.trim());
}

function AdminLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = sanitizeAdminReturnTo(searchParams?.get("returnTo"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const errorRef = useRef(null);

  const configured = isSupabaseConfigured();

  const emailValid = isValidEmail(email);
  const passwordValid = password.length > 0;
  const formValid = emailValid && passwordValid;

  const stage = useMemo(() => {
    if (success) return "success";
    if (submitting) return "submitting";
    if (error) return "error";
    if (formValid) return "ready";
    if (focusField === "password") return "password";
    if (focusField === "email") return "email";
    return "idle";
  }, [success, submitting, error, formValid, focusField]);

  function focusFirstInvalid() {
    if (!emailValid) {
      emailRef.current?.focus();
    } else if (!passwordValid) {
      passwordRef.current?.focus();
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (submitting) return; // prevent double submit

    setError("");
    if (!formValid) {
      setError(
        !emailValid
          ? "Enter a valid email address."
          : "Enter your password to continue."
      );
      // Return focus safely to the first invalid field.
      focusFirstInvalid();
      return;
    }

    setSubmitting(true);
    try {
      const supabase = getSupabase();
      if (!supabase) {
        throw new Error(
          "Configuration error: this deployment has no Supabase environment variables set. Admin sign-in is unavailable until they are configured."
        );
      }
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        throw new Error("Sign in failed. Check your credentials and try again.");
      }
      const token = data.session?.access_token;
      if (!token) {
        throw new Error("Sign in failed. Check your credentials and try again.");
      }
      const maxAge = data.session.expires_in || 3600;
      // Server sets an HttpOnly cookie — the access token is never readable
      // from document.cookie after this point. Relative URL + same-origin
      // credentials keep the request on the public alias the user is viewing.
      const sessionRes = await fetch("/api/admin/session", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: token, expires_in: maxAge }),
      });
      if (!sessionRes.ok) {
        try {
          await supabase.auth.signOut();
        } catch {
          /* best-effort clear of stale client auth */
        }
        let msg = "Could not establish a secure admin session.";
        try {
          const payload = await sessionRes.json();
          // Prefer a controlled server message; never surface tokens.
          if (payload?.error?.message && !/token|cookie|secret|password/i.test(payload.error.message)) {
            msg = payload.error.message;
          }
        } catch {
          /* keep default */
        }
        throw new Error(msg);
      }
      // Mark success and navigate immediately — the success animation plays out
      // during navigation and never adds an artificial delay.
      setSuccess(true);
      router.push(returnTo || "/admin");
      router.refresh();
    } catch (err) {
      setSubmitting(false);
      setSuccess(false);
      setError(err.message || "Sign in failed. Check your credentials and try again.");
      // Move focus to the alert so it is announced, then let the user retry.
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  }

  function onPasswordKey(e) {
    if (typeof e.getModifierState === "function") {
      setCapsLock(e.getModifierState("CapsLock"));
    }
  }

  return (
    <main id="main-content" className="login-shell">
      <div className="login-shell-bg" aria-hidden="true" />
      <section className="login-card" aria-labelledby="login-heading">
        <div className="login-stage">
          <LoginMachine stage={stage} />
        </div>

        <div className="login-brand">
          <span className="login-brand-name">MianX.ai</span>
          <span className="login-brand-sub">Admin Control Center</span>
        </div>

        <h1 id="login-heading" className="login-title">
          Sign in
        </h1>
        <p className="login-subtitle">
          Secure access to the MianX.ai runtime and control plane.
        </p>

        {!configured && (
          <div className="login-alert warning" role="alert">
            Configuration error: Supabase environment variables are not set on
            this deployment. Sign-in is unavailable until they are configured.
          </div>
        )}

        <form className="login-form" onSubmit={onSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField(null)}
              placeholder="you@mianx.ai"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="email"
              required
              aria-invalid={Boolean(error) && !emailValid}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="login-password">
              <input
                id="password"
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusField("password")}
                onBlur={() => {
                  setFocusField(null);
                  setCapsLock(false);
                }}
                onKeyDown={onPasswordKey}
                onKeyUp={onPasswordKey}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                aria-invalid={Boolean(error) && emailValid && !passwordValid}
                aria-describedby={capsLock ? "caps-warning" : undefined}
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-pressed={showPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {capsLock && (
              <p id="caps-warning" className="login-caps" role="status">
                Caps Lock is on.
              </p>
            )}
          </div>

          {error && (
            <div
              className="login-alert error"
              role="alert"
              tabIndex={-1}
              ref={errorRef}
            >
              {error}
            </div>
          )}

          <button
            className="login-submit"
            type="submit"
            data-testid="login-submit"
            disabled={submitting || !configured}
          >
            {submitting ? (
              <>
                <span className="login-submit-spinner" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <Link href="/" className="login-back">
          ← Back to site
        </Link>
      </section>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="login-shell"><p className="login-subtitle">Loading…</p></main>}>
      <AdminLoginInner />
    </Suspense>
  );
}
