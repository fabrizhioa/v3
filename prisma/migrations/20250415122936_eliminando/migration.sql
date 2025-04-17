/*
  Warnings:

  - The values [MASCULINO,FEMENINO,OTRO] on the enum `GeneroUsuario` will be removed. If these variants are still used in the database, this will fail.
  - The values [USUARIO,INSTRUCTOR,ADMIN,DESARROLLADOR] on the enum `RolUsuario` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `autor_id` on the `articulo` table. All the data in the column will be lost.
  - The `id_paquete` column on the `articulo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `articulos_estrellas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seguidores` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_creador` to the `articulo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dificultad` on the `curso` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CursoDificultad" AS ENUM ('principiante', 'intermedio', 'avanzado', 'general');

-- AlterEnum
BEGIN;
CREATE TYPE "GeneroUsuario_new" AS ENUM ('masculino', 'femenino', 'otro');
ALTER TABLE "usuario" ALTER COLUMN "genero" TYPE "GeneroUsuario_new" USING ("genero"::text::"GeneroUsuario_new");
ALTER TYPE "GeneroUsuario" RENAME TO "GeneroUsuario_old";
ALTER TYPE "GeneroUsuario_new" RENAME TO "GeneroUsuario";
DROP TYPE "GeneroUsuario_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RolUsuario_new" AS ENUM ('usuario', 'instructor', 'administrador', 'desarrollador');
ALTER TABLE "usuario" ALTER COLUMN "rol" DROP DEFAULT;
ALTER TABLE "usuario" ALTER COLUMN "rol" TYPE "RolUsuario_new" USING ("rol"::text::"RolUsuario_new");
ALTER TYPE "RolUsuario" RENAME TO "RolUsuario_old";
ALTER TYPE "RolUsuario_new" RENAME TO "RolUsuario";
DROP TYPE "RolUsuario_old";
ALTER TABLE "usuario" ALTER COLUMN "rol" SET DEFAULT 'usuario';
COMMIT;

-- DropForeignKey
ALTER TABLE "articulo" DROP CONSTRAINT "articulo_autor_id_fkey";

-- DropForeignKey
ALTER TABLE "articulo" DROP CONSTRAINT "articulo_id_fkey";

-- DropForeignKey
ALTER TABLE "articulos_estrellas" DROP CONSTRAINT "articulos_estrellas_articulos_id_fkey";

-- DropForeignKey
ALTER TABLE "articulos_estrellas" DROP CONSTRAINT "articulos_estrellas_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "seguidores" DROP CONSTRAINT "seguidores_seguido_id_fkey";

-- DropForeignKey
ALTER TABLE "seguidores" DROP CONSTRAINT "seguidores_seguidor_id_fkey";

-- AlterTable
ALTER TABLE "articulo" DROP COLUMN "autor_id",
ADD COLUMN     "id_creador" UUID NOT NULL,
DROP COLUMN "id_paquete",
ADD COLUMN     "id_paquete" UUID;

-- AlterTable
ALTER TABLE "curso" DROP COLUMN "dificultad",
ADD COLUMN     "dificultad" "CursoDificultad" NOT NULL;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "rol" SET DEFAULT 'usuario';

-- DropTable
DROP TABLE "articulos_estrellas";

-- DropTable
DROP TABLE "seguidores";

-- DropEnum
DROP TYPE "curso_dificultad";

-- CreateTable
CREATE TABLE "paquete_articulos_estrellas" (
    "id" UUID NOT NULL,
    "articulos_id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,

    CONSTRAINT "paquete_articulos_estrellas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "articulo" ADD CONSTRAINT "articulo_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulo" ADD CONSTRAINT "articulo_id_paquete_fkey" FOREIGN KEY ("id_paquete") REFERENCES "paquete_articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paquete_articulos_estrellas" ADD CONSTRAINT "paquete_articulos_estrellas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paquete_articulos_estrellas" ADD CONSTRAINT "paquete_articulos_estrellas_articulos_id_fkey" FOREIGN KEY ("articulos_id") REFERENCES "paquete_articulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
