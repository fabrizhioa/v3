import React from "react";

export type AlertProviderProps = {
  children: React.ReactNode;
};

export type AlertProps = {
  type: string;
  message: string;
  additionalAction?: () => void;
  buttonText?: string;
};

export type AlertContextProps = {
  createAlert: (
    type: string,
    message: string,
    additionalAction?: () => void,
    buttonText?: string
  ) => void;
  clearAlert: () => void;
};
