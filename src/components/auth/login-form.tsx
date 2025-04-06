"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/contexts/auth/context";
import { ingreso } from "@/actions/auth";
import { useToast } from "../ui/toaster";

export default function LoginForm() {
  const toast = useToast();
  const { authDispatch } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usuario: "",
    clave: "",
    recordar: false,
  });
  const [errors, setErrors] = useState({
    usuario: "",
    clave: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error al cambiar el valor
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { usuario: "", clave: "" };

    if (!formData.usuario.trim()) {
      newErrors.usuario = "El usuario o correo es requerido";
      valid = false;
    }

    if (!formData.clave) {
      newErrors.clave = "La contraseña es requerida";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // toast.addToast({
    //   title: "Acceso Denegado",
    //   description: "El acceso aun no se encuentra disponible",
    //   type: "error",
    // });

    // return;

    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const consulta = await ingreso({
      usuario: formData.usuario,
      clave: formData.clave,
    });

    if (consulta.error) {
      toast.addToast({
        title: "Error de inicio de sesión",
        description: consulta.error,
        type: "error",
      });
      setIsLoading(false);
    } else if (consulta.datos && consulta.token) {
      toast.addToast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a Minds Over Market",
      });
      authDispatch({ type: "login", payload: consulta.datos });
      localStorage.setItem("token", consulta.token);
      // router.push("/app");
    } else {
      toast.addToast({
        title: "Error de inicio de sesión",
        description: "No se pudo ingresar a la cuenta. Inténtalo de nuevo.",
        type: "error",
      });
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="usuario" className="text-sm font-medium">
          Usuario o correo electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="usuario"
            name="usuario"
            placeholder="nombre@ejemplo.com"
            className="pl-10"
            value={formData.usuario}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        {errors.usuario && (
          <p className="text-sm text-red-500">{errors.usuario}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="clave" className="text-sm font-medium">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="clave"
            name="clave"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            value={formData.clave}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </span>
          </Button>
        </div>
        {errors.clave && <p className="text-sm text-red-500">{errors.clave}</p>}
      </div>

      {/* <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="recordar"
            checked={formData.recordar}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            disabled={isLoading}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor="recordar"
            className="text-sm font-medium cursor-pointer"
          >
            Recordarme
          </label>
        </div>
        <Link
          href="/auth/recuperar-clave"
          className="text-sm font-medium text-primary hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div> */}

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-primary hover:underline"
        >
          Regístrate
        </Link>
      </div>
    </form>
  );
}
