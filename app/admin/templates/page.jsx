import { Suspense } from "react";
import TemplatesClient from "@/components/admin/templates/TemplatesClient";
import MianxLoader from "@/components/shared/MianxLoader";

export const metadata = {
  title: "Templates — Mianx.ai Admin",
  robots: { index: false, follow: false },
};

export default function TemplatesPage() {
  return (
    <Suspense
      fallback={
        <div className="admin-app">
          <main className="admin-main" id="main-content">
            <MianxLoader variant="section" label="Loading templates…" />
          </main>
        </div>
      }
    >
      <TemplatesClient />
    </Suspense>
  );
}
