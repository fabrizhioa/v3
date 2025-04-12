"use client";
import { actualizarDatosSeguridad } from "@/actions/app/perfil";
import FormSeguridadPerfilPage from "@/components/app/perfil/form-seguridad";
import { useAuth } from "@/components/contexts/auth/context";
import { useToast } from "@/components/ui/toaster";

export default function SeguridadPerfilPage() {
  const { auth } = useAuth();
  const { addToast } = useToast();

  async function onSubmitData(datos: {
    old_password: string;
    new_password: string;
  }) {
    const result = await actualizarDatosSeguridad(datos, auth?.id as string);

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
    }

    return result.success;
  }

  return (
    <>
      <div className="flex flex-col gap-4 min-h-full flex-1">
        <h2 className="text-2xl font-bold">Seguridad</h2>
        <FormSeguridadPerfilPage onSubmit={onSubmitData} />
      </div>
    </>
  );
}
