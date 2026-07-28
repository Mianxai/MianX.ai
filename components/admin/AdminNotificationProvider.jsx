"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  SUBMISSION_COUNT_INVALIDATED,
  formatNewSubmissionsBadge,
  getCachedNewSubmissions,
  newSubmissionsAriaLabel,
  setCachedNewSubmissions,
} from "@/lib/admin-notifications";
import { adminFetch } from "@/lib/admin-fetch";

const POLL_MS = 60_000;
const INVALIDATION_DEBOUNCE_MS = 250;

const AdminNotificationsContext = createContext({
  newSubmissions: 0,
  inboxAttention: 0,
  badgeText: null,
  ariaLabel: "0 new submissions",
  refresh: async () => {},
});

function shouldPoll(pathname) {
  if (!pathname) return false;
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return false;
  }
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function AdminNotificationProvider({ children }) {
  const pathname = usePathname() || "";
  const enabled = shouldPoll(pathname);

  const [newSubmissions, setNewSubmissions] = useState(() => {
    const cached = getCachedNewSubmissions();
    return typeof cached === "number" ? cached : 0;
  });
  const [inboxAttention, setInboxAttention] = useState(0);

  const abortRef = useRef(null);
  const seqRef = useRef(0);
  const inFlightRef = useRef(false);
  const debounceRef = useRef(null);
  const intervalRef = useRef(null);

  const applyCount = useCallback((n) => {
    const next = typeof n === "number" && Number.isFinite(n) ? Math.max(0, n) : 0;
    setCachedNewSubmissions(next);
    setNewSubmissions(next);
  }, []);

  const refresh = useCallback(async () => {
    if (!enabled) return;
    if (inFlightRef.current) return;

    const seq = ++seqRef.current;
    inFlightRef.current = true;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const res = await adminFetch("/api/admin/notifications", {
        signal: ac.signal,
        headers: { Accept: "application/json" },
      });
      if (seq !== seqRef.current) return;
      if (res.status === 401 || res.status === 403) return;
      if (!res.ok) return; // preserve last successful count
      const data = await res.json().catch(() => null);
      if (seq !== seqRef.current) return;
      if (data && typeof data.newSubmissions === "number") {
        applyCount(data.newSubmissions);
      }
      if (data && typeof data.inboxAttention === "number") {
        setInboxAttention(Math.max(0, data.inboxAttention));
      }
    } catch (err) {
      if (err?.name === "AbortError") return;
      // Network / parse failure — keep last successful count.
    } finally {
      if (seq === seqRef.current) inFlightRef.current = false;
    }
  }, [enabled, applyCount]);

  const scheduleRefresh = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
      void refresh();
    }, INVALIDATION_DEBOUNCE_MS);
  }, [refresh]);

  // Initial fetch + visibility/focus/interval polling while enabled.
  useEffect(() => {
    if (!enabled) return undefined;

    void refresh();

    function onVisibility() {
      if (document.visibilityState === "visible") {
        void refresh();
        startInterval();
      } else {
        stopInterval();
      }
    }
    function onFocus() {
      if (document.visibilityState === "visible") void refresh();
    }
    function onInvalidate() {
      scheduleRefresh();
    }

    function startInterval() {
      stopInterval();
      if (document.visibilityState === "hidden") return;
      intervalRef.current = setInterval(() => {
        if (document.visibilityState === "visible") void refresh();
      }, POLL_MS);
    }
    function stopInterval() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    window.addEventListener(SUBMISSION_COUNT_INVALIDATED, onInvalidate);
    startInterval();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener(SUBMISSION_COUNT_INVALIDATED, onInvalidate);
      stopInterval();
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      seqRef.current += 1;
      abortRef.current?.abort();
      inFlightRef.current = false;
    };
  }, [enabled, refresh, scheduleRefresh]);

  const value = useMemo(() => {
    const badgeText = formatNewSubmissionsBadge(newSubmissions);
    return {
      newSubmissions,
      inboxAttention,
      badgeText,
      ariaLabel: newSubmissionsAriaLabel(newSubmissions),
      refresh,
    };
  }, [newSubmissions, inboxAttention, refresh]);

  return (
    <AdminNotificationsContext.Provider value={value}>
      {children}
    </AdminNotificationsContext.Provider>
  );
}

export function useAdminNotifications() {
  return useContext(AdminNotificationsContext);
}

export default AdminNotificationProvider;
