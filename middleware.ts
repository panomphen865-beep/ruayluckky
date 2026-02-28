import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protect = pathname.startsWith("/admin") || pathname.startsWith("/dashboard");
  if (!protect) return NextResponse.next();

  if (pathname.startsWith("/admin-login")) return NextResponse.next();

  const token = req.cookies.get("admin_session")?.value;
  if (!token) {
    const loginUrl = new URL("/admin-login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
