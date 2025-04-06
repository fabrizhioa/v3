"use server";

import prisma from "@/lib/prisma";

export async function getLandingData() {
  // Last three courses
  const cursos = await prisma.curso.findMany({
    take: 3,
    orderBy: {
      fecha_creacion: "desc",
    },
  });

  const articulos = await prisma.articulo.findMany({
    take: 3,
    orderBy: {
      fecha: "desc",
    },
    select: {
      autor: {
        select: {
          nombre_completo: true,
        },
      },
      titulo: true,
      fecha: true,
      categoria: true,
      estrellas: true,
      resumen: true,
      mercado: true,
      tendencia: true,
      id: true,
      autor_id: true,
    },
  });
  // const alerts = await prisma.

  // Last three alerts
  // const alerts = await prisma.ale
  // Last three LiveClasses
  // Last three news
  return {
    cursos: cursos ?? [],
    alertas: [],
    articulos: articulos ?? [],
    lives: [],
  };
}
