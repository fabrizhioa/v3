export interface Reconocimiento {
  curso: {
    id: string;
    titulo: string;
    creador: {
      id: string;
      usuario: string;
      nombre_completo: string;
    };
  };
  fecha: Date;
  id: string;
}
