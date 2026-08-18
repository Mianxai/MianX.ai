import RuntimePageShell from "@/components/admin/runtime/RuntimePageShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Runtime",
  robots: { index: false, follow: false },
};

export default function RuntimePage() {
  return <RuntimePageShell initialTab="overview" />;
}
