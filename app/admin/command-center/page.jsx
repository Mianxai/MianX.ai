import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Redirect legacy /admin/command-center → /admin */
export default function LegacyCommandCenterPage() {
  redirect("/admin");
}