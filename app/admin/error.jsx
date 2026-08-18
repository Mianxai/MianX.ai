"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminError({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    // Surface to console for operators; never render stack to users.
    if (error) console.error("[admin error boundary]", error);
  }, [error]);

  return (
    <div className="admin-app">
      <main className="admin-main admin-error-page" id="main-content" style={{ marginLeft: 0 }}>
        <div className="admin-header">
          <h1>Something went wrong</h1>
        </div>
        <div className="admin-notice error" role="alert">
          This admin view hit an unexpected error. You can try again or return to the overview.
        </div>
        <div className="header-actions">
          <button type="button" className="header-btn" onClick={() => reset()}>
            Try again
          </button>
          <button
            type="button"
            className="header-btn-ghost"
            onClick={() => router.push("/admin")}
          >
            Back to Overview
          </button>
        </div>
      </main>
    </div>
  );
}
