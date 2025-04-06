/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2Icon, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  // const [viewStat, setViewStat] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (viewStat < stats.length - 1) setViewStat(viewStat + 1);
  //     else setViewStat(0);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [viewStat]);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 pt-16 pb-20">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      </div>

      <div className="absolute right-0 top-20 -z-10 opacity-20 hidden lg:block">
        <svg width="400" height="400" viewBox="0 0 100 100">
          <path
            d="M0,50 L10,45 L20,55 L30,40 L40,60 L50,35 L60,50 L70,30 L80,45 L90,25 L100,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col space-y-8">
            <p className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
              <span className="flex h-2 w-2 aspect-square rounded-full bg-green-500 mr-2 bg-primary animate-pulse" />
              Invierte de la manera más sencilla y obten resultados
              extraordinarios
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl flex flex-wrap">
                Domina el mercado con{" "}
                <span className="text-primary">Minds Over Market</span>
              </h1>
              <p className="text-xl text-grey">
                Educación clara y precisa enfocada en trading.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register" className="flex items-center gap-2">
                <Button size="lg">
                  Comenzar ahora <ArrowRight className="rounded-lg h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="/auth/login?hr=catalogo"
                className="flex items-center gap-2"
              >
                <Button size="lg" variant="outline">
                  Explorar cursos
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">+20</span>
                <span className="text-muted-foreground">Cursos</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">+30</span>
                <span className="text-muted-foreground">Alertas</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">+50</span>
                <span className="text-muted-foreground">
                  Horas de trading en vivo
                </span>
              </div>
            </div>
          </div>
          <div className="relative lg:h-[600px] rounded-lg p-1 bg-gradient-to-br from-background to-muted">
            <div className="h-full w-full overflow-hidden rounded-lg bg-background p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BarChart2Icon className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Dashboard de trading</h3>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-medium">+12.4%</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="max-h-64 h-auto w-full rounded-md bg-muted/50 relative overflow-hidden">
                  <img
                    src="/assets/images/news_product.png"
                    alt="Products"
                    className="h-full mx-auto object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-md border p-4">
                    <div className="text-sm text-muted-foreground">
                      Alertas activas
                    </div>
                    <div className="mt-1 text-2xl font-bold">12</div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="text-sm text-muted-foreground">
                      Próxima clase
                    </div>
                    <div className="mt-1 text-2xl font-bold">2h 15m</div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="text-sm font-medium mb-2">
                    Últimas novedades
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Bitcoin rompe resistencia clave</span>
                      <span className="text-green-500">+5.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>La FED mantiene tasas sin cambios</span>
                      <span className="text-muted-foreground">Neutral</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
