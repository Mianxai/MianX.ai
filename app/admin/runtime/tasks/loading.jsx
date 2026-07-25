import MianxLoader from "@/components/shared/MianxLoader";

export default function RuntimeTasksLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading tasks…" />
    </div>
  );
}
