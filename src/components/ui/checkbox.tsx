"use client";

import React, { useState, forwardRef, InputHTMLAttributes } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, defaultChecked, onCheckedChange, ...props }, ref) => {
    const [checked, setChecked] = useState(defaultChecked || false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };

    const checkboxClassName = cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      checked && "bg-primary text-primary-foreground",
      className
    );

    return (
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          className="opacity-0 absolute h-full w-full cursor-pointer"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div className={checkboxClassName}>
          {checked && (
            <div className="flex items-center justify-center text-current">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
