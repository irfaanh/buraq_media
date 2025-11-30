import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Get session from cookies using Better Auth's cookie format
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  
  // If user has session token and trying to access login page, redirect to dashboard
  if (sessionToken && request.nextUrl.pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // If user has session token and trying to access root page, redirect to dashboard
  if (sessionToken && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Only protect dashboard routes - redirect to login if no session
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Allow all other routes (about, services, gallery, contact, etc.) to be public
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login", 
    "/admin/dashboard/:path*"
  ],
};
