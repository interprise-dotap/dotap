export const dynamic = 'force-static'

import { NextRequest, NextResponse } from "next/server";
import bcrypt, { genSalt } from 'bcryptjs';
import jwt from "jsonwebtoken";

import { db } from '@/app/db';
import { users } from '@/app/db/schema';
import { eq } from "drizzle-orm";

type RequestBody = {
  email: string
  password: string
}

export async function POST(req: NextRequest, res: NextResponse) {
  const JWT_SECRET = process.env.JWT_SECRET!

  const { email, password }: RequestBody = await req.json()

  const pepper = process.env.PEPPER;

  const passwordWithPaper = password + pepper


  try {
    const result = await db.select().from(users).where(eq(users.email, email))

    const user = result.at(0)

    const isMatch = await bcrypt.compare(passwordWithPaper, result[0].passwordHash)

    if (isMatch && user) {
      const token = jwt.sign(
        { id: user.id, permission: user.permission },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return NextResponse.json({ token }, { status: 201 })
    }

  } catch (error) {
    console.error('Erro ao realizar login:', error)
    return NextResponse.json({ message: 'fon!' }, { status: 500 })
  }
}


