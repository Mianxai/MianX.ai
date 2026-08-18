import { Suspense } from "react";
import ConsolidatedWorkforceClient from "@/components/admin/workforce/ConsolidatedWorkforceClient";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Workforce · Admin · MianX.ai",
};

export default function AdminWorkforcePage() {
  return (
    <Suspense fallback={<MianxLoader variant="section" label="Loading workforce…" />}>
      <ConsolidatedWorkforceClient />
    </Suspense>
  );
}
