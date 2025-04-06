import { $Enums } from "@prisma/client";

export interface ContenidoElementoArticulo {
  type: $Enums.tipo_elemento_articulo;
  content: string;
  src?: string | null;
  alt?: string | null;
  level?: number | null;
  items?: string[];
  position?: number | null;
  id?: string;
}

// Tipo para los datos de novedades de trading
export type Articulo = {
  id: string;
  titulo: string;
  fecha: Date;
  estrellas: number;
  contenido?: ContenidoElementoArticulo[];
  categoria: string;
  mercado: string;
  tendencia?: $Enums.TendenciaArticulo;
  resumen?: string | null;
};

export interface ArticuloConUsuario extends Articulo {
  autor: {
    id: string;
    nombre_completo: string;
    usuario: string;
  };
}
