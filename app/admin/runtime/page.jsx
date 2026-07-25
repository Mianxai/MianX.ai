import RuntimeWorkspace from "@/components/admin/runtime/RuntimeWorkspace";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Runtime",
  robots: { index: false, follow: false },
};

export default function RuntimePage() {
  return <RuntimeWorkspace />;
}
