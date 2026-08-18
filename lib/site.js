/**
 * Canonical public site URL helpers.
 * Prefer NEXT_PUBLIC_SITE_URL when configured; otherwise fall back to the
 * controlled Vercel production host. Never claim mianx.ai unless configured.
 */

export const DEFAULT_SITE_URL = "https://mian-x-ai.vercel.app";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // fall through
    }
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//i, "");
    return `https://${host}`;
  }
  return DEFAULT_SITE_URL;
}

export const SITE_NAME = "MianX.ai";
export const SITE_TAGLINE = "AI-Powered Industry Operating Systems";
export const SITE_DESCRIPTION =
  "MianX.ai builds AI-powered Industry Operating Systems for restaurants, poultry, hospitals, schools and more. One platform, every industry.";
