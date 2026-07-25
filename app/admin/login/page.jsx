"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const configured = isSupabaseConfigured();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = getSupabase();
      if (!supabase) {
        throw new Error(
          "Configuration error: this deployment has no Supabase environment variables set. Admin sign-in is unavailable until they are configured."
        );
      }
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      const token = data.session?.access_token;
      if (!token) throw new Error("No session returned");
      const maxAge = data.session.expires_in || 3600;
      document.cookie = `sb-access-token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="main-content" className="login-shell">
      <form className="login-card" onSubmit={onSubmit} noValidate>
        <Link href="/" className="logo" style={{ marginBottom: "1.5rem" }}>
          <span className="logo-icon" aria-hidden="true">M</span>
          <span className="logo-text">Mianx.ai</span>
        </Link>
        <h1>Admin sign in</h1>
        <p className="section-desc">Access the lead intelligence dashboard.</p>

        {!configured && (
          <div className="admin-notice" role="alert" style={{ marginBottom: "1.25rem" }}>
            Configuration error: Supabase environment variables are not set on this deployment.
            Sign-in is unavailable until they are configured.
          </div>
        )}

        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@mianx.ai"
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group" style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <div className="form-message error" role="alert" style={{ marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <button className="form-submit" type="submit" disabled={loading || !configured}>
          {loading ? (<><span className="spin" aria-hidden="true" /> Signing in…</>) : "Sign in"}
        </button>

        <Link href="/" className="login-back">
          ← Back to site
        </Link>
      </form>
    </main>
  );
}
