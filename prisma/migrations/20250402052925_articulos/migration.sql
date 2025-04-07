/*
  Warnings:

  - You are about to drop the `Alerta` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "tipo_elemento_articulo" AS ENUM ('paragraph', 'image', 'video', 'quote', 'heading', 'list');

-- DropForeignKey
ALTER TABLE "Alerta" DROP CONSTRAINT "Alerta_id_creador_fkey";

-- DropTable
DROP TABLE "Alerta";

-- CreateTable
CREATE TABLE "alerta" (
    "id" TEXT NOT NULL,
    "id_creador" UUID NOT NULL,
    "mercado" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "precio" TEXT NOT NULL,
    "direccion" "AlertDirection" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "prioridad" "AlertPriority" NOT NULL,
    "objetivos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "stop_loss" TEXT,
    "timeframe" "AlertTimeframe",
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_publicacion" TIMESTAMP(3),
    "publicada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "alerta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articulo" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estrellas" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "mercado" TEXT NOT NULL,
    "tendencia" TEXT,
    "resumen" TEXT,
    "autor_id" UUID NOT NULL,

    CONSTRAINT "articulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "elemento_articulo" (
    "id" UUID NOT NULL,
    "contenido" TEXT NOT NULL,
    "src" TEXT,
    "alt" TEXT,
    "level" INTEGER,
    "items" TEXT[],
    "tipo" "tipo_elemento_articulo" NOT NULL,
    "articulo_id" UUID NOT NULL,

    CONSTRAINT "elemento_articulo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alerta" ADD CONSTRAINT "alerta_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulo" ADD CONSTRAINT "articulo_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "elemento_articulo" ADD CONSTRAINT "elemento_articulo_articulo_id_fkey" FOREIGN KEY ("articulo_id") REFERENCES "articulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
