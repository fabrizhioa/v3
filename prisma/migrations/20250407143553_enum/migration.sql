/*
  Warnings:

  - The values [noticias] on the enum `tipoProducto` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "tipoProducto_new" AS ENUM ('articulo', 'cursos', 'alertas', 'webinar', 'membresia');
ALTER TABLE "ventas" ALTER COLUMN "tipo" TYPE "tipoProducto_new" USING ("tipo"::text::"tipoProducto_new");
ALTER TYPE "tipoProducto" RENAME TO "tipoProducto_old";
ALTER TYPE "tipoProducto_new" RENAME TO "tipoProducto";
DROP TYPE "tipoProducto_old";
COMMIT;
