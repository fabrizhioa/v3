import type { Metadata } from "next";
import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Registro | Minds Over Market",
  description: "Crea una nueva cuenta en Minds Over Market",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center  gap-4 justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold">
              <span className="text-primary">Minds</span>
              <span className="text-foreground">Over</span>
              <span className="text-primary">Market</span>
            </span>
          </Link>
        </div>

        <AuthCard
          title="Crear cuenta"
          description="Regístrate para acceder a todas las funcionalidades de Minds Over Market"
        >
          <RegisterForm />
        </AuthCard>
      </div>
      <div className="">
        <Button variant="outline" size="sm">
          <Link href="/" className="flex items-center gap-2">
            <span>Volver al inicio</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
