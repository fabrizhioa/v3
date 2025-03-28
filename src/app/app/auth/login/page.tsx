"use client";

import Logo from "@/assets/LogoIcon";
import { Input, Submit } from "@/components/app/forms/Inputs";
import { Loading } from "@/components/common/Loadings";
import { useAlertModal } from "@/contexts/alert/context";
import { useAuth } from "@/contexts/auth/context";
import { LockIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { LoginUser } from "./action";

function validateForm(user: string, password: string): boolean {
  if (user.length < 4 || user.length > 40) {
    alert("El nombre completo debe tener minimo 6 letras y maximo 40 letras");
    return false;
  } else if (password.length < 6 && password.length > 10) {
    alert("La clave debe tener minimo 6 letras y maximo 10 letras");
    return false;
  }

  return true;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authDispatch, isLogged } = useAuth();
  const { createAlert } = useAlertModal();

  if (isLogged === null) return <Loading />;

  if (isLogged) {
    return redirect("/app");
  }

  return (
    <div className=" rounded-lg gap-3 container m-auto items-center justify-center overflow-auto p-6">
      <div className="flex flex-col justify-between h-full w-full max-w-screen-sm mx-auto bg-darkslate p-4 rounded-lg">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const validate = validateForm(username, password);

            if (validate) {
              const login = await LoginUser(username, password);

              if (login.error) {
                createAlert("error", login.error);
                return;
              }

              if (!login.usuario)
                createAlert("error", "Credenciales incorrectas");
              else {
                authDispatch({
                  type: "login",
                  payload: login.usuario,
                });
                localStorage.setItem("token", login.token);
              }
            }
          }}
          id="loginForm"
          className="flex flex-col justify-center gap-4 items-center p-2  rounded text-white  mx-auto w-full h-full max-w-screen-md"
        >
          <header className="flex gap-4 justify-between w-full">
            <h2 className="font-bold text-2xl  text-primaryColor">
              <span className="text-base text-white">
                {" "}
                Bienvenido de nuevo!
              </span>
              <br />
              Minds Over Market
            </h2>{" "}
          </header>

          <section className="w-full flex flex-col gap-4">
            <div className="flex gap-2 rounded w-full items-center justify-center group">
              <UserIcon className="size-9 text-primary" strokeWidth={1.5} />
              <Input
                title="Correo o Usuario"
                type="text"
                name="user"
                placeholder="john@doe.com o john21"
                onChange={(value: string) => setUsername(value)}
              />
            </div>
            <div className="flex gap-2  rounded w-full items-center  justify-center ">
              <LockIcon className="size-9 text-primary" strokeWidth={1.5} />
              <Input
                title="Clave"
                type="password"
                name="password"
                placeholder="******"
                onChange={(value: string) => setPassword(value)}
              />
            </div>
          </section>

          <footer className="w-full flex gap-2 justify-between items-center">
            <div className="w-full flex flex-col gap-1">
              <Link href="/app/lostpass" className="text-xs pointer block">
                {" "}
                <p className="w-auto inline-block hover:text-secondary">
                  ¿Olvidaste tu contraseña?
                </p>
              </Link>
              <Link
                href="/app/register"
                className="text-xs transition-all pointer block "
              >
                <p className="w-auto inline-block text-primary hover:text-secondary">
                  No tienes cuenta, Creala ahora
                </p>
              </Link>
            </div>
            <Submit value="ingresar" />
          </footer>
        </form>
        <div className="text-white flex gap-1 items-center justify-center text-sm leading-none ">
          <Logo className="size-8" />
        </div>
      </div>
    </div>
  );
}
