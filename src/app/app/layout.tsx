"use client";

import Header from "@/components/app/header";
import Menu from "@/components/app/menu";
import { Loading } from "@/components/common/loadings";
import { useAuth } from "@/components/contexts/auth/context";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAuth();

  console.log(isLogged);

  if (isLogged === null)
    return (
      <div className="min-h-dvh w-full flex flex-col items-center justify-center">
        <Loading />
      </div>
    );

  if (!isLogged) return redirect("/auth/login");

  return (
    <>
      <div className="flex flex-col min-h-dvh">
        <Header />
        <main className="min-h-full flex-1 grid">{children}</main>

        <Menu />
      </div>
    </>
  );
}
