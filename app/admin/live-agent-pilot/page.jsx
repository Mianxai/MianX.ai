import { Suspense } from "react";
import LiveAgentPilotClient from "@/components/admin/live-agent-pilot/LiveAgentPilotClient";
import MianxLoader from "@/components/shared/MianxLoader";

export const metadata = {
  title: "Live Agent Pilot · Admin · MianX.ai",
};

export default function AdminLiveAgentPilotPage() {
  return (
    <Suspense fallback={<MianxLoader variant="section" label="Loading live agent pilot…" />}>
      <LiveAgentPilotClient />
    </Suspense>
  );
}
