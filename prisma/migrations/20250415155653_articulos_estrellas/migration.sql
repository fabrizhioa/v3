-- CreateTable
CREATE TABLE "articulo_estrellas" (
    "id_articulo" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,

    CONSTRAINT "articulo_estrellas_pkey" PRIMARY KEY ("id_articulo","id_usuario")
);

-- AddForeignKey
ALTER TABLE "articulo_estrellas" ADD CONSTRAINT "articulo_estrellas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulo_estrellas" ADD CONSTRAINT "articulo_estrellas_id_articulo_fkey" FOREIGN KEY ("id_articulo") REFERENCES "articulo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
