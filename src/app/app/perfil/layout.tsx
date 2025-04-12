"use client";
import { useAuth } from "@/components/contexts/auth/context";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { ReactNode } from "react";

export default function LayoutPerfilPage({
  children,
}: {
  children: ReactNode;
}) {
  const { authDispatch } = useAuth();

  const logOut = () => {
    authDispatch({ type: "logout" });
    localStorage.removeItem("token");
  };
  return (
    <div className="flex min-h-full flex-1">
      <div className="container w-full grid grid-cols-[minmax(max-content,230px)_auto]">
        <aside className="border-r p-4 pl-0">
          <h3 className="text-xl font-bold">Perfil de usuario</h3>
          <nav className="flex flex-col gap-4">
            <NavLink href="/app/perfil">Datos personales</NavLink>
            <NavLink href="/app/perfil">Datos de seguridad</NavLink>
            <NavLink href="/app/perfil">Referidos</NavLink>
            <NavLink href="/app/perfil">Certificados</NavLink>
            <Button variant="destructive" size="sm" onClick={() => logOut()}>
              Cerrar session
            </Button>
          </nav>
        </aside>
        <main className="flex-1 py-4 pl-4 pr-0">{children}</main>
      </div>
    </div>
  );
}
