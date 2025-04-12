import { MultiNavLink, NavLink } from "@/components/ui/nav-link";
import {
  BoxesIcon,
  ChartCandlestickIcon,
  DollarSign,
  LayoutDashboardIcon,
  ListCollapse,
  ListVideoIcon,
  NewspaperIcon,
  User2,
  VideoIcon,
} from "lucide-react";

export default function AsideMenuAdmin() {
  return (
    <aside className="flex flex-col flex-1 p-6 border-r gap-6">
      <h2 className="font-bold text-2xl">
        Panel <span className="text-primary">Administrativo</span>
      </h2>
      <nav className="flex flex-col gap-4">
        <NavLink href="/app/admin" end Icon={LayoutDashboardIcon}>
          Resumen
        </NavLink>
        <NavLink href="/app/admin/usuarios" Icon={User2}>
          Usuarios
        </NavLink>
        <NavLink href="/app/admin/ventas" Icon={DollarSign}>
          Ventas
        </NavLink>

        <NavLink href="/app/admin/cursos" Icon={ListVideoIcon}>
          Cursos
        </NavLink>
        <MultiNavLink
          mainPath="/app/admin/articulos"
          title="Articulos"
          Icon={NewspaperIcon}
          data={[
            {
              href: "/app/admin/articulos",
              text: "Lista",
              Icon: ListCollapse,
              end: true,
            },
            {
              href: "/app/admin/articulos/paquetes",
              text: "Paquetes",
              Icon: BoxesIcon,
            },
          ]}
        />

        <NavLink href="/app/admin/alertas" Icon={ChartCandlestickIcon}>
          Alertas
        </NavLink>
        <NavLink href="/app/admin/envivos" Icon={VideoIcon}>
          En vivos
        </NavLink>
      </nav>
    </aside>
  );
}
