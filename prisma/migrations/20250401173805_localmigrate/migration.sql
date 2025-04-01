/*
  Warnings:

  - The `rol` column on the `usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `id_analisis` on the `ventas` table. All the data in the column will be lost.
  - You are about to drop the column `id_repeticion` on the `ventas` table. All the data in the column will be lost.
  - You are about to drop the column `id_suscripcion` on the `ventas` table. All the data in the column will be lost.
  - You are about to drop the `suscripcion` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `genero` on the `usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tipo` on the `ventas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('USUARIO', 'INSTRUCTOR', 'ADMIN', 'DESARROLLADOR');

-- CreateEnum
CREATE TYPE "GeneroUsuario" AS ENUM ('MASCULINO', 'FEMENINO', 'OTRO');

-- CreateEnum
CREATE TYPE "tipoProducto" AS ENUM ('noticias', 'cursos', 'alertas', 'webinar', 'membresia');

-- DropForeignKey
ALTER TABLE "suscripcion" DROP CONSTRAINT "creador_suscripcion";

-- DropForeignKey
ALTER TABLE "ventas" DROP CONSTRAINT "ventas_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "ventas" DROP CONSTRAINT "ventas_id_suscripcion_fkey";

-- AlterTable
ALTER TABLE "curso" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "curso_elemento_likes" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "curso_progreso_usuario" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "curso_reconociento_usuario" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "id" DROP DEFAULT,
DROP COLUMN "genero",
ADD COLUMN     "genero" "GeneroUsuario" NOT NULL,
DROP COLUMN "rol",
ADD COLUMN     "rol" "RolUsuario" NOT NULL DEFAULT 'USUARIO';

-- AlterTable
ALTER TABLE "ventas" DROP COLUMN "id_analisis",
DROP COLUMN "id_repeticion",
DROP COLUMN "id_suscripcion",
ADD COLUMN     "id_membresia" UUID,
ADD COLUMN     "id_noticias" UUID,
ALTER COLUMN "id" DROP DEFAULT,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "tipoProducto" NOT NULL;

-- DropTable
DROP TABLE "suscripcion";

-- DropEnum
DROP TYPE "generoUsuario";

-- DropEnum
DROP TYPE "rolUsuario";

-- CreateTable
CREATE TABLE "membresia" (
    "id" UUID NOT NULL,
    "id_creador" UUID NOT NULL,
    "titulo" VARCHAR(45) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tags" TEXT[],
    "ruta_imagen" VARCHAR(200) NOT NULL,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "ruta_aprendizaje" TEXT[],
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "membresia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "id_creador_suscripcion" ON "membresia"("id_creador");

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_membresia_fkey" FOREIGN KEY ("id_membresia") REFERENCES "membresia"("id") ON DELETE SET NULL ON UPDATE CASCADE;
