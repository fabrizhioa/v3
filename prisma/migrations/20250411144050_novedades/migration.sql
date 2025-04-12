/*
  Warnings:

  - You are about to drop the column `duracion` on the `paquete_articulos` table. All the data in the column will be lost.
  - Added the required column `categoria` to the `paquete_articulos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mercado` to the `paquete_articulos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paquete_articulos" DROP COLUMN "duracion",
ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "mercado" TEXT NOT NULL;
