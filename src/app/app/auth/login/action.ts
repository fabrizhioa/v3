"use server";
import { obtenerToken } from "@/contexts/auth/actions";
import db from "@/libs/prisma";
import { decrypt } from "@/utils/token";

export async function LoginUser(usuario: string, clave: string) {
  if (!usuario || !usuario.trim() || !clave || !clave.trim()) {
    return {
      error: "El usuario y la contraseña son obligatorias",
    };
  }

  const query = await db.usuario.findFirst({
    select: {
      id: true,
      usuario: true,
      nombre_completo: true,
      correo: true,
      ruta_imagen: true,
      biografia: true,
      pais: true,
      fecha_nacimiento: true,
      ctrl: true,
      bloqueado: true,
      experencia_total: true,
      id_referente: true,
      fecha_creacion: true,
      clave: true,
      compras: {
        orderBy: {
          fecha_expiracion: "desc",
        },

        where: {
          tipo: "suscripcion",
        },
        take: 1,
      },
    },
    where: {
      OR: [{ usuario: usuario }, { correo: usuario }],
    },
  });

  console.log(query);

  if (!query) {
    return {
      error: "El usuario no existe",
    };
  }

  if (Boolean(query.bloqueado)) {
    return {
      error: "El usuario ha sido bloqueado",
    };
  }

  const decryptClave = await decrypt(query.clave);

  if (query.clave !== clave && decryptClave !== clave) {
    return {
      error: "La contraseña es incorrecta",
    };
  }

  const suscripcion_expirada =
    query.compras[0]?.fecha_expiracion !== null
      ? query.compras[0]?.fecha_expiracion < new Date()
      : query.ctrl < 32
      ? null
      : false;

  const expiracion =
    query.compras[0]?.fecha_expiracion !== null
      ? new Date(query.compras[0]?.fecha_expiracion).toLocaleDateString("es-VE")
      : null;

  const usuarioData = {
    id: query.id,
    usuario: query.usuario,
    nombre_completo: query.nombre_completo,
    correo: query.correo,
    ruta_imagen: query.ruta_imagen,
    biografia: query.biografia,
    pais: query.pais,
    fecha_nacimiento: query.fecha_nacimiento,
    ctrl: query.ctrl,
    bloqueado: query.bloqueado,
    experencia_total: query.experencia_total,
    id_referente: query.id_referente,
    fecha_creacion: query.fecha_creacion,
    suscripcion_expirada,
    expiracion,
  };

  const token = await obtenerToken(
    query.id,
    query.ctrl,

    query.compras[0]?.fecha_expiracion !== null
      ? query.compras[0]?.fecha_expiracion.getTime()
      : null
  );

  await db.conexiones_usuario.upsert({
    where: {
      id_usuario: query.id,
    },
    create: {
      id_usuario: query.id,
      token,
    },
    update: {
      token,
    },
  });

  return {
    token,
    usuario: usuarioData,
  };
}
