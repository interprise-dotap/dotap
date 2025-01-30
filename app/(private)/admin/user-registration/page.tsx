export default function Admin() {
  const API_DOTAP = process.env.API_DOTAP!

  async function create(formData: FormData) {
    'use server';

    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const permission = formData.get('permissions')?.toString();
    const password = formData.get('password')?.toString();

    if (name && email && permission && password) {
      await fetch(`${API_DOTAP}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, permission }),
      });
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
  );
}
