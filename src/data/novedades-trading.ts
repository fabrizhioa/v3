import type { NovedadTrading } from "@/types/novedad"

// Datos de ejemplo relacionados con trading con contenido rico
export const novedadesTradingData: NovedadTrading[] = [
  {
    id: 1,
    titulo: "Bitcoin rompe resistencia clave de $75,000",
    fecha: "2025-03-15",
    autor: "Carlos Martínez",
    likes: 87,
    resumen:
      "El precio de Bitcoin ha superado finalmente la resistencia clave de $75,000, estableciendo un nuevo máximo histórico.",
    contenido: [
      {
        type: "paragraph",
        content:
          "El precio de Bitcoin ha superado finalmente la resistencia clave de $75,000, estableciendo un nuevo máximo histórico. Los analistas sugieren que este movimiento podría abrir el camino hacia los $80,000 en las próximas semanas si el volumen de compra se mantiene.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Gráfico de Bitcoin rompiendo resistencia",
        content: "Gráfico de Bitcoin mostrando la ruptura de la resistencia de $75,000",
      },
      {
        type: "heading",
        level: 2,
        content: "Análisis Técnico",
      },
      {
        type: "paragraph",
        content:
          "Desde una perspectiva técnica, Bitcoin ha formado un patrón de continuación alcista después de consolidarse durante varias semanas por debajo de la resistencia de $75,000. El RSI muestra una fuerte presión compradora, aunque está entrando en territorio de sobrecompra, lo que podría indicar una posible corrección a corto plazo.",
      },
      {
        type: "quote",
        content:
          "Este movimiento marca el inicio de lo que podría ser la última fase del ciclo alcista de Bitcoin en 2025, con objetivos potenciales en $85,000-$90,000 antes de una corrección significativa",
      },
      {
        type: "video",
        src: "https://www.example.com/videos/bitcoin-analysis.mp4",
        content: "Análisis detallado del movimiento de Bitcoin",
      },
      {
        type: "heading",
        level: 2,
        content: "Factores Fundamentales",
      },
      {
        type: "paragraph",
        content:
          "Entre los factores fundamentales que han impulsado este movimiento se encuentran la creciente adopción institucional, la reducción de la inflación en Estados Unidos y la expectativa de políticas monetarias más flexibles por parte de la Reserva Federal.",
      },
      {
        type: "list",
        items: [
          "Aumento de la inversión institucional en Bitcoin",
          "Reducción de las tasas de interés en economías clave",
          "Creciente adopción como reserva de valor corporativa",
          "Mejoras en la infraestructura de la red Bitcoin",
        ],
        content: "Factores clave que impulsan el precio de Bitcoin",
      },
    ],
    categoria: "Criptomonedas",
    mercado: "Bitcoin",
    tendencia: "alcista",
  },
  {
    id: 2,
    titulo: "La FED mantiene tasas de interés sin cambios",
    fecha: "2025-03-12",
    autor: "Ana Rodríguez",
    likes: 54,
    resumen:
      "La Reserva Federal de EE.UU. ha decidido mantener las tasas de interés sin cambios en su última reunión, en línea con las expectativas del mercado.",
    contenido: [
      {
        type: "paragraph",
        content:
          "La Reserva Federal de EE.UU. ha decidido mantener las tasas de interés sin cambios en su última reunión, en línea con las expectativas del mercado. Esta decisión ha generado estabilidad en los mercados de valores, con el S&P 500 cerrando con una ligera ganancia.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Conferencia de prensa de la FED",
        content: "Jerome Powell durante la conferencia de prensa posterior a la reunión de la FED",
      },
      {
        type: "heading",
        level: 2,
        content: "Implicaciones para los Mercados",
      },
      {
        type: "paragraph",
        content:
          "La decisión de la FED de mantener las tasas sin cambios tiene importantes implicaciones para diversos mercados financieros. En el mercado de divisas, el dólar estadounidense se ha mantenido relativamente estable frente a las principales monedas, mientras que los mercados de bonos han mostrado una ligera reducción en los rendimientos.",
      },
      {
        type: "quote",
        content:
          "Esperamos que la FED mantenga esta postura durante al menos los próximos dos trimestres, lo que debería proporcionar un entorno favorable para los activos de riesgo",
      },
      {
        type: "paragraph",
        content:
          "Para los traders de forex, esta situación sugiere que las estrategias de carry trade podrían seguir siendo efectivas, especialmente en pares que involucran al dólar estadounidense contra divisas de economías con tasas de interés más altas.",
      },
    ],
    categoria: "Macroeconomía",
    mercado: "Forex",
    tendencia: "neutral",
  },
  {
    id: 3,
    titulo: "Estrategia de trading: Divergencias en RSI",
    fecha: "2025-03-10",
    autor: "Miguel López",
    likes: 112,
    resumen:
      "Las divergencias en el indicador RSI pueden ser señales poderosas para identificar posibles reversiones de tendencia.",
    contenido: [
      {
        type: "paragraph",
        content:
          "Las divergencias en el indicador RSI pueden ser señales poderosas para identificar posibles reversiones de tendencia. En este artículo, analizamos cómo identificar y operar estas divergencias con ejemplos prácticos en diferentes mercados.",
      },
      {
        type: "heading",
        level: 2,
        content: "¿Qué son las Divergencias en RSI?",
      },
      {
        type: "paragraph",
        content:
          "Una divergencia ocurre cuando el precio de un activo y un indicador técnico, en este caso el RSI (Índice de Fuerza Relativa), se mueven en direcciones opuestas. Esto puede señalar un debilitamiento de la tendencia actual y una posible reversión.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Ejemplo de divergencia RSI",
        content: "Ejemplo de divergencia bajista en RSI en el gráfico de EUR/USD",
      },
      {
        type: "heading",
        level: 2,
        content: "Tipos de Divergencias",
      },
      {
        type: "list",
        items: [
          "Divergencia Bajista: El precio forma máximos más altos, pero el RSI forma máximos más bajos",
          "Divergencia Alcista: El precio forma mínimos más bajos, pero el RSI forma mínimos más altos",
          "Divergencia Oculta: Útil para identificar continuaciones de tendencia",
          "Divergencia Extendida: Ocurre a lo largo de múltiples máximos o mínimos",
        ],
        content: "Principales tipos de divergencias en RSI",
      },
      {
        type: "video",
        src: "https://www.example.com/videos/rsi-divergence-strategy.mp4",
        content: "Tutorial sobre cómo operar divergencias en RSI",
      },
      {
        type: "heading",
        level: 2,
        content: "Estrategia de Trading",
      },
      {
        type: "paragraph",
        content:
          "Para implementar una estrategia basada en divergencias de RSI, es importante seguir estos pasos: 1) Identificar la tendencia principal, 2) Buscar divergencias en el RSI, 3) Confirmar con otros indicadores o patrones de precio, 4) Establecer niveles claros de entrada, stop loss y take profit.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Estrategia de trading con RSI",
        content: "Ejemplo de operación basada en divergencia RSI en el mercado de Bitcoin",
      },
    ],
    categoria: "Análisis Técnico",
    mercado: "Múltiple",
    tendencia: "neutral",
  },
  {
    id: 4,
    titulo: "Tesla anuncia expansión en Asia, acciones suben 8%",
    fecha: "2025-03-08",
    autor: "Laura Sánchez",
    likes: 76,
    resumen:
      "Tesla ha anunciado una importante expansión en el mercado asiático, con nuevas fábricas en Corea del Sur y Tailandia.",
    contenido: [
      {
        type: "paragraph",
        content:
          "Tesla ha anunciado una importante expansión en el mercado asiático, con nuevas fábricas en Corea del Sur y Tailandia. Las acciones de la compañía subieron un 8% tras el anuncio, alcanzando nuevos máximos históricos.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Gráfico de acciones de Tesla",
        content: "Gráfico mostrando el aumento del 8% en las acciones de Tesla tras el anuncio",
      },
      {
        type: "heading",
        level: 2,
        content: "Detalles de la Expansión",
      },
      {
        type: "paragraph",
        content:
          "Según el comunicado oficial, Tesla invertirá más de $5 mil millones en estas nuevas instalaciones, que se espera estén operativas para finales de 2026. La fábrica de Corea del Sur se centrará en la producción de baterías avanzadas, mientras que la planta de Tailandia se dedicará al ensamblaje de vehículos para el mercado del sudeste asiático.",
      },
      {
        type: "quote",
        content:
          "Esta expansión representa un paso estratégico para consolidar nuestra presencia en Asia y reducir los costos logísticos para atender la creciente demanda en la región",
      },
      {
        type: "heading",
        level: 2,
        content: "Implicaciones para Inversores",
      },
      {
        type: "paragraph",
        content:
          "Para los inversores en Tesla, esta noticia refuerza la tesis de crecimiento global de la compañía. Los analistas de varios bancos de inversión han actualizado sus objetivos de precio para las acciones de Tesla, con un consenso que ahora apunta a un potencial alcista adicional del 15-20% en los próximos 12 meses.",
      },
      {
        type: "list",
        items: [
          "Aumento de la capacidad de producción global",
          "Reducción de costos logísticos para el mercado asiático",
          "Acceso a cadenas de suministro locales más eficientes",
          "Posible introducción de modelos específicos para el mercado asiático",
        ],
        content: "Beneficios clave de la expansión en Asia",
      },
    ],
    categoria: "Acciones",
    mercado: "NYSE",
    tendencia: "alcista",
  },
  {
    id: 5,
    titulo: "El petróleo cae tras aumento de inventarios en EE.UU.",
    fecha: "2025-03-05",
    autor: "Roberto Gómez",
    likes: 43,
    resumen:
      "Los precios del petróleo WTI han caído más de un 3% después de que el informe semanal mostrara un aumento inesperado en los inventarios de crudo de Estados Unidos.",
    contenido: [
      {
        type: "paragraph",
        content:
          "Los precios del petróleo WTI han caído más de un 3% después de que el informe semanal mostrara un aumento inesperado en los inventarios de crudo de Estados Unidos. Los traders ahora esperan la reacción de la OPEP+ en su próxima reunión.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Gráfico de precios del petróleo WTI",
        content: "Gráfico mostrando la caída del 3% en los precios del petróleo WTI",
      },
      {
        type: "heading",
        level: 2,
        content: "Datos de Inventarios",
      },
      {
        type: "paragraph",
        content:
          "Según el informe de la Administración de Información Energética (EIA), los inventarios de crudo en Estados Unidos aumentaron en 4.2 millones de barriles la semana pasada, muy por encima de las expectativas del mercado que anticipaban una disminución de 1.5 millones de barriles.",
      },
      {
        type: "quote",
        content:
          "Este aumento inesperado en los inventarios sugiere una debilidad en la demanda doméstica de Estados Unidos, lo que podría presionar a la OPEP+ a considerar recortes adicionales de producción",
      },
      {
        type: "heading",
        level: 2,
        content: "Perspectivas Técnicas",
      },
      {
        type: "paragraph",
        content:
          "Desde una perspectiva técnica, el petróleo WTI ha roto un importante nivel de soporte en los $72 por barril, lo que podría abrir el camino hacia los $68-$70 en las próximas sesiones. El RSI ha entrado en territorio de sobreventa, lo que podría indicar una posible estabilización o rebote a corto plazo.",
      },
      {
        type: "video",
        src: "https://www.example.com/videos/oil-market-analysis.mp4",
        content: "Análisis detallado del mercado petrolero",
      },
    ],
    categoria: "Commodities",
    mercado: "Petróleo",
    tendencia: "bajista",
  },
  {
    id: 6,
    titulo: "Guía completa: Gestión de riesgo en Forex",
    fecha: "2025-03-01",
    autor: "Elena Martín",
    likes: 95,
    resumen: "La gestión de riesgo es fundamental para el éxito a largo plazo en el trading de Forex.",
    contenido: [
      {
        type: "paragraph",
        content:
          "La gestión de riesgo es fundamental para el éxito a largo plazo en el trading de Forex. Este artículo detalla las mejores prácticas para proteger tu capital, incluyendo el tamaño adecuado de posición, el uso de stop loss y la diversificación de pares de divisas.",
      },
      {
        type: "heading",
        level: 2,
        content: "Principios Fundamentales de Gestión de Riesgo",
      },
      {
        type: "list",
        items: [
          "Nunca arriesgar más del 1-2% del capital en una sola operación",
          "Utilizar siempre órdenes de stop loss",
          "Mantener una relación riesgo-recompensa de al menos 1:2",
          "Diversificar entre diferentes pares de divisas",
          "Evitar el sobretrading y las decisiones emocionales",
        ],
        content: "Principios clave de gestión de riesgo en Forex",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Ejemplo de gestión de riesgo",
        content: "Ilustración de una correcta distribución del capital en diferentes operaciones",
      },
      {
        type: "heading",
        level: 2,
        content: "Cálculo del Tamaño de Posición",
      },
      {
        type: "paragraph",
        content:
          "El cálculo adecuado del tamaño de posición es quizás el aspecto más importante de la gestión de riesgo. Para determinar el tamaño correcto, debes considerar: 1) El tamaño de tu cuenta, 2) El porcentaje que estás dispuesto a arriesgar, 3) La distancia entre tu punto de entrada y tu stop loss.",
      },
      {
        type: "quote",
        content:
          "La mayoría de los traders profesionales no arriesgan más del 1% de su capital en una sola operación. Esto les permite soportar rachas perdedoras sin comprometer significativamente su capital",
      },
      {
        type: "video",
        src: "https://www.example.com/videos/forex-risk-management.mp4",
        content: "Tutorial sobre cálculo de tamaño de posición en Forex",
      },
      {
        type: "heading",
        level: 2,
        content: "Correlación entre Pares de Divisas",
      },
      {
        type: "paragraph",
        content:
          "Entender la correlación entre diferentes pares de divisas es esencial para una gestión de riesgo efectiva. Operar simultáneamente en pares altamente correlacionados puede multiplicar inadvertidamente tu exposición al riesgo, incluso si estás siguiendo la regla del 1-2% en cada operación individual.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800",
        alt: "Tabla de correlación de divisas",
        content: "Tabla mostrando la correlación entre los principales pares de divisas",
      },
    ],
    categoria: "Educación",
    mercado: "Forex",
    tendencia: "neutral",
  },
]

