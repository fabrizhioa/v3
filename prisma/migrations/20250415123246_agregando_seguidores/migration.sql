-- CreateTable
CREATE TABLE "seguidores" (
    "seguidor_id" UUID NOT NULL,
    "seguido_id" UUID NOT NULL,
    "fecha" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seguidor_id_seguido_id" PRIMARY KEY ("seguidor_id","seguido_id")
);

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_seguido_id_fkey" FOREIGN KEY ("seguido_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_seguidor_id_fkey" FOREIGN KEY ("seguidor_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
