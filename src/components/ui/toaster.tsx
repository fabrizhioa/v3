"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Tipos para el sistema de toast
type ToastProps = {
  id: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  type?: "default" | "success" | "error" | "warning";
};

type ToastContextType = {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
};

// Crear contexto para el sistema de toast
const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

// Proveedor de toast
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

// Hook para usar el sistema de toast
export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Componente Toast individual
function Toast({
  title,
  description,
  action,
  type = "default",
  onClose,
}: ToastProps & { onClose: () => void }) {
  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        {
          "bg-background text-foreground": type === "default",
          "bg-green-50 text-green-900 dark:bg-green-900 dark:text-green-50":
            type === "success",
          "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50":
            type === "error",
          "bg-yellow-50 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-50":
            type === "warning",
        }
      )}
    >
      <div className="grid gap-1">
        <div className="text-sm font-semibold">{title}</div>
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action}
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}

// Componente Toaster que muestra todos los toasts
export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-0 z-[100] flex flex-col items-end gap-2 px-4 pt-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col-reverse sm:items-end sm:pb-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
