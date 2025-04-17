import { useAuth } from "@/components/contexts/auth/context";
import { NAV_LINKS } from "@/lib/navlink";
import { LogOutIcon, MenuIcon, ShieldUserIcon, XIcon } from "lucide-react";
import NavLink from "./navlink";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Menu() {
  const { authDispatch, auth } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleLogout = () => {
    authDispatch({ type: "logout" });
    localStorage.removeItem("token");
  };

  return (
    <div className="flex flex-col items-center p-2 lg:hidden bottom-8 z-50 right-4 fixed gap-2">
      {isOpen && (
        <menu className="flex flex-col bg-card text-card-foreground items-center px-4 py-3 gap-6 justify-center bg-darkslate rounded-lg transition-all">
          {NAV_LINKS.map(({ link, icon: Icon, end }, index) => (
            <NavLink
              link={link}
              key={index}
              className="p-1.5 transition-all flex items-center justify-center"
              activeClassName="text-primary"
              end={end}
              onClick={() => setIsOpen(false)}
            >
              {Icon && <Icon strokeWidth={1.5} className="size-6" />}
            </NavLink>
          ))}

          {(auth?.rol === "desarrollador" || auth?.rol === "administrador") && (
            <NavLink
              link="/app/admin"
              className="p-1.5 transition-all flex items-center justify-center"
              activeClassName="text-primary"
              end
            >
              <ShieldUserIcon strokeWidth={1.5} className="size-6" />
            </NavLink>
          )}
          <button
            className="p-1.5 transition-all  rounded-full bg-red flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOutIcon strokeWidth={1.5} className="size-6" />
          </button>
        </menu>
      )}

      <div className="px-4 pt-2">
        <Button
          size="icon"
          variant={isOpen ? "destructive" : "default"}
          onClick={() => setIsOpen(!isOpen)}
          className="transition-all"
        >
          {isOpen ? <XIcon /> : <MenuIcon />}
        </Button>
      </div>
    </div>
  );
}
