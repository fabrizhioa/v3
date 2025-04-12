/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  CalendarIcon,
  Plus,
  Trash2,
  Eye,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Articulo, ContenidoElementoArticulo } from "@/types/articulos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { PaquetesArticulosProps } from "@/types/admin/paquetesArticulos";
import { paquete_articulos } from "@prisma/client";

// Categorías disponibles
const categorias = [
  { valor: "Criptomonedas", span: "Criptomonedas" },
  { valor: "Forex", span: "Forex" },
  { valor: "Acciones", span: "Acciones" },
  { valor: "Commodities", span: "Commodities" },
  { valor: "Índices", span: "Índices" },
  { valor: "Macroeconomía", span: "Macroeconomía" },
  { valor: "Educación", span: "Educación" },
  { valor: "Análisis Técnico", span: "Análisis Técnico" },
];

interface PaqueteArticuloFormProps {
  paquete?: paquete_articulos;
  onSubmit: (articulo: Articulo, eliminados: string[]) => void;
  disabled?: boolean;
}

export default function PaqueteArticuloForm({
  paquete,
  onSubmit,
  disabled = false,
}: PaqueteArticuloFormProps) {
  const [titulo, setTitulo] = useState(paquete?.titulo || "");
  const [resumen, setResumen] = useState(paquete?.resumen || "");
  const [descripcion, setDescripcion] = useState(paquete?.descripcion || "");
  const [precio, setPrecio] = useState(paquete?.precio || 0);
  const [categoria, setCategoria] = useState(paquete?.categoria || "");
  const [mercado, setMercado] = useState(paquete?.mercado || "");

  const [eliminados, setEliminados] = useState<string[]>([]);

  // Manejar el envío del formulario
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formatear la fecha como string YYYY-MM-DD

    // Crear el objeto de novedad completo
    const articuloCompleto: Articulo = {
      id: paquete?.id as string,
      titulo: titulo,
      resumen: resumen,
      descripcion: descripcion,
      categoria: categoria,
      mercado: mercado,
      precio: precio,
      estrellas: paquete?.estrellas || 0,
    };

    onSubmit(articuloCompleto, eliminados);
  };

  // Agregar un elemento de contenido
  const addContentElement = () => {
    if (!currentElement.content.trim()) return;

    setContenido([...contenido, currentElement]);

    // Resetear el elemento actual
    setCurrentElement({
      type: elementType as
        | "paragraph"
        | "image"
        | "video"
        | "quote"
        | "heading"
        | "list",
      content: "",
    });
  };

  // Eliminar un elemento de contenido
  const removeContentElement = (index: number) => {
    const newContent = [...contenido];
    newContent.splice(index, 1);

    if (contenido[index].id) {
      setEliminados([...eliminados, contenido[index].id]);
    }
    setContenido(newContent);
  };

  // Manejar cambios en el contenido del elemento actual
  const handleContentChange = (value: string) => {
    setCurrentElement({
      ...currentElement,
      content: value,
    });
  };

  const changeElementPosition = (type: "up" | "down", index: number) => {
    if (type === "up" && index > 0) {
      const newPosition = index - 1;
      const contenidoOrdenado = [...contenido];
      contenidoOrdenado[newPosition] = contenido[index];
      contenidoOrdenado[index] = contenido[newPosition];
      setContenido(contenidoOrdenado);
    }

    if (type === "down" && index <= contenido.length - 1) {
      const newPosition = index + 1;
      const contenidoOrdenado = [...contenido];
      contenidoOrdenado[newPosition] = contenido[index];
      contenidoOrdenado[index] = contenido[newPosition];
      console.log("down", contenidoOrdenado);
      setContenido(contenidoOrdenado);
    }
  };

  // Manejar cambios en campos adicionales del elemento actual

  return (
    <div className="space-y-6">
      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-full">
            <label className="text-sm font-medium">Título</label>
            <Input
              placeholder="Título del paquete de articulos"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Categoría</label>
            <Select
              onValueChange={setCategoria}
              defaultValue={categoria}
              value={categoria}
              options={categorias}
              placeholder="Selecciona una opcion"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mercado</label>
            <Input
              placeholder="Ej: Bitcoin, Forex, NYSE, etc."
              value={mercado}
              onChange={(e) => setMercado(e.target.value)}
            />
          </div>
          <div className="space-y-2 col-span-full">
            <label className="text-sm font-medium">Precio</label>
            <Input
              placeholder="Precio en dolares"
              value={precio.toString()}
              onChange={(e) => setPrecio(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2 col-span-full">
            <label className="text-sm font-medium">Resumen</label>
            <Textarea
              placeholder="Resumen de 300 caracteres sobre el paquete"
              value={mercado}
              onChange={(e) => setMercado(e.target.value)}
            />
          </div>
          <div className="space-y-2 col-span-full">
            <label className="text-sm font-medium">Descripcion</label>
            <Textarea
              placeholder="Descripcion general del paquete"
              value={mercado}
              rows={5}
              onChange={(e) => setMercado(e.target.value)}
            />
          </div>
        </div>

        {/* <div className="border rounded-md p-6">
          <h3 className="text-lg font-medium mb-4">
            Lista de artículos asignados
          </h3>

          {/* <Tabs defaultValue="editor" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Vista previa</TabsTrigger>
            </TabsList>

            <TabsContent value="editor">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button
                    type="button"
                    variant={
                      elementType === "paragraph" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleElementTypeChange("paragraph")}
                  >
                    Párrafo
                  </Button>
                  <Button
                    type="button"
                    variant={elementType === "heading" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleElementTypeChange("heading")}
                  >
                    Encabezado
                  </Button>
                  <Button
                    type="button"
                    variant={elementType === "image" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleElementTypeChange("image")}
                  >
                    Imagen
                  </Button>
                  <Button
                    type="button"
                    variant={elementType === "video" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleElementTypeChange("video")}
                  >
                    Video
                  </Button>
                  <Button
                    type="button"
                    variant={elementType === "quote" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleElementTypeChange("quote")}
                  >
                    Cita
                  </Button>
                  <Button
                    type="button"
                    variant={elementType === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleElementTypeChange("list")}
                  >
                    Lista
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {elementType === "list"
                        ? "Descripción de la lista"
                        : elementType === "image"
                        ? "Pie de foto"
                        : elementType === "video"
                        ? "Descripción del video"
                        : "Contenido"}
                    </label>
                    <Textarea
                      placeholder={`Ingresa el contenido del ${elementType}`}
                      value={currentElement.content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  {renderAdditionalFields()}

                  <Button
                    type="button"
                    onClick={addContentElement}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar elemento
                  </Button>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">
                    Elementos agregados:
                  </h4>
                  {contenido.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No hay elementos agregados aún
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {contenido.map((element, index) => (
                        <Card key={index}>
                          <CardContent className="p-4 flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <div className="flex flex-col gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    changeElementPosition("up", index)
                                  }
                                  disabled={index === 0}
                                >
                                  <ArrowUp className="h-4 w-4 text-emerald" />
                                </Button>

                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    changeElementPosition("down", index)
                                  }
                                  disabled={index === contenido.length - 1}
                                >
                                  <ArrowDown className="h-4 w-4 text-emerald" />
                                </Button>
                              </div>
                              <div>
                                <p className="font-medium capitalize">
                                  {element.type}
                                </p>
                                <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                                  {element.content ||
                                    element.items?.join(", ") ||
                                    ""}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeContentElement(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview">
              <div className="border rounded-md p-4">
                {contenido.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Agrega elementos de contenido para ver la vista previa
                  </p>
                ) : (
                  <div className="article-content">
                    {contenido.map((element, index) =>
                      renderContentElement(element, index)
                    )}
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-4 flex items-center gap-2"
                onClick={() => setPreviewOpen(true)}
              >
                <Eye className="h-4 w-4" />
                Vista previa completa
              </Button>
            </TabsContent>
          </Tabs> 
        </div> */}

        <div className="flex justify-end gap-4">
          <Link
            href="/app/admin/articulos"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancelar
          </Link>

          <Button type="submit" disabled={disabled}>
            {paquete ? "Actualizar paquete" : "Crear paquete"}
          </Button>
        </div>
      </form>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {titulo || "Vista previa"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 article-content">
            {contenido.map((element, index) =>
              renderContentElement(element, index)
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
