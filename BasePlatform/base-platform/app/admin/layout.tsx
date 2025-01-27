import HeaderAuth from "@/components/header-auth";
import SideNav from "@/components/SideNav";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="container w-full flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Project Extension</Link>
            </div>
            <HeaderAuth />
          </div>
        </nav>
        <div className="flex h-screen w-screen"> 
          <SideNav />
          <div className="flex-1 overflow-auto p-5">
            <div className="container mx-auto p-6">
              <div className="flex flex-col gap-12 items-start">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
  );
}
