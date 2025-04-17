"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
// Datos iniciales (los mismos que usamos en el componente de visualización)
import TablaArticulos from "@/components/app/admin/articulos/tabla";
import { eliminarArticulo, obtenerArticulos } from "@/actions/admin/articulos";
import { useToast } from "@/components/ui/toaster";
import { ListaArticulosProps } from "@/types/admin/articulos";

export default function AdminArticulosPage() {
  const { addToast } = useToast();
  const [articulos, setArticulos] = useState<ListaArticulosProps[]>([]);

  useEffect(() => {
    async function obtenerDatos() {
      const resultado = await obtenerArticulos();

      setArticulos(resultado);
    }
    obtenerDatos();
  }, []);

  async function ElimininarArticulo(id: string) {
    const resultado = await eliminarArticulo(id);

    if (resultado.error) {
      addToast({
        title: "Error al eliminar articulo",
        description: resultado.error,
        type: "error",
      });
    } else {
      addToast({
        title: "Articulo eliminado",
        description: "El articulo ha sido eliminado exitosamente",
        type: "success",
      });
      setArticulos(articulos.filter((articulo) => articulo.id !== id));
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Articulos</h1>
        <div className="flex gap-4">
          <Button>
            <Link href={"articulos/nuevo"} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Nuevo Articulo
            </Link>
          </Button>
        </div>
      </div>
      <TablaArticulos articulos={articulos} onDelete={ElimininarArticulo} />
    </div>
  );
}

{
  /* <TabsContent value="crear">
         <NovedadForm 
        onSubmit={handleCreateNovedad} 
      //       onCancel={() => setActiveTab("lista")}
      //     />
      //   </TabsContent>

      // {editingNovedad && (
      //       <NovedadForm
      //         novedad={editingNovedad}
      //         onSubmit={handleUpdateNovedad}
      //         onCancel={handleCancelEdit}
      //       />
      //     )}
      // </Tabs> */
}
