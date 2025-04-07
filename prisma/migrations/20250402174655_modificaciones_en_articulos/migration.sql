/*
  Warnings:

  - You are about to drop the column `contenido` on the `elemento_articulo` table. All the data in the column will be lost.
  - Added the required column `content` to the `elemento_articulo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "elemento_articulo" DROP COLUMN "contenido",
ADD COLUMN     "content" TEXT NOT NULL;
