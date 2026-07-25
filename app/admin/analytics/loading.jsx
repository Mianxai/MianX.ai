import MianxLoader from "@/components/shared/MianxLoader";

export default function AnalyticsLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading analytics…" />
    </div>
  );
}
