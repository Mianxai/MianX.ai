/** @type {import('next').NextConfig} */

const CSP_DIRECTIVE =
  process.env.NODE_ENV === "production"
    ? [
        // Production: strict CSP with nonce support
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
        // Three.js / WebGL shaders require 'unsafe-eval' in current architecture.
        // Next.js runtime chunks need 'unsafe-inline' until nonce wiring is complete.
        // TODO: Phase 2 — migrate to nonce-based CSP via middleware nonce generation.
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob:",
        "connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co https://va.vercel-scripts.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; ")
    : [
        // Development: relaxed to allow Next.js HMR, React DevTools, etc.
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https://*.supabase.co",
        "connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co https://va.vercel-scripts.com",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // HTTPS production only (Vercel terminates TLS). Safe for the public site.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content-Security-Policy: strict in production, relaxed in development.
  // 'unsafe-inline' and 'unsafe-eval' are temporarily allowed for Next.js runtime
  // scripts and Three.js WebGL shaders. Phase 2 will migrate to nonce-based CSP.
  {
    key: "Content-Security-Policy",
    value: CSP_DIRECTIVE,
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
