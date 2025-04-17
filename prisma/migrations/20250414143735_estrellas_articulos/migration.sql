/*
  Warnings:

  - You are about to drop the column `estrellas` on the `paquete_articulos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "paquete_articulos" DROP COLUMN "estrellas";

-- CreateTable
CREATE TABLE "articulos_estrellas" (
    "id" UUID NOT NULL,
    "articulos_id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,

    CONSTRAINT "articulos_estrellas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "articulos_estrellas" ADD CONSTRAINT "relacion_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulos_estrellas" ADD CONSTRAINT "relacion_paquete_articulos" FOREIGN KEY ("articulos_id") REFERENCES "paquete_articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
