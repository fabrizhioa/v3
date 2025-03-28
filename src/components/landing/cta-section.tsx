import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Comienza tu camino hacia el trading profesional hoy mismo
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Únete a miles de traders que ya están mejorando sus resultados con
            nuestra plataforma completa de educación y herramientas de trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link href="/register" className="flex items-center">
                Crear cuenta gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/pricing">Ver planes y precios</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
