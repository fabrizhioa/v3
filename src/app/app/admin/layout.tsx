"use client";

import AsideMenuAdmin from "@/components/app/admin/aside-menu";
import { useAuth } from "@/components/contexts/auth/context";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAuth();
  console.log(auth);
  if (auth?.rol !== "ADMIN" && auth?.rol !== "DESARROLLADOR")
    return (
      <div className="container flex flex-col gap-8 items-center justify-center p-16">
        <Image
          src="/assets/logo.svg"
          alt="Logo de la empresa"
          width={100}
          height={100}
        />
        <h2 className="text-3xl uppercase font-bold text-custom-red">
          Acceso restringido
        </h2>
      </div>
    );

  return (
    <section className="flex h-full flex-1">
      <AsideMenuAdmin />
      <div className="container min-w-max">{children}</div>
      <aside className="flex flex-1" />
    </section>
  );
}
