import { NextResponse } from "next/server";

export function middleware(req) {
  const isAdminPage =
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login";
  const token = req.cookies.get("sb-access-token")?.value;
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
