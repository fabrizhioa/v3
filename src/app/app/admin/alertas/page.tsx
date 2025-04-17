"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

// Datos iniciales (los mismos que usamos en el componente de visualización)
import { useToast } from "@/components/ui/toaster";
import { eliminarAlertas, obtenerAlertas } from "@/actions/admin/alertas";
import { ListaAlertasProps } from "@/types/admin/alertas";
import TablaAlertas from "@/components/app/admin/alertas/tabla";

export default function AdminAlertasPage() {
  const { addToast } = useToast();
  const [alertas, setAlertas] = useState<ListaAlertasProps[]>([]);

  useEffect(() => {
    (async () => {
      const resultado = await obtenerAlertas();
      setAlertas(resultado);
    })();
  }, []);

  async function ElimininarAlerta(id: string) {
    const resultado = await eliminarAlertas(id);

    if (resultado.error) {
      addToast({
        title: "Error al eliminar la alerta",
        description: resultado.error,
        type: "error",
      });
    } else {
      addToast({
        title: "Alerta eliminada",
        description: "La alerta ha sido eliminada exitosamente",
        type: "success",
      });
      setAlertas(alertas.filter((articulo) => articulo.id !== id));
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Alertas</h1>
        <div className="flex gap-4">
          <Button>
            <Link href={"alertas/nuevo"} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Nueva Alerta
            </Link>
          </Button>
        </div>
      </div>
      <TablaAlertas alertas={alertas} onDelete={ElimininarAlerta} />
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
