import { Suspense } from "react";
import WorkforceActivationClient from "@/components/admin/workforce-activation/WorkforceActivationClient";
import MianxLoader from "@/components/shared/MianxLoader";

export const metadata = {
  title: "Workforce Setup · Admin · MianX.ai",
};

export default function AdminWorkforceActivationPage() {
  return (
    <Suspense fallback={<MianxLoader variant="section" label="Loading workforce setup…" />}>
      <WorkforceActivationClient />
    </Suspense>
  );
}
