/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";

interface CollapsibleProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CollapsibleContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error(
      "useCollapsibleContext debe ser usado dentro de un <Collapsible />"
    );
  }
  return context;
}

const Collapsible = ({
  children,
  open: controlledOpen,
  onOpenChange,
}: CollapsibleProps) => {
  const [open, setOpen] = React.useState(controlledOpen ?? false);

  const isControlled = controlledOpen !== undefined;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const contextValue = React.useMemo(
    () => ({
      open: isControlled ? controlledOpen ?? open : open,
      setOpen: (value: React.SetStateAction<boolean>) => {
        const newOpen = typeof value === "function" ? value(open) : value;
        handleOpenChange(newOpen);
      },
    }),
    [isControlled, controlledOpen, open, handleOpenChange]
  );

  return (
    <CollapsibleContext.Provider value={contextValue}>
      {children}
    </CollapsibleContext.Provider>
  );
};

const CollapsibleTrigger = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const { open, setOpen } = useCollapsibleContext();

  return (
    <button {...props} onClick={() => setOpen(!open)}>
      {children}
    </button>
  );
};

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, style, ...props }, ref) => {
  const { open } = useCollapsibleContext();

  return (
    <div
      ref={ref}
      style={{
        ...style,
        display: open ? "block" : "none",
      }}
      {...props}
    >
      {children}
    </div>
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
