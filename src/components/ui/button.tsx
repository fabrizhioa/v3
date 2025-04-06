import { cn } from "@/lib/utils";
import * as React from "react";
const buttonVariants = ({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: string;
  size?: string;
  className?: string;
}) =>
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    variant === "secondary"
      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      : variant === "ghost"
      ? "hover:bg-accent hover:text-accent-foreground"
      : variant === "link"
      ? "text-primary underline-offset-4 hover:underline"
      : variant === "outline"
      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      : variant === "destructive"
      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      : "bg-primary text-primary-foreground hover:bg-primary/90",
    size === "sm"
      ? "h-9 rounded-md px-3"
      : size === "lg"
      ? "h-11 rounded-md px-8"
      : size === "icon"
      ? "h-10 w-10"
      : "h-10 px-4 py-2",
    className !== "" && className
  );

const Button = React.forwardRef<
  HTMLButtonElement,
  {
    disabled?: boolean;
    type?: "button" | "reset" | "submit";
    variant?: string;
    size?: string;
    className?: string;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
>(({ className, variant, size, onClick, ...props }, ref) => {
  const Comp = "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      type={props.type ?? "button"}
      onClick={onClick}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
