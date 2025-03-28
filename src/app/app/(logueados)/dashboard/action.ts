"use server";
import db from "@/libs/prisma";

export async function obtenerDatosDashboard(idUsuario: string) {
  const ctrlUsuario = await db.usuario.findFirst({
    select: {
      ctrl: true,
    },
    where: {
      id: idUsuario,
    },
  });

  if (ctrlUsuario?.ctrl === 64) {
    const cursos = await db.curso.findMany({
      select: {
        id: true,
        titulo: true,
        ruta_imagen: true,
        id_creador: true,
        creador: {
          select: {
            usuario: true,
            nombre_completo: true,
          },
        },
        curso_elementos: {
          select: {
            id: true,
            titulo: true,
          },
          where: {
            NOT: {
              progreso: {
                some: {
                  id_usuario: idUsuario,
                },
              },
            },
          },
        },
      },
    });

    console.log(cursos);
  }

  const ultimaSuscripcion = await db.ventas.findFirst({
    where: {
      id_comprador: idUsuario,
      tipo: "suscripcion",
      fecha_expiracion: {
        gte: new Date(),
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  if (!ultimaSuscripcion && ctrlUsuario?.ctrl === 64) {
    const cursos = await db.ventas.findMany({
      select: {
        curso: {
          select: {
            id: true,
            titulo: true,
            ruta_imagen: true,
            id_creador: true,
            creador: {
              select: {
                usuario: true,
                nombre_completo: true,
              },
            },
            curso_elementos: {
              select: {
                id: true,
                titulo: true,
              },
              where: {
                NOT: {
                  progreso: {
                    some: {
                      id_usuario: idUsuario,
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: {
        tipo: "curso",
        id_comprador: idUsuario,
      },
    });

    console.log(cursos);
  }
}
