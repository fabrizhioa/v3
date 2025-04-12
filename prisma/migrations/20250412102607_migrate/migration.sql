/*
  Warnings:

  - Changed the type of `fecha_nacimiento` on the `usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "fecha_nacimiento",
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(6) NOT NULL;
