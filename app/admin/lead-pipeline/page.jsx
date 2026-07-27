import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Lead Pipeline",
  robots: { index: false, follow: false },
};

/** Lead Pipeline maps to existing submissions/leads — no duplicate table. */
export default async function LeadPipelinePage({ searchParams }) {
  const sp = await searchParams;
  const status = sp?.status;
  const qs = status ? `?status=${encodeURIComponent(status)}` : "";
  redirect(`/admin/submissions${qs}`);
}
