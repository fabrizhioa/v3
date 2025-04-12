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
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { paquete_articulos } from "@prisma/client";

interface NovedadesTableProps {
  paquetes: Partial<paquete_articulos>[];
  onDelete: (id: string) => void;
}

export default function TablaPaquetesArticulos({
  paquetes,
  onDelete,
}: NovedadesTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Mercado</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estrellas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paquetes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  No hay paquetes de articulos disponibles
                </TableCell>
              </TableRow>
            ) : (
              paquetes.map((paquete) => (
                <TableRow key={paquete.id}>
                  <TableCell className="font-medium">
                    {paquete.titulo}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">{paquete.categoria}</Badge>
                  </TableCell>
                  <TableCell>{paquete.mercado}</TableCell>
                  <TableCell>{paquete.precio?.toString()}</TableCell>
                  <TableCell>{paquete.estrellas}</TableCell>
                  <TableCell>
                    {paquete.disponibilidad ? "activo" : "inactivo"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link
                      href={"/app/admin/articulos/" + paquete.id}
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
                      onClick={() => handleDeleteClick(paquete.id as string)}
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
            ¿Estás seguro de que deseas eliminar este paquete de articulos? Esta
            acción no se puede deshacer.
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
