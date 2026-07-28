import { Suspense } from "react";
import CommandCenterClient from "@/components/admin/command-center/CommandCenterClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Agents",
  robots: { index: false, follow: false },
};

/**
 * Agents operating surface — same Command Center network with Agents title.
 */
export default function AgentsPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Agents">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading agents…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <CommandCenterClient title="Agents" />
    </Suspense>
  );
}
