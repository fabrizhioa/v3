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
import { Articulo } from "@/types/articulos";

interface ArticulosLandingProps extends Articulo {
  autor: {
    nombre_completo: string;
  };
}

export default function Home() {
  const [cursos, setCursos] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [lives, setLives] = useState([]);
  const [articulos, setArticulos] = useState<ArticulosLandingProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  });
  return (
    <>
      <LandingHeader />
      <main className="flex flex-col gap-3 w-full h-full">
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <AlertsSection />
        <LiveClassesSection />
        <NewsPreviewSection articulos={articulos} />
        <FAQSection />
        <CTASection />
      </main>
      <LandingFooter />
    </>
  );
}
