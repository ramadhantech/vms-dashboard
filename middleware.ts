import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getRoleFromToken(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return (
      payload?.role ||
      payload?.Role ||
      payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    )?.toLowerCase();
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("vms_token")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = getRoleFromToken(token);

  // 🔥 RULES
if (pathname.startsWith("/dashboard/visitors")) {
  if (["user", "security"].includes(role)) {
    return NextResponse.redirect(new URL("/403", request.url));
  }
}

  if (pathname.startsWith("/dashboard/visits")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (pathname.startsWith("/dashboard/departments")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (pathname.startsWith("/dashboard/checkin")) {
    if (!["admin", "security"].includes(role)) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (pathname.startsWith("/dashboard/checkout")) {
    if (!["admin", "security"].includes(role)) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (pathname.startsWith("/dashboard/approval")) {
    if (!["admin", "user"].includes(role)) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (pathname.startsWith("/dashboard/users")) {
  if (["user", "security"].includes(role)) {
    return NextResponse.redirect(new URL("/403", request.url));
  }
}

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};