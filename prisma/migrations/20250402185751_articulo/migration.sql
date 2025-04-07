/*
  Warnings:

  - Added the required column `tendencia` to the `articulo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TendenciaArticulo" AS ENUM ('alcista', 'bajista', 'neutral');

-- AlterTable
ALTER TABLE "articulo" DROP COLUMN "tendencia",
ADD COLUMN     "tendencia" "TendenciaArticulo" NOT NULL;
