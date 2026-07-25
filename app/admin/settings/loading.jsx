import MianxLoader from "@/components/shared/MianxLoader";

export default function SettingsLoading() {
  return (
    <div className="admin-route-loading">
      <MianxLoader variant="page" label="Loading settings…" />
    </div>
  );
}
