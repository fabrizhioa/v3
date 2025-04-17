/*
  Warnings:

  - You are about to drop the column `likes` on the `curso` table. All the data in the column will be lost.
  - You are about to drop the `curso_elemento_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "curso_elemento_likes" DROP CONSTRAINT "relacion_elemento";

-- DropForeignKey
ALTER TABLE "curso_elemento_likes" DROP CONSTRAINT "relacion_user";

-- AlterTable
ALTER TABLE "curso" DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "curso_elemento" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "curso_reconociento_usuario" ALTER COLUMN "date" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "curso_elemento_likes";

-- CreateTable
CREATE TABLE "curso_estrellas" (
    "id" UUID NOT NULL,
    "curso_id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,

    CONSTRAINT "curso_estrellas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "curso_estrellas" ADD CONSTRAINT "relacion_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_estrellas" ADD CONSTRAINT "relacion_curso" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
