import { Suspense } from "react";
import CommandCenterClient from "@/components/admin/command-center/CommandCenterClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Founder Home",
  robots: { index: false, follow: false },
};

export default function CommandCenterPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Founder Home">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading Founder Home…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <CommandCenterClient />
    </Suspense>
  );
}
