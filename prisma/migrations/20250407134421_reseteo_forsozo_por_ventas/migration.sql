-- CreateEnum
CREATE TYPE "AlertDirection" AS ENUM ('bullish', 'bearish');

-- CreateEnum
CREATE TYPE "AlertPriority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "AlertTimeframe" AS ENUM ('minutes_1', 'minutes_5', 'minutes_15', 'minutes_30', 'hours_1', 'hours_4', 'days_1', 'weeks_1');

-- CreateEnum
CREATE TYPE "TendenciaArticulo" AS ENUM ('alcista', 'bajista', 'neutral');

-- CreateEnum
CREATE TYPE "tipo_elemento_articulo" AS ENUM ('paragraph', 'image', 'video', 'quote', 'heading', 'list');

-- CreateEnum
CREATE TYPE "tipoProducto" AS ENUM ('noticias', 'cursos', 'alertas', 'webinar', 'membresia');

-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('USUARIO', 'INSTRUCTOR', 'ADMIN', 'DESARROLLADOR');

-- CreateEnum
CREATE TYPE "GeneroUsuario" AS ENUM ('MASCULINO', 'FEMENINO', 'OTRO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL,
    "usuario" VARCHAR(16) NOT NULL,
    "correo" VARCHAR(255) NOT NULL,
    "clave" TEXT NOT NULL,
    "nombre_completo" VARCHAR(45) NOT NULL,
    "pais" VARCHAR(45) NOT NULL,
    "fecha_nacimiento" VARCHAR(45) NOT NULL,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "telefono" VARCHAR(15),
    "genero" "GeneroUsuario" NOT NULL,
    "avatar" VARCHAR(200) NOT NULL DEFAULT '/assets/images/default-user.png',
    "biografia" VARCHAR(900) DEFAULT 'Soy nuevo en mindsovermarket!!',
    "rol" "RolUsuario" NOT NULL DEFAULT 'USUARIO',
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
CREATE TABLE "seguidores" (
    "id" UUID NOT NULL,
    "seguidor_id" UUID NOT NULL,
    "seguido_id" UUID NOT NULL,
    "fecha" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seguidores_pkey" PRIMARY KEY ("id")
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
    "id" UUID NOT NULL,
    "id_membresia" UUID,
    "id_curso" UUID,
    "id_alertas" UUID,
    "id_webinar" UUID,
    "id_articulos" UUID,
    "tipo" "tipoProducto" NOT NULL,
    "precio" MONEY NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_comprador" UUID NOT NULL,
    "id_vendedor" UUID NOT NULL,
    "id_transaccion" TEXT NOT NULL,
    "fecha_expiracion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membresia" (
    "id" UUID NOT NULL,
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

    CONSTRAINT "membresia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso" (
    "id" UUID NOT NULL,
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
    "id" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_elemento" UUID NOT NULL,

    CONSTRAINT "curso_elemento_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso_progreso_usuario" (
    "id" UUID NOT NULL,
    "id_curso" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_elemento" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curso_progreso_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso_reconociento_usuario" (
    "id" UUID NOT NULL,
    "id_curso" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curso_reconociento_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paquete_alertas" (
    "id" UUID NOT NULL,
    "id_creador" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tags" TEXT[],
    "ruta_imagen" VARCHAR(200) NOT NULL,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "paquete_alertas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerta" (
    "id" UUID NOT NULL,
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

    CONSTRAINT "alerta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webinar" (
    "id" UUID NOT NULL,
    "id_creador" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "resumen" TEXT,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha" TIMESTAMP(3) NOT NULL,
    "url_webinar" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "webinar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paquete_articulos" (
    "id" UUID NOT NULL,
    "id_creador" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "resumen" TEXT,
    "precio" MONEY NOT NULL,
    "duracion" INTEGER NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "paquete_articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articulo" (
    "id" UUID NOT NULL,
    "autor_id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "estrellas" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "mercado" TEXT NOT NULL,
    "tendencia" "TendenciaArticulo" NOT NULL,
    "resumen" TEXT,
    "id_paquete" TEXT,

    CONSTRAINT "articulo_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "nombre_usuario" ON "usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "correo_usuario" ON "usuario"("correo");

-- CreateIndex
CREATE INDEX "seguidor_id_seguido_id" ON "seguidores"("seguidor_id", "seguido_id");

-- CreateIndex
CREATE INDEX "id_creador_suscripcion" ON "membresia"("id_creador");

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
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_seguidor_id_fkey" FOREIGN KEY ("seguidor_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_seguido_id_fkey" FOREIGN KEY ("seguido_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conexiones_usuario" ADD CONSTRAINT "conexiones_usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "relacion_comprador" FOREIGN KEY ("id_comprador") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "relacion_vendedor" FOREIGN KEY ("id_vendedor") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_membresia_fkey" FOREIGN KEY ("id_membresia") REFERENCES "membresia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_alertas_fkey" FOREIGN KEY ("id_alertas") REFERENCES "paquete_alertas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_articulos_fkey" FOREIGN KEY ("id_articulos") REFERENCES "paquete_articulos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_id_webinar_fkey" FOREIGN KEY ("id_webinar") REFERENCES "webinar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "paquete_alertas" ADD CONSTRAINT "paquete_alertas_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerta" ADD CONSTRAINT "alerta_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webinar" ADD CONSTRAINT "webinar_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paquete_articulos" ADD CONSTRAINT "paquete_articulos_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulo" ADD CONSTRAINT "articulo_id_fkey" FOREIGN KEY ("id") REFERENCES "paquete_articulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulo" ADD CONSTRAINT "articulo_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articulo_elemento" ADD CONSTRAINT "articulo_elemento_articulo_id_fkey" FOREIGN KEY ("articulo_id") REFERENCES "articulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
