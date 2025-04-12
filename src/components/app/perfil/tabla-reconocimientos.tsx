import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reconocimiento } from "@/types/perfil/reconocimientos";
import Link from "next/link";

export default function TablaReconocimientosPerfil({
  reconocimientos,
}: {
  reconocimientos: Reconocimiento[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Titulo</TableHead>
          <TableHead>Creador</TableHead>
          <TableHead>Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reconocimientos.length > 0 ? (
          reconocimientos.map((reconocimiento) => (
            <TableRow key={reconocimiento.id}>
              <TableCell>{reconocimiento.id}</TableCell>
              <TableCell>
                <Link href={`/app/curso/${reconocimiento.curso.id}`}>
                  {reconocimiento.curso.titulo}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/app/usuario/${reconocimiento.curso.creador}`}
                  className="flex flex-col gap-1"
                >
                  <span className="font-semibold">
                    {reconocimiento.curso.creador.nombre_completo}
                  </span>
                  <span>{reconocimiento.curso.creador.usuario}</span>
                </Link>
              </TableCell>
              <TableCell>{reconocimiento.fecha.toLocaleString()}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4}>No hay reconocimientos</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
