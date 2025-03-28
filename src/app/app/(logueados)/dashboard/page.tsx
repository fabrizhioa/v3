"use client";
import { useAuth } from "@/contexts/auth/context";
import { useEffect } from "react";
import { obtenerDatosDashboard } from "./action";

export default function Dashboard() {
  const { auth } = useAuth();

  // const [userElements, setUserElements] =
  //   useState<null>(null);

  useEffect(() => {
    obtenerDatosDashboard(auth?.id as string);
  }, [auth?.id]);

  return <div>Dashboard</div>;
}
