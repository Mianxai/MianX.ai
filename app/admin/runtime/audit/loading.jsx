import MianxLoader from "@/components/shared/MianxLoader";

export default function RuntimeAuditLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading audit log…" />
    </div>
  );
}
