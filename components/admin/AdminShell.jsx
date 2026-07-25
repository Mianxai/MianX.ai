"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { ADMIN_NAV, isNavActive, isNavItemCurrent } from "@/components/admin/nav";
import { NavIcon } from "@/components/admin/navIcons";
import { useAdminNotifications } from "@/components/admin/AdminNotificationProvider";
import {
  formatNewSubmissionsBadge,
  newSubmissionsAriaLabel,
} from "@/lib/admin-notifications";

const MOBILE_MQ = "(max-width: 900px)";

export default function AdminShell({
  children,
  title,
  actions = null,
  breadcrumbs = null,
  /** Optional override for tests; production reads the shared provider. */
  newCount,
}) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const closeBtnRef = useRef(null);
  const sidebarRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  const drawerActive = isMobile && sidebarOpen;
  const sidebarHidden = isMobile && !sidebarOpen;

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

  // Close drawer on route change (mobile).
  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  async function logout() {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    document.cookie = "sb-access-token=; path=/; max-age=0; SameSite=Lax";
    router.push("/admin/login");
    router.refresh();
  }

  const notifications = useAdminNotifications();
  const newSubmissions =
    typeof newCount === "number" ? newCount : notifications.newSubmissions;
  const badgeText = formatNewSubmissionsBadge(newSubmissions);
  const badgeLabel = newSubmissionsAriaLabel(newSubmissions);

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
          <Link href="/admin" className="sidebar-logo-brand" onClick={closeSidebar}>
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

        <ul className="sidebar-nav">
          {ADMIN_NAV.map((item) => {
            const current = isNavItemCurrent(pathname, item);
            const showBadge = item.badgeKey === "newCount" && badgeText;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
                  {showBadge && (
                    <span
                      className="sidebar-badge"
                      data-testid="submissions-badge"
                      aria-label={badgeLabel}
                    >
                      {badgeText}
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
                            href={child.href}
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
          })}
        </ul>

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
                            <Link href={crumb.href}>{crumb.label}</Link>
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
          {actions && <div className="header-actions">{actions}</div>}
        </div>
        <div className="admin-body">{children}</div>
      </main>
    </div>
  );
}
