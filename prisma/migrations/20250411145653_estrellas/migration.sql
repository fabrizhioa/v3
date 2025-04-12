/*
  Warnings:

  - You are about to drop the column `stars` on the `membresia` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `paquete_alertas` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `paquete_articulos` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `webinar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "membresia" DROP COLUMN "stars",
ADD COLUMN     "estrellas" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "paquete_alertas" DROP COLUMN "stars",
ADD COLUMN     "estrellas" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "paquete_articulos" DROP COLUMN "stars",
ADD COLUMN     "estrellas" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "webinar" DROP COLUMN "stars",
ADD COLUMN     "estrellas" INTEGER NOT NULL DEFAULT 0;
