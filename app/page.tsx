// File: app/page.tsx
import { addUser } from './api/users'

export default function Page() {
  async function create(formData: FormData) {
    'use server'
    // Connect to the Neon database
    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const permission = formData.get('permissions')?.toString()
    const password = formData.get('password')?.toString()

    if (name && email && permission && password) {
      addUser({ name, email, permission, password })
    }

    console.log('Fununcio')
  }

  return (
    <form action={create} className="flex flex-col w-80 gap-4 text-black">
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
