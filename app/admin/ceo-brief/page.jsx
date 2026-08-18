import { Suspense } from "react";
import CeoBriefClient from "@/components/admin/ceo-brief/CeoBriefClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — CEO Brief",
  robots: { index: false, follow: false },
};

export default function CeoBriefPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="CEO Brief">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading CEO Brief…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <CeoBriefClient />
    </Suspense>
  );
}
