import { Suspense } from "react";
import CompanyBuilderClient from "@/components/admin/company-builder/CompanyBuilderClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Mianx.ai — Company Builder",
  robots: { index: false, follow: false },
};

export default function CompanyBuilderPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Company Builder">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading Company Builder…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <CompanyBuilderClient />
    </Suspense>
  );
}
