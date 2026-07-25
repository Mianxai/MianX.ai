import MianxLoader from "@/components/shared/MianxLoader";

export default function RuntimeLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading runtime…" />
    </div>
  );
}
