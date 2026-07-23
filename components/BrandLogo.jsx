// Reusable MianX.ai "NX" monogram: an angular blue N interlocked with a
// steel/silver X. Rendered as an inline SVG so it stays crisp at any size and
// needs no external asset. Used in the navbar, footer, login, and admin sidebar.
export default function BrandLogo({ size = 40 }) {
  return (
    <span
      className="brand-mark"
      style={{ width: size, height: size, display: "inline-flex" }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mx-blue" x1="6" y1="10" x2="34" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="0.55" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="mx-silver" x1="34" y1="10" x2="60" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f1f5f9" />
            <stop offset="0.6" stopColor="#cbd5e1" />
            <stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="61" height="61" rx="15" fill="#0b1020" stroke="rgba(148,163,184,0.25)" strokeWidth="1.5" />
        {/* N */}
        <path d="M11 50 V16 L27 50 V16" stroke="url(#mx-blue)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* X */}
        <path d="M37 16 L53 50 M53 16 L37 50" stroke="url(#mx-silver)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
