import { $Enums } from "@prisma/client";

export type ProductoVentasProps = {
  id: string;
  comprador: {
    id: string;
    nombre_completo: string;
  };
  vendedor: {
    id: string;
    nombre_completo: string;
  };
  producto: {
    id: string;
    titulo: string;
  };
  precio: number;
  fecha: Date;
  tipo: $Enums.tipoProducto;
};

export interface ObtenerVentasProps {
  datos: {
    cursos: ProductoVentasProps[];
    paquetes_alertas: ProductoVentasProps[];
    paquetes_articulos: ProductoVentasProps[];
    membresias: ProductoVentasProps[];
    webinarios: ProductoVentasProps[];
  };
  error: string | false;
}
