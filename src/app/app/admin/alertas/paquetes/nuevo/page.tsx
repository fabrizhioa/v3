"use client";
import { useAuth } from "@/components/contexts/auth/context";
import { crearPaqueteArticulos } from "@/actions/admin/articulos";
import { useToast } from "@/components/ui/toaster";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PaqueteArticuloForm from "@/components/app/admin/articulos/paquetes/form";
import { DatosCreacionPaqueteArticulos } from "@/types/admin/paquetesArticulos";

export default function AdminPaqueteArticulosNuevoPage() {
  const { auth } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [sending, setSending] = useState(false);

  async function onSubmit(paquete: DatosCreacionPaqueteArticulos) {
    if (auth !== null) {
      setSending(true);
      const creacion = await crearPaqueteArticulos(paquete, auth.id);
      if (!creacion.error) {
        addToast({
          title: "Paquete creado",
          description: "El paquete de articuls ha sido creado exitosamente",
          type: "success",
        });
        router.push("/app/admin/articulos/paquetes");
      } else {
        addToast({
          title: "Error al crear articulo",
          description: creacion.error,
          type: "error",
        });
        setSending(false);
      }
    }
  }

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold">Crear Paquete de Articulos</h2>
      <PaqueteArticuloForm onCreate={onSubmit} disabled={sending} />
    </div>
  );
}
