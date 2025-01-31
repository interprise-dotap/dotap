'use client';

import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
// import { LogOut } from './logout';

export default function Header({ name }: { name: string }) {
  const { setTheme } = useTheme();

  const abbreviatedName = name
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join();

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
          {/* <LogOut /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar title={name}>
                  <AvatarFallback>{abbreviatedName}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" forceMount>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Temas
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                Sistema
              </DropdownMenuItem>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Conta
              </DropdownMenuLabel>
              <DropdownMenuItem>Sair da conta</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
