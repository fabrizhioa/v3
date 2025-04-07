-- CreateTable
CREATE TABLE "seguidores" (
    "id" UUID NOT NULL,
    "seguidor_id" UUID NOT NULL,
    "seguido_id" UUID NOT NULL,
    "fecha" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seguidores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "seguidor_id_seguido_id" ON "seguidores"("seguidor_id", "seguido_id");

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_seguidor_id_fkey" FOREIGN KEY ("seguidor_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_seguido_id_fkey" FOREIGN KEY ("seguido_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
