"use server";

import prisma from "@/lib/prisma";
import {
  DatosActualizacionPaqueteArticulos,
  DatosCreacionPaqueteArticulos,
  ListaPaquetesArticulosProps,
} from "@/types/admin/paquetesArticulos";
import { Articulo } from "@/types/articulos";

export async function obtenerArticulo(id: string) {
  const articulo = await prisma.articulo
    .findUnique({
      select: {
        id_creador: true,
        categoria: true,
        id: true,
        contenido: true,
        estrellas: true,
        fecha: true,
        mercado: true,
        resumen: true,
        tendencia: true,
        titulo: true,
        id_paquete: true,
      },
      where: {
        id: id,
      },
    })
    .catch(() => null);

  return articulo;
}

export async function obtenerListaDePaquetes() {
  return await prisma.paquete_articulos.findMany({
    select: {
      id: true,
      titulo: true,
    },
  });
}

export async function obtenerArticulos() {
  const articulos = await prisma.articulo.findMany({
    select: {
      id_creador: true,
      categoria: true,
      id: true,
      estrellas: true,
      fecha: true,
      mercado: true,
      resumen: true,
      tendencia: true,
      titulo: true,
      creador: {
        select: {
          id: true,
          avatar: true,
          usuario: true,
        },
      },
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
      id_creador: autor,
      tendencia: articulo.tendencia ?? "neutral",
      id_paquete:
        articulo.id_paquete && articulo.id_paquete.trim().length > 0
          ? articulo.id_paquete
          : null,
    },
  });

  if (!creacionArticulo) return { error: "Problema creando articulo" };

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
      id_paquete:
        articulo.id_paquete && articulo.id_paquete?.trim().length > 0
          ? articulo.id_paquete
          : null,
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

// ===== PAQUETES DE ARTICULOS =====
// ===== OBTENER TODOS LOS PAQUETES DE ARTICULOS =====
export async function obtenerPaquetesArticulos(): Promise<
  ListaPaquetesArticulosProps[]
> {
  const paquetes = await prisma.paquete_articulos
    .findMany({
      select: {
        categoria: true,
        id: true,
        estrellas: true,
        fecha_creacion: true,
        mercado: true,
        titulo: true,
        precio: true,
        disponibilidad: true,
      },
    })
    .then((resultado) =>
      resultado.map((paquete) => ({
        id: paquete.id,
        categoria: paquete.categoria,
        estrellas: paquete.estrellas.length,
        fecha_creacion: paquete.fecha_creacion,
        mercado: paquete.mercado,
        titulo: paquete.titulo,
        precio: Number(paquete.precio),
        disponibilidad: paquete.disponibilidad,
      }))
    );

  return paquetes;
}

// ===== OBTENER CREAR UN PAQUETE DE ARTICULOS =====
export async function crearPaqueteArticulos(
  paquete: DatosCreacionPaqueteArticulos,
  creador: string
) {
  const creacion = await prisma.paquete_articulos.create({
    data: {
      ...paquete,
      id_creador: creador,
    },
  });

  if (!creacion) return { error: "Problema creando paquete", succes: false };
  return { success: true, error: null };
}

// ===== OBTENER UN PAQUETE DE ARTICULOS UNICO =====

export async function obtenerPaqueteArticulo(id: string) {
  const paquete = await prisma.paquete_articulos
    .findUnique({
      select: {
        categoria: true,
        id: true,
        fecha_creacion: true,
        mercado: true,
        titulo: true,
        precio: true,
        disponibilidad: true,
        descripcion: true,
        resumen: true,
      },
      where: {
        id: id,
      },
    })
    .then((paquete_resultado) =>
      paquete_resultado
        ? {
            ...paquete_resultado,
            resumen: paquete_resultado.resumen ?? "",
            precio: Number(paquete_resultado.precio),
          }
        : null
    )
    .catch(() => null);

  return paquete;
}

// ==== ACTUALIZAR DATOS DE UN PAQUETE DE ARTICULOS =====

export async function actualizarPaqueteArticulos(
  paquete: DatosActualizacionPaqueteArticulos
) {
  const actualizacionArticulo = await prisma.paquete_articulos.update({
    where: {
      id: paquete.id,
    },
    data: {
      categoria: paquete.categoria,
      mercado: paquete.mercado,
      resumen: paquete.resumen,
      titulo: paquete.titulo,
      descripcion: paquete.descripcion,
      precio: paquete.precio,
    },
  });

  if (!actualizacionArticulo)
    return { error: "Problema actualizando articulo", success: false };

  return { success: true, error: null };
}

// ==== ELIMINAR UN PAQUETE DE ARTICULOS =====
export async function eliminarPaqueteArticulo(id: string) {
  try {
    await prisma.articulo.updateMany({
      where: {
        id_paquete: id,
      },
      data: {
        id_paquete: null,
      },
    });

    await prisma.paquete_articulos.delete({
      where: {
        id: id,
      },
    });
    return { success: true, error: null };
  } catch (error) {
    console.log(error);
    return { error: "Problema eliminando paquete", success: false };
  }
}
