export type ContentElement = {
  type: "paragraph" | "image" | "video" | "quote" | "heading" | "list"
  content: string
  src?: string
  alt?: string
  level?: 1 | 2 | 3
  items?: string[]
}

// Tipo para los datos de novedades de trading
export type NovedadTrading = {
  id: number
  titulo: string
  fecha: string
  autor: string
  likes: number
  contenido: ContentElement[]
  categoria: string
  mercado: string
  tendencia?: "alcista" | "bajista" | "neutral"
  resumen?: string
}

