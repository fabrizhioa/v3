/*
  Warnings:

  - You are about to drop the column `duracion` on the `paquete_alertas` table. All the data in the column will be lost.
  - You are about to drop the column `estrellas` on the `paquete_alertas` table. All the data in the column will be lost.
  - You are about to drop the column `ruta_imagen` on the `paquete_alertas` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `paquete_alertas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "paquete_alertas" DROP COLUMN "duracion",
DROP COLUMN "estrellas",
DROP COLUMN "ruta_imagen",
DROP COLUMN "tags",
ADD COLUMN     "resumen" TEXT;
