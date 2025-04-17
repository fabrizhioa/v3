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
import { ListaArticulosProps } from "@/types/admin/articulos";

interface NovedadesTableProps {
  articulos: ListaArticulosProps[];
  onDelete: (id: string) => void;
}

export default function TablaArticulos({
  articulos,
  onDelete,
}: NovedadesTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Ordenar novedades de la más reciente a la más antigua
  const sortedArticulos = [...articulos].sort((a, b) => {
    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-MX", options);
  };

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
              <TableHead>Título</TableHead>
              <TableHead>Creador</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Mercado</TableHead>
              <TableHead>Tendencia</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedArticulos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  No hay articulos disponibles
                </TableCell>
              </TableRow>
            ) : (
              sortedArticulos.map((novedad) => (
                <TableRow key={novedad.id}>
                  <TableCell className="font-medium">
                    {novedad.titulo}
                  </TableCell>
                  <TableCell className="font-medium text-primary">
                    {/* <figure className="size-8">
                      <img
                        src={novedad.creador.avatar}
                        alt={novedad.creador.usuario}
                        className="size-full object-cover rounded-full"
                      />
                    </figure> */}
                    <span>{novedad.creador.usuario}</span>
                  </TableCell>
                  <TableCell>
                    {formatDate(novedad.fecha.toISOString())}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{novedad.categoria}</Badge>
                  </TableCell>
                  <TableCell>{novedad.mercado}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getTendenciaIcon(novedad.tendencia)}
                      <span className="ml-1 capitalize">
                        {novedad.tendencia || "Neutral"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link
                      href={"/app/admin/articulos/" + novedad.id}
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
                      onClick={() => handleDeleteClick(novedad.id)}
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
            ¿Estás seguro de que deseas eliminar este articulo? Esta acción no
            se puede deshacer.
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
