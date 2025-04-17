import { $Enums } from "@prisma/client";

export interface ListaAlertasProps {
  id: string;
  id_creador: string;
  mercado: string;
  tipo: string;
  precio: string;
  direccion: $Enums.AlertDirection;
  fecha_creacion: Date;
  creador: {
    id: string;
    usuario: string;
    avatar: string;
  };
}
