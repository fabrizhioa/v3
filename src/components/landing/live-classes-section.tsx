import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import { DatosEnvivosLandingProps } from "@/types/landing";

export default function LiveClassesSection({
  envivos,
}: {
  envivos: DatosEnvivosLandingProps[];
}) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Clases en Vivo con Traders Profesionales
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Participa en sesiones interactivas, aprende estrategias en tiempo
            real y resuelve tus dudas directamente con expertos del mercado.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {envivos.map((liveClass) => (
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <Link href="/live-classes" className="flex items-center">
              Ver calendario completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
