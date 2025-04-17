/*
  Warnings:

  - Added the required column `tiempo_final` to the `envivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tiempo_inicial` to the `envivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "envivo" ADD COLUMN     "tiempo_final" TIME NOT NULL,
ADD COLUMN     "tiempo_inicial" TIME NOT NULL,
ALTER COLUMN "fecha" SET DATA TYPE DATE;
