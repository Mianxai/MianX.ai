import { Suspense } from "react";
import WorkflowsClient from "@/components/admin/workflows/WorkflowsClient";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Workflows",
  robots: { index: false, follow: false },
};

export default function WorkflowsPage() {
  return (
    <Suspense
      fallback={
        <DelayedLoader delayMs={150}>
          <MianxLoader variant="section" label="Loading workflows…" />
        </DelayedLoader>
      }
    >
      <WorkflowsClient />
    </Suspense>
  );
}
