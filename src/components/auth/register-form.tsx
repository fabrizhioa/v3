"use client";

import { Progress } from "@/components/ui/progress";

import type React from "react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { registro } from "@/actions/auth";
import { useToast } from "../ui/toaster";

const calculatePasswordStrength = (password: string) => {
  if (!password) return 0;

  let strength = 0;
  // Length check
  if (password.length >= 8) strength += 20;
  // Uppercase check
  if (/[A-Z]/.test(password)) strength += 20;
  // Lowercase check
  if (/[a-z]/.test(password)) strength += 20;
  // Number check
  if (/[0-9]/.test(password)) strength += 20;
  // Special character check
  if (/[^A-Za-z0-9]/.test(password)) strength += 20;

  return strength;
};

export function RegisterForm() {
  const { addToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rf = searchParams.get("rf");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    usuario: "",
    correo: "",
    clave: "",
    confirmarClave: "",
    nombre_completo: "",
    pais: "",
    fecha_nacimiento: new Date(),
    terminos: false,
    genero: "",
    referente: rf ?? "",
  });

  const paises = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Ecuador",
    "El Salvador",
    "España",
    "Estados Unidos",
    "Guatemala",
    "Honduras",
    "México",
    "Nicaragua",
    "Panamá",
    "Paraguay",
    "Perú",
    "Puerto Rico",
    "República Dominicana",
    "Uruguay",
    "Venezuela",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Si es el campo de contraseña, calcular la fortaleza
    if (name === "clave") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terminos: checked }));
  };

  // const handleDateChange = (date: Date | undefined) => {
  //   if (date) {
  //     setFormData((prev) => ({ ...prev, fecha_nacimiento: date }));
  //     if (errors.fecha_nacimiento) {
  //       setErrors((prev) => ({ ...prev, fecha_nacimiento: "" }));
  //     }
  //   }
  // };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 40) return "bg-red-500";
    if (strength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 40) return "Débil";
    if (strength < 80) return "Moderada";
    return "Fuerte";
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      usuario: "",
      correo: "",
      clave: "",
      confirmarClave: "",
      nombre_completo: "",
      pais: "",
      fecha_nacimiento: "",
      terminos: "",
    };

    // Validar usuario
    if (!formData.usuario.trim()) {
      newErrors.usuario = "El usuario es requerido";
      valid = false;
    } else if (formData.usuario.length < 3) {
      newErrors.usuario = "El usuario debe tener al menos 3 caracteres";
      valid = false;
    } else if (formData.usuario.length > 16) {
      newErrors.usuario = "El usuario no puede tener más de 16 caracteres";
      valid = false;
    }

    // Validar correo
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo electrónico válido";
      valid = false;
    }

    // Validar contraseña
    if (!formData.clave) {
      newErrors.clave = "La contraseña es requerida";
      valid = false;
    } else if (formData.clave.length < 8) {
      newErrors.clave = "La contraseña debe tener al menos 8 caracteres";
      valid = false;
    } else if (!/[A-Z]/.test(formData.clave)) {
      newErrors.clave =
        "La contraseña debe contener al menos una letra mayúscula";
      valid = false;
    } else if (!/[a-z]/.test(formData.clave)) {
      newErrors.clave =
        "La contraseña debe contener al menos una letra minúscula";
      valid = false;
    } else if (!/[0-9]/.test(formData.clave)) {
      newErrors.clave = "La contraseña debe contener al menos un número";
      valid = false;
    }

    // Validar confirmación de contraseña
    if (formData.clave !== formData.confirmarClave) {
      newErrors.confirmarClave = "Las contraseñas no coinciden";
      valid = false;
    }

    // Validar nombre completo
    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = "El nombre completo es requerido";
      valid = false;
    } else if (formData.nombre_completo.length < 2) {
      newErrors.nombre_completo = "El nombre debe tener al menos 2 caracteres";
      valid = false;
    } else if (formData.nombre_completo.length > 45) {
      newErrors.nombre_completo =
        "El nombre no puede tener más de 45 caracteres";
      valid = false;
    }

    // Validar país
    if (!formData.pais) {
      newErrors.pais = "Selecciona un país";
      valid = false;
    }

    // Validar fecha de nacimiento
    const today = new Date();
    const birthDate = new Date(formData.fecha_nacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      newErrors.fecha_nacimiento =
        "Debes ser mayor de 18 años para registrarte";
      valid = false;
    }

    // Validar términos
    if (!formData.terminos) {
      newErrors.terminos = "Debes aceptar los términos y condiciones";
      valid = false;
    }
    return valid;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      alert("verifique los datos");
      return;
    }

    setIsLoading(true);
    const consulta = await registro({
      usuario: formData.usuario,
      correo: formData.correo,
      clave: formData.clave,
      nombre_completo: formData.nombre_completo,
      pais: formData.pais,
      fecha_nacimiento: new Date(formData.fecha_nacimiento),
      genero: formData.genero as "MASCULINO" | "FEMENINO" | "OTRO",
      referente_user: formData.referente ?? null,
    });

    if (consulta.success) {
      addToast({
        title: "Registro exitoso",
        description:
          "Tu cuenta en Minds Over Market ha sido creada correctamente",
      });
      router.push("/auth/login");
    } else if (consulta.error) {
      addToast({
        title: "Error al registrar",
        description: consulta.error,
        type: "error",
      });
      setIsLoading(false);
    }

    // if (success) {
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 col-span-full">
          <label htmlFor="nombre_completo" className="text-sm font-medium ">
            Nombre completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="nombre_completo"
              name="nombre_completo"
              placeholder="Juan Pérez"
              className="pl-10"
              value={formData.nombre_completo}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="usuario" className="text-sm font-medium">
            Nombre de usuario
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="usuario"
              name="usuario"
              placeholder="usuario123"
              className="pl-10"
              value={formData.usuario}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="correo" className="text-sm font-medium">
            Correo electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="correo"
              name="correo"
              placeholder="nombre@ejemplo.com"
              className="pl-10"
              value={formData.correo}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="pais" className="text-sm font-medium">
            País
          </label>
          <select
            id="pais"
            name="pais"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.pais}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">Selecciona un país</option>
            {paises.map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="genero" className="text-sm font-medium">
            Genero
          </label>
          <select
            id="genero"
            name="genero"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.genero}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">Selecciona un genero</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMENINO">Femenino</option>
            <option value="OTRO">Otro</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="fecha_nacimiento" className="text-sm font-medium">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={
              formData.fecha_nacimiento
                ? formData.fecha_nacimiento.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => {
              const date = new Date(e.target.value);
              setFormData((prev) => ({ ...prev, fecha_nacimiento: date }));
            }}
            disabled={isLoading}
          />
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
          {formData.clave && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Fortaleza de la contraseña:</span>
                <span
                  className={
                    passwordStrength >= 80
                      ? "text-green-500"
                      : passwordStrength >= 40
                      ? "text-yellow-500"
                      : "text-red-500"
                  }
                >
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <Progress
                value={passwordStrength}
                className="h-1"
                indicatorClassName={getPasswordStrengthColor(passwordStrength)}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmarClave" className="text-sm font-medium">
            Confirmar contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirmarClave"
              name="confirmarClave"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10"
              value={formData.confirmarClave}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">
                {showConfirmPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terminos"
          checked={formData.terminos}
          onCheckedChange={handleCheckboxChange}
          disabled={isLoading}
        />
        <label
          htmlFor="terminos"
          className="text-sm font-medium cursor-pointer"
        >
          Acepto los{" "}
          <Link href="/terminos" className="text-primary hover:underline">
            términos y condiciones
          </Link>{" "}
          de Minds Over Market
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

      <div className="text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:underline"
        >
          Inicia sesión
        </Link>
      </div>
    </form>
  );
}
