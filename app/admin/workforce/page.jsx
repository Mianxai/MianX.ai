import { Suspense } from "react";
import WorkforceClient from "@/components/admin/workforce/WorkforceClient";
import MianxLoader from "@/components/shared/MianxLoader";

export const metadata = {
  title: "Workforce Ops · Admin · MianX.ai",
};

export default function AdminWorkforcePage() {
  return (
    <Suspense fallback={<MianxLoader variant="section" label="Loading workforce…" />}>
      <WorkforceClient />
    </Suspense>
  );
}
