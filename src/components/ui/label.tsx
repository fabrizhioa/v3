"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, ...props }, ref) => {
    const baseClasses =
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
    let variantClasses = "";

    if (variant === "secondary") {
      variantClasses = "text-gray-500";
    } else if (variant === "accent") {
      variantClasses = "text-blue-500";
    }

    return (
      <label
        ref={ref}
        className={cn(baseClasses, variantClasses, className)}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
