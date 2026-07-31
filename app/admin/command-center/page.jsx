import { Suspense } from "react";
import OpsCommandCenterClient from "@/components/admin/command-center/OpsCommandCenterClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Command Center",
  robots: { index: false, follow: false },
};

export default function CommandCenterPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Command Center">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading Command Center…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <OpsCommandCenterClient />
    </Suspense>
  );
}
