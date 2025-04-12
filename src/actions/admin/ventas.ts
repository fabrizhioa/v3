"use server";
import prisma from "@/lib/prisma";
import { ObtenerVentasProps } from "@/types/admin/ventas";

export async function ObtenerVentas(): Promise<ObtenerVentasProps> {
  const result: ObtenerVentasProps = {
    datos: {
      cursos: [],
      paquetes_alertas: [],
      paquetes_articulos: [],
      membresias: [],
      webinarios: [],
    },
    error: false,
  };
  await prisma.ventas
    .findMany({
      select: {
        id: true,
        id_alertas: true,
        id_curso: true,
        id_membresia: true,
        id_webinar: true,
        id_articulos: true,

        paquete_articulos: {
          select: {
            id: true,
            titulo: true,
          },
        },

        paquete_alertas: {
          select: {
            id: true,
            titulo: true,
          },
        },

        membresias: {
          select: {
            id: true,
            titulo: true,
          },
        },

        curso: {
          select: {
            id: true,
            titulo: true,
          },
        },

        webinar: {
          select: {
            id: true,
            titulo: true,
          },
        },

        comprador: {
          select: {
            id: true,
            nombre_completo: true,
          },
        },
        vendedor: {
          select: {
            id: true,
            nombre_completo: true,
          },
        },
        precio: true,
        fecha: true,
        tipo: true,
      },
    })
    .then((data) => {
      data.map((producto) => {
        switch (producto.tipo) {
          case "cursos":
            result.datos.cursos.push({
              id: producto.id,
              producto: producto.curso as { id: string; titulo: string },
              precio: Number(producto.precio),
              fecha: producto.fecha,
              tipo: producto.tipo,
              comprador: producto.comprador,
              vendedor: producto.vendedor,
            });
            break;
          case "alertas":
            result.datos.paquetes_alertas.push({
              id: producto.id,
              producto: producto.paquete_alertas as {
                id: string;
                titulo: string;
              },
              precio: Number(producto.precio),
              fecha: producto.fecha,
              tipo: producto.tipo,
              comprador: producto.comprador,
              vendedor: producto.vendedor,
            });
            break;
          case "articulo":
            result.datos.paquetes_articulos.push({
              id: producto.id,
              producto: producto.paquete_articulos as {
                id: string;
                titulo: string;
              },
              precio: Number(producto.precio),
              fecha: producto.fecha,
              tipo: producto.tipo,
              comprador: producto.comprador,
              vendedor: producto.vendedor,
            });
            break;
          case "membresia":
            result.datos.membresias.push({
              id: producto.id,
              producto: producto.membresias as { id: string; titulo: string },
              precio: Number(producto.precio),
              fecha: producto.fecha,
              tipo: producto.tipo,
              comprador: producto.comprador,
              vendedor: producto.vendedor,
            });
            break;
          case "webinar":
            result.datos.webinarios.push({
              id: producto.id,
              producto: producto.webinar as { id: string; titulo: string },
              precio: Number(producto.precio),
              fecha: producto.fecha,
              tipo: producto.tipo,
              comprador: producto.comprador,
              vendedor: producto.vendedor,
            });
            break;
        }
      });
    })
    .catch(() => {
      result.datos.cursos = [];
      result.datos.paquetes_alertas = [];
      result.datos.paquetes_articulos = [];
      result.datos.membresias = [];
      result.datos.webinarios = [];
      result.error = "error al solicitar los datos";
    });

  return result;
}
