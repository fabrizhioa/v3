import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bell, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AlertsSection() {
  const alerts = [
    {
      id: 1,
      market: "EUR/USD",
      type: "Soporte",
      price: "1.0850",
      direction: "alcista",
      time: "Hace 35 min",
    },
    {
      id: 2,
      market: "Bitcoin",
      type: "Resistencia",
      price: "$75,200",
      direction: "bajista",
      time: "Hace 1h 20m",
    },
    {
      id: 3,
      market: "Tesla",
      type: "Ruptura",
      price: "$242.50",
      direction: "alcista",
      time: "Hace 2h 15m",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6">
              <Bell className="h-4 w-4 mr-2 text-primary" />
              Alertas en tiempo real
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Nunca pierdas una oportunidad de trading
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Recibe alertas personalizadas sobre puntos clave de entrada y
              salida, rupturas de niveles importantes y eventos de mercado
              relevantes.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Alertas Personalizadas</h3>
                  <p className="text-muted-foreground">
                    Configura alertas según tus criterios específicos y
                    estrategias de trading.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Notificaciones Instantáneas</h3>
                  <p className="text-muted-foreground">
                    Recibe notificaciones en tu dispositivo móvil o correo
                    electrónico en tiempo real.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Gestión de Riesgo</h3>
                  <p className="text-muted-foreground">
                    Alertas de stop loss y take profit para proteger tus
                    operaciones.
                  </p>
                </div>
              </div>
            </div>

            <Button className="mt-8">
              <Link href="/alerts" className="flex items-center">
                Configurar alertas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Últimas Alertas</h3>
              <Badge variant="outline" className="font-normal">
                En vivo
              </Badge>
            </div>

            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className="border hover:shadow-sm transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{alert.market}</span>
                        <Badge variant="outline">{alert.type}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {alert.time}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-medium">{alert.price}</span>
                      <div className="flex items-center">
                        {alert.direction === "alcista" ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span
                          className={
                            alert.direction === "alcista"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {alert.direction.charAt(0).toUpperCase() +
                            alert.direction.slice(1)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="w-full">
                <Link href="/alerts/history">Ver historial completo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
