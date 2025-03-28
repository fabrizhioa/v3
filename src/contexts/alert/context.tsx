"use client";
import Alert from "@/components/common/Alert";
import { AlertContextProps, AlertProps } from "@/types/alert";
import { createContext, useContext, useState } from "react";

export const AlertContext = createContext({} as AlertContextProps);

export const useAlertModal = () => useContext(AlertContext);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alertState, setAlert] = useState<false | AlertProps>(false);

  function createAlert(
    type: string,
    message: string,
    additionalAction?: () => void,
    buttonText?: string
  ): void {
    setAlert({ type, message, additionalAction, buttonText });
  }

  function clearAlert() {
    setAlert(false);
  }

  return (
    <AlertContext.Provider value={{ createAlert, clearAlert }}>
      {alertState && <Alert {...alertState} />}
      {children}
    </AlertContext.Provider>
  );
};
