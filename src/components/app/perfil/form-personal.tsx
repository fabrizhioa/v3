import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import paises from "@/consts/paises";
import { $Enums } from "@prisma/client";
import Image from "next/image";

import { useState } from "react";

export default function FormPersonalPerfil({
  usuario,
  onSubmit,
}: {
  onSubmit: (datos: {
    biografia: string;
    telefono: string;
    pais: string;
    fecha_nacimiento: Date;
    genero: $Enums.GeneroUsuario;
    imagen: File | undefined;
  }) => Promise<void>;
  usuario: {
    usuario: string;
    nombre_completo: string;
    pais: string;
    fecha_nacimiento: Date;
    telefono: string | null;
    genero: $Enums.GeneroUsuario;
    avatar: string;
    biografia: string | null;
  };
}) {
  const [nombreCompleto, setNombreCompleto] = useState<string>(
    usuario.nombre_completo ?? ""
  );
  const [pais, setPais] = useState<string>(usuario.pais ?? "");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>(
    usuario.fecha_nacimiento.toISOString().split("T")[0] ?? ""
  );
  const [biografia, setBiografia] = useState<string>(usuario.biografia ?? "");
  const [telefono, setTelefono] = useState<string>(usuario.telefono ?? "");
  const [genero, setGenero] = useState<$Enums.GeneroUsuario>(
    usuario.genero ?? ""
  );
  const [avatar] = useState<string>(usuario.avatar ?? "");
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-4 max-w-screen-md w-full"
        onSubmit={async (event) => {
          event.preventDefault();

          setIsLoading(true);

          const updateData = {
            biografia,
            telefono,
            pais,
            fecha_nacimiento: new Date(fechaNacimiento),
            genero,
            imagen: imageUpload ?? undefined,
          };

          await onSubmit(updateData);

          setIsLoading(false);
        }}
      >
        <div className="space-y-2 col-span-full w-max flex flex-col gap-2 items-center">
          <Image
            src={imageUpload ? URL.createObjectURL(imageUpload) : avatar}
            alt="Avatar"
            width={192}
            height={192}
            className="w-48 h-48 rounded-full object-center"
          />
          <input
            type="file"
            hidden
            accept="images"
            name="image"
            id="image"
            onChange={(e) =>
              e.target.files && setImageUpload(e.target?.files[0] as File)
            }
          />
          <label
            htmlFor="image"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Cambiar avatar
          </label>
        </div>
        <div className="space-y-2 col-span-full">
          <label className="text-sm font-medium">Nombre completo</label>
          <Input
            placeholder="Título del paquete de articulos"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            disabled
          />
        </div>
        <div className="space-y-2 ">
          <label className="text-sm font-medium">Genero</label>
          <Select
            id="genero"
            name="genero"
            value={genero}
            onValueChange={(event) =>
              setGenero(event.target.value as "masculino" | "femenino" | "otro")
            }
            label="Selecciona un genero"
            disabled={isLoading}
            options={[
              { valor: "masculino", span: "Masculino" },
              { valor: "femenino", span: "Femenino" },
              { valor: "otro", span: "Otro" },
            ]}
          />
        </div>
        <div className="space-y-2 ">
          <label className="text-sm font-medium">Pais</label>
          <Select
            id="pais"
            name="pais"
            value={pais}
            onValueChange={(event) => setPais(event.target.value)}
            disabled={isLoading}
            label="Selecciona un pais"
            options={paises}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Fecha Nacimiento</label>
          <Input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Telefono</label>
          <Input
            type="tel"
            value={telefono}
            placeholder="Numero telefono"
            required={false}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="space-y-2 col-span-full">
          <label className="text-sm font-medium">Biografia</label>
          <Textarea
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
          />
        </div>

        <div className="col-span-full space-y-2">
          <Button type="submit" className="mx-auto justify-end">
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
}
