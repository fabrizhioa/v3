"use client";
import { useAuth } from "@/components/contexts/auth/context";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAuth();
  if (isLogged) return redirect("/app");
  return <>{children}</>;
}
