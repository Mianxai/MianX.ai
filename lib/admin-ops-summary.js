"use client";

import { useCallback, useEffect, useState } from "react";
import { currentAdminLoginHref } from "@/lib/admin-return-to";

/**
 * Load canonical project operational summary for FounderGuidedPanel consumers.
 */
export function useProjectOperationalSummary(projectId, { loginFallback = "/admin" } = {}) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(Boolean(projectId));
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!projectId) {
      setSummary(null);
      setLoading(false);
      setError("");
      return null;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/admin/operations/summary?project_id=${encodeURIComponent(projectId)}`,
        { headers: { Accept: "application/json" } }
      );
      if (res.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = currentAdminLoginHref(loginFallback);
        }
        return null;
      }
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setSummary(null);
        setError(data?.error?.message || "Failed to load operational summary");
        return null;
      }
      setSummary(data);
      return data;
    } catch (err) {
      setSummary(null);
      setError(err?.message || "Failed to load operational summary");
      return null;
    } finally {
      setLoading(false);
    }
  }, [projectId, loginFallback]);

  useEffect(() => {
    load();
  }, [load]);

  return { summary, loading, error, reload: load };
}

/**
 * True when a non-terminal Founder production proof is canonical for the project.
 */
export function hasActiveFounderProof(summary) {
  return Boolean(summary?.ok && summary?.canonical_integration_run?.id);
}
