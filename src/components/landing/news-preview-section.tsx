"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  Star,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { Articulo } from "@/types/articulos";

interface NewsProps extends Articulo {
  autor: {
    nombre_completo: string;
  };
}

export default function NewsPreviewSection({
  articulos,
}: {
  articulos: NewsProps[];
}) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const getTendenciaIcon = (tendencia?: string) => {
    switch (tendencia) {
      case "alcista":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "bajista":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Últimas Novedades del Mercado
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Mantente informado con análisis, noticias y eventos que impactan
              los mercados financieros.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <Link href="/novedades" className="flex items-center">
              Ver todas las novedades
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articulos.map((novedad) => (
            <Card
              key={novedad.id}
              className="border hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{novedad.titulo}</CardTitle>
                  <Badge variant="outline">{novedad.categoria}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(novedad.fecha.toISOString())}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  <span>{novedad.autor.nombre_completo}</span>
                </div>
                {novedad.tendencia && (
                  <div className="flex items-center text-sm">
                    {getTendenciaIcon(novedad.tendencia)}
                    <span
                      className={`ml-1 ${
                        novedad.tendencia === "alcista"
                          ? "text-green-500"
                          : novedad.tendencia === "bajista"
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {novedad.tendencia.charAt(0).toUpperCase() +
                        novedad.tendencia.slice(1)}
                    </span>
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {novedad.resumen ?? ""}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-4 w-4 mr-1" />
                  <span>{novedad.estrellas} estrellas</span>
                </div>
                <Button size="sm">
                  <Link href={`/auth/login`}>Leer más</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
