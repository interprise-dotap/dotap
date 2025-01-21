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
  const passwordHash = password // Usar uma lib de hash em produção, como bcrypt ou argon2
  try {
    console.log('Iniciando inserção no banco...')
    const result = await db.insert(users).values({
      name,
      email,
      permission,
      passwordHash,
    })
    console.log('Usuário adicionado com sucesso:', result)
    return result
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error)
    throw error // Repropaga o erro para diagnósticos posteriores
  }
}
