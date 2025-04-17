"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { ListaAlertasProps } from "@/types/admin/alertas";

interface TablaAlertasProps {
  alertas: ListaAlertasProps[];
  onDelete: (id: string) => void;
}

export default function TablaAlertas({ alertas, onDelete }: TablaAlertasProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Ordenar novedades de la más reciente a la más antigua
  const alertasOrdenadas = [...alertas].sort((a, b) => {
    return (
      new Date(b.fecha_creacion).getTime() -
      new Date(a.fecha_creacion).getTime()
    );
  });

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      onDelete(selectedId);
      setDeleteDialogOpen(false);
      setSelectedId(null);
    }
  };

  const getTendenciaIcon = (tendencia?: string) => {
    switch (tendencia) {
      case "alcista":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "bajista":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowRight className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Mercado</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Direccion</TableHead>
              <TableHead>Creador</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alertasOrdenadas.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  No hay alertas disponibles
                </TableCell>
              </TableRow>
            ) : (
              alertasOrdenadas.map((alerta) => (
                <TableRow key={alerta.id}>
                  <TableCell className="font-medium">
                    {alerta.fecha_creacion.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{alerta.mercado}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{alerta.tipo}</Badge>
                  </TableCell>
                  <TableCell>{alerta.precio}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getTendenciaIcon(alerta.direccion)}
                      <span className="ml-1 capitalize">
                        {alerta.direccion || "Neutral"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-primary">
                      {alerta.creador.usuario}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link
                      href={"/app/admin/articulos/" + alerta.id}
                      className={buttonVariants({
                        variant: "outline",
                        size: "icon",
                      })}
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteClick(alerta.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        className="max-w-lg"
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>

        <DialogContent>
          <div className="flex flex-col gap-2">
            ¿Estás seguro de que deseas eliminar esta alerta? Esta acción no se
            puede deshacer.
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Eliminar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
