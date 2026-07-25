import MianxLoader from "@/components/shared/MianxLoader";

export default function RuntimeApprovalsLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading approvals…" />
    </div>
  );
}
