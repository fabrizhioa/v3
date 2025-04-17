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
      <div className="container w-full grid grid-cols-1 gap-4 auto-rows-auto  md:grid-cols-[minmax(max-content,230px)_auto]">
        <aside className="md:border-r md:pr-6  pl-0 flex items-center flex-wrap md:flex-col md:sticky top-0 gap-4 bg-background lg:border-b md:border-b-0 h-max: md:h-full order-2 md:order-1 pt-4 pb-16 md:pb-0 border-t md:border-t-0 flex-1 h-max">
          <h3 className="text-xl font-bold hidden md:inline">
            Perfil de usuario
          </h3>
          <nav className="flex flex-col flex-wrap gap-3 w-full">
            <NavLink
              href="/app/perfil"
              Icon={UserIcon}
              end={true}
              className="w-full"
            >
              <span className="w-full">Datos personales</span>
            </NavLink>
            <NavLink
              href="/app/perfil/seguridad"
              Icon={ShieldUser}
              className="flex-1"
            >
              <span className="w-full">Datos de seguridad</span>
            </NavLink>
            <NavLink href="/app/perfil/referidos" Icon={UsersIcon}>
              <span className="w-full">Referidos</span>
            </NavLink>
            <NavLink href="/app/perfil/reconocimientos" Icon={TrophyIcon}>
              <span className="w-full">Reconocimientos</span>
            </NavLink>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => logOut()}
              className="w-fulw"
            >
              <span className="w-full">Cerrar session</span>
            </Button>
          </nav>
        </aside>
        <main className="flex-1 h-full py-4 pr-0  order-1 md:order-2">
          {children}
        </main>
      </div>
    </div>
  );
}
