export const dynamic = 'force-static'

import { NextRequest, NextResponse } from "next/server";
import bcrypt, { genSalt } from 'bcryptjs';

import { db } from '@/app/db';
import { users } from '@/app/db/schema';

type RequestBody = {
  name: string;
  email: string;
  permission: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();

  const saltRounds = await genSalt(8);

  const pepper = process.env.PEPPER;

  const passwordWithPepper = body.password + pepper;

  const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);

  console.log(passwordHash);

  try {
    console.log("Iniciando inserção no banco...");

    const result = await db.insert(users).values({
      name: body.name,
      email: body.email,
      permission: body.permission,
      passwordHash: passwordHash,
    });

    console.log("Usuário adicionado com sucesso:", result);

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
