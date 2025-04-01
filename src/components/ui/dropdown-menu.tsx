"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Componente simplificado de DropdownMenu sin depender de Radix UI
export interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className="relative">{children}</div>;
}

export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      className="inline-flex items-center justify-center"
    >
      {children}
    </button>
  );
}

export interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

export function DropdownMenuContent({
  children,
  className,
  align = "center",
}: DropdownMenuContentProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Efecto para mostrar el menú cuando el trigger cambia a "open"
  React.useEffect(() => {
    const trigger = document.querySelector('[data-state="open"]');
    setIsOpen(!!trigger);

    // Cerrar el menú al hacer clic fuera
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !e.target) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        {
          "left-0": align === "start",
          "left-1/2 -translate-x-1/2": align === "center",
          "right-0": align === "end",
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DropdownMenuItem({
  children,
  className,
  onClick,
}: DropdownMenuItemProps) {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export interface DropdownMenuLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenuLabel({
  children,
  className,
}: DropdownMenuLabelProps) {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("h-px bg-muted my-1", className)} />;
}
