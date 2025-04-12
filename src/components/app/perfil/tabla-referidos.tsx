"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Referido } from "@/types/perfil/referidos";
import Link from "next/link";

export default function TablaReferidosPerfil({
  referidos,
}: {
  referidos: Referido[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {referidos.length > 0 ? (
          referidos.map((referido) => (
            <TableRow key={referido.id}>
              <TableCell>{referido.id}</TableCell>
              <TableCell>{referido.nombre_completo}</TableCell>
              <TableCell>
                <Link href={`/app/usuario/${referido.id}`}>
                  {referido.usuario}
                </Link>
              </TableCell>
              <TableCell>{referido.fecha_creacion.toLocaleString()}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4}>No hay referidos</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
