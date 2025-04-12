"use client";
import {
  actualizarDatosPersonales,
  obtenerPersonalDataPerfil,
} from "@/actions/app/perfil";
import FormPersonalPerfil from "@/components/app/perfil/form-personal";
import { Loading } from "@/components/common/loadings";
import { useAuth } from "@/components/contexts/auth/context";
import { useToast } from "@/components/ui/toaster";
import { $Enums } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Page() {
  const { auth, authDispatch } = useAuth();
  const { addToast } = useToast();

  const [data, setData] = useState<
    | {
        usuario: string;
        nombre_completo: string;
        pais: string;
        fecha_nacimiento: Date;
        telefono: string | null;
        genero: $Enums.GeneroUsuario;
        avatar: string;
        biografia: string | null;
      }
    | null
    | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      if (auth?.id)
        await obtenerPersonalDataPerfil(auth?.id).then((data) => setData(data));
    })();
  }, [auth?.id]);

  async function onSubmitData(datos: {
    biografia: string;
    telefono: string;
    pais: string;
    fecha_nacimiento: Date;
    genero: $Enums.GeneroUsuario;
    imagen: File | undefined;
  }) {
    const result = await actualizarDatosPersonales(datos, auth?.id as string);

    if (result.error) {
      addToast({
        title: "Error al actualizar datos",
        description: result.error,
        type: "error",
      });
    } else {
      addToast({
        title: "Datos actualizados correctamente",
        description: "Los datos han sido actualizados exitosamente",
        type: "success",
      });
      if (result.data) {
        setData(result.data);
        authDispatch({
          type: "modify",
          payload: {
            avatar: result.data.avatar,
          },
        });
      }
    }
  }

  return data === undefined ? (
    <div className="flex flex-col items-center justify-center">
      <Loading />
    </div>
  ) : data === null ? (
    <div className="flex flex-col items-center justify-center">
      <p className="text-muted-foreground">No hay datos disponibles</p>
    </div>
  ) : (
    <div className="flex flex-col gap-4 min-h-full flex-1">
      <h1 className="text-2xl font-bold">Datos personales</h1>
      <FormPersonalPerfil usuario={data} onSubmit={onSubmitData} />
    </div>
  );
}
