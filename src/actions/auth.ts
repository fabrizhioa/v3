"use server";
import prisma from "@/lib/prisma";
import hash from "@/utils/hash";
import { usuario } from "@prisma/client";
import { decrypt, encrypt } from "@/utils/token";
import { UserData } from "@/types/auth";

export async function registro(
  datosFormulario: Omit<
    usuario,
    | "telefono"
    | "biografia"
    | "avatar"
    | "facebook_url"
    | "instagram_url"
    | "twitter_url"
    | "bloqueado"
    | "membresia"
    | "expiracion_membresia"
    | "rol"
    | "id"
    | "experiencia_total"
    | "fecha_creacion"
  >
) {
  const {
    usuario,
    correo,
    clave,
    nombre_completo,
    pais,
    fecha_nacimiento,
    genero,
  } = datosFormulario;

  const usuario_registrado = await prisma.usuario.count({ where: {
    usuario: usuario
  }})

  if(usuario_registrado > 0) return { error: "El usuario ingresado ya se encuentra registrado"};

  const correo_registrado = await prisma.usuario.count({ where: {
    correo: correo
  }})

  if(correo_registrado > 0) return { error: "El correo electrónico ingresado ya se encuentra registrado"};

  const clave_hash = await hash(clave);
  const registro_usuario = await prisma.usuario.create({
    data: {
      usuario,
      correo,
      clave: clave_hash,
      nombre_completo,
      pais,
      fecha_nacimiento,
      genero,
    },
  });

  if(registro_usuario !== null) {
    return {
      success: "Registro exitoso"
    }
  }else{
    return { error: "Error al registrar al usuario"}
  }
  
}

export async function ingreso({
  usuario,
  clave,
}: {
  usuario: string;
  clave: string;
}): Promise<{
  error?: string;
  datos?: UserData;
  token?: string;
}> {
  const consulta = await prisma.usuario.findFirst({
    where: {
      usuario: usuario,
    },
    select: {
      id: true,
      usuario: true,
      nombre_completo: true,
      avatar: true,
      rol: true,
      bloqueado: true,
      experiencia_total: true,
      membresia: true,
      expiracion_membresia: true,
      clave: true,
    }
  });

  if (!consulta) return { error: "El usuario no existe" };

  const clave_hash = await hash(clave);

  const { clave: clave_original, bloqueado, ...datos } = consulta;

  if (bloqueado) return { error: "El usuario se encuentra bloqueado, contacta con soporte"}

  if (clave_original !== clave_hash)
    return { error: "La clave ingresada es incorrecta" };

  const token = await obtenerToken(
    datos.id,
    datos.rol,
    datos.membresia,
    datos.expiracion_membresia?.toLocaleDateString("es-MX")
  );

  await prisma.conexiones_usuario.upsert({
    where: {
      id_usuario: datos.id,
    },
    create: {
      id_usuario: datos.id,
      token,
    },
    update: {
      token,
    },
  });

  return {
    token,
    datos,
  };
}

export async function obtenerToken(
  id: string,
  rol: string,
  membresia: string | null = null,
  expiracion_membresia: string | null = null
): Promise<string> {
  const key = await hash(rol);
  let data = "";

  if (rol === "ADMIN" || "DESARROLLADOR" || "INSTRUCTOR") {
    data = await encrypt(`${id}_${key}`);
  } else {
    data = await encrypt(`${id}_${key}_${membresia}_${expiracion_membresia}`);
  }
  return data;
}

export async function verificarToken(token: string): Promise<boolean> {
  const adminKey = await hash("ADMIN");
  const instructorKey = await hash("INSTRUCTOR");
  const devKey = await hash("DESARROLLADOR");
  const usuarioKey = await hash("USUARIO");

  if (token === "") return false;

  const tokenDecrypted = await decrypt(token);

  const key = tokenDecrypted.split("_")[1];

  if (key === adminKey) {
    return true;
  } else if (key === instructorKey) {
    return true;
  } else if (key === devKey) {
    return true;
  } else if (key === usuarioKey) {
    return true;
  }

  return false;
}

export async function validarConexionUsuario(token: string) : Promise<UserData | false>{
  const query = await prisma.conexiones_usuario.findFirst({
    select: {
      usuario: {
        select: {
          id: true,
          usuario: true,
          nombre_completo: true,
          avatar: true,
          rol: true,
          bloqueado: true,
          experiencia_total: true,
          membresia: true,
          expiracion_membresia: true,
        },
      },
    },

    where: {
      token: token,
    },
  });

  if (!query) return false;

  const { bloqueado, ...data } = query.usuario;
  
  if (bloqueado) return false;

  return data;
}
