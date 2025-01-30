import { Clock, Pointer, UserPen, UserPlus, UserSearch } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

const admPages = [
  {
    title: 'Usuários Cadastrados',
    icon: <UserSearch size={18} />,
    href: '/admin/registered-users',
  },
  { title: 'Cadastro de Usuários', icon: <UserPlus size={18} />, href: '/admin/user-registration' },
  { title: 'Solicitações', icon: <UserPen size={18} />, href: '/admin/requests' },
  { title: 'Pontos Registrados', icon: <Clock size={18} />, href: '/admin/recorded-points' },
];

const collaboratorPages = [
  {
    title: 'Meu Ponto',
    icon: <Pointer size={18} />,
    href: '/collaborator/my-point',
  },
  { title: 'Meus Registros', icon: <Clock size={18} />, href: '/collaborator/my-records' },
  { title: 'Minhas Solicitações', icon: <UserPen size={18} />, href: '/collaborator/my-requests' },
];

const pages = { admin: admPages, collaborator: collaboratorPages }


export default function NavBar({ permission }: { permission: 'admin' | 'collaborator' }) {
  return (
    <div className="border-foreground/10 bg-secondary">
      <ul className="flex flex-col gap-2 text-sm px-2 py-4 font-semibold font-sans">
        {pages[permission].map((link) => (
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
