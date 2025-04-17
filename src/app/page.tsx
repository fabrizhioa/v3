"use client";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import CoursesSection from "@/components/landing/courses-section";
import AlertsSection from "@/components/landing/alerts-section";
import LiveClassesSection from "@/components/landing/live-classes-section";
import NewsPreviewSection from "@/components/landing/news-preview-section";
import FAQSection from "@/components/landing/faq-section";
import CTASection from "@/components/landing/cta-section";
import LandingHeader from "@/components/landing/header";
import LandingFooter from "@/components/landing/footer";
import { useEffect, useState } from "react";
import { getLandingData } from "@/actions/landing";
import {
  DatosAlertasLandingProps,
  DatosArticulosLandingProps,
  DatosCursosLandingProps,
  DatosEnvivosLandingProps,
} from "@/types/landing";

export default function Home() {
  const [cursos, setCursos] = useState<DatosCursosLandingProps[]>([]);
  const [alertas, setAlertas] = useState<DatosAlertasLandingProps[]>([]);
  const [lives, setLives] = useState<DatosEnvivosLandingProps[]>([]);
  const [articulos, setArticulos] = useState<DatosArticulosLandingProps[]>([]);

  useEffect(() => {
    (async () => {
      await getLandingData()
        .then((datos) => {
          setCursos(datos.cursos ?? []);
          setAlertas(datos.alertas ?? []);
          setLives(datos.lives ?? []);
          setArticulos(datos.articulos ?? []);
        })
        .catch(() => {
          console.error("Error fetching landing data");
          setCursos([]);
          setAlertas([]);
          setLives([]);
          setArticulos([]);
        });
    })();
  }, []);
  return (
    <>
      <LandingHeader />
      <main className="flex flex-col gap-3 w-full h-full">
        <HeroSection />
        <FeaturesSection />
        <CoursesSection cursos={cursos} />
        <AlertsSection alertas={alertas} />
        <LiveClassesSection envivos={lives} />
        <NewsPreviewSection articulos={articulos} />
        <FAQSection />
        <CTASection />
      </main>
      <LandingFooter />
    </>
  );
}
