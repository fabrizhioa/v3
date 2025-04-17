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

  if (auth?.rol !== "administrador" && auth?.rol !== "desarrollador")
    return (
      <div className="container flex flex-col gap-8 items-center justify-center p-16 text-center">
        <Image
          src="/assets/logo.svg"
          alt="Logo de la empresa"
          width={100}
          height={100}
        />
        <h2 className="text-3xl uppercase font-bold ">
          Acceso <span className="text-custom-red">restringido</span>
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
