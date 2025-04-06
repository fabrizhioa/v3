"use server";

import prisma from "@/lib/prisma";
import { UserListDataProps } from "@/types/admin/usuarios";
import { $Enums } from "@prisma/client";

export async function obtenerUsuarios(): Promise<UserListDataProps[]> {
  const resultado = await prisma.usuario.findMany({
    select: {
      id: true,
      rol: true,
      bloqueado: true,
      nombre_completo: true,
      fecha_creacion: true,
    },
  });

  return resultado;
}

export async function cambiarRol(id: string, rol: $Enums.RolUsuario) {
  const resultado = await prisma.usuario.update({
    where: {
      id: id,
    },
    data: {
      rol: rol === "INSTRUCTOR" ? "USUARIO" : "INSTRUCTOR",
    },
  });

  console.log(resultado);
}

export async function bloquearUsuario(id: string, bloqueado: boolean) {
  const resultado = await prisma.usuario.update({
    where: {
      id: id,
    },
    data: {
      bloqueado: bloqueado ? false : true,
    },
  });

  console.log(resultado);
}
