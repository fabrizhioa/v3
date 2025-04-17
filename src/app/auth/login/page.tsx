import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Iniciar sesión | Minds Over Market",
  description: "Inicia sesión en tu cuenta de Minds Over Market",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="w-full max-w-md flex items-center flex-col gap-4">
        <div className="mb-4 text-center">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold">
              <span className="text-primary">Minds</span>
              <span className="text-foreground">Over</span>
              <span className="text-primary">Market</span>
            </span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Iniciar sesión
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
        <div className="">
          <Button variant="ghost" size="sm">
            <Link href="/" className="flex items-center gap-2">
              <span>Volver al inicio</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
