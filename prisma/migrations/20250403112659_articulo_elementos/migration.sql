/*
  Warnings:

  - You are about to drop the `elemento_articulo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "elemento_articulo" DROP CONSTRAINT "elemento_articulo_articulo_id_fkey";

-- DropTable
DROP TABLE "elemento_articulo";

-- CreateTable
CREATE TABLE "articulo_elemento" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "src" TEXT,
    "alt" TEXT,
    "level" INTEGER,
    "items" TEXT[],
    "type" "tipo_elemento_articulo" NOT NULL,
    "articulo_id" UUID NOT NULL,
    "position" INTEGER,

    CONSTRAINT "articulo_elemento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "articulo_elemento" ADD CONSTRAINT "articulo_elemento_articulo_id_fkey" FOREIGN KEY ("articulo_id") REFERENCES "articulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
