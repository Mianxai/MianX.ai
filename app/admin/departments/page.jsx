import { Suspense } from "react";
import DepartmentsClient from "@/components/admin/departments/DepartmentsClient";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Departments",
  robots: { index: false, follow: false },
};

export default function DepartmentsPage() {
  return (
    <Suspense
      fallback={
        <DelayedLoader delayMs={150}>
          <MianxLoader variant="section" label="Loading departments…" />
        </DelayedLoader>
      }
    >
      <DepartmentsClient />
    </Suspense>
  );
}
