"use server";

import prisma from "@/lib/prisma";
import hash from "@/utils/hash";
import uploadImage from "@/utils/uploadImage";
import { $Enums } from "@prisma/client";

export const obtenerPersonalDataPerfil = async (id: string) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: id,
    },
    select: {
      avatar: true,
      biografia: true,
      fecha_nacimiento: true,
      nombre_completo: true,
      genero: true,
      pais: true,
      telefono: true,
      usuario: true,
    },
  });

  return usuario;
};

export const actualizarDatosPersonales = async (
  datos: {
    biografia: string;
    telefono: string;
    pais: string;
    fecha_nacimiento: Date;
    genero: $Enums.GeneroUsuario;
    imagen: File | undefined;
  },
  id: string
) => {
  let url = undefined;

  if (datos.imagen) {
    await uploadImage(datos.imagen, "resources/images/profile", id).then(
      (response) => {
        if (response.error) {
          console.log("Error al subir imagen:", response.error);
          return {
            error: "Se presento un problema guardando la imagen",
            data: null,
          };
        }
        console.log(response.path);
        url = response.path;
      }
    );
  }

  const data = {
    biografia: datos.biografia,
    telefono: datos.telefono,
    pais: datos.pais,
    fecha_nacimiento: datos.fecha_nacimiento,
    genero: datos.genero,
    avatar: url,
  };

  const usuario = await prisma.usuario.update({
    data: data,
    where: {
      id: id,
    },
    select: {
      avatar: true,
      biografia: true,
      fecha_nacimiento: true,
      nombre_completo: true,
      genero: true,
      pais: true,
      telefono: true,
      usuario: true,
    },
  });

  return { data: usuario, error: null };
};

export const actualizarDatosSeguridad = async (
  datos: {
    old_password: string;
    new_password: string;
  },
  id: string
) => {
  const { old_password, new_password } = datos;

  const old_password_hashed = await hash(old_password);
  const new_password_heshed = await hash(new_password);

  const result = await prisma.usuario.update({
    where: {
      id: id,
      clave: old_password_hashed,
    },
    data: {
      clave: new_password_heshed,
    },
  });

  if (!result) {
    return { error: "Error al actualizar la contraseña", success: false };
  } else {
    return { success: true, error: null };
  }
};

export const obtenerReferidos = async (usuario: string) => {
  const referidos = await prisma.usuario.findMany({
    select: {
      id: true,
      nombre_completo: true,
      usuario: true,
      fecha_creacion: true,
    },
    where: {
      referente_user: usuario,
    },
  });

  return referidos;
};

export const obtenerReconocimientos = async (id: string) => {
  const reconocimientos = await prisma.curso_reconociento_usuario.findMany({
    where: {
      id_usuario: id,
    },
    select: {
      id: true,
      curso: {
        select: {
          titulo: true,
          id: true,
          id_creador: true,
          creador: {
            select: {
              nombre_completo: true,
              usuario: true,
              id: true,
            },
          },
        },
      },
      id_curso: true,
      date: true,
    },
  });

  const resultado = reconocimientos.map((reconocimiento) => ({
    curso: {
      id: reconocimiento.curso.id,
      titulo: reconocimiento.curso.titulo,
      creador: reconocimiento.curso.creador,
    },
    fecha: reconocimiento.date,
    id: reconocimiento.id,
  }));
  return resultado;
};
