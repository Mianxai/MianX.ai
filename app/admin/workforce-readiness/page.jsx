import { Suspense } from "react";
import WorkforceReadinessClient from "@/components/admin/workforce-readiness/WorkforceReadinessClient";
import MianxLoader from "@/components/shared/MianxLoader";

export const metadata = {
  title: "Workforce Readiness · Admin · MianX.ai",
};

export default function AdminWorkforceReadinessPage() {
  return (
    <Suspense fallback={<MianxLoader variant="section" label="Loading workforce readiness…" />}>
      <WorkforceReadinessClient />
    </Suspense>
  );
}
