"use client";

import DelayedLoader from "@/components/shared/DelayedLoader";

/**
 * Shared admin route-level loading UI. Rendered by Next.js `loading.jsx`
 * segment boundaries while a route resolves. The branded loader is smart:
 * it only appears once the segment has been loading past the delay threshold,
 * so fast/cached navigations never flash a loader. `.admin-route-loading`
 * fills the viewport (100dvh) and centres the loader; the loader is inserted
 * without its own region so centring is owned by that wrapper.
 */
export default function RouteLoading({ label = "Loading Mianx.ai…" }) {
  return (
    <div className="admin-route-loading">
      <DelayedLoader active variant="page" label={label} region={false} />
    </div>
  );
}
