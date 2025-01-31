import { cookies } from 'next/headers';

export async function getUserInfos() {
  const cookieStore = await cookies();

  const userInfosCookie = cookieStore.get('user_infos');

  if (!userInfosCookie?.value) {
    return null;
  }

  try {
    const userInfos: { name: string; email: string } = JSON.parse(
      userInfosCookie.value
    );
    return userInfos;
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
}
