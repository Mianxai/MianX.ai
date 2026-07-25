/**
 * Fills the remaining admin workspace below the page header and centres its
 * children (typically a MianxLoader) within that region.
 */
export default function AdminLoadingRegion({ children, className = "" }) {
  return (
    <div
      className={`admin-loading-region${className ? ` ${className}` : ""}`}
      data-testid="admin-loading-region"
    >
      {children}
    </div>
  );
}
