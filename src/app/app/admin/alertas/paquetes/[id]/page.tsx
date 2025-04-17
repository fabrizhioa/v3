/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  actualizarPaqueteArticulos,
  obtenerPaqueteArticulo,
} from "@/actions/admin/articulos";
import PaqueteArticuloForm from "@/components/app/admin/articulos/paquetes/form";
import { Loading } from "@/components/common/loadings";
import { useAuth } from "@/components/contexts/auth/context";
import { useToast } from "@/components/ui/toaster";
import {
  DatosActualizacionPaqueteArticulos,
  DatosPaqueteArticulosProps,
} from "@/types/admin/paquetesArticulos";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PaqueteProps = null | false | DatosPaqueteArticulosProps;

export default function AdminArticuloNuevoPage() {
  const { id } = useParams();
  const [articulo, setArticulo] = useState<PaqueteProps>(null);
  const [sending, setSending] = useState(false);
  const { auth } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  async function obtenerDatos() {
    const resultado = await obtenerPaqueteArticulo(id as string);
    if (resultado === null) {
      addToast({
        title: "Error al obtener articulo",
        description: "El artículo no existe",
        type: "error",
      });
      router.push("/app/admin/articulos/paquetes");
    }
    setArticulo(resultado);
  }
  useEffect(() => {
    if (id) {
      obtenerDatos();
    }
  }, [id]);

  async function onSubmit(paquete: DatosActualizacionPaqueteArticulos) {
    if (
      auth !== null &&
      (auth.rol === "ADMIN" || auth.rol === "DESARROLLADOR")
    ) {
      setSending(true);
      const actualizacion = await actualizarPaqueteArticulos(paquete);
      if (!actualizacion.error) {
        addToast({
          title: "Articulo editado",
          description: "El articulo ha sido editado exitosamente",
          type: "success",
        });
        router.push("/app/admin/articulos/paquetes");
      } else {
        addToast({
          title: "Error al editar articulo",
          description: actualizacion.error,
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
        <PaqueteArticuloForm
          paquete={articulo}
          onUpdate={onSubmit}
          disabled={sending}
        />
      ) : (
        <div className="text-center">
          <p>No se encontró el paquete artículos</p>
        </div>
      )}
    </div>
  );
}
