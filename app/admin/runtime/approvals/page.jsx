import RuntimePageShell from "@/components/admin/runtime/RuntimePageShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Approvals",
  robots: { index: false, follow: false },
};

export default function RuntimeApprovalsPage() {
  return <RuntimePageShell initialTab="approvals" />;
}
