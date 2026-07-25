"use client";

import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import RuntimeWorkspace from "@/components/admin/runtime/RuntimeWorkspace";

const TITLES = {
  overview: "Runtime",
  agents: "Agents",
  tasks: "Tasks",
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
      <Suspense fallback={<p className="runtime-muted">Loading runtime…</p>}>
        <RuntimeWorkspace initialTab={initialTab} />
      </Suspense>
    </AdminShell>
  );
}
