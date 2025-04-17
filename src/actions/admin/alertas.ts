"use server";
import prisma from "@/lib/prisma";

export async function obtenerAlertas() {
  const alertas = await prisma.alerta.findMany({
    select: {
      id_creador: true,
      id: true,
      fecha_creacion: true,
      mercado: true,
      direccion: true,
      tipo: true,
      precio: true,
      creador: {
        select: {
          id: true,
          avatar: true,
          usuario: true,
        },
      },
    },
  });

  return alertas;
}

export async function eliminarAlertas(id: string) {
  const eliminacionAlerta = await prisma.alerta.delete({
    where: {
      id: id,
    },
  });
  if (!eliminacionAlerta)
    return { error: "Problema eliminando alerta", success: false };
  return { success: true, error: null };
}
