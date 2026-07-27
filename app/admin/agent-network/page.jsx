import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Agent Network",
  robots: { index: false, follow: false },
};

export default async function AgentNetworkPage({ searchParams }) {
  const sp = await searchParams;
  const q = new URLSearchParams();
  if (sp?.project_id) q.set("project_id", sp.project_id);
  if (sp?.department) q.set("department", sp.department);
  const qs = q.toString();
  redirect(qs ? `/admin/command-center?${qs}` : "/admin/command-center");
}
