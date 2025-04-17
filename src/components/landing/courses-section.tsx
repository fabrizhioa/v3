import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatosCursosLandingProps } from "@/types/landing";
import { ArrowRight, Star } from "lucide-react";

import Link from "next/link";

export default function CoursesSection({
  cursos,
}: {
  cursos: DatosCursosLandingProps[];
}) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Cursos de Trading Especializados
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Aprende a tu ritmo con nuestros cursos estructurados, impartidos
              por traders profesionales con años de experiencia.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <Link href="/courses" className="flex items-center">
              Ver todos los cursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cursos.map((curso) => (
            <Card
              key={curso.id}
              className="overflow-hidden border hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{curso.dificultad}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {curso.estrellas}
                    </span>
                  </div>
                </div>
                <CardTitle className="mt-2">{curso.titulo}</CardTitle>
                <Link
                  href={`/auth/login?hr=${encodeURIComponent(
                    "/app/usuario/" + curso.instructor.usuario
                  )}`}
                  className="text-sm text-muted-foreground"
                >
                  Por {curso.instructor.nombre_completo}
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {curso.ventas} estudiantes inscritos
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">
                  {(() => {
                    const formatter = new Intl.NumberFormat(undefined, {
                      style: "currency",
                    });
                    return formatter.format(curso.precio);
                  })()}
                </span>
                <Button size="sm">Ver curso</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
