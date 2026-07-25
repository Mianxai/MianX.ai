import RuntimePageShell from "@/components/admin/runtime/RuntimePageShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Audit",
  robots: { index: false, follow: false },
};

export default function RuntimeAuditPage() {
  return <RuntimePageShell initialTab="audit" />;
}
