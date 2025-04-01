"use client";
import { useAuth } from "@/components/contexts/auth/context";
// import { useEffect } from "react";

export default function Dashboard() {
  const { auth } = useAuth();

  console.log(auth);

  // const [userElements, setUserElements] =
  //   useState<null>(null);

  // useEffect(() => {
  //   obtenerDatosDashboard(auth?.id as string);
  // }, [auth?.id]);

  return <div>Dashboard</div>;
}
