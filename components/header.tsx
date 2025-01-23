import { LogOut } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className=" bg-secondary shadow border-b-2 border-foreground/10">
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
          <Button size="icon" variant="destructive">
            <LogOut />
          </Button>
        </div>
      </div>
    </header>
  );
}
