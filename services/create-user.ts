'use server';

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  permission: 'admin' | 'collaborator';
};

const API_DOTAP = process.env.API_DOTAP!;

export async function CreateUser({
  name,
  email,
  password,
  permission,
}: CreateUserProps) {

  const response = await fetch(`${API_DOTAP}/api/users/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, permission }),
  });

  if (!response.ok) {
    let errorMessage = 'Erro ao criar usuário.';
    let statusCode = response.status;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (_) { }

    return { error: errorMessage, status: statusCode };
  }
}
