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

interface NovedadFormProps {
  articulo?: Articulo;
  onSubmit: (articulo: Articulo, eliminados: string[]) => void;
  disabled?: boolean;
}

export default function ArticuloForm({
  articulo,
  onSubmit,
  disabled = false,
}: NovedadFormProps) {
  const [titulo, setTitulo] = useState(articulo?.titulo || "");
  const [fecha, setFecha] = useState(
    articulo?.fecha ? new Date(articulo.fecha) : new Date()
  );
  const [categoria, setCategoria] = useState(articulo?.categoria || "");
  const [mercado, setMercado] = useState(articulo?.mercado || "");
  const [tendencia, setTendencia] = useState(articulo?.tendencia || "neutral");
  const [contenido, setContenido] = useState<ContenidoElementoArticulo[]>(
    articulo?.contenido || []
  );
  const [currentElement, setCurrentElement] =
    useState<ContenidoElementoArticulo>({
      type: "paragraph",
      content: "",
    });

  const [elementType, setElementType] = useState<string>("paragraph");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [eliminados, setEliminados] = useState<string[]>([]);

  // Manejar el envío del formulario
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formatear la fecha como string YYYY-MM-DD

    // Crear el objeto de novedad completo
    const articuloCompleto: Articulo = {
      id: articulo?.id as string,
      titulo: titulo,
      fecha: fecha,
      categoria: categoria,
      mercado: mercado,
      tendencia: tendencia,
      estrellas: articulo?.estrellas || 0,
      contenido: contenido,
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

  // Actualizar el tipo de elemento actual
  const handleElementTypeChange = (type: string) => {
    setElementType(type);

    // Actualizar el elemento actual con el nuevo tipo
    setCurrentElement({
      ...currentElement,
      type: type as
        | "paragraph"
        | "image"
        | "video"
        | "quote"
        | "heading"
        | "list",
      // Resetear campos específicos según el tipo
      level: type === "heading" ? 2 : undefined,
      items: type === "list" ? [] : undefined,
    });
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
  const handleAdditionalFieldChange = (
    field: string,
    value: string | number
  ) => {
    setCurrentElement({
      ...currentElement,
      [field]: value,
    });
  };

  // Manejar cambios en los items de una lista
  const handleListItemsChange = (value: string) => {
    // Dividir el texto por líneas para crear los items
    const items = value.split("\n").filter((item) => item.trim() !== "");
    setCurrentElement({
      ...currentElement,
      items,
    });
  };

  // Renderizar campos adicionales según el tipo de elemento
  const renderAdditionalFields = () => {
    switch (elementType) {
      case "heading":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">Nivel de encabezado</label>
            <Select
              placeholder="Selecciona un nivel"
              value={currentElement.level?.toString() || "2"}
              onValueChange={(value: string) =>
                handleAdditionalFieldChange("level", Number.parseInt(value))
              }
              options={[
                {
                  valor: "1",
                  span: "H1 - Título principal",
                },
                {
                  valor: "2",
                  span: "H2 - Subtítulo",
                },
                {
                  valor: "3",
                  span: "H3 - Encabezado menor",
                },
              ]}
            />
          </div>
        );

      case "image":
      case "video":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                URL {elementType === "image" ? "de la imagen" : "del video"}
              </label>
              <Input
                placeholder={`Ingresa la URL ${
                  elementType === "image" ? "de la imagen" : "del video"
                }`}
                value={currentElement.src || ""}
                onChange={(e) =>
                  handleAdditionalFieldChange("src", e.target.value)
                }
              />
              <p className="text-sm text-muted-foreground">
                {elementType === "image"
                  ? "Para imágenes de prueba, puedes usar: /placeholder.svg?height=400&width=800"
                  : "URL del video (YouTube, Vimeo, etc.)"}
              </p>
            </div>
            {elementType === "image" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Texto alternativo</label>
                <Input
                  placeholder="Descripción de la imagen para accesibilidad"
                  value={currentElement.alt || ""}
                  onChange={(e) =>
                    handleAdditionalFieldChange("alt", e.target.value)
                  }
                />
              </div>
            )}
          </div>
        );

      case "list":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">Elementos de la lista</label>
            <Textarea
              placeholder="Ingresa cada elemento en una línea separada"
              className="min-h-[100px]"
              value={currentElement.items?.join("\n") || ""}
              onChange={(e) => handleListItemsChange(e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Renderizar un elemento de contenido para la previsualización
  const renderContentElement = (
    element: ContenidoElementoArticulo,
    index: number
  ) => {
    switch (element.type) {
      case "paragraph":
        return (
          <p key={index} className="text-sm mb-4">
            {element.content}
          </p>
        );

      case "heading":
        switch (element.level) {
          case 1:
            return (
              <h1 key={index} className="text-2xl font-bold mb-4">
                {element.content}
              </h1>
            );
          case 2:
            return (
              <h2 key={index} className="text-xl font-semibold mb-3">
                {element.content}
              </h2>
            );
          case 3:
            return (
              <h3 key={index} className="text-lg font-medium mb-2">
                {element.content}
              </h3>
            );
          default:
            return (
              <h2 key={index} className="text-xl font-semibold mb-3">
                {element.content}
              </h2>
            );
        }

      case "image":
        return (
          <figure key={index} className="mb-4">
            <img
              src={element.src || "/placeholder.svg?height=400&width=800"}
              alt={element.alt || ""}
              className="rounded-md w-full h-auto"
            />
            {element.content && (
              <figcaption className="text-xs text-muted-foreground mt-1 text-center">
                {element.content}
              </figcaption>
            )}
          </figure>
        );

      case "video":
        return (
          <div key={index} className="mb-4">
            <div className="bg-muted rounded-md w-full h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Vista previa de video: {element.src}
              </p>
            </div>
            {element.content && (
              <p className="text-xs text-muted-foreground mt-1">
                {element.content}
              </p>
            )}
          </div>
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-4 italic my-4"
          >
            <p className="text-sm">{element.content}</p>
          </blockquote>
        );

      case "list":
        return (
          <ul key={index} className="list-disc pl-5 mb-4 space-y-1">
            {element.items?.map((item: string, i: number) => (
              <li key={i} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        );

      default:
        return (
          <p key={index} className="text-sm mb-4">
            {element.content}
          </p>
        );
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-full">
            <label className="text-sm font-medium">Título</label>
            <Input
              placeholder="Título de la novedad"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha</label>
            <Popover>
              <PopoverTrigger
                className={`${buttonVariants({ variant: "outline" })} w-full`}
              >
                {fecha.toLocaleDateString()}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-background"
                align="start"
              >
                <Calendar
                  value={fecha}
                  onChange={(value) => setFecha(value as Date)}
                />
              </PopoverContent>
            </Popover>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Tendencia</label>
            <Select
              onValueChange={(value) =>
                setTendencia(value as "alcista" | "bajista" | "neutral")
              }
              defaultValue={tendencia}
              value={tendencia}
              placeholder="Selecciona la tendencia"
              options={[
                {
                  valor: "alcista",
                  span: "Alcista",
                },
                {
                  valor: "bajista",
                  span: "Bajista",
                },
                {
                  valor: "neutral",
                  span: "Neutral",
                },
              ]}
            />
          </div>
        </div>

        <div className="border rounded-md p-6">
          <h3 className="text-lg font-medium mb-4">Contenido del artículo</h3>

          <Tabs defaultValue="editor" className="w-full">
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
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/app/admin/articulos"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancelar
          </Link>

          <Button type="submit" disabled={disabled}>
            {articulo ? "Actualizar articulo" : "Crear articulo"}
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
