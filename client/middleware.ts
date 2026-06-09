import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ROUTES = [
  "/admin/dashboard",
  "/admin/menu",
  "/admin/orders",
  "/admin/analytics",
  "/admin/qr",
  "/admin/reviews",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isAdminRoute) {
    const token =
      request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  // Login page pe already logged in ho to dashboard redirect
  if (pathname === "/admin/login") {
    const token = request.cookies.get("accessToken")?.value;
    if (token) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};