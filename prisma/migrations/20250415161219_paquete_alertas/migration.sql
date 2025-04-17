-- AlterTable
ALTER TABLE "alerta" ADD COLUMN     "id_paquete" UUID;

-- AddForeignKey
ALTER TABLE "alerta" ADD CONSTRAINT "alerta_id_paquete_fkey" FOREIGN KEY ("id_paquete") REFERENCES "paquete_alertas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
