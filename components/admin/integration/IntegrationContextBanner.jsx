"use client";

import StatusBadge from "@/components/admin/StatusBadge";

export default function IntegrationContextBanner({
  projectId,
  selectedProject,
  onFocusProjectPicker,
}) {
  const name = selectedProject?.name || (projectId ? projectId : "All projects");
  const status = selectedProject?.status || (projectId ? "unknown" : "read_only");

  return (
    <div
      className="integration-context-banner"
      data-testid="integration-project-header"
      role="region"
      aria-label="Selected project"
    >
      <div className="integration-context-banner-main">
        <p className="integration-context-label">Selected project</p>
        <p className="integration-context-name" data-testid="integration-selected-project-name">
          <strong>{name}</strong>
          {selectedProject?.slug ? (
            <span className="admin-muted"> ({selectedProject.slug})</span>
          ) : null}
        </p>
        <p className="integration-context-meta">
          <span className="integration-status-pill">
            <StatusBadge status={status} />
            <span>{status}</span>
          </span>
          {!projectId ? (
            <span className="admin-muted"> · All projects is read-only for proof actions</span>
          ) : null}
        </p>
      </div>
      {!projectId && onFocusProjectPicker ? (
        <button
          type="button"
          className="header-btn"
          data-testid="focus-project-picker"
          onClick={onFocusProjectPicker}
        >
          Select project
        </button>
      ) : null}
    </div>
  );
}
