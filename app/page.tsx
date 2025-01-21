// File: app/page.tsx
import { Pool } from '@neondatabase/serverless'
import { addUser } from './api/users'

export default function Page() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL)
  async function create(formData: FormData) {
    'use server'

    // Connect to the Neon database

    const pool = new Pool({ connectionString: process.env.DATABASE_URL! })

    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const permission = formData.get('permissions')?.toString()
    const password = formData.get('password')?.toString()

    if (name && email && permission && password) {
      const query = `
      INSERT INTO users (name, email, permission, password_hash) 
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `

      const values = [name, email, permission, password]

      try {
        const res = await pool.query(query, values)
        console.log('Usuário inserido com sucesso:', res.rows[0])
      } catch (err) {
        console.error('Erro ao inserir usuário:', err)
      } finally {
        await pool.end() // Encerra a conexão
      }
    }
  }

  return (
    <form action={create} className="flex flex-col w-80 gap-4">
      <input
        className="p-1"
        type="name"
        placeholder="write a name"
        name="name"
      />
      <input
        className="p-1"
        type="email"
        placeholder="write a email"
        name="email"
      />
      <input
        className="p-1"
        type="permissions"
        placeholder="write a permissions"
        name="permissions"
      />
      <input
        className="p-1"
        type="password"
        placeholder="write a password"
        name="password"
      />

      <button className="text-white" type="submit">
        Submit
      </button>
    </form>
  )
}
