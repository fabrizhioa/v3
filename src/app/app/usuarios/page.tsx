"use client";
import { BuscarUsuario } from "@/actions/app/usuarios";
import { useAuth } from "@/components/contexts/auth/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatosBusquedaUsuariosProps } from "@/types/usuarios";
import { SearchXIcon, UserSearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<null | DatosBusquedaUsuariosProps[]>(
    null
  );
  const [loading, setIsLoading] = useState<boolean>(false);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {})();
  }, [auth?.id]);

  async function handleClickSearch(e: FormEvent<HTMLFormElement>) {
    // Implement search logic here
    e.preventDefault();

    const { search } = e.currentTarget;

    setIsLoading(true);

    if (search.value.trim().length === 0) {
      setIsLoading(false);
      return;
    }

    const busqueda = await BuscarUsuario(search.value, auth?.id as string);
    if (busqueda) {
      setUsuarios(busqueda);
    } else {
      setUsuarios([]);
    }
    setIsLoading(false);
  }

  return (
    <div className="container py-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
        Usuarios
      </h1>

      <form
        className="flex gap-2 bg-card text-card-foreground pt-2 rounded"
        onSubmit={handleClickSearch}
      >
        <Input
          name="search"
          id="search"
          type="search"
          placeholder="Nombre del usuario o instructor"
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          Buscar
        </Button>
      </form>
      {usuarios !== null ? (
        usuarios.length > 0 ? (
          <div>
            {usuarios.map((usuario) => (
              <Link
                key={usuario.usuario}
                href={`/app/usuarios/${usuario.usuario}`}
                className="border p-2 flex rounded-lg"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    alt={usuario.usuario}
                    src={usuario.avatar}
                    width={40}
                    height={40}
                    className="object-cover rounded-full aspect-square object-center h-max w-max"
                  />
                  <div className="flex flex-col">
                    <p className="capitalize font-semibold">
                      {usuario.nombre_completo}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      {usuario.usuario} ({usuario.rol})
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">
                      Seguidores: {usuario.seguidores ?? 0}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Te sigue: {usuario.seguidor ? "Si" : "No"}
                    </span>
                  </div>
                </div>
                <div>
                  {["administrdor", "desarrollador", "instructor"].includes(
                    usuario.rol
                  ) &&
                    usuario.usuario !== auth?.usuario && (
                      <Button
                        variant={usuario.seguido ? "destructive" : "default"}
                      >
                        {usuario.seguido ? "Dejar de seguir" : "Seguir"}
                      </Button>
                    )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <SearchXIcon className="size-32 text-destructive" />
            <span className="text-muted-foreground">
              No se encontraron usuarios
            </span>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          {/* <Image src={"/assets/Logo.svg"} alt="Logo" width={100} height={100} /> */}
          <UserSearchIcon className="size-32" />
          <span className="text-muted-foreground">
            Debes buscar un usuario primero
          </span>
        </div>
      )}
    </div>
  );
}
