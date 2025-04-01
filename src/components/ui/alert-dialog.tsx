"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const AlertDialog = ({ open, children }: AlertDialogProps) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            {children}
          </div>
        </div>
      )}
      {!open && null}
    </>
  );
};

interface AlertDialogTriggerProps {
  children: React.ReactNode;
  onClick: () => void;
}

const AlertDialogTrigger = ({ children, onClick }: AlertDialogTriggerProps) => {
  return <div onClick={onClick}>{children}</div>;
};

const AlertDialogContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

type AlertDialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => (
  <h2 className={cn("text-lg font-semibold", className)} {...props} />
);
AlertDialogTitle.displayName = "AlertDialogTitle";

type AlertDialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const AlertDialogDescription = ({
  className,
  ...props
}: AlertDialogDescriptionProps) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);
AlertDialogDescription.displayName = "AlertDialogDescription";

interface AlertDialogActionProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const AlertDialogAction = ({
  className,
  onClick,
  ...props
}: AlertDialogActionProps) => (
  <button
    onClick={onClick}
    className={cn(buttonVariants({}), className)}
    {...props}
  />
);
AlertDialogAction.displayName = "AlertDialogAction";

interface AlertDialogCancelProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const AlertDialogCancel = ({
  className,
  onClick,
  ...props
}: AlertDialogCancelProps) => (
  <button
    onClick={onClick}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
