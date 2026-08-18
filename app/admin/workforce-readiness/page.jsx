import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Redirect legacy /admin/workforce-readiness → /admin/workforce?tab=readiness */
export default function LegacyWorkforceReadinessPage() {
  redirect("/admin/workforce?tab=readiness");
}
