// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Login page pe already logged in check
//   if (pathname === "/admin/login") {
//     const token = request.cookies.get("accessToken")?.value;
//     if (token) {
//       return NextResponse.redirect(
//         new URL("/admin/dashboard", request.url)
//       );
//     }
//   }

//   // ✅ Baaki routes allow karo — Redux client side check karega
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };





import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};