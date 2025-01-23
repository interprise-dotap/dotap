'use server'

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

type SignInProps = { email: string, password: string }

const JWT_SECRET = process.env.JWT_SECRET!
const secret = new TextEncoder().encode(JWT_SECRET);

export async function signIn({ email, password }: SignInProps) {

  const cookieStore = await cookies()

  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const { token } = await response.json()

  const decoded = await jwtVerify(token, secret) as {
    payload: { id: number, permission: string, iat: number, exp: number },
    protectedHeader: { alg: string }
  }
  cookieStore.set('auth_token', token)

  decoded.payload.permission === 'admin' ? redirect(`/admin`) : redirect(`/collaborator`)

}