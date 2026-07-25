import MianxLoader from "@/components/shared/MianxLoader";

export default function ProjectsLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading projects…" />
    </div>
  );
}
