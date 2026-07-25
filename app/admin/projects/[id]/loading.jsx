import MianxLoader from "@/components/shared/MianxLoader";

export default function ProjectDetailLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading project…" />
    </div>
  );
}
