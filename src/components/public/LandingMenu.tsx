"use client";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import Image from "next/image";
import NavLink from "./LandingNavLink";

export default function LandingMenu() {
  return (
    <menu className="sticky bottom-0 w-full flex z-[100] left-0  gap-3 p-2  bg-darkslate h-20 items-center text-white justify-evenly md:hidden border-t-1 border-primary">
      {" "}
      <div className="flex items-center justify-center">
        <Image
          src="/assets/logo.svg"
          alt="Minds Over Market"
          width={16}
          height={16}
        />
      </div>
      <NavLink
        link="/"
        className="flex items-center justify-center"
        icon={HomeIcon}
        activeClassName="text-primary"
        inactiveClassName="text-white"
      />
      <NavLink
        link="/store"
        className="flex items-center justify-center"
        icon={ShoppingCartIcon}
        activeClassName="text-primary"
        inactiveClassName="text-white"
      />
      <NavLink
        link="/app/register"
        className="flex items-center justify-center"
        icon={UserPlusIcon}
        activeClassName="text-primary"
        inactiveClassName="text-white"
      />
      <NavLink
        link="/app/"
        className="flex items-center justify-center"
        icon={UserIcon}
        activeClassName="text-primary"
        inactiveClassName="text-white"
      />
    </menu>
  );
}
