import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Middleware — runs on every matching request before it reaches
 * route handlers or pages.
 *
 * Responsibilities:
 * 1. Set security headers on all responses.
 * 2. Protect /api/* routes (except public endpoints).
 * 3. Require `mianx_session` cookie for protected API routes.
 * 4. Redirect unauthenticated page-route access to /login.
 *
 * NOTE: The root page `/` is intentionally NOT protected because it
 *       renders both the public website and the authenticated dashboard.
 */

// Public API routes that do NOT require a session cookie.
// Each entry is matched with `pathname.startsWith()`, so include the trailing
// slash where needed to avoid unintended sub-path matches.
const PUBLIC_API_PATHS = [
  '/api/auth',      // POST login, POST register (handler-level auth on sub-paths)
  '/api/health',    // GET health check (no auth)
];

// API routes where POST is public but other methods require auth.
// Middleware checks cookie existence for non-POST methods on these paths.
const POST_ONLY_PUBLIC_PATHS = [
  '/api/leads',     // POST for public lead capture; GET/PUT/PATCH/DELETE use withAuth
];

// Routes that are always accessible regardless of auth status.
const PUBLIC_PAGE_PATHS = [
  '/',
  '/login',
];

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isPublicApi(pathname: string): boolean {
  // /api/auth POST (login) and /api/leads POST are public.
  // More specific sub-paths like /api/auth/register are also public.
  return PUBLIC_API_PATHS.some((p) => pathname.startsWith(p));
}

function isPublicPage(pathname: string): boolean {
  return PUBLIC_PAGE_PATHS.includes(pathname);
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Security headers on every response ──────────────────────
  const response = NextResponse.next();
  addSecurityHeaders(response);

  // ── API route protection ────────────────────────────────────
  if (pathname.startsWith('/api/')) {
    if (isPublicApi(pathname)) {
      return response; // allow through — handler-level auth is still enforced
    }

    // POST-only public paths: allow POST without cookie, require cookie for other methods
    const isPostOnlyPublic = POST_ONLY_PUBLIC_PATHS.some((p) => pathname.startsWith(p));
    if (isPostOnlyPublic && request.method === 'POST') {
      return response;
    }

    // All other /api/* routes require the session cookie to be present.
    // NOTE: We only check cookie *existence* here. Full validation (expiry,
    // user status, etc.) is done inside `withAuth` / `getSessionFromRequest`.
    const sessionToken = request.cookies.get('mianx_session')?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized — session cookie required' },
        { status: 401 },
      );
    }

    return response;
  }

  // ── Page route protection ───────────────────────────────────
  // Public pages are always accessible.
  if (isPublicPage(pathname)) {
    return response;
  }

  // Every other page requires a session — redirect to /login.
  const sessionToken = request.cookies.get('mianx_session')?.value;
  if (!sessionToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

// Match all routes except Next.js internals, static assets, and _next.
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, etc.
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon\.ico|sitemap\.xml|robots\.txt|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
