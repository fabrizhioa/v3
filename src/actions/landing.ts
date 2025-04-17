"use server";

import prisma from "@/lib/prisma";

export async function getLandingData() {
  // Last three courses
  const cursos = await prisma.curso
    .findMany({
      take: 3,
      orderBy: {
        fecha_creacion: "desc",
      },
      select: {
        id: true,
        titulo: true,
        id_creador: true,
        creador: {
          select: {
            nombre_completo: true,
            avatar: true,
            usuario: true,
          },
        },
        precio: true,
        dificultad: true,
        estrellas: {
          select: {
            id: true,
          },
        },
        ventas: {
          select: {
            id: true,
          },
        },
      },
    })
    .then((resultado) =>
      resultado.map((curso) => ({
        id: curso.id,
        titulo: curso.titulo,
        instructor: curso.creador,
        estrellas: curso.estrellas.length,
        ventas: curso.ventas.length,
        dificultad: curso.dificultad,
        precio: Number(curso.precio),
      }))
    );

  const articulos = await prisma.articulo
    .findMany({
      take: 3,
      where: {
        id_paquete: null,
      },
      orderBy: {
        fecha: "desc",
      },
      select: {
        creador: {
          select: {
            nombre_completo: true,
            avatar: true,
            usuario: true,
          },
        },

        titulo: true,
        fecha: true,
        categoria: true,
        articulo_estrellas: true,
        resumen: true,
        mercado: true,
        tendencia: true,
        id: true,
        id_creador: true,
      },
    })
    .then((resultado) =>
      resultado.map((articulo) => ({
        id: articulo.id,
        titulo: articulo.titulo,
        creador: articulo.creador,
        estrellas: articulo.articulo_estrellas.length,
        tendencia: articulo.tendencia,
        fecha: articulo.fecha,
        mercado: articulo.mercado,
        resumen: articulo.resumen ?? "",
        categoria: articulo.categoria,
      }))
    );

  const alertas = await prisma.alerta
    .findMany({
      where: {
        id_paquete: null,
      },
      orderBy: {
        id: "desc",
      },
      take: 3,
      select: {
        id: true,
        mercado: true,
        tipo: true,
        precio: true,
        direccion: true,
        fecha_publicacion: true,
        id_creador: true,
        creador: {
          select: {
            avatar: true,
            id: true,
            nombre_completo: true,
            usuario: true,
          },
        },
      },
    })
    .then((resultado) =>
      resultado.map((alerta) => ({
        id: alerta.id,
        mercado: alerta.mercado,
        tipo: alerta.tipo,
        precio: Number(alerta.precio),
        direccion: alerta.direccion,
        fecha_publicacion: alerta.fecha_publicacion,
        creador: alerta.creador,
      }))
    );

  const envivos = await prisma.envivo
    .findMany({
      select: {
        id: true,
        id_creador: true,
        titulo: true,
        fecha: true,
        tiempo_inicial: true,
        tiempo_final: true,
        ventas: {
          select: {
            id: true,
          },
        },
        creador: {
          select: {
            id: true,
            nombre_completo: true,
            avatar: true,
            usuario: true,
          },
        },
      },
      take: 3,
      orderBy: {
        fecha: "desc",
      },
    })
    .then((resultado) =>
      resultado.map((envivo) => ({
        id: envivo.id,
        titulo: envivo.titulo,
        fecha: envivo.fecha,
        tiempo_inicial: envivo.tiempo_inicial,
        tiempo_final: envivo.tiempo_final,
        ventas: envivo.ventas.length,
        creador: envivo.creador,
      }))
    );

  return {
    cursos: cursos ?? [],
    alertas: alertas ?? [],
    articulos: articulos ?? [],
    lives: envivos ?? [],
  };
}
