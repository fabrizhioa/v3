import { useAuth } from "@/contexts/auth/context";
import { NAV_LINKS } from "@/libs/navlink";
import { Rocket } from "lucide-react";
import Image from "next/image";
import NavLink from "./navlink";

export default function Header() {
  const { auth } = useAuth();

  return (
    <header className="h-max  md:order-first w-full hidden lg:flex gap-4 transition-all duration-200 bg-darkslate items-center justify-between sticky top-0 left-0 z-50 shadow-md">
      <div className="container p-4 mx-auto flex items-center justify-between gap-4">
        <h1 className="flex items-center font-extrabold gap-2 text-xl uppercase">
          Minds Over Market
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
                className="flex items-center gap-1 text-white hover:bg-black/40 py-1 px-4 rounded "
                activeClassName="bg-primary hover:bg-primary/40 text-white"
                key={index}
              >
                {Icon && (
                  <Icon className="size-4 text-base" strokeWidth={1.5} />
                )}
                <span>{title}</span>
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center  justify-center gap-2">
            <Image
              src={
                auth?.ruta_imagen.replace(
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
                  {auth?.experencia_total} EXP
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
