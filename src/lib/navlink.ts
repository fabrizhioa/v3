import {
  LayoutDashboardIcon,
  LucideProps,
  NewspaperIcon,
  SettingsIcon,
  ShoppingCartIcon,
} from "lucide-react";

interface NavLinkProps {
  title?: string;
  link: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  end?: boolean;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export const NAV_LINKS: NavLinkProps[] = [
  { title: "Articulos", link: "/app", icon: NewspaperIcon, end: true },
  { title: "Tablero", link: "/app/tablero", icon: LayoutDashboardIcon },
  { title: "Catagalo", link: "/app/catalogo", icon: ShoppingCartIcon },
  { title: "Perfil", link: "/app/perfil", icon: SettingsIcon },
];
