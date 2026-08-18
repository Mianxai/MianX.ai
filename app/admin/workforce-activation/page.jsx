import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Redirect legacy /admin/workforce-activation → /admin/workforce?tab=setup */
export default function LegacyWorkforceActivationPage() {
  const { searchParams } = new URL("http://unused");
  redirect("/admin/workforce?tab=setup");
}
