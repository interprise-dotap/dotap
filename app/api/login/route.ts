export const dynamic = 'force-static'

import { NextRequest, NextResponse } from "next/server";
import bcrypt, { genSalt } from 'bcryptjs';

import { db } from '@/app/db';
import { users } from '@/app/db/schema';
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";

type RequestBody = {
  email: string
  password: string
}

export async function POST(req: NextRequest, res: NextResponse) {
  const JWT_SECRET = process.env.JWT_SECRET!

  const secret = new TextEncoder().encode(JWT_SECRET);

  const { email, password }: RequestBody = await req.json()

  const pepper = process.env.PEPPER;

  const passwordWithPaper = password + pepper


  try {
    const result = await db.select().from(users).where(eq(users.email, email))

    const user = result.at(0)

    const isMatch = await bcrypt.compare(passwordWithPaper, result[0].passwordHash)

    if (isMatch && user) {

      const token = await new SignJWT({ id: user.id, permission: user.permission })
        .setProtectedHeader({ alg: 'HS256' }) // Algoritmo de assinatura
        .setIssuedAt() // Data de emissão
        .setExpirationTime('2h') // Expiração em 2 horas
        .sign(secret); // Assina o token com o segredo

      return NextResponse.json({ token }, { status: 201 })
    }

  } catch (error) {
    console.error('Erro ao realizar login:', error)
    return NextResponse.json({ message: 'fon!' }, { status: 500 })
  }
}


