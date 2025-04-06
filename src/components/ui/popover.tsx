/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

type PopoverTriggerProps = React.HTMLAttributes<HTMLButtonElement>;

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const Popover = ({
  open: controlledOpen,
  onOpenChange,
  children,
  ...props
}: PopoverProps) => {
  const [isOpen, setIsOpen] = React.useState(controlledOpen || false);
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const open = controlledOpen !== undefined ? controlledOpen : isOpen;

  const handleOpenChange = (open: boolean) => {
    if (controlledOpen === undefined) {
      setIsOpen(open);
    }
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  const handleTriggerClick = () => {
    handleOpenChange(!open);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      open &&
      contentRef.current &&
      !contentRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      handleOpenChange(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick, open]);

  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === PopoverTrigger
  ) as React.ReactElement<PopoverTriggerProps> | undefined;

  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === PopoverContent
  ) as React.ReactElement<PopoverContentProps> | undefined;

  return (
    <div {...props}>
      {trigger &&
        React.cloneElement(trigger, {
          onClick: handleTriggerClick,
        })}
      {open && content && React.cloneElement(content)}
    </div>
  );
};

const PopoverTrigger = ({
  className,
  children,
  ...props
}: PopoverTriggerProps) => (
  <button type="button" className={className} {...props}>
    {children}
  </button>
);

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-50 w-72 absolute rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
