import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductoVentasProps } from "@/types/admin/ventas";

import Link from "next/link";

export default function TablaTodosVentas({
  productos,
}: {
  productos: ProductoVentasProps[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Elemento</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Comprador</TableHead>
          <TableHead>Vendedor</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productos.map((producto) => (
          <TableRow key={producto.id}>
            <TableCell>{producto.id}</TableCell>
            <TableCell>{producto.producto.titulo}</TableCell>
            <TableCell>{producto.tipo}</TableCell>
            <TableCell>
              <Link href={`/usuario/${producto.comprador.id}`}>
                {producto.comprador.nombre_completo}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/usuario/${producto.vendedor.id}`}>
                {producto.vendedor.nombre_completo}
              </Link>
            </TableCell>
            <TableCell>{producto.precio}</TableCell>
            <TableCell>{producto.fecha.toLocaleString("es-MX")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
