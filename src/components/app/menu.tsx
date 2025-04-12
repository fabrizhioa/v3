import { useAuth } from "@/components/contexts/auth/context";
import { NAV_LINKS } from "@/lib/navlink";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import NavLink from "./navlink";

export default function Menu() {
  const { authDispatch } = useAuth();

  const handleLogout = () => {
    authDispatch({ type: "logout" });
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-center p-2 lg:hidden sticky bottom-0 left-0 border-t">
      <menu className="flex items-center px-4 py-3 gap-6 justify-center bg-darkslate rounded-full">
        <Image
          priority
          src="/assets/logo.svg"
          alt="Minds Over Market"
          width={24}
          height={24}
        />

        {NAV_LINKS.map(({ link, icon: Icon, end }, index) => (
          <NavLink
            link={link}
            key={index}
            className="p-1.5 transition-all flex items-center justify-center"
            activeClassName="text-primary"
            end={end}
          >
            {Icon && <Icon strokeWidth={1.5} className="size-6" />}
          </NavLink>
        ))}

        <button
          className="p-1.5 transition-all  rounded-full bg-red flex items-center justify-center"
          onClick={handleLogout}
        >
          <LogOutIcon strokeWidth={1.5} className="size-6" />
        </button>
      </menu>
    </div>
  );
}
