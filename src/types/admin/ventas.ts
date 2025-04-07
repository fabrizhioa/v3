import { $Enums } from "@prisma/client";

export type ProductosVentas = {
  id: string;
  nombre: string;
  comprador: {
    id: string;
    nombre_completo: string;
  };
  vendedor: {
    id: string;
    nombre_completo: string;
  };
  precio: number;
  fecha: Date;
  tipo: $Enums.tipoProducto;
};
