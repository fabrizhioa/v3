"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  options: {
    valor: string;
    span: string;
  }[];
  onValueChange?: (
    value: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
}

const Select = ({
  id,
  name,
  className,
  value,
  onValueChange,
  defaultValue,
  label,
  options,
  disabled,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = React.useState(
    defaultValue ?? (value || "")
  );

  React.useEffect(() => {
    setSelectedOption(value || "");
  }, [value]);

  return (
    <select
      id={id}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      value={selectedOption}
      defaultValue={defaultValue}
      onChange={(e) => {
        if (onValueChange) onValueChange(e);
      }}
      name={name}
      disabled={disabled}
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option.valor} value={option.valor}>
          {option.span}
        </option>
      ))}
    </select>
  );
};

export { Select };
