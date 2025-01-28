import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const secret = new TextEncoder().encode(JWT_SECRET);

  const { pathname } = req.nextUrl;

  // Permitir acesso à rota de login caso não haja token
  if (pathname === "/login") {
    if (token) {
      try {
        const { payload } = await jwtVerify(token, secret) as {
          payload: { permission: string };
        };

        // Redireciona baseado na permissão
        if (payload.permission === "admin") {
          return NextResponse.redirect(new URL("/admin", req.url));
        } else if (payload.permission === "collaborator") {
          return NextResponse.redirect(new URL("/collaborator", req.url));
        }
      } catch {
        // Token inválido ou expirado
        return NextResponse.next(); // Permitir acesso ao login
      }
    }
    return NextResponse.next(); // Sem token, segue para login
  }

  // Proteger outras rotas
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret) as {
      payload: { permission: string };
    };

    // Verificar permissões e redirecionar
    if (pathname.startsWith("/admin") && payload.permission !== "admin") {
      return NextResponse.redirect(new URL("/collaborator", req.url));
    }

    if (pathname.startsWith("/collaborator") && payload.permission !== "collaborator") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"], // Protege tudo, exceto rotas públicas
};
