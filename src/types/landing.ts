import { $Enums } from "@prisma/client";

export interface DatosCursosLandingProps {
  id: string;
  titulo: string;
  dificultad: string;
  estrellas: number;
  ventas: number;
  precio: number;
  instructor: {
    nombre_completo: string;
    usuario: string;
    avatar: string;
  };
}

export interface DatosArticulosLandingProps {
  id: string;
  titulo: string;
  creador: {
    nombre_completo: string;
    usuario: string;
    avatar: string;
  };
  resumen: string;
  tendencia: $Enums.TendenciaArticulo;
  categoria: string;
  estrellas: number;
  fecha: Date;
}

export interface DatosAlertasLandingProps {
  id: string;
  mercado: string;
  tipo: string;
  precio: number;
  direccion: $Enums.AlertDirection;
  fecha_publicacion: Date | null;
  creador: {
    id: string;
    usuario: string;
    nombre_completo: string;
    avatar: string;
  };
}

export interface DatosEnvivosLandingProps {
  id: string;
  titulo: string;
  fecha: Date;
  tiempo_inicial: Date;
  tiempo_final: Date;
  ventas: number;
  creador: {
    id: string;
    usuario: string;
    nombre_completo: string;
    avatar: string;
  };
}
