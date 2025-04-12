import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toaster";

import { useState } from "react";

export default function FormSeguridadPerfil({
  onSubmit,
}: {
  onSubmit: (datos: {
    old_password: string;
    new_password: string;
  }) => Promise<boolean>;
}) {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [verifyNewPassword, setVerifyNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addToast } = useToast();

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-4 max-w-screen-md w-full"
        onSubmit={async (event) => {
          event.preventDefault();

          setIsLoading(true);

          if (newPassword !== verifyNewPassword) {
            addToast({
              type: "error",
              title: "Las contraseñas no coinciden",
              description:
                "Por favor, verifique que las contraseñas coincidan.",
            });
            setIsLoading(false);
            return;
          }

          const updateData = {
            old_password: oldPassword,
            new_password: newPassword,
          };

          const update = await onSubmit(updateData);

          if (update) {
            setNewPassword("");
            setVerifyNewPassword("");
            setOldPassword("");
          }

          setIsLoading(false);
        }}
      >
        <div className="space-y-2 col-span-full">
          <label className="text-sm font-medium">Clave nueva</label>
          <Input
            placeholder="Clave nueva"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2 col-span-full">
          <label className="text-sm font-medium">Verificar clave nueva</label>
          <Input
            placeholder="Verificar clave nueva"
            type="password"
            value={verifyNewPassword}
            onChange={(e) => setVerifyNewPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>{" "}
        <div className="space-y-2 col-span-full">
          <label className="text-sm font-medium">Clave anterior</label>
          <Input
            placeholder="Clave anteriormente utilizada"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="col-span-full space-y-2">
          <Button type="submit" className="mx-auto justify-end">
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
}
