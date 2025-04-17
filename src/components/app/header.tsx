/* eslint-disable @next/next/no-img-element */
import { useAuth } from "@/components/contexts/auth/context";
import { NAV_LINKS } from "@/lib/navlink";
import { Rocket, ShieldUserIcon } from "lucide-react";
import Image from "next/image";
import NavLink from "./navlink";
import Link from "next/link";

export default function Header() {
  const { auth } = useAuth();

  return (
    <header className="h-max  md:order-first w-full hidden lg:flex transition-all duration-200 bg-background border-b border-border items-center justify-between sticky top-0 left-0 z-50 ">
      <div className="container py-4 mx-auto flex items-center justify-between gap-4">
        <h1 className="flex items-start  gap-2 text-xl">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold">
              <span className="text-primary">Minds</span>
              <span className="text-foreground">Over</span>
              <span className="text-primary">Market</span>
            </span>
          </Link>
          <img
            src="/assets/Logo.svg"
            alt="Minds Over Market"
            className="size-8"
          />
        </h1>
        <div className="flex gap-1">
          <nav className="flex gap-2">
            {NAV_LINKS.map(({ title, link, icon: Icon }, index) => (
              <NavLink
                link={link}
                className="flex items-center gap-1 text-white hover:bg-black/40 py-0.5 px-2 text-xs rounded "
                activeClassName="hover:bg-primary/40 text-white"
                key={index}
              >
                <span>{title}</span>
                {Icon && <Icon className="size-4 text-xs" strokeWidth={2} />}
              </NavLink>
            ))}
            {(auth?.rol === "administrador" ||
              auth?.rol === "desarrollador") && (
              <NavLink
                link="/app/admin"
                className="flex items-center gap-1 text-white hover:bg-black/40 py-0.5 px-2 text-xs rounded "
                activeClassName="hover:bg-primary/40 text-white"
              >
                <span>Administrar</span>
                <ShieldUserIcon className="size-4 text-xs" strokeWidth={2} />
              </NavLink>
            )}
          </nav>
          <div className="flex items-center  justify-center gap-2">
            <Image
              src={
                auth?.avatar.replace(
                  "https://api.mindsovermarket.net",
                  "/resources"
                ) as string
              }
              alt="Minds Over Market"
              className="rounded-full aspect-square object-cover size-8"
              width={32}
              height={32}
              priority={false}
            />
            <div className="gap-0 flex flex-col">
              <h2 className="font-medium text-sm text-white uppercase">
                {auth?.nombre_completo.split(" ")[0]}
              </h2>
              <p className="text-xs text-primary flex gap-1 items-center justify-start">
                <span className="flex items-center gap-1 text-xs">
                  <Rocket className="size-4" strokeWidth={1.5} />
                  {auth?.experiencia_total} EXP
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
