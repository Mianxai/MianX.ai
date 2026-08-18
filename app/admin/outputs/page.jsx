import { Suspense } from "react";
import OutputsClient from "@/components/admin/outputs/OutputsClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Outputs",
  robots: { index: false, follow: false },
};

export default function OutputsPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Outputs">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading outputs…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <OutputsClient />
    </Suspense>
  );
}
