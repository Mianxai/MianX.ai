import MianxLoader from "@/components/shared/MianxLoader";

export default function RuntimeRunsLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading runs…" />
    </div>
  );
}
