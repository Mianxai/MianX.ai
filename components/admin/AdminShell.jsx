"use client";

import { Suspense, useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import {
  ADMIN_NAV_GROUPS,
  isNavActive,
  isNavItemCurrent,
  withProjectQuery,
} from "@/components/admin/nav";
import { NavIcon } from "@/components/admin/navIcons";
import { useAdminNotifications } from "@/components/admin/AdminNotificationProvider";
import FounderHelpDrawer from "@/components/admin/FounderHelpDrawer";
import FounderOnboardingTour, {
  tourStorageKey,
} from "@/components/admin/FounderOnboardingTour";
import {
  formatNewSubmissionsBadge,
  newSubmissionsAriaLabel,
} from "@/lib/admin-notifications";
import { ADMIN_PROJECT_STORAGE_KEY } from "@/lib/admin-project";

const MOBILE_MQ = "(max-width: 900px)";
const ADVANCED_OPS_STORAGE_KEY = "mianx.admin.advancedOpsOpen";

export default function AdminShell(props) {
  return (
    <Suspense
      fallback={
        <div className="admin-app">
          <main className="admin-main" id="main-content">
            <div className="admin-header">
              <div className="admin-header-left">
                <div className="admin-header-titles">
                  {props.title ? <h1>{props.title}</h1> : null}
                </div>
              </div>
            </div>
            {/* Never mirror props.children here — nested useSearchParams Suspense
                would leave a duplicate tree beside AdminShellInner. */}
            <div className="admin-body" aria-busy="true" />
          </main>
        </div>
      }
    >
      <AdminShellInner {...props} />
    </Suspense>
  );
}

function AdminShellInner({
  children,
  title,
  actions = null,
  breadcrumbs = null,
  newCount,
  helpProjectName = null,
  helpProofState = null,
}) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourUserId, setTourUserId] = useState("anon");
  const [advancedOpsOpen, setAdvancedOpsOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const sidebarRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(ADVANCED_OPS_STORAGE_KEY);
      if (stored === "1") setAdvancedOpsOpen(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const opsGroup = ADMIN_NAV_GROUPS.find((g) => g.collapsedByDefault);
    if (!opsGroup) return;
    const childActive = opsGroup.items.some((item) => isNavItemCurrent(pathname, item));
    if (childActive) setAdvancedOpsOpen(true);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function maybeShowTour() {
      // Unit tests and automated browsers — never auto-block dialogs.
      if (typeof process !== "undefined" && process.env.VITEST) return;
      if (typeof navigator !== "undefined" && navigator.webdriver) return;
      let uid = "anon";
      try {
        const supabase = getSupabase();
        if (supabase) {
          const { data } = await supabase.auth.getUser();
          if (data?.user?.id) uid = data.user.id;
        }
      } catch {
        /* ignore */
      }
      if (cancelled) return;
      setTourUserId(uid);
      try {
        const key = tourStorageKey(uid);
        const stored = window.localStorage.getItem(key);
        if (!stored) setTourOpen(true);
      } catch {
        /* ignore */
      }
    }
    maybeShowTour();
    return () => {
      cancelled = true;
    };
  }, []);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const drawerActive = isMobile && sidebarOpen;
  const sidebarHidden = isMobile && !sidebarOpen;

  useEffect(() => {
    if (projectId || typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(ADMIN_PROJECT_STORAGE_KEY);
      if (!stored) return;
      const next = new URLSearchParams(searchParams?.toString() || "");
      next.set("project_id", stored);
      router.replace(`${pathname}?${next.toString()}`);
    } catch {
      /* ignore */
    }
  }, [projectId, pathname, router, searchParams]);

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    if (sidebarHidden) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  }, [sidebarHidden]);

  useEffect(() => {
    if (!drawerActive) return undefined;
    const previouslyFocused = document.activeElement;
    closeBtnRef.current?.focus();
    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSidebar();
        return;
      }
      if (e.key !== "Tab" || !sidebarRef.current) return;
      const focusable = sidebarRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [drawerActive, closeSidebar]);

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  useEffect(() => {
    const root = sidebarRef.current;
    if (!root) return;
    const active = root.querySelector(
      '.sidebar-nav a[aria-current="page"], .sidebar-nav a.active'
    );
    if (active && typeof active.scrollIntoView === "function") {
      try {
        active.scrollIntoView({ block: "nearest", inline: "nearest" });
      } catch {
        /* ignore */
      }
    }
  }, [pathname, advancedOpsOpen]);

  async function logout() {
    // SECURITY: signOut wrapped in try-catch to prevent unhandled rejection
    // blocking the session-clear fetch and redirect.
    try {
      const supabase = getSupabase();
      if (supabase) await supabase.auth.signOut();
    } catch {
      /* best-effort: proceed with server-side session clear regardless */
    }
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } catch {
      /* best-effort */
    }
    router.push("/admin/login");
    router.refresh();
  }

  const notifications = useAdminNotifications();
  const newSubmissions =
    typeof newCount === "number" ? newCount : notifications.newSubmissions;
  const badgeText = formatNewSubmissionsBadge(newSubmissions);
  const badgeLabel = newSubmissionsAriaLabel(newSubmissions);
  const inboxAttention =
    typeof notifications.inboxAttention === "number"
      ? notifications.inboxAttention
      : 0;
  const inboxBadgeText = formatNewSubmissionsBadge(inboxAttention);
  const inboxBadgeLabel = `${inboxAttention} Founder Inbox item${
    inboxAttention === 1 ? "" : "s"
  }`;

  function renderNavItem(item) {
    const current = isNavItemCurrent(pathname, item);
    const showSubmissionsBadge = item.badgeKey === "newCount" && badgeText;
    const showInboxBadge = item.badgeKey === "inboxCount" && inboxBadgeText;
    const showBadge = showSubmissionsBadge || showInboxBadge;
    const activeBadgeText = showInboxBadge ? inboxBadgeText : badgeText;
    const activeBadgeLabel = showInboxBadge ? inboxBadgeLabel : badgeLabel;
    const href = withProjectQuery(item.href, projectId);
    return (
      <li key={item.href}>
        <Link
          href={href}
          prefetch
          className={current ? "active" : undefined}
          aria-current={
            item.match === "exact"
              ? pathname === item.href
                ? "page"
                : undefined
              : isNavActive(pathname, item) && !item.children
                ? "page"
                : pathname === item.href
                  ? "page"
                  : undefined
          }
          onClick={closeSidebar}
        >
          <NavIcon name={item.icon} />
          {item.label}
          {item.badge ? (
            <span className="sidebar-advanced-badge" aria-label={item.badge}>
              {item.badge}
            </span>
          ) : null}
          {showBadge && (
            <span
              className="sidebar-badge"
              data-testid={showInboxBadge ? "inbox-badge" : "submissions-badge"}
              aria-label={activeBadgeLabel}
            >
              {activeBadgeText}
            </span>
          )}
        </Link>
        {item.children?.length > 0 && (
          <ul className="sidebar-nav-nested">
            {item.children.map((child) => {
              const childCurrent = isNavActive(pathname, child);
              return (
                <li key={child.href}>
                  <Link
                    href={withProjectQuery(child.href, projectId)}
                    prefetch
                    className={childCurrent ? "active" : undefined}
                    aria-current={childCurrent ? "page" : undefined}
                    onClick={closeSidebar}
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  return (
    <div className="admin-app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />
      <aside
        ref={sidebarRef}
        className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
        aria-label="Admin navigation"
        aria-hidden={sidebarHidden ? true : undefined}
        {...(drawerActive
          ? { role: "dialog", "aria-modal": true, "aria-labelledby": titleId }
          : {})}
      >
        <div className="sidebar-logo">
          <Link
            href={withProjectQuery("/admin", projectId)}
            className="sidebar-logo-brand"
            onClick={closeSidebar}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="sidebar-logo-img"
              src="/mianx-logo.png"
              alt=""
              width={36}
              height={36}
            />
            <span className="sidebar-logo-text" id={titleId}>
              Mianx.ai
            </span>
          </Link>
          <button
            ref={closeBtnRef}
            type="button"
            className="sidebar-close-btn"
            aria-label="Close navigation"
            onClick={closeSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="sidebar-nav-groups" aria-label="Primary">
          {ADMIN_NAV_GROUPS.map((group) => {
            const isAdvanced = group.collapsedByDefault;
            const showItems = !isAdvanced || advancedOpsOpen;
            return (
              <div key={group.id} className="sidebar-nav-group">
                {isAdvanced ? (
                  <button
                    type="button"
                    className="sidebar-nav-group-label sidebar-nav-group-toggle"
                    aria-expanded={advancedOpsOpen}
                    aria-controls="advanced-ops-nav"
                    data-testid="advanced-ops-toggle"
                    onClick={() => {
                      setAdvancedOpsOpen((v) => {
                        const next = !v;
                        try {
                          window.localStorage.setItem(
                            ADVANCED_OPS_STORAGE_KEY,
                            next ? "1" : "0"
                          );
                        } catch {
                          /* ignore */
                        }
                        return next;
                      });
                    }}
                  >
                    <span>{group.label}</span>
                    <span className="sidebar-nav-chevron" aria-hidden="true">
                      {advancedOpsOpen ? "▾" : "▸"}
                    </span>
                  </button>
                ) : (
                  <p className="sidebar-nav-group-label">{group.label}</p>
                )}
                {showItems ? (
                  <ul
                    id={isAdvanced ? "advanced-ops-nav" : undefined}
                    className="sidebar-nav"
                  >
                    {group.items.map(renderNavItem)}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <button type="button" className="sidebar-logout" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>
      <main className="admin-main" id="main-content">
        <div className="admin-header">
          <div className="admin-header-left">
            <button
              type="button"
              className="sidebar-open-btn"
              aria-label="Open navigation"
              aria-expanded={sidebarOpen}
              onClick={openSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="admin-header-titles">
              {breadcrumbs?.length > 0 && (
                <nav className="admin-breadcrumbs" aria-label="Breadcrumb">
                  <ol>
                    {breadcrumbs.map((crumb, i) => {
                      const last = i === breadcrumbs.length - 1;
                      return (
                        <li key={`${crumb.label}-${i}`}>
                          {crumb.href && !last ? (
                            <Link href={withProjectQuery(crumb.href, projectId)}>
                              {crumb.label}
                            </Link>
                          ) : (
                            <span aria-current={last ? "page" : undefined}>
                              {crumb.label}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              )}
              {title && <h1>{title}</h1>}
            </div>
          </div>
          <div className="header-actions">
            <button
              type="button"
              className="header-btn-ghost"
              data-testid="founder-help-open"
              onClick={() => setHelpOpen(true)}
            >
              Help
            </button>
            {actions}
          </div>
        </div>
        <div className="admin-body">{children}</div>
      </main>
      <FounderHelpDrawer
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        pathname={pathname}
        projectName={helpProjectName}
        proofState={helpProofState}
        onRestartTour={() => {
          try {
            window.localStorage.removeItem(tourStorageKey(tourUserId));
          } catch {
            /* ignore */
          }
          setTourOpen(true);
        }}
      />
      <FounderOnboardingTour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        userId={tourUserId}
      />
    </div>
  );
}
