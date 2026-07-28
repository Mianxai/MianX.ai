import { Suspense } from "react";
import LearningClient from "@/components/admin/learning/LearningClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Mianx.ai — Learning",
  robots: { index: false, follow: false },
};

export default function LearningPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Learning">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading learning…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <LearningClient />
    </Suspense>
  );
}
