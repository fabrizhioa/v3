
// Función simple para formatear fechas (reemplazando date-fns)
function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date)
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

// Función para formatear fecha con mes en texto
function formatDateLong(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date)
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

// Función para formatear hora
function formatTime(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date)
  }

  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Función para calcular tiempo transcurrido
function getTimeSince(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `Hace ${diffMins} min`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `Hace ${diffHours}h ${diffMins % 60}m`

  const diffDays = Math.floor(diffHours / 24)
  return `Hace ${diffDays} días`
}

// Función para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Función para validar contraseña
function isStrongPassword(password: string): boolean {
  // Al menos 8 caracteres, una mayúscula, una minúscula y un número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

// Función para generar un ID único
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export  {
  formatDate,
  formatDateLong,
  formatTime,
  getTimeSince,
  isValidEmail,
  isStrongPassword,
  generateId,
}
