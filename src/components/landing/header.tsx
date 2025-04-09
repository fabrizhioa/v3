import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { LogIn, UserPlusIcon } from "lucide-react";
// import { Button } from "../ui/button";
// import { LogIn } from "lucide-react";

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 py-2 h-auto items-center flex-wrap gap-2 justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">
              <span className="text-primary">Minds</span>
              <span className="text-foreground">Over</span>
              <span className="text-primary">Market</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className={buttonVariants({ variant: "outline" })}
          >
            <span className="hidden md:inline">Iniciar sesión</span>
            <LogIn className="md:hidden" />
          </Link>

          <Link
            href="/auth/register"
            className={buttonVariants({ variant: "default" })}
          >
            <span className="hidden md:inline">Registrarse</span>
            <UserPlusIcon className="md:hidden" />
          </Link>
        </div>
      </div>
    </header>
  );
}
