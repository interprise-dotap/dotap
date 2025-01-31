'use server'

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

type SignInProps = { email: string, password: string };

const API_DOTAP = process.env.API_DOTAP!;
const JWT_SECRET = process.env.JWT_SECRET!;
const secret = new TextEncoder().encode(JWT_SECRET);

export async function signIn({ email, password }: SignInProps) {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${API_DOTAP}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let errorMessage = 'Erro ao autenticar.';
      let statusCode = response.status;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (_) { }

      return { error: errorMessage, status: statusCode };
    }

    const { token } = await response.json();

    let decoded;
    try {
      decoded = await jwtVerify(token, secret) as {
        payload: { id: number, permission: string, iat: number, exp: number, name: string, email: string },
        protectedHeader: { alg: string };
      };
    } catch (error) {
      console.error('Token inválido:', error);
      return { error: 'Token inválido.', status: 401 };
    }

    cookieStore.set('auth_token', token);
    cookieStore.set('user_infos', JSON.stringify({ name: decoded.payload.name, email: decoded.payload.email }))

    const redirectUrl = decoded.payload.permission === 'admin' ? '/admin' : '/collaborator';
    return { success: true, redirectUrl };

  } catch (error) {
    console.error('Erro inesperado ao fazer login:', error);
    return { error: 'Erro inesperado ao fazer login.', status: 500 };
  }
}
