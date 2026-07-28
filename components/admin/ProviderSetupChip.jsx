"use client";

import Link from "next/link";

/**
 * Single persistent provider setup chip — not a repeated page warning.
 * Contextual AI attempt failures still use inline notices elsewhere.
 */
export default function ProviderSetupChip({ providerStatus = "unconfigured" }) {
  if (providerStatus && providerStatus !== "unconfigured") return null;
  return (
    <Link
      href="/admin/settings"
      className="admin-provider-chip"
      title="AI provider is intentionally unconfigured. Live agent completion is unavailable."
    >
      Provider setup needed
    </Link>
  );
}
