import { $Enums } from "@prisma/client";

export interface ListaArticulosProps {
  id: string;
  id_creador: string;
  titulo: string;
  fecha: Date;
  estrellas: number;
  categoria: string;
  mercado: string;
  tendencia: $Enums.TendenciaArticulo;
  resumen: string | null;
  creador: {
    avatar: string;
    usuario: string;
    id: string;
  };
}
