"use client";
import { AuthAction, AuthContextProps, UserData } from "@/types/auth";
import { createContext, useContext, useEffect, useReducer } from "react";
import { validarConexionUsuario } from "@/actions/auth";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthReducer = (state: UserData | null, action: AuthAction) => {
  switch (action.type) {
    case "login":
      return action.payload;

    case "logout":
      return {} as UserData;

    case "modify":
      return {
        ...state,
        ...action.payload,
      } as UserData;
    default:
      return state;
  }
};

const validarConexion = async () => {
  let result: Omit<UserData, "password"> | false = false;
  const token = localStorage.getItem("token");

  if (token) {
    const conexion = await validarConexionUsuario(token);
    if (conexion) {
      result = conexion;
    } else {
      localStorage.removeItem("token");
    }
  } else {
    localStorage.removeItem("token");
  }

  return result;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, dispatch] = useReducer(AuthReducer, null);

  useEffect(() => {
    validarConexion().then((res) => {
      console.log(res);
      if (!res) {
        dispatch({
          type: "login",
          payload: {} as UserData,
        });
        return;
      }
      dispatch({
        type: "login",
        payload: res,
      });
    });
  }, []);

  function membresiaExpirada() {
    return Boolean(auth?.expiracion_membresia);
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        rol: auth?.rol ?? "usuario",
        authDispatch: dispatch,
        validarConexion,
        isLogged: auth === null ? null : Boolean(auth.id),
        isSubscriptionExpired: membresiaExpirada,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
