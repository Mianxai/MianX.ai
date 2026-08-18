"use client";

import { useCallback, useEffect, useState } from "react";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import {
  isActiveFounderProofUiState,
  classifyFounderProofStatus,
  isActiveFounderProofClassification,
  FOUNDER_PROOF_STATUS_CLASS,
} from "@/lib/core/integration/founder-proof-status.js";

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
 * True when a non-terminal Founder production proof is active for the project.
 * awaiting_final_review / founder_final_review count as active (review-pending).
 */
export function hasActiveFounderProof(summary) {
  if (!summary?.ok) return false;
  if (summary.canonical_integration_run?.id) {
    const classification = classifyFounderProofStatus({
      proofStatus: summary.canonical_integration_run.proof_status,
      status: summary.canonical_integration_run.status,
      stage: summary.canonical_integration_run.stage,
      uiState: summary.founder_proof_ui?.state,
    });
    // Canonical run id is only emitted for non-terminal proofs by the resolver.
    // Missing status tokens still mean active; explicit terminal classes do not.
    if (
      classification === FOUNDER_PROOF_STATUS_CLASS.NONE ||
      classification === FOUNDER_PROOF_STATUS_CLASS.UNKNOWN
    ) {
      return true;
    }
    return isActiveFounderProofClassification(classification);
  }
  return isActiveFounderProofUiState(summary.founder_proof_ui);
}
