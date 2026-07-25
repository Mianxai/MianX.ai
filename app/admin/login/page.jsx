"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import BrandLogo from "@/components/BrandLogo";

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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
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
    <div className="login-page">
      <form className="login-card" onSubmit={onSubmit}>
        <Link href="/" className="login-logo logo">
          <BrandLogo size={40} />
          <span className="logo-text">MianX.ai</span>
        </Link>
        <h2>Admin sign in</h2>
        <p className="muted">Access your submissions dashboard.</p>

        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@mianx.ai" required />
        </div>
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>

        {error && <div className="form-message error" style={{ display: "flex", marginBottom: "1rem" }}>{error}</div>}

        <button type="submit" className="form-submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? (
            <>
              <svg className="spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
              Signing in…
            </>
          ) : "Sign in"}
        </button>
      </form>
    </div>
  );
}
