import { $Enums } from "@prisma/client";

export type UserListDataProps = {
  id: string;
  rol: $Enums.RolUsuario;
  nombre_completo: string;
  bloqueado: boolean;
  fecha_creacion: Date | null;
};
