"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnvivosListaCatalogo } from "@/types/catalogo";
import { ArrowRightIcon, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";

export default function ListaEnvivosCatalogoPreview({
  lista,
}: {
  lista: EnvivosListaCatalogo[];
}) {
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Envivos
          </h2>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          <Link href="/app/catalogo/envivos" className="flex items-center">
            Ver todos
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="flex overflow-auto w-full">
        {lista.length > 0 ? (
          lista.map((liveClass) => (
            <Card
              key={liveClass.id}
              className="overflow-hidden border hover:shadow-md transition-shadow"
            >
              <CardHeader>
                {/* <Badge className="w-max">{liveClass.status}</Badge> */}
                <CardTitle>{liveClass.titulo}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Por {liveClass.creador.nombre_completo}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{liveClass.fecha.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {`${liveClass.tiempo_inicial
                      .getTime()
                      .toLocaleString()} - ${liveClass.tiempo_final
                      .getTime()
                      .toLocaleString()}`}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{liveClass.ventas} asistentes registrados</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Reservar mi lugar</Button>
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
