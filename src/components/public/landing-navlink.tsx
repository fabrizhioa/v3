"use client";

import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function NavLink({
  title,
  link,
  icon: Icon,
  className,
  activeClassName,
  inactiveClassName,
}: NavLinkProps) {
  "use client";

  const path = usePathname();
  const isActive = path === link;

  return (
    <Link
      href={link}
      className={`${className ?? ""} ${
        isActive ? activeClassName ?? "" : inactiveClassName ?? ""
      }`}
    >
      {Icon && <Icon strokeWidth={1.5} size={16} />}
      {title}
    </Link>
  );
}
