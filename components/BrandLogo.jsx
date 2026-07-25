// MianX.ai brand mark. Uses the logo asset at public/mianx-logo.png (the 3D
// circuit-board mark, transparent background) so it can be swapped for an exact
// brand file without any code change. A subtle blue glow (see .brand-mark in
// globals.css) ties it into the dark web theme.
export default function BrandLogo({ size = 40 }) {
  return (
    <span
      className="brand-mark"
      style={{ width: size, height: size, display: "inline-flex" }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mianx-logo.png"
        alt="MianX.ai"
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain", display: "block" }}
      />
    </span>
  );
}
