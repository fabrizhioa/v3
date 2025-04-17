import { $Enums } from "@prisma/client";

export type UserData = {
  usuario: string;
  id: string;
  nombre_completo: string;
  avatar: string;
  rol: $Enums.RolUsuario;
  membresia: string | null;
  expiracion_membresia: Date | null;
  experiencia_total: number;
};

export type AuthAction =
  | { type: "login"; payload: UserData }
  | { type: "logout" }
  | { type: "modify"; payload: Partial<UserData> };

export type AuthContextProps = {
  auth: UserData | null;
  isLogged: boolean | null;
  isSubscriptionExpired: () => boolean;
  authDispatch: React.Dispatch<AuthAction>;
  validarConexion: () => Promise<UserData | false>;
  rol: $Enums.RolUsuario;
};
