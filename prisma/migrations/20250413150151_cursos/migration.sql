/*
  Warnings:

  - You are about to drop the column `duracion` on the `curso` table. All the data in the column will be lost.
  - You are about to drop the column `ruta_imagen` on the `curso` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `curso` table. All the data in the column will be lost.
  - Added the required column `dificultad` to the `curso` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "curso_dificultad" AS ENUM ('Principiante', 'Intermedio', 'Avanzado', 'Todos');

-- AlterTable
ALTER TABLE "curso" DROP COLUMN "duracion",
DROP COLUMN "ruta_imagen",
DROP COLUMN "tags",
ADD COLUMN     "dificultad" "curso_dificultad" NOT NULL;
