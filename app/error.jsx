"use client";

import { useEffect } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Keep console diagnostics local; never render stack traces to users.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <main className="error-page">
      <div className="error-card">
        <BrandLogo size={48} />
        <p className="error-code">Something went wrong</p>
        <h1>We could not load this page</h1>
        <p className="error-copy">
          Please try again. If the problem continues, return home and request a
          demo from the contact form.
        </p>
        <div className="error-actions">
          <button type="button" className="btn-primary" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
