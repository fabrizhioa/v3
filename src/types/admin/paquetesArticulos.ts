import { Decimal } from "@prisma/client/runtime/client";

export interface PaquetesArticulosProps {
  id: string;
  titulo: string;
  estrellas: number;
  categoria: string;
  mercado: string;
  precio: Decimal;
  fecha_creacion: Date;
}
