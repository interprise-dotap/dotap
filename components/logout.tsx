
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "./ui/button";
import { LogOut as LogOutIcon } from "lucide-react";

async function handleLogOut() {
  'use server'
  const cookieStore = await cookies()

  cookieStore.delete("auth_token")
  redirect("/login");
}

export async function LogOut() {
  return (
    <Button
      size="icon"
      variant="destructive"
      onClick={handleLogOut}
    >
      <LogOutIcon />
    </Button>
  )
}