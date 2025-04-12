"use client";

import { useParams } from "next/navigation";

export default function UsuarioPage() {
  const { id } = useParams<{ id: string }>();
  return <>Usuario: {id}</>;
}
