"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function UsuarioPage() {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // const usuario = await obtenerUsuario()
    }
  }, [id]);

  return <div>Usuario: {id}</div>;
}
