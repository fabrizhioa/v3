"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  options: {
    valor: string;
    span: string;
  }[];
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder: string;
  defaultValue?: string;
}

const Select = ({
  className,
  value,
  onValueChange,
  defaultValue,
  label,
  options,
  placeholder,
}: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(
    defaultValue ?? (value || "")
  );
  const selectRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  console.log(defaultValue);

  React.useEffect(() => {
    setSelectedOption(value || "");
  }, [value]);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    setSelectedOption(optionValue);
    if (onValueChange) {
      onValueChange(optionValue);
    }
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <label className="py-1.5 pl-2 pr-2 text-sm font-semibold">
          {label}
        </label>
      )}
      <button
        type="button"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className
        )}
        onClick={() => handleSelectClick()}
      >
        <span>
          {selectedOption
            ? options.find((option) => option.valor === selectedOption)?.span
            : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
          <ul className="p-1 max-h-[200px] overflow-y-auto" ref={listRef}>
            {options.map((option) => (
              <li
                className={cn(
                  "relative flex w-full hover:bg-custom-yellow hover:text-accent-foreground select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer",
                  option.valor === selectedOption &&
                    "bg-accent text-accent-foreground"
                )}
                onClick={() => handleOptionClick(option.valor)}
                key={option.valor}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  {option.valor === selectedOption && (
                    <Check className="h-4 w-4" />
                  )}
                </span>
                {option.span}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Select };
