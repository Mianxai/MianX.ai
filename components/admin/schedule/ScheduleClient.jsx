"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import SchedulePanel from "@/components/admin/command-center/SchedulePanel";
import { currentAdminLoginHref } from "@/lib/admin-return-to";

async function fetchJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/schedule"));
    return { ok: false, data: null };
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, data };
}

export default function ScheduleClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const res = await fetchJson(`/api/admin/command-center${q}`, router);
    setLoading(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to load schedule");
      return;
    }
    setData(res.data);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AdminShell title="Schedule">
      <div className="cc-page">
        <p className="cc-muted">
          Truthful worker / scheduler state. No fake countdown.
        </p>
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading schedule…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {data ? (
          <SchedulePanel
            schedule={data.schedule}
            readiness={data.productionReadiness}
          />
        ) : null}
      </div>
    </AdminShell>
  );
}
