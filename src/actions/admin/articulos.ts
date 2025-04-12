"use server";

import prisma from "@/lib/prisma";
import { Articulo } from "@/types/articulos";
import { Decimal } from "@prisma/client/runtime/client";

export async function obtenerArticulo(id: string) {
  const articulo = await prisma.articulo
    .findUnique({
      select: {
        autor_id: true,
        categoria: true,
        id: true,
        contenido: true,
        estrellas: true,
        fecha: true,
        mercado: true,
        resumen: true,
        tendencia: true,
        titulo: true,
      },
      where: {
        id: id,
      },
    })
    .catch(() => null);

  return articulo;
}

export async function obtenerArticulos() {
  const articulos = await prisma.articulo.findMany({
    select: {
      autor_id: true,
      categoria: true,
      id: true,
      estrellas: true,
      fecha: true,
      mercado: true,
      resumen: true,
      tendencia: true,
      titulo: true,
    },
  });

  return articulos;
}

export async function crearArticulo(
  articulo: Omit<Articulo, "id">,
  autor: string
) {
  const creacionArticulo = await prisma.articulo.create({
    data: {
      categoria: articulo.categoria,
      estrellas: articulo.estrellas,
      fecha: new Date(articulo.fecha).toISOString(),
      mercado: articulo.mercado,
      resumen: articulo.resumen,
      titulo: articulo.titulo,
      autor_id: autor,
      tendencia: articulo.tendencia ?? "neutral",
    },
  });

  if (!creacionArticulo) return { error: "Problema creando articulo" };

  console.log(articulo.contenido);
  if (articulo.contenido) {
    const adicionarElemento = await prisma.articulo_elemento.createMany({
      data: articulo.contenido?.map((elemento, index) => ({
        type: elemento.type,
        content: elemento.content,
        src: elemento.src,
        alt: elemento.alt,
        level: elemento.level,
        items: elemento.items,
        articulo_id: creacionArticulo.id,
        position: index + 1,
      })),
    });

    if (!adicionarElemento) return { error: "Problema creando articulo" };
  }

  return { success: true, error: null };
}

export async function eliminarArticulo(id: string) {
  await prisma.articulo_elemento.deleteMany({
    where: {
      articulo_id: id,
    },
  });
  const eliminacionArticulo = await prisma.articulo.delete({
    where: {
      id: id,
    },
  });
  if (!eliminacionArticulo) return { error: "Problema eliminando articulo" };
  return { success: true, error: null };
}

export async function actualizarArticulo(
  articulo: Articulo,
  contenidoEliminado: string[]
) {
  const actualizacionArticulo = await prisma.articulo.update({
    where: {
      id: articulo.id,
    },
    data: {
      categoria: articulo.categoria,
      estrellas: articulo.estrellas,
      fecha: new Date(articulo.fecha).toISOString(),
      mercado: articulo.mercado,
      resumen: articulo.resumen,
      titulo: articulo.titulo,
      tendencia: articulo.tendencia ?? "neutral",
    },
  });

  if (!actualizacionArticulo)
    return { error: "Problema actualizando articulo" };

  if (contenidoEliminado.length > 0) {
    const eliminarContenido = await prisma.articulo_elemento.deleteMany({
      where: {
        articulo_id: articulo.id,
        id: {
          in: contenidoEliminado,
        },
      },
    });

    if (!eliminarContenido) return { error: "Problema eliminando contenido" };
  }

  articulo.contenido?.map(async (elemento, index) => {
    if (elemento.id) {
      await prisma.articulo_elemento.update({
        where: {
          articulo_id: articulo.id,
          id: elemento.id,
        },
        data: {
          type: elemento.type,
          content: elemento.content,
          src: elemento.src,
          alt: elemento.alt,
          level: elemento.level,
          items: elemento.items,
          articulo_id: articulo.id,
          position: index + 1,
        },
      });
    } else {
      await prisma.articulo_elemento.create({
        data: {
          type: elemento.type,
          content: elemento.content,
          src: elemento.src,
          alt: elemento.alt,
          level: elemento.level,
          items: elemento.items,
          articulo_id: articulo.id,
          position: index + 1,
        },
      });
    }
  });

  return { success: true, error: null };
}

export async function obtenerPaquetesArticulos(): Promise<
  {
    id: string;
    titulo: string;
    estrellas: number;
    categoria: string;
    mercado: string;
    precio: Decimal;
    fecha_creacion: Date;
  }[]
> {
  const paquetes = await prisma.paquete_articulos.findMany({
    select: {
      categoria: true,
      id: true,
      estrellas: true,
      fecha_creacion: true,
      mercado: true,
      titulo: true,
      precio: true,
    },
  });

  return paquetes;
}
