import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CoursesSection() {
  const courses = [
    {
      id: 1,
      title: "Fundamentos del Trading",
      level: "Principiante",
      rating: 4.8,
      students: 1245,
      price: "$99",
      image: "/placeholder.svg?height=400&width=600",
      instructor: "Carlos Martínez",
    },
    {
      id: 2,
      title: "Análisis Técnico Avanzado",
      level: "Intermedio",
      rating: 4.9,
      students: 876,
      price: "$149",
      image: "/placeholder.svg?height=400&width=600",
      instructor: "Ana Rodríguez",
    },
    {
      id: 3,
      title: "Trading de Criptomonedas",
      level: "Todos los niveles",
      rating: 4.7,
      students: 1532,
      price: "$129",
      image: "/placeholder.svg?height=400&width=600",
      instructor: "Miguel López",
    },
  ];

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
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden border hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{course.level}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="mt-2">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Por {course.instructor}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {course.students} estudiantes inscritos
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">{course.price}</span>
                <Button size="sm">Ver curso</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
