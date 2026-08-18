import { NextResponse } from "next/server";
import { isAccessTokenStructurallyValid } from "@/lib/session-cookie";
import { buildLoginRedirectUrl } from "@/lib/admin-return-to";

export function middleware(req) {
  const isAdminPage =
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login";
  const token = req.cookies.get("sb-access-token")?.value;

  if (isAdminPage && !token) {
    return NextResponse.redirect(
      buildLoginRedirectUrl(req.url, req.nextUrl.pathname, req.nextUrl.search)
    );
  }

  if (isAdminPage && token && !isAccessTokenStructurallyValid(token)) {
    const res = NextResponse.redirect(
      buildLoginRedirectUrl(req.url, req.nextUrl.pathname, req.nextUrl.search)
    );
    res.cookies.set("sb-access-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
