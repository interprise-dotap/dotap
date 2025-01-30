import { ModeToggle } from './mode-toggle';
import { cookies } from 'next/headers';
import { LogOut } from './logout';
import { Avatar, AvatarFallback } from './ui/avatar';

export default async function Header() {
  const cookieStore = await cookies()

  const userInfos: { name: string, email: string } = JSON.parse(cookieStore.get('user_infos')!.value)

  const abbreviatedName = userInfos.name.trim().split(' ').map(word => word.charAt(0).toUpperCase()).join()

  return (
    <header className="bg-secondary shadow border-foreground/10 drop-shadow">
      <div className="flex justify-between items-center py-2 px-6">
        <div className="flex gap-2 justify-center items-center font-mono ">
          <div className="bg-primary w-10 h-10 rounded-full text-white font-extrabold flex justify-center items-center text-xl">
            dp
          </div>
          <span className="text-primary font-extrabold text-xl dark:text-white">
            dotap
          </span>
        </div>

        <div className="flex gap-4">
          <ModeToggle />
          <LogOut />
          <Avatar title={userInfos.name} className='font-sans'>
            <AvatarFallback>{abbreviatedName}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
