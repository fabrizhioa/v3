"use server";

import prisma from "@/lib/prisma";

export async function BuscarUsuario(texto: string, usuarioId: string) {
  const busqueda = await prisma.usuario
    .findMany({
      select: {
        usuario: true,
        nombre_completo: true,
        avatar: true,
        rol: true,

        seguidores: {
          select: {
            seguidor_id: true,
          },
        },
        seguidos: {
          where: {
            seguido_id: usuarioId,
          },
        },
      },
      where: {
        usuario: {
          contains: texto,
        },
      },
    })
    .then((resultado) =>
      resultado.map((usuario) => ({
        usuario: usuario.usuario,
        nombre_completo: usuario.nombre_completo,
        avatar: usuario.avatar,
        rol: usuario.rol,
        seguido: !usuario.seguidores.every((u) => u.seguidor_id !== usuarioId),
        seguidor: Boolean(usuario.seguidos.length),
        seguidores: usuario.seguidores.length,
      }))
    );
  return busqueda;
}
