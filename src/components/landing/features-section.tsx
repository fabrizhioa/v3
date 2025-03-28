import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart2,
  Bell,
  BookOpen,
  LineChart,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Cursos Especializados",
      description:
        "Aprende estrategias de trading con cursos estructurados para todos los niveles.",
    },
    {
      icon: <Bell className="h-10 w-10 text-primary" />,
      title: "Alertas de Trading",
      description:
        "Recibe notificaciones en tiempo real sobre oportunidades de mercado y puntos de entrada.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Clases en Vivo",
      description:
        "Participa en sesiones interactivas con traders profesionales y resuelve tus dudas.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Análisis de Mercado",
      description:
        "Accede a análisis técnico y fundamental actualizado diariamente.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Seguimiento de Rendimiento",
      description:
        "Monitorea tu progreso y optimiza tus estrategias con herramientas avanzadas.",
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-primary" />,
      title: "Novedades del Mercado",
      description:
        "Mantente informado con las últimas noticias y eventos que impactan los mercados.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Todo lo que necesitas para tener éxito en los mercados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestra plataforma integral te ofrece todas las herramientas,
            conocimientos y recursos para convertirte en un trader exitoso.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border bg-background hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
