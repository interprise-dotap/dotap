'use server';

import { cookies } from "next/headers";

type RegisterPointProps = {
  point: string;
};

const API_DOTAP = process.env.API_DOTAP!;

export async function registerPoint({ point }: RegisterPointProps) {
  const cookieStore = await cookies()

  const userInfos = JSON.parse(cookieStore.get("user_infos")!.value)

  const response = await fetch(`${API_DOTAP}/api/users/register-point`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ point, userId: userInfos.id }),
  });

  if (!response.ok) {
    let errorMessage = 'Erro interno!';
    let statusCode = response.status;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (_) { }

    return { error: errorMessage, status: statusCode };
  }

  return response.json()
}
