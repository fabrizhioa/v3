import { $Enums } from "@prisma/client";

export interface DatosBusquedaUsuariosProps {
  usuario: string;
  nombre_completo: string;
  avatar: string;
  rol: $Enums.RolUsuario;
  seguido: boolean;
  seguidor: boolean;
  seguidores: number;
}
