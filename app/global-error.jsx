"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#060814",
          color: "#f8fafc",
          fontFamily: "Inter, system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>
            MianX.ai is temporarily unavailable
          </h1>
          <p style={{ color: "#9fb0cc", marginBottom: "1.5rem" }}>
            Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "linear-gradient(135deg, #4f7cff, #7c5cff)",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "0.85rem 1.5rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
