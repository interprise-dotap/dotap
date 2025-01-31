'use server';

import Header from '@/components/header';
import NavBar from '@/components/nav-bar';
import { getUserInfos } from '@/services/get-user-infos';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfos = await getUserInfos();
  const name = userInfos ? userInfos.name : '';
  return (
    <>
      <Header name={name} />
      <div className="grid grid-cols-[14rem_1fr] gap-2 h-[calc(100vh-3.6rem)]">
        <NavBar permission="admin" />
        <main className="container m-auto h-full p-4">{children}</main>
      </div>
    </>
  );
}
