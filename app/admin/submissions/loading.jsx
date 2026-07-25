import MianxLoader from "@/components/shared/MianxLoader";

export default function SubmissionsLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading submissions…" />
    </div>
  );
}
