"use client";
import { obtenerCatalogo } from "@/actions/app/catalogo";
import ListaAlertasCatalogoPreview from "@/components/app/catalogo/lista-alertas";
import ListaArticulosCatalogoPreview from "@/components/app/catalogo/lista-articulos";
import ListaCursosCatalogoPreview from "@/components/app/catalogo/lista-cursos";
import ListaEnvivosCatalogoPreview from "@/components/app/catalogo/lista-envivos";
import { CatalogoDataProps } from "@/types/catalogo";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CatalagoPage() {
  const [lista, setLista] = useState<CatalogoDataProps>({
    paquetes_alertas: [],
    cursos: [],
    envivos: [],
    paquetes_articulos: [],
  });

  useEffect(() => {
    (async () => {
      const catalogo = await obtenerCatalogo();
      setLista(catalogo);
    })();
  }, []);
  return (
    <div className="container py-8">
      {lista.paquetes_alertas.length === 0 &&
      lista.cursos.length === 0 &&
      lista.envivos.length === 0 &&
      lista.paquetes_articulos.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Image src={"/assets/Logo.svg"} alt="Logo" width={100} height={100} />
          <span className="text-muted-foreground">
            No hay elementos para mostrar
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <ListaArticulosCatalogoPreview lista={lista.paquetes_articulos} />
          <ListaAlertasCatalogoPreview lista={lista.paquetes_alertas} />
          <ListaCursosCatalogoPreview lista={lista.cursos} />
          <ListaEnvivosCatalogoPreview lista={lista.envivos} />
        </div>
      )}
    </div>
  );
}
