import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Leads",
  robots: { index: false, follow: false },
};

/** Legacy alias → canonical /admin/leads */
export default async function SubmissionsRedirectPage({ searchParams }) {
  const sp = await searchParams;
  const q = new URLSearchParams();
  if (sp?.status) q.set("status", sp.status);
  if (sp?.project_id) q.set("project_id", sp.project_id);
  const qs = q.toString();
  redirect(qs ? `/admin/leads?${qs}` : "/admin/leads");
}
