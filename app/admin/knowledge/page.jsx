import { Suspense } from "react";
import KnowledgeClient from "@/components/admin/knowledge/KnowledgeClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Knowledge",
  robots: { index: false, follow: false },
};

export default function KnowledgePage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Knowledge">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading knowledge…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <KnowledgeClient />
    </Suspense>
  );
}
