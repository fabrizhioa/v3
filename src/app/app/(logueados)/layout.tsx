"use client";
import Header from "@/components/app/header";
import Menu from "@/components/app/menu";
import { Loading } from "@/components/common/Loadings";
import { useAuth } from "@/contexts/auth/context";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAuth();

  if (isLogged === null) return <Loading />;

  if (!isLogged) return redirect("/app/login");

  return (
    <div className="flex flex-col min-h-dvh gap-y-8  justify-center">
      <Header />
      <main className="container mx-auto h-full">{children}</main>

      <Menu />
    </div>
  );
}
