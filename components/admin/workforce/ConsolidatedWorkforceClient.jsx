"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import PageHeader from "@/components/admin/PageHeader";
import ProjectPicker from "@/components/admin/ProjectPicker";
import MianxLoader from "@/components/shared/MianxLoader";
import WorkforceActivationClient from "@/components/admin/workforce-activation/WorkforceActivationClient";
import WorkforceReadinessClient from "@/components/admin/workforce-readiness/WorkforceReadinessClient";
import CommandCenterClient from "@/components/admin/command-center/CommandCenterClient";
import WorkforceClient from "@/components/admin/workforce/WorkforceClient";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
import { useAdminProject } from "@/lib/admin-project";
import {
  useProjectOperationalSummary,
} from "@/lib/admin-ops-summary";

const WORKFORCE_TABS = [
  { id: "setup", label: "Setup" },
  { id: "readiness", label: "Readiness" },
  { id: "agents", label: "Agents" },
  { id: "operations", label: "Operations" },
];

/**
 * Consolidated Workforce page with 4 top-level tabs.
 * Tab 1 (Setup): WorkforceActivationClient embedded
 * Tab 2 (Readiness): WorkforceReadinessClient embedded
 * Tab 3 (Agents): CommandCenterClient in agents mode embedded
 * Tab 4 (Operations): WorkforceClient embedded (with its own sub-tabs)
 */
export default function ConsolidatedWorkforceClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projectId, setProjectId, suggestStoredProjectId } = useAdminProject();
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/workforce",
  });
  const [projects, setProjects] = useState([]);

  const rawTab = searchParams?.get("tab") || "setup";
  const tab = WORKFORCE_TABS.some((t) => t.id === rawTab) ? rawTab : "setup";

  const setTab = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      if (next === "setup") params.delete("tab");
      else params.set("tab", next);
      if (projectId) params.set("project_id", projectId);
      const qs = params.toString();
      router.replace(qs ? `/admin/workforce?${qs}` : "/admin/workforce");
    },
    [router, searchParams, projectId]
  );

  // Load projects for ProjectPicker
  useMemo(() => {
    (async () => {
      try {
        const res = await fetch("/api/core/projects", {
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data?.projects)) {
            setProjects(
              data.projects.filter(
                (p) => p.status === "active" || !p.archived_at
              )
            );
          }
        }
      } catch {
        /* ignore */
      }
    })();
  }, []);

  useMemo(() => {
    if (projectId) return;
    if (suggestStoredProjectId) setProjectId(suggestStoredProjectId);
  }, [projectId, suggestStoredProjectId, setProjectId]);

  return (
    <AdminShell
      title="Workforce"
      breadcrumbs={[
        { href: "/admin", label: "Admin" },
        { label: "Workforce" },
      ]}
      actions={
        <ProjectPicker
          value={projectId}
          onChange={(id) => setProjectId(id)}
          projects={projects}
          allowAll
        />
      }
    >
      <PageHeader
        description="Foundation setup, readiness, agent catalogue, and runtime operations in one view. Capacity seats are allocatable slots — not always-on agents."
        howThisWorks="Owns: setup, readiness, catalogue, runtime ops. Does not prove: activation, live execution, or that readiness equals an operational autonomous workforce."
      />
      <FounderActionBanner summary={opsSummary} projectId={projectId} />

      <div className="admin-tabs" role="tablist" aria-label="Workforce sections">
        {WORKFORCE_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "active" : ""}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div data-testid="workforce-tab-content">
        {tab === "setup" && <WorkforceActivationClient embedded />}
        {tab === "readiness" && <WorkforceReadinessClient embedded />}
        {tab === "agents" && (
          <CommandCenterClient title="Agents" embedded basePath="/admin/workforce" />
        )}
        {tab === "operations" && <WorkforceClient embedded />}
      </div>
    </AdminShell>
  );
}
