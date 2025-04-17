/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  actualizarArticulo,
  obtenerArticulo,
  obtenerListaDePaquetes,
} from "@/actions/admin/articulos";
import ArticuloForm from "@/components/app/admin/articulos/form";
import { Loading } from "@/components/common/loadings";
import { useAuth } from "@/components/contexts/auth/context";
import { useToast } from "@/components/ui/toaster";
import { Articulo } from "@/types/articulos";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type articuloProps = null | false | Articulo;

export default function AdminArticuloNuevoPage() {
  const { id } = useParams();
  const [articulo, setArticulo] = useState<articuloProps>(null);
  const [paquetes, setPaquetes] = useState<{ valor: string; span: string }[]>(
    []
  );
  const [sending, setSending] = useState(false);
  const { auth } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  async function obtenerDatos() {
    const resultado = await obtenerArticulo(id as string);
    const paquetes = await obtenerListaDePaquetes();
    if (resultado === null) {
      addToast({
        title: "Error al obtener articulo",
        description: "El artículo no existe",
        type: "error",
      });
      router.push("/app/admin/articulos");
    }
    setArticulo(resultado);
    setPaquetes(
      paquetes.map((paquete) => ({ valor: paquete.id, span: paquete.titulo }))
    );
  }
  useEffect(() => {
    if (id) {
      obtenerDatos();
    }
  }, [id]);

  async function onSubmit(articulo: Articulo, eliminados: string[]) {
    if (
      auth !== null &&
      (auth.rol === "administrador" || auth.rol === "desarrollador")
    ) {
      setSending(true);
      const creacion = await actualizarArticulo(articulo, eliminados);
      if (!creacion.error) {
        addToast({
          title: "Articulo editado",
          description: "El articulo ha sido editado exitosamente",
          type: "success",
        });
        router.push("/app/admin/articulos");
      } else {
        addToast({
          title: "Error al editar articulo",
          description: creacion.error,
          type: "error",
        });
        setSending(false);
      }
    }
  }

  return (
    <div className="py-10">
      {articulo === null ? (
        <Loading />
      ) : articulo !== false && articulo !== null ? (
        <ArticuloForm
          paquetes={paquetes}
          articulo={articulo}
          onSubmit={onSubmit}
          disabled={sending}
        />
      ) : (
        <div className="text-center">
          <p>No se encontró el artículo</p>
        </div>
      )}
    </div>
  );
}
