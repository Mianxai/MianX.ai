import MianxLoader from "@/components/shared/MianxLoader";

export default function AdminLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading Mianx.ai…" />
    </div>
  );
}
