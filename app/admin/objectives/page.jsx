import { Suspense } from "react";
import ObjectivesClient from "@/components/admin/objectives/ObjectivesClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Objectives",
  robots: { index: false, follow: false },
};

export default function ObjectivesPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Objectives">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading objectives…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <ObjectivesClient />
    </Suspense>
  );
}
