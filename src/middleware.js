import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicRoute = path === "/login" || path === "/register";

  const accessToken = request.cookies.get("accessToken")?.value || "";

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
