"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaqueteAlertasListaCatalogo } from "@/types/catalogo";
import { ArrowRightIcon, Star } from "lucide-react";
import Link from "next/link";

export default function ListaAlertasCatalogoPreview({
  lista,
}: {
  lista: PaqueteAlertasListaCatalogo[];
}) {
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Paquetes de alertas
          </h2>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          <Link href="/app/catalogo/alertas" className="flex items-center">
            Ver todos
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="flex overflow-auto w-full">
        {lista.length > 0 ? (
          lista.map((paquete) => (
            <Card
              key={paquete.id}
              className="overflow-hidden border hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-custom-yellow text-custom-yellow mr-1" />
                    <span className="text-sm font-medium">
                      {paquete.estrellas}
                    </span>
                  </div>
                </div>
                <CardTitle className="mt-2">{paquete.titulo}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Por {paquete.creador.nombre_completo}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {paquete.ventas} seguidores
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">{paquete.precio}</span>
                <Button size="sm">Ver más</Button>
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
