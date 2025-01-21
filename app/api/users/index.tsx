import { db } from '@/app/db'
import { users } from '@/app/db/schema'

export async function addUser({
  name,
  email,
  permission,
  password,
}: {
  name: string
  email: string
  permission: string
  password: string
}) {
  const passwordHash = password // Ultilizar alguma lib para encriptar as senha (bcrypt || argon2)
  try {
    const result = await db.insert(users).values({
      name,
      email,
      permission,
      passwordHash,
    })
    console.error(`Usuário adicionado com sucesso:`, result)
  } catch (error) {
    console.error(`Erro ao adicionar o usuário:`, error)
  }
}
