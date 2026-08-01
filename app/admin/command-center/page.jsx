import { Suspense } from "react";
import OpsCommandCenterClient from "@/components/admin/command-center/OpsCommandCenterClient";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Command Center",
  robots: { index: false, follow: false },
};

/**
 * Do not wrap the Suspense fallback in AdminShell — OpsCommandCenterClient
 * already mounts AdminShell. A nested AdminShell fallback can leave two
 * ops-command-center trees in the DOM during useSearchParams resolution.
 */
export default function CommandCenterPage() {
  return (
    <Suspense
      fallback={
        <div className="admin-app">
          <main className="admin-main" id="main-content">
            <AdminLoadingRegion>
              <MianxLoader variant="section" label="Loading Command Center…" />
            </AdminLoadingRegion>
          </main>
        </div>
      }
    >
      <OpsCommandCenterClient />
    </Suspense>
  );
}
