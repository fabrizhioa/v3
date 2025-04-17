"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  Clock,
  DollarSign,
  TrendingDown,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Alert = {
  id: string;
  market: string;
  type: string;
  price: number;
  description: string;
  priority: "high" | "medium" | "low";
  direction: "bullish" | "bearish";
  timestamp: string;
  targets?: number[];
  stopLoss?: number;
  timeframe?: string;
};

export default function RecentAlerts() {
  // Mostrar solo las 5 alertas más recientes
  const recentAlerts: Alert[] = [];
  // .sort(
  //   (a, b) =>
  //     new Date(b.timestamp ).getTime() - new Date(a.timestamp).getTime()
  // )
  // .slice(0, 5);

  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `Hace ${diffMins} min`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Hace ${diffHours}h ${diffMins % 60}m`;

    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays} días`;
  };

  const toggleExpandAlert = (id: string) => {
    if (expandedAlertId === id) {
      setExpandedAlertId(null);
    } else {
      setExpandedAlertId(id);
    }
  };

  const getAlertTypeLabel = (type: string): string => {
    const typeLabels: Record<string, string> = {
      support: "Soporte",
      resistance: "Resistencia",
      breakout: "Ruptura",
      reversal: "Reversión",
      trend: "Tendencia",
      pattern: "Patrón",
      divergence: "Divergencia",
      fibonacci: "Fibonacci",
      pivot: "Pivote",
      volatility: "Volatilidad",
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="space-y-4">
      {recentAlerts.map((alert) => (
        <Card
          key={alert?.id as string}
          className={cn(
            "border hover:shadow-md transition-shadow overflow-hidden",
            expandedAlertId === alert.id ? "shadow-md" : ""
          )}
        >
          <CardContent className="p-0">
            <div
              className="p-4 cursor-pointer"
              onClick={() => toggleExpandAlert(alert.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 flex-wrap">
                  <Bell className="h-4 w-4 text-custom-green" />
                  <span className="font-bold">{alert.market}</span>
                  <Badge variant="outline">
                    {getAlertTypeLabel(alert.type)}
                  </Badge>
                  {alert.priority === "high" && (
                    <Badge variant="destructive" className="ml-2">
                      Prioritaria
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {getTimeSince(alert.timestamp)}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg font-medium">{alert.price}</span>
                </div>
                <div className="flex items-center">
                  {alert.direction === "bullish" ? (
                    <TrendingUp className="h-4 w-4 text-custom-green mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-custom-red mr-1" />
                  )}
                  <span
                    className={
                      alert.direction === "bullish"
                        ? "text-custom-green"
                        : "text-custom-red"
                    }
                  >
                    {alert.direction === "bullish" ? "Alcista" : "Bajista"}
                  </span>
                </div>
              </div>
            </div>

            {expandedAlertId === alert.id && (
              <div className="px-4 pb-4 pt-2 border-t mt-2">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatDate(alert.timestamp)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatTime(alert.timestamp)}</span>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                </div>

                {alert.targets && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Objetivos de precio:
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {alert.targets.map((target, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-muted-foreground">
                            TP{index + 1}:{" "}
                          </span>
                          <span className="font-medium">{target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {alert.stopLoss && (
                  <div className="mt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Stop Loss: </span>
                      <span className="font-medium">{alert.stopLoss}</span>
                    </div>
                  </div>
                )}

                {alert.timeframe && (
                  <div className="mt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Timeframe: </span>
                      <span className="font-medium">{alert.timeframe}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex mt-6">
        <Button
          variant="outline"
          className="hover:bg-custom-green/10 hover:text-custom-green"
        >
          <Link href="/app/alerts" className="flex items-center">
            Ver todas las alertas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
