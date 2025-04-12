"use client";
import { useAuth } from "@/components/contexts/auth/context";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { ShieldUser, TrophyIcon, UserIcon, UsersIcon } from "lucide-react";
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
      <div className="container w-full grid grid-cols-1 auto-rows-auto  md:grid-cols-[minmax(max-content,230px)_auto]">
        <aside className="md:border-r p-4 pl-0 flex flex-wrap md:flex-col sticky top-0 gap-4 bg-background border-b md:border-b-0 h-max: md:h-full">
          <h3 className="text-xl font-bold hidden md:inline">
            Perfil de usuario
          </h3>
          <nav className="flex md:flex-col flex-wrap gap-3">
            <NavLink href="/app/perfil" Icon={UserIcon} end={true}>
              <span className="w-full">Datos personales</span>
            </NavLink>
            <NavLink href="/app/perfil/seguridad" Icon={ShieldUser}>
              <span className="w-full">Datos de seguridad</span>
            </NavLink>
            <NavLink href="/app/perfil/referidos" Icon={UsersIcon}>
              <span className="w-full">Referidos</span>
            </NavLink>
            <NavLink href="/app/perfil/reconocimientos" Icon={TrophyIcon}>
              <span className="w-full">Reconocimientos</span>
            </NavLink>
            <Button variant="destructive" size="sm" onClick={() => logOut()}>
              <span className="hidden md:inline">Cerrar session</span>
            </Button>
          </nav>
        </aside>
        <main className="flex-1 py-4 pl-4 pr-0">{children}</main>
      </div>
    </div>
  );
}
