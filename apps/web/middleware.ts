import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin")

  if (!isAdminRoute) return NextResponse.next()

  // Allow login page and auth endpoint through unauthenticated
  if (pathname === "/admin/login" || pathname === "/api/admin/auth") {
    return NextResponse.next()
  }

  const session = req.cookies.get("tbs_admin_session")
  const isAuthenticated = session?.value === "authenticated"

  if (!isAuthenticated) {
    // API requests get 401
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    // Page requests redirect to login
    const loginUrl = new URL("/admin/login", req.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
