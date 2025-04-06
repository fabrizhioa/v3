"use server";

import prisma from "@/lib/prisma";

export async function obtenerArticulosByUser(userId: string) {
  const seguidos = await prisma.seguidores
    .findMany({
      select: {
        seguido_id: true,
      },
      where: {
        seguidor_id: userId,
      },
    })
    .then((seguidores) => seguidores.map((seguido) => seguido.seguido_id));

  const articulos = await prisma.articulo.findMany({
    where: {
      autor_id: {
        in: seguidos,
      },
    },
    select: {
      id: true,
      titulo: true,
      fecha: true,
      categoria: true,
      estrellas: true,
      mercado: true,
      resumen: true,
      tendencia: true,
      contenido: true,
      autor_id: true,
      autor: {
        select: {
          nombre_completo: true,
          id: true,
          usuario: true,
        },
      },
    },
    orderBy: {
      fecha: "desc",
    },
    take: 40,
  });

  return articulos;
}
