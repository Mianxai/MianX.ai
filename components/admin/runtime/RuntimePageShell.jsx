"use client";

import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import RuntimeWorkspace from "@/components/admin/runtime/RuntimeWorkspace";
import MianxLoader from "@/components/shared/MianxLoader";

const TITLES = {
  overview: "Runtime",
  agents: "Agents",
  tasks: "Tasks",
  queue: "Job Queue",
  runs: "Runs",
  approvals: "Approvals",
  audit: "Audit",
};

export default function RuntimePageShell({ initialTab = "overview" }) {
  const title = TITLES[initialTab] || "Runtime";
  const breadcrumbs =
    initialTab === "overview"
      ? null
      : [
          { href: "/admin/runtime", label: "Runtime" },
          { label: title },
        ];

  return (
    <AdminShell title={title} breadcrumbs={breadcrumbs}>
      <Suspense
        fallback={
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading runtime…" />
          </AdminLoadingRegion>
        }
      >
        <RuntimeWorkspace initialTab={initialTab} />
      </Suspense>
    </AdminShell>
  );
}
