import { Suspense } from "react";
import InboxClient from "@/components/admin/inbox/InboxClient";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Founder Inbox",
  robots: { index: false, follow: false },
};

export default function InboxPage() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Founder Inbox">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading Founder Inbox…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <InboxClient />
    </Suspense>
  );
}
