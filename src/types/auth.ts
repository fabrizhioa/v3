import { usuario } from "@prisma/client";

export type UserData = Omit<usuario, "clave"> & {
  expiration?: null | string;
  suscription_expired?: boolean;
};

export type AuthAction =
  | { type: "login"; payload: UserData }
  | { type: "logout" }
  | { type: "modify"; payload: UserData };

export type AuthContextProps = {
  auth: UserData | null;
  isLogged: boolean | null;
  isSubscriptionExpired: () => boolean;
  authDispatch: React.Dispatch<AuthAction>;
  validarConexion: () => Promise<UserData | false>;
};
