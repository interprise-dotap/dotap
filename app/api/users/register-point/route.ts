export const dynamic = 'force-static'
import { NextRequest, NextResponse } from "next/server";

import { db } from '@/lib/db';
import { records } from '@/lib/db/schema';

type RequestBody = {
  point: string;
  userId: number
};

const JWT_SECRET = process.env.JWT_SECRET!;
const secret = new TextEncoder().encode(JWT_SECRET);

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();

  console.log(body.userId)

  try {
    console.log("Iniciando inserção no banco...");

    const result = await db.insert(records).values({
      date: body.point,
      userId: body.userId
    });

    console.log("Ponto registrado com sucesso!");

    return NextResponse.json(
      { message: "Point registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
