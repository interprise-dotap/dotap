import { addUser } from './api/users'

export default function Page() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL)
  async function create(formData: FormData) {
    'use server'

    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const permission = formData.get('permissions')?.toString()
    const password = formData.get('password')?.toString()

    if (name && email && permission && password) {

      await addUser({ email, name, password, permission })
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
