export const dynamic = 'force-static'

import { NextRequest, NextResponse } from "next/server";
import bcrypt, { genSalt } from 'bcryptjs';

import { db } from '@/app/db';
import { users } from '@/app/db/schema';
import { eq } from "drizzle-orm";

type RequestBody = {
  email: string
  password: string
}

export async function POST(req: NextRequest, res: NextResponse) {

  const body: RequestBody = await req.json()

  const pepper = process.env.PEPPER;

  const passwordWithPaper = body.password + pepper

  try {
    const result = await db.select().from(users).where(eq(users.email, body.email))

    const isMatch = await bcrypt.compare(passwordWithPaper, result[0].passwordHash)

    return NextResponse.json({ authenticated: isMatch }, { status: 201 })
  } catch (error) {
    console.error('Erro ao realizar login:', error)
    return NextResponse.json({ message: 'fon!' }, { status: 500 })
  }
}


