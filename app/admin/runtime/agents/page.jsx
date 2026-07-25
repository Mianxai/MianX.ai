import RuntimePageShell from "@/components/admin/runtime/RuntimePageShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Agents",
  robots: { index: false, follow: false },
};

export default function RuntimeAgentsPage() {
  return <RuntimePageShell initialTab="agents" />;
}
