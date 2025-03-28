"use client";
import {
  // HomeIcon,
  // ShoppingCartIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import Link from "next/link";
import LogoIcon from "../../assets/LogoIcon";
// import NavLink from "./LandingNavLink";

export default function LandingHeader() {
  return (
    <header className="h-20 bg-darkslate shadow-border hidden md:flex w-full sticky top-0 left-0 py-2 px-4 z-50 ">
      <div className="container mx-auto w-full flex items-center justify-between flex-1 ">
        <h1 className="flex gap-1 items-center text-white font-semibold text-xl">
          MINDS OVER MARKET
          <LogoIcon className="h-5" />
        </h1>
        <nav className="flex items-center gap-4 text-base">
          <Link
            href="/app/register"
            className=" text-primary hover:text-white transition-all   uppercase flex gap-0 items-center justify-center group border-2 border-primary overflow-hidden rounded-full"
          >
            <span className="bg-primary px-2 py-1  border-r-0 border-primary text-white ">
              <UserPlusIcon strokeWidth={1.5} className="size-6" />
            </span>
            <span className="hidden md:block py-1  border-primary pl-2 pr-3 border-l-0 rounded-r text-white group-hover:bg-primary transition-all">
              Registrate
            </span>
          </Link>
          <Link
            href="/app"
            className=" text-secondary hover:text-white transition-all rounded  uppercase flex gap-0 items-center justify-center group"
          >
            <span className="bg-secondary pr-2 pl-2 py-1 border-2 border-r-0 border-secondary text-white rounded-l">
              <UserIcon strokeWidth={1.5} className="size-6" />
            </span>
            <span className="hidden md:block py-1 border-2 border-l-0 border-secondary pl-2 pr-3 rounded-r text-white group-hover:bg-secondary transition-all">
              Ingresar
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
