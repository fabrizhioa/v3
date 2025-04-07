/*
  Warnings:

  - You are about to drop the column `id_noticias` on the `ventas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ventas" DROP COLUMN "id_noticias",
ADD COLUMN     "id_articulo" UUID;

-- CreateTable
CREATE TABLE "paquete_alertas" (
    "id" TEXT NOT NULL,
    "id_creador" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tags" TEXT[],
    "ruta_imagen" VARCHAR(200) NOT NULL,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "paquete_alertas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paquete_articulos" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "resumen" TEXT,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "paquete_articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webinar" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "resumen" TEXT,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha" TIMESTAMP(3) NOT NULL,
    "url_webinar" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "webinar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_alerta_fkey" FOREIGN KEY ("id_alerta") REFERENCES "paquete_alertas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_articulo_fkey" FOREIGN KEY ("id_articulo") REFERENCES "paquete_articulos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_webinar_fkey" FOREIGN KEY ("id_webinar") REFERENCES "webinar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
