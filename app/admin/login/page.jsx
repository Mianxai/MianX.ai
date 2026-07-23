"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      const token = data.session?.access_token;
      if (!token) throw new Error("No session returned");
      // Store the access token so middleware + API routes can read it.
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
    <main className="container">
      <nav className="nav">
        <Link href="/" className="brand">
          <span className="brand-dot" />
          Mianx<span style={{ color: "var(--accent-2)" }}>.ai</span>
        </Link>
      </nav>

      <div className="login-wrap">
        <form className="panel login-card" onSubmit={onSubmit}>
          <h2 style={{ margin: "0 0 6px" }}>Admin sign in</h2>
          <p className="muted" style={{ marginTop: 0 }}>
            Access your lead intelligence dashboard.
          </p>

          <div className="field" style={{ marginTop: 16 }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@mianx.ai"
              required
            />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="notice err" style={{ marginTop: 14 }}>{error}</div>}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: 18 }}
          >
            {loading ? (<><span className="spin" /> Signing in…</>) : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
