import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
// import { Button } from "../ui/button";
// import { LogIn } from "lucide-react";

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 h-auto items-center flex-wrap gap-2 justify-between">
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
          <Button variant="outline">
            <Link href="/auth/login" className="flex items-center ">
              <span className="hidden md:inline">Iniciar sesión</span>
              <LogIn className="md:hidden" />
            </Link>
          </Button>
          <Button>
            <Link href="/auth/register" className="flex items-center">
              Registrarse
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
