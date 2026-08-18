import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Agents",
  robots: { index: false, follow: false },
};

/** Legacy Agent Network path → Agents surface. */
export default async function AgentNetworkPage({ searchParams }) {
  const sp = await searchParams;
  const q = new URLSearchParams();
  if (sp?.project_id) q.set("project_id", sp.project_id);
  if (sp?.department) q.set("department", sp.department);
  if (sp?.agent) q.set("agent", sp.agent);
  const qs = q.toString();
  redirect(qs ? `/admin/agents?${qs}` : "/admin/agents");
}
