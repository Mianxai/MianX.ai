import { Suspense } from "react";
import MemoryClient from "@/components/admin/memory/MemoryClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Mianx.ai — Memory",
  robots: { index: false, follow: false },
};

export default function MemoryPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Memory">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading memory…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <MemoryClient />
    </Suspense>
  );
}
