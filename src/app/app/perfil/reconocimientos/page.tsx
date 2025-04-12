"use client";

import { obtenerReconocimientos } from "@/actions/app/perfil";
import TablaReconocimientosPerfil from "@/components/app/perfil/tabla-reconocimientos";
import { useAuth } from "@/components/contexts/auth/context";
import { Reconocimiento } from "@/types/perfil/reconocimientos";
import { useEffect, useState } from "react";

export default function ReconocimientosPerfilPage() {
  const { auth } = useAuth();
  const [data, setData] = useState<Reconocimiento[]>([]);

  useEffect(() => {
    (async () => {
      if (auth?.id)
        await obtenerReconocimientos(auth?.id).then((data) => setData(data));
    })();
  }, [auth?.id]);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-full flex-1">
        <h2 className="text-2xl font-bold">Reconocimientos</h2>
        <TablaReconocimientosPerfil reconocimientos={data} />
      </div>
    </>
  );
}
