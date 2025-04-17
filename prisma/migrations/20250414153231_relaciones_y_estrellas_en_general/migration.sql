/*
  Warnings:

  - You are about to drop the `webinar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ventas" DROP CONSTRAINT "ventas_id_webinar_fkey";

-- DropForeignKey
ALTER TABLE "webinar" DROP CONSTRAINT "webinar_id_creador_fkey";

-- DropTable
DROP TABLE "webinar";

-- CreateTable
CREATE TABLE "alertas_estrellas" (
    "id" UUID NOT NULL,
    "alertas_id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,

    CONSTRAINT "alertas_estrellas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "envivo" (
    "id" UUID NOT NULL,
    "id_creador" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "resumen" TEXT,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha" TIMESTAMP(3) NOT NULL,
    "url_webinar" TEXT NOT NULL,
    "estrellas" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "envivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "envivos_estrellas" (
    "id" UUID NOT NULL,
    "alertas_id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,

    CONSTRAINT "envivos_estrellas_pkey" PRIMARY KEY ("id")
);

-- RenameForeignKey
ALTER TABLE "articulos_estrellas" RENAME CONSTRAINT "relacion_paquete_articulos" TO "articulos_estrellas_articulos_id_fkey";

-- RenameForeignKey
ALTER TABLE "articulos_estrellas" RENAME CONSTRAINT "relacion_usuario" TO "articulos_estrellas_usuario_id_fkey";

-- RenameForeignKey
ALTER TABLE "curso_estrellas" RENAME CONSTRAINT "relacion_curso" TO "curso_estrellas_curso_id_fkey";

-- RenameForeignKey
ALTER TABLE "curso_estrellas" RENAME CONSTRAINT "relacion_usuario" TO "curso_estrellas_usuario_id_fkey";

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_webinar_fkey" FOREIGN KEY ("id_webinar") REFERENCES "envivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas_estrellas" ADD CONSTRAINT "alertas_estrellas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas_estrellas" ADD CONSTRAINT "alertas_estrellas_alertas_id_fkey" FOREIGN KEY ("alertas_id") REFERENCES "paquete_alertas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "envivo" ADD CONSTRAINT "envivo_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "envivos_estrellas" ADD CONSTRAINT "envivos_estrellas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "envivos_estrellas" ADD CONSTRAINT "envivos_estrellas_alertas_id_fkey" FOREIGN KEY ("alertas_id") REFERENCES "envivo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
