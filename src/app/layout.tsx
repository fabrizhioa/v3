import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/components/contexts/auth/context";
import { Toaster, ToastProvider } from "@/components/ui/toaster";

const PoppinsFont = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minds Over Market",
  description: "Academia de trading profesional fundada en 2019",
  authors: {
    name: "Fabrizhio Al chariti",
    url: "https://linkedin.com/in/fabrizhioa",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  keywords: [
    "minds",
    "minds over market",
    "market",
    "trade",
    "trading",
    "2022",
    "2023",
    "2024",
    "2025",
    "forex",
    "indices",
    "crypto",
    "academia",
    "webinars",
    "señales",
    "signals",
    "courses",
    "cursos",
    "long",
    "short",
    "webinarios",
  ],
  icons: {
    icon: "/assets/icons/Icon_512.png",
    apple: "/assets/icons/Icon_512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${PoppinsFont.className} antialiased flex flex-col min-h-dvh text-white dark`}
      >
        <ToastProvider>
          <AuthContextProvider>
            {children}
            <Toaster />
          </AuthContextProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
