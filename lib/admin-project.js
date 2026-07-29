"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const STORAGE_KEY = "mianx.admin.project_id";

export const ADMIN_PROJECT_STORAGE_KEY = STORAGE_KEY;

/**
 * Shared admin project context.
 * Authority: URL query `project_id`. LocalStorage is convenience only.
 */
export function useAdminProject() {
  const router = useRouter();
  const pathname = usePathname() || "/admin";
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";

  const setProjectId = useCallback(
    (nextId, { replace = true } = {}) => {
      const next = new URLSearchParams(searchParams?.toString() || "");
      if (nextId) next.set("project_id", nextId);
      else next.delete("project_id");
      const qs = next.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      if (typeof window !== "undefined") {
        try {
          if (nextId) window.localStorage.setItem(STORAGE_KEY, nextId);
          else window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      }
      if (replace) router.replace(href);
      else router.push(href);
    },
    [pathname, router, searchParams]
  );

  /** Build href preserving current project_id. */
  const hrefWithProject = useCallback(
    (href) => {
      if (!href || !projectId) return href;
      try {
        const url = new URL(href, "http://admin.local");
        if (!url.searchParams.has("project_id")) {
          url.searchParams.set("project_id", projectId);
        }
        return `${url.pathname}${url.search}`;
      } catch {
        return href;
      }
    },
    [projectId]
  );

  /** Restore convenience id when URL has none (does not override deep links). */
  const suggestStoredProjectId = useMemo(() => {
    if (projectId || typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }, [projectId]);

  return {
    projectId,
    setProjectId,
    hrefWithProject,
    suggestStoredProjectId,
    hasProject: Boolean(projectId),
  };
}
