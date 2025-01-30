import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const secret = new TextEncoder().encode(JWT_SECRET);

  const { pathname } = req.nextUrl;
  const isPublicRoute = pathname === "/login"

  if (!token) {
    return NextResponse.next()
  }

  if (isPublicRoute) {
    try {
      const { payload } = await jwtVerify(token, secret) as {
        payload: { permission: string };
      };

      if (payload.permission === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else if (payload.permission === "collaborator") {
        return NextResponse.redirect(new URL("/collaborator", req.url));
      }
    } catch {
      return NextResponse.next();
    }
  }

  try {
    const { payload } = await jwtVerify(token, secret) as {
      payload: { permission: string };
    };

    const isAdminPage = pathname.startsWith("/admin");
    const isCollaboratorPage = pathname.startsWith("/collaborator");

    const isNotAdmin = payload.permission !== "admin";
    const isNotCollaborator = payload.permission !== "collaborator";

    if ((isAdminPage && isNotAdmin) || (isCollaboratorPage && isNotCollaborator)) {
      const redirectPath = isAdminPage ? "/collaborator" : "/admin";
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
