/*
  Warnings:

  - You are about to drop the column `fecha_publicacion` on the `alerta` table. All the data in the column will be lost.
  - You are about to drop the column `objetivos` on the `alerta` table. All the data in the column will be lost.
  - You are about to drop the column `prioridad` on the `alerta` table. All the data in the column will be lost.
  - You are about to drop the column `timeframe` on the `alerta` table. All the data in the column will be lost.
  - Changed the type of `tipo` on the `alerta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `direccion` on the `alerta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AlertaDireccion" AS ENUM ('bullish', 'bearish');

-- CreateEnum
CREATE TYPE "AlertaIntervalo" AS ENUM ('minutes_1', 'minutes_5', 'minutes_15', 'minutes_30', 'hours_1', 'hours_4', 'days_1', 'weeks_1');

-- CreateEnum
CREATE TYPE "AlertaTipo" AS ENUM ('soporte', 'resistencia', 'ruptura', 'reversion', 'tendencia', 'patron', 'divergencia', 'fibonacci', 'pivote', 'volatilidad');

-- AlterTable
ALTER TABLE "alerta" DROP COLUMN "fecha_publicacion",
DROP COLUMN "objetivos",
DROP COLUMN "prioridad",
DROP COLUMN "timeframe",
ADD COLUMN     "fecha" TIMESTAMP(3),
ADD COLUMN     "intervalo" "AlertaIntervalo",
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "AlertaTipo" NOT NULL,
DROP COLUMN "direccion",
ADD COLUMN     "direccion" "AlertaDireccion" NOT NULL;

-- DropEnum
DROP TYPE "AlertDirection";

-- DropEnum
DROP TYPE "AlertPriority";

-- DropEnum
DROP TYPE "AlertTimeframe";
