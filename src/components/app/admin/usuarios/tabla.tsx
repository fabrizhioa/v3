"use client";

import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  PlusIcon,
  UserCogIcon,
  UserIcon,
  ShieldUserIcon,
  UserXIcon,
  UserCheckIcon,
  CalendarIcon,
  GitBranchIcon,
  LockIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { bloquearUsuario, cambiarRol } from "@/actions/admin/usuarios";
import { UserListDataProps } from "@/types/admin/usuarios";
import { Input } from "@/components/ui/input";

interface UsuarioListPageProps {
  usuarios: UserListDataProps[];
  onRefresh: () => Promise<void>;
}

export default function TablaUsuarios({
  usuarios,
  onRefresh,
}: UsuarioListPageProps) {
  const [selectedMultipleUsers, setMultipleUsers] = useState<
    UserListDataProps[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<UserListDataProps | null>(
    null
  );
  const [cambiarRolDialogOpen, setCambiarRolDialogOpen] = useState(false);
  const [bloquearUsuarioDialogOpen, setBloquearUsuarioDialogOpen] =
    useState(false);

  const [filter, setFilter] = useState<UserListDataProps[]>(usuarios);

  const FiltredDateInitial = useRef<HTMLInputElement>(null);
  const FiltredDateEnded = useRef<HTMLInputElement>(null);
  const FiltredName = useRef<HTMLInputElement>(null);

  // Ordenar novedades de la más reciente a la más antigua

  // const formatDate = (dateString: string) => {
  //   const options: Intl.DateTimeFormatOptions = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };

  //   return new Date(dateString).toLocaleDateString("es-ES", options);
  // };

  const confirmarCambioRol = async () => {
    if (selectedMultipleUsers.length > 0) {
      setCambiarRolDialogOpen(false);
    }

    if (selectedUser !== null) {
      await cambiarRol(selectedUser.id, selectedUser.rol);
      await onRefresh();
      setCambiarRolDialogOpen(false);
    }
  };

  const confirmarBloqueoUsuario = async () => {
    if (selectedUser !== null) {
      await bloquearUsuario(selectedUser.id, selectedUser.bloqueado);
      await onRefresh();
      setBloquearUsuarioDialogOpen(false);
    }
  };

  const handleCambiarRolClick = async (usuario: UserListDataProps) => {
    setSelectedUser(usuario);
    setCambiarRolDialogOpen(true);
  };

  const handleBloqueoUsuario = async (usuario: UserListDataProps) => {
    setSelectedUser(usuario);
    setBloquearUsuarioDialogOpen(true);
  };

  function Filter() {
    const { value: filterText } = FiltredName.current as HTMLInputElement;
    const { value: filterDateInitial } =
      FiltredDateInitial.current as HTMLInputElement;
    const { value: filterDateEnded } =
      FiltredDateEnded.current as HTMLInputElement;

    const filtred = usuarios.filter((user) => {
      return (
        (user.nombre_completo
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
          filterText === "") &&
        (filterDateInitial === "" ||
          (new Date(filterDateInitial) <=
            new Date(user.fecha_creacion as Date) &&
            new Date(filterDateEnded) >=
              new Date(user.fecha_creacion as Date)) ||
          filterDateEnded === "")
      );
    });

    setFilter(filtred);
  }

  useEffect(() => {
    function Filter() {
      const { value: filterText } = FiltredName.current as HTMLInputElement;
      const { value: filterDateInitial } =
        FiltredDateInitial.current as HTMLInputElement;
      const { value: filterDateEnded } =
        FiltredDateEnded.current as HTMLInputElement;

      const filtred = usuarios.filter((user) => {
        return (
          (user.nombre_completo
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
            filterText === "") &&
          (filterDateInitial === "" ||
            (new Date(filterDateInitial) <=
              new Date(user.fecha_creacion as Date) &&
              new Date(filterDateEnded) >=
                new Date(user.fecha_creacion as Date)) ||
            filterDateEnded === "")
        );
      });

      setFilter(filtred);
    }
    Filter();
  }, [usuarios]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-white bg-darkslate rounded p-2 w-max">
          <h2 className="text-3xl font-bold">Lista de usuarios</h2>
          <p className="text-xs">Cantidad: {filter.length}</p>
        </div>
        <h3 className="block w-full text-2xl font-semibold text-primary">
          Filtros
        </h3>
        <div className="rounded w-full flex flex-wrap gap-3">
          <div className="p-3 flex gap-1 items-center rounded-lg bg-muted text-mutted-foreground flex-1 min-w-[240px]">
            <label className="text-xs w-full flex flex-col gap-1">
              <p>Nombre:</p>
              <Input
                type="text"
                placeholder="Ingresa nombre"
                ref={FiltredName}
                onChange={Filter}
              />
            </label>
          </div>
          <div className="p-3 flex gap-1 items-center rounded-lg bg-muted text-mutted-foreground flex-1 min-w-[240px]">
            <label className="text-xs w-full flex flex-col gap-1">
              <p>Fecha inicial</p>
              <Input type="date" ref={FiltredDateInitial} onChange={Filter} />
            </label>
          </div>
          <div className="p-3 flex gap-1 items-center rounded-lg bg-muted text-mutted-foreground flex-1 min-w-[240px]">
            <CalendarIcon />
            <label className="text-xs w-full flex flex-col gap-1">
              <p>Fecha final:</p>
              <Input type="date" ref={FiltredDateEnded} onChange={Filter} />
            </label>
          </div>
        </div>
        <div className="flex gap-4 items-end my-auto justify-end">
          <Button
            type="button"
            variant="primary"
            disabled={selectedMultipleUsers.length === 0}
            onClick={() => {}}
          >
            <PlusIcon className="text-xl" /> Añadir Elemento
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => setCambiarRolDialogOpen(true)}
            disabled={selectedMultipleUsers.length <= 1}
          >
            <GitBranchIcon /> Cambiar Roles
          </Button>

          <Button
            variant="secondary"
            type="button"
            onClick={() => setBloquearUsuarioDialogOpen(true)}
            disabled={selectedMultipleUsers.length <= 1}
          >
            <LockIcon /> Bloquear/Desbloquear Usuarios
          </Button>
        </div>
        <div className="rounded-md border space-y-4 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Título</TableHead>
                <TableHead className="text-center">
                  Instructor/Usuario
                </TableHead>
                <TableHead className="text-center">
                  Bloqueo/Desbloqueo
                </TableHead>
                <TableHead className="text-center">Asignar Elemento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No hay articulos disponibles
                  </TableCell>
                </TableRow>
              ) : (
                filter.map((usuario) => (
                  <TableRow
                    key={usuario.id}
                    className={
                      usuario.rol === "ADMIN" || usuario.rol === "DESARROLLADOR"
                        ? "bg-secondary"
                        : ""
                    }
                  >
                    <TableCell>
                      <button
                        type="button"
                        disabled={
                          usuario.rol === "ADMIN" ||
                          usuario.rol === "DESARROLLADOR"
                        }
                        className={cn(
                          "border-4 p-1.5 m-0 flex items-center justify-center rounded-full transition-all mx-auto",
                          selectedMultipleUsers.findIndex(
                            (mu) => mu.id === usuario.id
                          ) !== -1
                            ? "border-primary"
                            : ""
                        )}
                        onClick={() => {
                          if (
                            selectedMultipleUsers.findIndex(
                              (mu) => mu.id === usuario.id
                            ) !== -1
                          ) {
                            setMultipleUsers(
                              selectedMultipleUsers.filter(
                                (mu) => mu.id !== usuario.id
                              )
                            );
                          } else {
                            const newMultiple = [
                              ...selectedMultipleUsers,
                              {
                                id: usuario.id,
                                nombre_completo: usuario.nombre_completo,
                                rol: usuario.rol,
                                bloqueado: usuario.bloqueado,
                                fecha_creacion: usuario.fecha_creacion,
                              },
                            ];
                            setMultipleUsers(newMultiple);
                          }
                        }}
                      >
                        <div
                          className={cn(
                            "size-3 rounded-full transition-all ",
                            selectedMultipleUsers.findIndex(
                              (mu) => mu.id === usuario.id
                            ) !== -1
                              ? "bg-primary"
                              : "bg-transparent"
                          )}
                        />
                      </button>
                    </TableCell>
                    <TableCell className="font-medium flex flex-col">
                      <Link
                        href={`./usuarios/${usuario.id}`}
                        className="flex flex-col gap-1"
                      >
                        {usuario.nombre_completo}
                        <span className="text-xs">{usuario.id}</span>
                      </Link>
                    </TableCell>
                    {usuario.rol === "ADMIN" ||
                    usuario.rol === "DESARROLLADOR" ? (
                      <>
                        <TableCell colSpan={1}>
                          <span
                            className={buttonVariants({
                              variant: "primary",
                              className: "w-full",
                            })}
                          >
                            {usuario.rol} <UserCogIcon />
                          </span>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                      </>
                    ) : (
                      <>
                        <TableCell>
                          <Button
                            type="button"
                            variant={
                              usuario.rol === "INSTRUCTOR"
                                ? "secondary"
                                : "primary"
                            }
                            className="w-full"
                            onClick={() => handleCambiarRolClick(usuario)}
                          >
                            {usuario.rol === "INSTRUCTOR" ? (
                              <>
                                INSTRUCTOR <ShieldUserIcon />
                              </>
                            ) : (
                              <>
                                USUARIO <UserIcon />
                              </>
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            className="w-full"
                            variant={
                              !usuario.bloqueado ? "destructive" : "secondary"
                            }
                            onClick={() => handleBloqueoUsuario(usuario)}
                          >
                            {usuario.bloqueado ? (
                              <>
                                Desbloquear <UserCheckIcon />
                              </>
                            ) : (
                              <>
                                Bloquear <UserXIcon />
                              </>
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button type="button" variant="" className="w-full">
                            Asignar <PlusIcon />
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog
        open={bloquearUsuarioDialogOpen}
        onOpenChange={setBloquearUsuarioDialogOpen}
        className="max-w-lg"
      >
        <DialogTitle>Confirmar bloqueo/desbloqueo</DialogTitle>

        <DialogContent>
          <div className="flex flex-col gap-2">
            {selectedUser ? (
              <>
                <span className="">
                  {`¿Estás seguro de que deseas ${
                    selectedUser.bloqueado ? "desbloquear" : "bloquear"
                  } a este
                  usuario?`}
                </span>
                <div className="p-2 border rounded-md">
                  <h2>{selectedUser.nombre_completo}</h2>
                  <span className="text-xs">{selectedUser.id}</span>
                </div>
              </>
            ) : (
              <>
                {!selectedMultipleUsers.every((u) => u.bloqueado) && (
                  <>
                    <span className="">
                      ¿Estás seguro de que deseas bloquear a estos usuarios
                    </span>
                    {selectedMultipleUsers
                      .filter((u) => u.bloqueado)
                      .map((u) => (
                        <div className="p-2 border rounded-md" key={u.id}>
                          <h2>{u.nombre_completo}</h2>
                          <span className="text-xs">{u.id}</span>
                        </div>
                      ))}
                  </>
                )}
                {!selectedMultipleUsers.every((u) => !u.bloqueado) && (
                  <>
                    <span className="">
                      ¿Estás seguro de que deseas desbloquear a estos usuarios
                    </span>
                    {selectedMultipleUsers
                      .filter((u) => !u.bloqueado)
                      .map((u) => (
                        <div className="p-2 border rounded-md" key={u.id}>
                          <h2>{u.nombre_completo}</h2>
                          <span className="text-xs">{u.id}</span>
                        </div>
                      ))}
                  </>
                )}
              </>
            )}

            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setBloquearUsuarioDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmarBloqueoUsuario}>
                Bloquear
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={cambiarRolDialogOpen}
        onOpenChange={setCambiarRolDialogOpen}
        className="max-w-lg"
      >
        <DialogTitle>Confirmar cambio de rol</DialogTitle>

        <DialogContent>
          <div className="flex flex-col gap-2">
            {selectedUser ? (
              <>
                <span className="">
                  {`¿Estás seguro de que deseas volver ${
                    selectedUser.rol === "INSTRUCTOR" ? "usuario" : "instructor"
                  } a este
                ${
                  selectedUser.rol === "INSTRUCTOR" ? "instructor" : "usuario"
                }?`}
                </span>
                <div className="p-2 border rounded-md">
                  <h2>{selectedUser.nombre_completo}</h2>
                  <span className="text-xs">{selectedUser.id}</span>
                </div>
              </>
            ) : (
              <>
                {!selectedMultipleUsers.every(
                  (u) => u.rol === "INSTRUCTOR"
                ) && (
                  <>
                    <span className="">
                      {`¿Estás seguro de que deseas volver instructores a estos usuarios?`}
                    </span>
                    {selectedMultipleUsers
                      .filter((u) => u.rol === "USUARIO")
                      .map((u) => (
                        <div className="p-2 border rounded-md" key={u.id}>
                          <h2>{u.nombre_completo}</h2>
                          <span className="text-xs">{u.id}</span>
                        </div>
                      ))}
                  </>
                )}
                {!selectedMultipleUsers.every((u) => u.rol === "USUARIO") && (
                  <>
                    <span className="">
                      ¿Estás seguro de que deseas volver usuarios a estos
                      instructores
                    </span>
                    {selectedMultipleUsers
                      .filter((u) => u.rol === "INSTRUCTOR")
                      .map((u) => (
                        <div className="p-2 border rounded-md" key={u.id}>
                          <h2>{u.nombre_completo}</h2>
                          <span className="text-xs">{u.id}</span>
                        </div>
                      ))}
                  </>
                )}
              </>
            )}

            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setCambiarRolDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" onClick={confirmarCambioRol}>
                Cambiar el rol
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
