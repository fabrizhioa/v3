/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ObtenerVentas } from "@/actions/admin/ventas";
import TablaTodosVentas from "@/components/app/admin/ventas/tabla-todos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toaster";
import { ProductoVentasProps } from "@/types/admin/ventas";
import { useEffect, useState } from "react";

export default function VentasPage() {
  const [productos, setProductos] = useState<ProductoVentasProps[]>([]);
  const [webinarios, setWebinarios] = useState<ProductoVentasProps[]>([]);
  const [cursos, setCursos] = useState<ProductoVentasProps[]>([]);
  const [paquetes_alertas, setPaquetesAlertas] = useState<
    ProductoVentasProps[]
  >([]);
  const [paquetes_articulos, setPaquetesArticulos] = useState<
    ProductoVentasProps[]
  >([]);
  const [membresias, setMembresias] = useState<ProductoVentasProps[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    const response = async () => {
      const res = await ObtenerVentas();

      if (res.error) {
        addToast({
          title: "Error en sistema",
          description: res.error,
          type: "error",
        });
        return;
      }

      const all = [
        ...res.datos.cursos,
        ...res.datos.membresias,
        ...res.datos.paquetes_alertas,
        ...res.datos.paquetes_articulos,
        ...res.datos.webinarios,
      ].sort(
        (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      );
      setProductos(all);
      setWebinarios(res.datos.webinarios);
      setCursos(res.datos.cursos);
      setPaquetesAlertas(res.datos.paquetes_alertas);
      setPaquetesArticulos(res.datos.paquetes_articulos);
      setMembresias(res.datos.membresias);
    };
    response();
  }, []);
  return (
    <div className="flex flex-col h-full py-4 gap-4">
      <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
      <Tabs defaultValue="Todos">
        <TabsList>
          <TabsTrigger value="Todos">Todos</TabsTrigger>
          <TabsTrigger value="Cursos">Cursos</TabsTrigger>
          <TabsTrigger value="Alertas">Alertas</TabsTrigger>
          <TabsTrigger value="Directos">En vivos</TabsTrigger>
          <TabsTrigger value="Articulos">Articulos</TabsTrigger>
          <TabsTrigger value="Membresias">Membresias</TabsTrigger>
        </TabsList>
        <TabsContent value="Todos">
          <div className="border rounded-lg overflow-hidden">
            <TablaTodosVentas productos={productos} />
          </div>
        </TabsContent>
        <TabsContent value="Cursos">Hola</TabsContent>
        <TabsContent value="Alertas">Hola</TabsContent>
        <TabsContent value="Directos">Hola</TabsContent>
        <TabsContent value="Articulos">Hola</TabsContent>
        <TabsContent value="Membresias">Hola</TabsContent>
      </Tabs>
    </div>
  );
}
