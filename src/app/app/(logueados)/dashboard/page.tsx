"use client";
import { useAuth } from "@/contexts/auth/context";
import { useEffect, useState } from "react";
import { obtenerDatosDashboard } from "./action";

export default function Dashboard() {
  const { auth } = useAuth();

  const [userElements, setUserElements] =
    useState<null | DashboardUserDataProps>(null);

  useEffect(() => {
    obtenerDatosDashboard(auth?.id as string);
  }, []);

  return <div>Dashboard</div>;
}
