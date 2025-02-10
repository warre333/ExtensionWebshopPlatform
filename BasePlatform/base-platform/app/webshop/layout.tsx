import HeaderAuth from "@/components/header-auth";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Rendered Layout");
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-16 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="container w-full flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Project Extension</Link>
            </div>
          </div>
        </nav>
        <div className="container flex flex-row gap-6">
          <div className="flex flex-col items-center gap-20 p-5 w-full">
            <div className="max-w-7xl flex flex-col gap-12 items-start">
              Shop page
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
