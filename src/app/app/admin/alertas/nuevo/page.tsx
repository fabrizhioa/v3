"use client";
import { useAuth } from "@/components/contexts/auth/context";
import { Articulo } from "@/types/articulos";
import { crearArticulo } from "@/actions/admin/articulos";
import { useToast } from "@/components/ui/toaster";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertasForm from "@/components/app/admin/alertas/form";

export default function AdminArticuloNuevoPage() {
  const { auth } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [sending, setSending] = useState(false);

  async function onSubmit(articulo: Omit<Articulo, "id">) {
    if (auth !== null) {
      setSending(true);
      const creacion = await crearArticulo(articulo, auth.id);
      if (!creacion.error) {
        addToast({
          title: "Articulo creado",
          description: "El articulo ha sido creado exitosamente",
          type: "success",
        });
        router.push("/app/admin/articulos");
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
      <h2 className="text-3xl font-bold">Crear Alertas</h2>
      <AlertasForm onSubmit={onSubmit} disabled={sending} />
    </div>
  );
}
