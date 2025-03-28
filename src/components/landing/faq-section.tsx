import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "¿Qué nivel de experiencia necesito para unirme?",
      answer:
        "Nuestra plataforma está diseñada para traders de todos los niveles. Tenemos cursos para principiantes que comienzan desde cero, así como contenido avanzado para traders experimentados que buscan perfeccionar sus estrategias.",
    },
    {
      question: "¿Cómo funcionan las alertas de trading?",
      answer:
        "Las alertas de trading se envían en tiempo real a través de notificaciones en la plataforma, correo electrónico o mensajes de texto. Puedes personalizar tus alertas según tus preferencias, mercados específicos y criterios técnicos.",
    },
    {
      question:
        "¿Puedo acceder a las clases en vivo si no puedo asistir en el horario programado?",
      answer:
        "Sí, todas nuestras clases en vivo se graban y están disponibles en la biblioteca de contenido para que puedas verlas cuando te sea conveniente. Sin embargo, recomendamos asistir en vivo para poder interactuar con el instructor y hacer preguntas.",
    },
    {
      question: "¿Qué mercados cubren los cursos y las alertas?",
      answer:
        "Cubrimos una amplia gama de mercados financieros, incluyendo forex, acciones, índices, materias primas, futuros y criptomonedas. Nuestro contenido está constantemente actualizado para reflejar las condiciones actuales del mercado.",
    },
    {
      question: "¿Ofrecen garantía de resultados?",
      answer:
        "El trading implica riesgo y no podemos garantizar resultados específicos, ya que estos dependen de muchos factores, incluyendo la disciplina del trader, el capital disponible y las condiciones del mercado. Sin embargo, nos comprometemos a proporcionar educación de alta calidad y herramientas que, cuando se aplican correctamente, pueden mejorar significativamente tus habilidades de trading.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Respuestas a las preguntas más comunes sobre nuestra plataforma y
            servicios.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionRoot key={index} value={`item-${index}`}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </AccordionRoot>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
