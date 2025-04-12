/*
  Warnings:

  - Made the column `fecha_creacion` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "referente_user" VARCHAR(16),
ALTER COLUMN "fecha_creacion" SET NOT NULL,
ALTER COLUMN "fecha_creacion" SET DATA TYPE DATE,
ALTER COLUMN "fecha_nacimiento" SET DATA TYPE DATE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_referente_user_fkey" FOREIGN KEY ("referente_user") REFERENCES "usuario"("usuario") ON DELETE SET NULL ON UPDATE CASCADE;
