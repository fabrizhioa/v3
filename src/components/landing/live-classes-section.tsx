import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LiveClassesSection() {
  const upcomingClasses = [
    {
      id: 1,
      title: "Análisis de Mercado Semanal",
      instructor: "Carlos Martínez",
      date: "Lunes, 18 de Marzo",
      time: "19:00 - 20:30",
      attendees: 156,
      image: "/placeholder.svg?height=400&width=600",
      status: "Próximamente",
    },
    {
      id: 2,
      title: "Estrategias de Scalping en Forex",
      instructor: "Ana Rodríguez",
      date: "Miércoles, 20 de Marzo",
      time: "18:00 - 19:30",
      attendees: 98,
      image: "/placeholder.svg?height=400&width=600",
      status: "Próximamente",
    },
    {
      id: 3,
      title: "Psicología del Trading",
      instructor: "Miguel López",
      date: "Viernes, 22 de Marzo",
      time: "17:00 - 18:30",
      attendees: 124,
      image: "/placeholder.svg?height=400&width=600",
      status: "Próximamente",
    },
  ];

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
          {upcomingClasses.map((liveClass) => (
            <Card
              key={liveClass.id}
              className="overflow-hidden border hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative">
                <Badge className="absolute top-3 right-3 z-10">
                  {liveClass.status}
                </Badge>
                <Image
                  src={liveClass.image || "/placeholder.svg"}
                  alt={liveClass.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{liveClass.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Por {liveClass.instructor}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{liveClass.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{liveClass.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{liveClass.attendees} asistentes registrados</span>
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
