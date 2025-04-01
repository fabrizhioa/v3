"use server";

import prisma from "@/lib/prisma";

export async function getLandingData() {
  // Last three courses
  const courses = await prisma.curso.findMany({
    take: 3,
    orderBy: {
      fecha_creacion: "desc",
    },
  });

  // const alerts = await prisma.

  // Last three alerts
  // const alerts = await prisma.ale
  // Last three LiveClasses
  // Last three news
  return {courses: courses ?? []};
}