import RuntimePageShell from "@/components/admin/runtime/RuntimePageShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Job Queue",
  robots: { index: false, follow: false },
};

export default function RuntimeQueuePage() {
  return <RuntimePageShell initialTab="queue" />;
}
