export interface ListaPaquetesArticulosProps {
  id: string;
  titulo: string;
  estrellas: number;
  categoria: string;
  mercado: string;
  precio: number;
  fecha_creacion: Date;
  disponibilidad: boolean;
}

export interface DatosCreacionPaqueteArticulos {
  titulo: string;
  resumen: string;
  descripcion: string;
  mercado: string;
  categoria: string;
  precio: number;
}

export interface DatosActualizacionPaqueteArticulos
  extends DatosCreacionPaqueteArticulos {
  id: string;
}

export interface DatosPaqueteArticulosProps {
  id: string;
  titulo: string;
  descripcion: string;
  resumen: string;
  categoria: string;
  mercado: string;
  precio: number;
}
