"use server";

import prisma from "@/lib/prisma";

export async function modify_user() {
  const fabri = await prisma.usuario.update({
    where: {
      usuario: "fabrizhiodev",
    },
    data: {
      rol: "DESARROLLADOR",
    },
  });

  console.log(fabri);
}
