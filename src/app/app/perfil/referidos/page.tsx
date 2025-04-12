"use client";
import { obtenerReferidos } from "@/actions/app/perfil";
import TablaReferidosPerfil from "@/components/app/perfil/tabla-referidos";
import { useAuth } from "@/components/contexts/auth/context";
import { Referido } from "@/types/perfil/referidos";
import { useEffect, useState } from "react";

export default function ReferidosPerfilPage() {
  const { auth } = useAuth();
  const [data, setData] = useState<Referido[]>([]);

  useEffect(() => {
    (async () => {
      if (auth?.usuario)
        await obtenerReferidos(auth?.usuario).then((data) => setData(data));
    })();
  }, [auth?.usuario]);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-full flex-1">
        <h2 className="text-2xl font-bold">Referidos</h2>
        <TablaReferidosPerfil referidos={data} />
      </div>
    </>
  );
}
