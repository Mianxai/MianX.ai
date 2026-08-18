"use client";

/**
 * Thin wrapper kept for backward compatibility.
 * Prefer AdminShell for authenticated admin pages.
 */
export { default } from "./AdminShell";
export { ADMIN_NAV, isNavActive, isNavItemCurrent, RUNTIME_TAB_PATHS } from "./nav";
