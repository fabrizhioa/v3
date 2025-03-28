import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

export default function LandingFooter() {
  return (
    <footer className="bg-muted py-12 border-t w-full">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center space-x-2 mb-4 relative"
            >
              <Image
                alt="Minds Over Market"
                src="./assets/logo-slogan.svg"
                width={280}
                height={112}
              />
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Plataforma integral de educación y herramientas para traders de
              todos los niveles. Cursos, alertas, clases en vivo y las últimas
              novedades del mercado.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Link href="#" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/courses"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  href="/alerts"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Alertas de Trading
                </Link>
              </li>
              <li>
                <Link
                  href="/live-classes"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clases en Vivo
                </Link>
              </li>
              <li>
                <Link
                  href="/novedades"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Novedades
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Instructores
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Testimonios
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Aviso de Riesgo
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Minds Over Market. Todos los
            derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            El trading implica riesgo. Puede perder el capital invertido.
          </p>
        </div>
      </div>
    </footer>
  );
}
