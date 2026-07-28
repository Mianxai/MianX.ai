import { Suspense } from "react";
import IntegrationClient from "@/components/admin/integration/IntegrationClient";
import MianxLoader from "@/components/shared/MianxLoader";

export const metadata = {
  title: "End-to-End Integration · Admin · MianX.ai",
};

export default function AdminIntegrationPage() {
  return (
    <Suspense fallback={<MianxLoader variant="section" label="Loading integration…" />}>
      <IntegrationClient />
    </Suspense>
  );
}
