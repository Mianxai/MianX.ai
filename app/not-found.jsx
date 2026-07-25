import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="error-page">
      <div className="error-card">
        <BrandLogo size={48} />
        <p className="error-code">404</p>
        <h1>Page not found</h1>
        <p className="error-copy">
          That page is not part of the MianX.ai public site. Return home to
          explore Industry Operating Systems, partners, and the demo form.
        </p>
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </main>
  );
}
