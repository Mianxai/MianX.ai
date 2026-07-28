import LeadsClient from "@/components/admin/leads/LeadsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mianx.ai — Leads",
  robots: { index: false, follow: false },
};

export default function LeadsPage() {
  return <LeadsClient />;
}
