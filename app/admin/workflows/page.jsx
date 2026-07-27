import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Workflows",
  robots: { index: false, follow: false },
};

export default async function WorkflowsPage({ searchParams }) {
  const sp = await searchParams;
  const q = new URLSearchParams();
  if (sp?.project_id) q.set("project_id", sp.project_id);
  const qs = q.toString();
  redirect(qs ? `/admin/command-center?${qs}` : "/admin/command-center");
}
