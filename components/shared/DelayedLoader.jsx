"use client";

import MianxLoader from "@/components/shared/MianxLoader";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import { useDelayedVisible } from "@/lib/useDelayedVisible";

/**
 * Smart route/section loader. Applies the centralized delay + min-visible policy
 * so a branded loader never flashes on fast navigation or cached content.
 *
 * Use for:
 *  - route-level `loading.jsx` (always `active` while the segment loads; the
 *    delay threshold suppresses the flash on fast cached navigations).
 *  - in-page cold data loads (pass `active={isLoadingWithNoContent}`).
 *
 * When `region` is true (default) the loader is centred in the remaining admin
 * workspace via AdminLoadingRegion; the be2a3e5 geometry contract is preserved.
 */
export default function DelayedLoader({
  active = true,
  variant = "page",
  label = "Loading…",
  delay,
  minVisible,
  region = true,
  regionClassName = "",
  className = "",
}) {
  const visible = useDelayedVisible(active, { delay, minVisible });
  if (!visible) return null;

  const loader = (
    <MianxLoader variant={variant} label={label} className={className} />
  );

  if (!region) return loader;
  return (
    <AdminLoadingRegion className={regionClassName}>{loader}</AdminLoadingRegion>
  );
}
