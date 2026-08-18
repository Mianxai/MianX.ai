import { Suspense } from "react";
import PlanningClient from "@/components/admin/planning/PlanningClient";
import MianxLoader from "@/components/shared/MianxLoader";

export const metadata = {
  title: "Planning Intelligence · Admin · MianX.ai",
};

export default function AdminPlanningPage() {
  return (
    <Suspense fallback={<MianxLoader variant="section" label="Loading planning…" />}>
      <PlanningClient />
    </Suspense>
  );
}
