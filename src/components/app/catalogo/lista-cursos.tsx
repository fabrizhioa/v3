"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CursoListaCatalogo } from "@/types/catalogo";
import { ArrowRightIcon, Star } from "lucide-react";
import Link from "next/link";

export default function ListaCursosCatalogoPreview({
  lista,
}: {
  lista: CursoListaCatalogo[];
}) {
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Cursos de Trading
          </h2>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          <Link href="/app/catalogo/cursos" className="flex items-center">
            Ver todos
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="flex overflow-auto w-full">
        {lista.length > 0 ? (
          lista.map((curso) => (
            <Card
              key={curso.id}
              className="overflow-hidden border hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{curso.dificultad}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-custom-yellow text-custom-yellow mr-1" />
                    <span className="text-sm font-medium">
                      {curso.estrellas}
                    </span>
                  </div>
                </div>
                <CardTitle className="mt-2">{curso.titulo}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Por {curso.creador.nombre_completo}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {curso.ventas} estudiantes inscritos
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">{curso.precio}</span>
                <Button size="sm">Ver curso</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-muted-foreground bg-muted p-2 rounded-lg">
            No hay elementos para mostrar
          </div>
        )}
      </div>
    </div>
  );
}
