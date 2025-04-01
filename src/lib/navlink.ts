import {
  LayoutDashboardIcon,
  LucideProps,
  NewspaperIcon,
  SettingsIcon,
  StoreIcon,
} from "lucide-react";

interface NavLinkProps {
  title?: string;
  link: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export const NAV_LINKS: NavLinkProps[] = [
  { title: "Feeds", link: "/app", icon: NewspaperIcon },
  { title: "Dashboard", link: "/app/dashboard", icon: LayoutDashboardIcon },
  { title: "Tienda", link: "/app/store", icon: StoreIcon },
  { title: "Perfil", link: "/app/profile", icon: SettingsIcon },
];
