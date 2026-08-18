import RuntimePageShell from "@/components/admin/runtime/RuntimePageShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Runs",
  robots: { index: false, follow: false },
};

export default function RuntimeRunsPage() {
  return <RuntimePageShell initialTab="runs" />;
}
