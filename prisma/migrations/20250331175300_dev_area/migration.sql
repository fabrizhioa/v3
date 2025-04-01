-- CreateEnum
CREATE TYPE "rolUsuario" AS ENUM ('USUARIO', 'INSTRUCTOR', 'ADMIN', 'DESARROLLADOR');

-- CreateEnum
CREATE TYPE "generoUsuario" AS ENUM ('MASCULINO', 'FEMENINO', 'OTRO');

-- CreateEnum
CREATE TYPE "AlertDirection" AS ENUM ('bullish', 'bearish');

-- CreateEnum
CREATE TYPE "AlertPriority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "AlertTimeframe" AS ENUM ('minutes_1', 'minutes_5', 'minutes_15', 'minutes_30', 'hours_1', 'hours_4', 'days_1', 'weeks_1');

-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario" VARCHAR(16) NOT NULL,
    "correo" VARCHAR(255) NOT NULL,
    "clave" TEXT NOT NULL,
    "nombre_completo" VARCHAR(45) NOT NULL,
    "pais" VARCHAR(45) NOT NULL,
    "fecha_nacimiento" VARCHAR(45) NOT NULL,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "telefono" VARCHAR(15),
    "genero" "generoUsuario" NOT NULL,
    "avatar" VARCHAR(200) NOT NULL DEFAULT '/assets/images/default-user.png',
    "biografia" VARCHAR(900) DEFAULT 'Soy nuevo en mindsovermarket!!',
    "rol" "rolUsuario" NOT NULL DEFAULT 'USUARIO',
    "bloqueado" BOOLEAN NOT NULL DEFAULT false,
    "facebook_url" TEXT,
    "instagram_url" TEXT,
    "twitter_url" TEXT,
    "membresia" VARCHAR(45),
    "expiracion_membresia" TIMESTAMP(3),
    "experiencia_total" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conexiones_usuario" (
    "id_usuario" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conexiones_usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_curso" UUID,
    "id_webinar" UUID,
    "id_alerta" UUID,
    "id_repeticion" UUID,
    "id_analisis" UUID,
    "id_suscripcion" UUID,
    "tipo" TEXT NOT NULL,
    "precio" MONEY NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_comprador" UUID NOT NULL,
    "id_vendedor" UUID NOT NULL,
    "id_transaccion" TEXT NOT NULL,
    "fecha_expiracion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suscripcion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_creador" UUID NOT NULL,
    "titulo" VARCHAR(45) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tags" TEXT[],
    "ruta_imagen" VARCHAR(200) NOT NULL,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "ruta_aprendizaje" TEXT[],
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "suscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_creador" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[],
    "ruta_imagen" TEXT NOT NULL,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "ruta_aprendizaje" TEXT[],
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso_elemento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titulo" TEXT NOT NULL,
    "descripcion" VARCHAR(900) NOT NULL,
    "ruta" TEXT,
    "tipo" TEXT NOT NULL,
    "valor_experiencia" INTEGER NOT NULL,
    "curso_id" UUID NOT NULL,

    CONSTRAINT "curso_elemento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso_elemento_likes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_usuario" UUID NOT NULL,
    "id_elemento" UUID NOT NULL,

    CONSTRAINT "curso_elemento_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso_progreso_usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_curso" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_elemento" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curso_progreso_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso_reconociento_usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_curso" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curso_reconociento_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id" TEXT NOT NULL,
    "id_creador" UUID NOT NULL,
    "mercado" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "precio" TEXT NOT NULL,
    "direccion" "AlertDirection" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "prioridad" "AlertPriority" NOT NULL,
    "objetivos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "stop_loss" TEXT,
    "timeframe" "AlertTimeframe",
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_publicacion" TIMESTAMP(3),
    "publicada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nombre_usuario" ON "usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "correo_usuario" ON "usuario"("correo");

-- CreateIndex
CREATE INDEX "id_creador_suscripcion" ON "suscripcion"("id_creador");

-- CreateIndex
CREATE INDEX "cursos_creados" ON "curso"("id_creador");

-- CreateIndex
CREATE INDEX "elemento_likes" ON "curso_elemento_likes"("id_elemento");

-- CreateIndex
CREATE INDEX "usuario_curso_elemento_likes" ON "curso_elemento_likes"("id_usuario");

-- CreateIndex
CREATE INDEX "curso_progreso" ON "curso_progreso_usuario"("id_curso");

-- CreateIndex
CREATE INDEX "elemento_progreso" ON "curso_progreso_usuario"("id_elemento");

-- CreateIndex
CREATE INDEX "progreso_usuario" ON "curso_progreso_usuario"("id_usuario");

-- CreateIndex
CREATE INDEX "curso_reconocimiento" ON "curso_reconociento_usuario"("id_curso");

-- CreateIndex
CREATE INDEX "usuario_reconocimiento" ON "curso_reconociento_usuario"("id_usuario");

-- AddForeignKey
ALTER TABLE "conexiones_usuario" ADD CONSTRAINT "conexiones_usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "relacion_comprador" FOREIGN KEY ("id_comprador") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "relacion_vendedor" FOREIGN KEY ("id_vendedor") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_suscripcion_fkey" FOREIGN KEY ("id_suscripcion") REFERENCES "suscripcion"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripcion" ADD CONSTRAINT "creador_suscripcion" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "curso_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_elemento" ADD CONSTRAINT "relacion_curso" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_elemento_likes" ADD CONSTRAINT "relacion_elemento" FOREIGN KEY ("id_elemento") REFERENCES "curso_elemento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_elemento_likes" ADD CONSTRAINT "relacion_user" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_progreso_usuario" ADD CONSTRAINT "relacion_curso" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_progreso_usuario" ADD CONSTRAINT "relacion_elemento" FOREIGN KEY ("id_elemento") REFERENCES "curso_elemento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_progreso_usuario" ADD CONSTRAINT "relacion_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_reconociento_usuario" ADD CONSTRAINT "relacion_curso" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_reconociento_usuario" ADD CONSTRAINT "relacion_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
