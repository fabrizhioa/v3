"use client";
import { obtenerUsuarios } from "@/actions/admin/usuarios";
import TablaUsuarios from "@/components/app/admin/usuarios/tabla";
import { UserListDataProps } from "@/types/admin/usuarios";
import React, { useEffect, useState } from "react";

const AdminUsuariosPage = () => {
  const [usuarios, setUsuarios] = useState<UserListDataProps[]>([]);

  async function obtenerDatos() {
    const resultado = await obtenerUsuarios();
    setUsuarios(resultado);
  }

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <div>
      <TablaUsuarios usuarios={usuarios} onRefresh={obtenerDatos} />
    </div>
  );
};

export default AdminUsuariosPage;
