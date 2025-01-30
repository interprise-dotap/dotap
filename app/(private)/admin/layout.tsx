import Header from '@/components/header';
import NavBar from '@/components/nav-bar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="grid grid-cols-[14rem_1fr] gap-2 h-[calc(100vh-3.6rem)]">
        <NavBar permission='admin' />
        <main className="container m-auto h-full p-4">{children}</main>
      </div>
    </>
  );
}
