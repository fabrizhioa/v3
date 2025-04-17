"use server";

import prisma from "@/lib/prisma";
import {
  CursoListaCatalogo,
  EnvivosListaCatalogo,
  PaqueteAlertasListaCatalogo,
  PaqueteArticulosListaCatalogo,
} from "@/types/catalogo";

export const obtenerCatalogo = async () => {
  const catalogo: {
    cursos: CursoListaCatalogo[];
    paquetes_articulos: PaqueteArticulosListaCatalogo[];
    paquetes_alertas: PaqueteAlertasListaCatalogo[];
    envivos: EnvivosListaCatalogo[];
  } = {
    cursos: [],
    paquetes_articulos: [],
    paquetes_alertas: [],
    envivos: [],
  };
  const cursos = await prisma.curso
    .findMany({
      select: {
        id: true,
        titulo: true,
        id_creador: true,
        creador: {
          select: {
            id: true,
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
      where: {
        disponibilidad: true,
      },
    })
    .then((result) =>
      result.map((curso) => ({
        id: curso.id,
        titulo: curso.titulo,
        creador: curso.creador,
        estrellas: curso.estrellas.length,
        ventas: curso.ventas.length,
        dificultad: curso.dificultad,
        precio: Number(curso.precio),
      }))
    );
  const paquete_articulos = await prisma.paquete_articulos
    .findMany({
      select: {
        id: true,
        titulo: true,
        precio: true,
        categoria: true,
        mercado: true,
        id_creador: true,
        creador: {
          select: {
            id: true,
            nombre_completo: true,
            avatar: true,
            usuario: true,
          },
        },
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
      where: {
        disponibilidad: true,
      },
    })
    .then((result) =>
      result.map((paquete) => {
        return {
          id: paquete.id,
          titulo: paquete.titulo,
          precio: Number(paquete.precio),
          categoria: paquete.categoria,
          mercado: paquete.mercado,
          id_creador: paquete.id_creador,
          creador: paquete.creador,
          estrellas: paquete.estrellas.length,
          ventas: paquete.ventas.length,
        };
      })
    );
  const paquete_alertas = await prisma.paquete_alertas
    .findMany({
      select: {
        id: true,
        titulo: true,
        precio: true,
        mercado: true,
        id_creador: true,
        creador: {
          select: {
            id: true,
            nombre_completo: true,
            avatar: true,
            usuario: true,
          },
        },
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
      where: {
        disponibilidad: true,
      },
    })
    .then((result) =>
      result.map((paquete) => ({
        id: paquete.id,
        titulo: paquete.titulo,
        precio: Number(paquete.precio),
        mercado: paquete.mercado,
        id_creador: paquete.id_creador,
        creador: paquete.creador,
        estrellas: paquete.estrellas.length,
        ventas: paquete.ventas.length,
      }))
    );
  const envivos = await prisma.envivo
    .findMany({
      select: {
        id: true,
        titulo: true,
        precio: true,
        fecha: true,
        tiempo_inicial: true,
        tiempo_final: true,
        id_creador: true,
        creador: {
          select: {
            id: true,
            nombre_completo: true,
            avatar: true,
            usuario: true,
          },
        },
        ventas: {
          select: {
            id: true,
          },
        },
      },
      where: {
        disponibilidad: true,
      },
    })
    .then((result) =>
      result.map((envivo) => ({
        id: envivo.id,
        titulo: envivo.titulo,
        precio: Number(envivo.precio),
        fecha: envivo.fecha,
        id_creador: envivo.id_creador,
        creador: envivo.creador,
        ventas: envivo.ventas.length,
        tiempo_final: envivo.tiempo_final,
        tiempo_inicial: envivo.tiempo_inicial,
      }))
    );
  catalogo.cursos = cursos ?? [];
  catalogo.paquetes_articulos = paquete_articulos ?? [];
  catalogo.paquetes_alertas = paquete_alertas ?? [];
  catalogo.envivos = envivos ?? [];

  return catalogo;
};
