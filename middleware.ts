import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const secret = new TextEncoder().encode(JWT_SECRET);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = await jwtVerify(token, secret) as {
      payload: { id: number, permission: string, iat: number, exp: number },
      protectedHeader: { alg: string }
    }

    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin") && decoded.payload.permission !== "admin") {
      return NextResponse.redirect(new URL("/collaborator", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log('Error: ', error)

    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|login|api).*)"], // Protege tudo, exceto rotas públicas
};