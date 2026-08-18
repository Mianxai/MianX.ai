import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Audit",
  robots: { index: false, follow: false },
};

function queryFromSearchParams(sp) {
  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(sp || {})) {
    if (Array.isArray(value)) {
      for (const v of value) {
        if (v != null && v !== "") q.append(key, String(v));
      }
    } else if (value != null && value !== "") {
      q.set(key, String(value));
    }
  }
  return q.toString();
}

/** Short path → canonical Runtime Audit. */
export default async function AuditRedirectPage({ searchParams }) {
  const sp = await searchParams;
  const qs = queryFromSearchParams(sp);
  redirect(qs ? `/admin/runtime/audit?${qs}` : "/admin/runtime/audit");
}
