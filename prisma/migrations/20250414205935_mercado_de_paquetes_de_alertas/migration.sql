/*
  Warnings:

  - Added the required column `mercado` to the `paquete_alertas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "curso" ADD COLUMN     "resumen" TEXT;

-- AlterTable
ALTER TABLE "paquete_alertas" ADD COLUMN     "mercado" TEXT NOT NULL;
