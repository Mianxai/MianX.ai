import { Suspense } from "react";
import ExecutionClient from "@/components/admin/execution/ExecutionClient";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Execution",
};

export default function ExecutionPage() {
  return (
    <Suspense
      fallback={
        <DelayedLoader delayMs={200}>
          <MianxLoader variant="section" label="Loading execution…" />
        </DelayedLoader>
      }
    >
      <ExecutionClient />
    </Suspense>
  );
}
