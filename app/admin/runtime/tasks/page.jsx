import RuntimePageShell from "@/components/admin/runtime/RuntimePageShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Tasks",
  robots: { index: false, follow: false },
};

export default function RuntimeTasksPage() {
  return <RuntimePageShell initialTab="tasks" />;
}
