// middleware.js
import { NextResponse } from "next/server";
import { VerifyToken } from "./app/lib/auth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Do not guard the login route, allow the page to load
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value || null;
  let user = null;
  if (token) {
    try {
      user = await VerifyToken(token);
    } catch {
      user = null;
    }
  }

  if (!user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products",
    "/products/:path*",
  ],
};
