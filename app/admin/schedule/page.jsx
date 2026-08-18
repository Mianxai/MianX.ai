import { Suspense } from "react";
import ScheduleClient from "@/components/admin/schedule/ScheduleClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Schedule",
  robots: { index: false, follow: false },
};

export default function SchedulePage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Schedule">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading schedule…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <ScheduleClient />
    </Suspense>
  );
}
