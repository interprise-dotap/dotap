export const dynamic = 'force-static';

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { db } from '@/app/db';
import { users } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';

type RequestBody = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { email, password }: RequestBody = await req.json();

    const pepper = process.env.PEPPER;
    const passwordWithPepper = password + pepper;

    // Busca o usuário no banco de dados
    const result = await db.select().from(users).where(eq(users.email, email));
    const user = result.at(0);

    if (!user) {
      return NextResponse.json(
        { message: 'E-mail não encontrado.' },
        { status: 404 }
      );
    }

    // Compara a senha fornecida com o hash armazenado
    const isMatch = await bcrypt.compare(passwordWithPepper, user.passwordHash);

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Senha incorreta.' },
        { status: 401 }
      );
    }

    // Gera o token JWT
    const token = await new SignJWT({ id: user.id, permission: user.permission, name: user.name, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);

    // Retorna o token
    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return NextResponse.json(
      { message: 'Erro inesperado ao processar a requisição.' },
      { status: 500 }
    );
  }
}
