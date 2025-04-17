import { $Enums } from "@prisma/client";

export interface PaqueteArticulosListaCatalogo {
  id: string;
  titulo: string;
  precio: number;
  categoria: string;
  mercado: string;
  id_creador: string;
  creador: {
    id: string;
    usuario: string;
    nombre_completo: string;
    avatar: string;
  };
  estrellas: number;
  ventas: number;
}

export interface CursoListaCatalogo {
  id: string;
  titulo: string;
  creador: {
    id: string;
    usuario: string;
    nombre_completo: string;
    avatar: string;
  };
  estrellas: number;
  ventas: number;
  dificultad: $Enums.CursoDificultad;
  precio: number;
}

export interface PaqueteAlertasListaCatalogo {
  id: string;
  titulo: string;
  precio: number;
  mercado: string;
  id_creador: string;
  creador: {
    usuario: string;
    id: string;
    nombre_completo: string;
    avatar: string;
  };
  estrellas: number;
  ventas: number;
}

export interface EnvivosListaCatalogo {
  id: string;
  titulo: string;
  precio: number;
  fecha: Date;
  id_creador: string;
  tiempo_inicial: Date;
  tiempo_final: Date;
  creador: {
    id: string;
    usuario: string;
    nombre_completo: string;
    avatar: string;
  };
  ventas: number;
}

export interface CatalogoDataProps {
  cursos: CursoListaCatalogo[];
  paquetes_alertas: PaqueteAlertasListaCatalogo[];
  envivos: EnvivosListaCatalogo[];
  paquetes_articulos: PaqueteArticulosListaCatalogo[];
}
