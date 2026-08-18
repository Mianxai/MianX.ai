import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Redirect legacy /admin/agents → /admin/workforce?tab=agents */
export default function LegacyAgentsPage() {
  redirect("/admin/workforce?tab=agents");
}
