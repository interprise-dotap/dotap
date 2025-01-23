import { Clock, Pointer, UserPen, UserPlus, UserSearch } from 'lucide-react';
import Link from 'next/link';

const admPages = [
  {
    title: 'Usuários Cadastrados',
    icon: <UserSearch size={18} />,
    href: '',
  },
  { title: 'Cadastro de Usuários', icon: <UserPlus size={18} />, href: '' },
  { title: 'Solicitações', icon: <UserPen size={18} />, href: '' },
  { title: 'Pontos Registrados', icon: <Clock size={18} />, href: '' },
];

const userPages = [
  {
    title: 'Meu Ponto',
    icon: <Pointer size={18} />,
    href: '',
  },
  { title: 'Meus Registros', icon: <Clock size={18} />, href: '' },
  { title: 'Minhas Solicitações', icon: <UserPen size={18} />, href: '' },
];

export default function NavBar() {
  return (
    <div className="border-x-2 border-foreground/10 bg-secondary shadow">
      <ul className="flex flex-col gap-2 text-sm px-2 py-4 font-semibold font-sans">
        {admPages.map((link) => (
          <li
            key={link.title}
            className="p-2 flex gap-2 items-center  hover:bg-primary/20 transition-colors rounded"
          >
            <span>{link.icon}</span>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
