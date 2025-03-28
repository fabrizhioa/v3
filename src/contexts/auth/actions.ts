"use server";
import db from "@/libs/prisma";
import hash from "@/utils/hash";
import { decrypt, encrypt } from "@/utils/token";

export async function obtenerToken(
  uid: string,
  ucc: number,
  uet: number | null = null
): Promise<string> {
  let key = "";
  let data = "";

  if (ucc === 64) {
    key = await hash("admin");
    data = await encrypt(`${uid}_${ucc}`);
  } else if (ucc >= 32) {
    key = await hash("expert");
    data = await encrypt(`${uid}_${ucc}`);
  } else {
    key = await hash("public");
    data = await encrypt(`${uid}_${ucc}_${uet}`);
  }
  return `${key}&${data}`;
}

export async function verificarToken(token: string): Promise<boolean> {
  const adminToken = await hash("admin");
  const expertToken = await hash("expert");
  const publicToken = await hash("public");

  if (token === "") return false;

  const [key, tokenEncrypted] = token.split("&");

  const tokenDecrypted = await decrypt(tokenEncrypted);
  const ucc = tokenDecrypted.split("_")[1];

  if (ucc === "64") return key.includes(adminToken);
  if (ucc === "32") return key.includes(expertToken);
  if (Number(ucc) < 32) return key.includes(publicToken);

  return false;
}

export async function validarConexionUsuario(token: string) {
  const query = await db.conexiones_usuario.findFirst({
    select: {
      usuario: {
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
      },
    },

    where: {
      token: token,
    },
  });

  if (!query) return false;

  const suscripcion_expirada =
    query.usuario.compras[0]?.fecha_expiracion !== null
      ? query.usuario.compras[0]?.fecha_expiracion < new Date()
      : query.usuario.ctrl < 32
      ? null
      : false;

  const expiracion =
    query.usuario.compras[0]?.fecha_expiracion !== null
      ? new Date(query.usuario.compras[0]?.fecha_expiracion).toLocaleDateString(
          "es-VE"
        )
      : null;

  const data = {
    id: query.usuario.id,
    usuario: query.usuario.usuario,
    nombre_completo: query.usuario.nombre_completo,
    correo: query.usuario.correo,
    ruta_imagen: query.usuario.ruta_imagen,
    biografia: query.usuario.biografia,
    pais: query.usuario.pais,
    fecha_nacimiento: query.usuario.fecha_nacimiento,
    ctrl: query.usuario.ctrl,
    bloqueado: query.usuario.bloqueado,
    experencia_total: query.usuario.experencia_total,
    id_referente: query.usuario.id_referente,
    fecha_creacion: query.usuario.fecha_creacion,
    suscripcion_expirada,
    expiracion,
  };

  return data;
}
