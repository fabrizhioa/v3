export type cursoDashboardProps = {
  id: number;
  title: string;
  image_url: string;
  creator_user: string;
  creator_name: string;
  resource_type: "curso";
  last_view_element: string;
  isLiked: boolean;
};

export type webinarDashboardProps = {
  id: number;
  title: string;
  url: string;
  creator_user: string;
  date: string;
  resource_type: "webinar";
  durl: string;
};

export type alertaDashboardProps = {
  id: number;
  title: string;
  date: string;
  resource_type: "alerta";
  durl: string;
};

export type DashboardUserElementsProps = {
  cursos: cursoDashboardProps[];
  webinars: webinarDashboardProps[];
  repeticiones: cursoDashboardProps[];
  estadisticas: {
    cursos_activos: number;
    webinars_activos: number;
    alertas_activas: number;
    repeticiones_activas: number;
    paquetes_activos: number;
  };
};
