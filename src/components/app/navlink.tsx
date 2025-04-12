"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  link: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  end?: boolean;
}

export default function NavLink({
  link,
  end = false,
  className,
  activeClassName,
  inactiveClassName,
  children,
}: NavLinkProps) {
  "use client";

  const path = usePathname();
  const isActive = end ? path === link : path.startsWith(link);

  return (
    <Link
      href={link}
      className={`${className ?? ""} ${
        isActive ? activeClassName ?? "" : inactiveClassName ?? ""
      }`}
    >
      {children}
    </Link>
  );
}
