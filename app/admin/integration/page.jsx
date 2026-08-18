import { Suspense } from "react";
import IntegrationClient from "@/components/admin/integration/IntegrationClient";
import MianxLoader from "@/components/shared/MianxLoader";

export const metadata = {
  title: "Founder Proof · Admin · MianX.ai",
};

export default function AdminIntegrationPage() {
  return (
    <Suspense fallback={<MianxLoader variant="section" label="Loading Founder Proof…" />}>
      <IntegrationClient />
    </Suspense>
  );
}
