import MianxLoader from "@/components/shared/MianxLoader";

export default function RuntimeAgentsLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading agents…" />
    </div>
  );
}
