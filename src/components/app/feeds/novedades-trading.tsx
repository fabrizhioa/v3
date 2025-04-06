"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatDateLong } from "@/utils/utils";
import {
  ArticuloConUsuario,
  ContenidoElementoArticulo,
} from "@/types/articulos";
import { obtenerArticulosByUser } from "@/actions/app/articulos";
import { useAuth } from "@/components/contexts/auth/context";
import { Loading } from "@/components/common/loadings";
import Link from "next/link";

export default function NovedadesTrading() {
  const { auth } = useAuth();
  const [selectedArticulo, setSelectedArticulo] =
    useState<ArticuloConUsuario | null>(null);
  const [open, setOpen] = useState(false);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [articulos, setArticulos] = useState<ArticuloConUsuario[] | null>(null);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter((itemId) => itemId !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  const openModal = (articulo: ArticuloConUsuario) => {
    setSelectedArticulo(articulo);
    setOpen(true);
  };

  const getTendenciaColor = (tendencia?: string) => {
    switch (tendencia) {
      case "alcista":
        return "text-green-500";
      case "bajista":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getTendenciaIcon = (tendencia?: string) => {
    switch (tendencia) {
      case "alcista":
        return <TrendingUp className="h-4 w-4" />;
      case "bajista":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  async function obtenerArticulos(id: string) {
    const response = await obtenerArticulosByUser(id);
    setArticulos(response ?? []);
  }

  useEffect(() => {
    if (auth?.id) obtenerArticulos(auth?.id);
  }, [auth]);
  console.log(articulos);
  // Renderiza un elemento de contenido basado en su tipo
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
            <Image
              src={element.src || "/placeholder.svg"}
              alt={element.alt || ""}
              width={800}
              height={400}
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
            <video
              src={element.src as string}
              controls
              className="w-full rounded-md"
              poster="/placeholder.svg?height=400&width=800"
            />
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
            {element.items?.map((item, i) => (
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
    <>
      <div className="flex flex-col space-y-4 w-full flex-1 h-full">
        {articulos === null ? (
          <Loading />
        ) : articulos?.length > 0 ? (
          articulos?.map((articulo) => (
            <Card
              key={articulo.id}
              className="cursor-pointer hover:shadow-md transition-shadow w-full "
              onClick={() => openModal(articulo)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{articulo.titulo}</CardTitle>
                  <Badge variant="outline">{articulo.categoria}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDateLong(articulo.fecha)}</span>
                  </div>
                  <div className="flex items-center">
                    <Link
                      className="flex items-center"
                      href={"/app/usuario/" + articulo.autor.id}
                    >
                      <User className="h-4 w-4 mr-1" />
                      <span>{articulo.autor.nombre_completo}</span>
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{articulo.mercado}</span>
                    {articulo.tendencia && (
                      <span
                        className={`ml-2 flex items-center ${getTendenciaColor(
                          articulo.tendencia
                        )}`}
                      >
                        {getTendenciaIcon(articulo.tendencia)}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto flex items-center gap-1 hover:bg-transparent group hover:text-white"
                    onClick={(e) => handleLike(articulo.id, e)}
                  >
                    <Star
                      className={`h-4 w-4  ${
                        likedItems.includes(articulo.id)
                          ? "fill-custom-yellow text-custom-yellow group-hover:fill-transparent"
                          : "group-hover:fill-custom-yellow text-custom-yellow"
                      }`}
                    />
                    <span>
                      {likedItems.includes(articulo.id)
                        ? articulo.estrellas + 1
                        : articulo.estrellas}
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="min-h-full flex items-center justify-center flex-col gap-6">
            <Image
              src="/assets/Logo.svg"
              width={128}
              height={128}
              alt="Loading..."
            />
            <p className="text-center text-gray-500 mt-4">
              No hay elementos para visualizar.
            </p>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {selectedArticulo && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedArticulo.titulo}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{selectedArticulo.categoria}</Badge>
                {selectedArticulo.tendencia && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1",
                      getTendenciaColor(selectedArticulo.tendencia)
                    )}
                  >
                    {getTendenciaIcon(selectedArticulo.tendencia)}
                    {selectedArticulo.tendencia.charAt(0).toUpperCase() +
                      selectedArticulo.tendencia.slice(1)}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDateLong(selectedArticulo.fecha)}</span>
                </div>
                <Link
                  href={"/app/usuario/" + selectedArticulo.autor.id}
                  className="flex items-center"
                >
                  <User className="h-4 w-4 mr-1" />
                  <span>{selectedArticulo.autor.nombre_completo}</span>
                </Link>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{selectedArticulo.mercado}</span>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-4 article-content">
              {selectedArticulo.contenido?.map((element, index) =>
                renderContentElement(element, index)
              )}
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="flex items-center text-muted-foreground">
                <Star
                  className={`h-4 w-4 mr-2 ${
                    likedItems.includes(selectedArticulo.id)
                      ? "fill-custom-yellow text-custom-yellow "
                      : ""
                  }`}
                />
                <span>
                  {likedItems.includes(selectedArticulo.id)
                    ? selectedArticulo.estrellas + 1
                    : selectedArticulo.estrellas}{" "}
                  estrellas
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(selectedArticulo.id, e as React.MouseEvent);
                }}
                className="flex items-center gap-2"
              >
                <Star
                  className={`h-4 w-4 ${
                    likedItems.includes(selectedArticulo.id)
                      ? "fill-custom-yellow text-custom-yellow hover:text-black"
                      : ""
                  }`}
                />
                {likedItems.includes(selectedArticulo.id)
                  ? "Quitar estrella"
                  : "Dar estrella"}
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
