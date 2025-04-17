"use client";
import ArticuloForm from "@/components/app/admin/articulos/form";
import { useAuth } from "@/components/contexts/auth/context";
import { Articulo } from "@/types/articulos";
import {
  crearArticulo,
  obtenerListaDePaquetes,
} from "@/actions/admin/articulos";
import { useToast } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminArticuloNuevoPage() {
  const { auth } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [paquetes, setPaquetes] = useState<{ valor: string; span: string }[]>(
    []
  );
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

  useEffect(() => {
    (async () => {
      await obtenerListaDePaquetes().then((resultado) => {
        const listaPaquetes = resultado.map((paquete) => ({
          valor: paquete.id,
          span: paquete.titulo,
        }));
        setPaquetes(listaPaquetes);
      });
    })();
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold">Crear Articulo</h2>
      <ArticuloForm
        onSubmit={onSubmit}
        paquetes={paquetes}
        disabled={sending}
      />
    </div>
  );
}
