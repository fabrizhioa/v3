"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export const AccordionContext = React.createContext<{
  openItems: string[];
  toggle: (value: string) => void;
}>({
  openItems: [],
  toggle: () => {},
});

export function Accordion({
  type = "single",
  collapsible = false,
  defaultValue,
  className,
  children,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    defaultValue ? [defaultValue] : []
  );

  const toggle = (value: string) => {
    if (type === "single") {
      if (openItems[0] === value) {
        setOpenItems(collapsible ? [] : [value]);
      } else {
        setOpenItems([value]);
      }
    } else {
      if (openItems.includes(value)) {
        setOpenItems(openItems.filter((item) => item !== value));
      } else {
        setOpenItems([...openItems, value]);
      }
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn("space-y-1", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: AccordionItemProps) {
  return (
    <div
      className={cn("border-b", className)}
      data-state={useAccordionItemState(value)}
    >
      {children}
    </div>
  );
}

export function AccordionTrigger({
  children,
  className,
}: AccordionTriggerProps) {
  const { toggle } = React.useContext(AccordionContext);
  const itemValue = React.useContext(ItemContext);

  return (
    <button
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      onClick={() => toggle(itemValue)}
      data-state={useAccordionItemState(itemValue)}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: AccordionContentProps) {
  const itemValue = React.useContext(ItemContext);
  const isOpen = useAccordionItemState(itemValue) === "open";

  return isOpen ? (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "animate-accordion-up",
        className
      )}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  ) : null;
}

// Helper context for passing the value down to children
const ItemContext = React.createContext<string>("");

export function AccordionRoot({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
}

// Helper hook to check if an item is open
function useAccordionItemState(value: string) {
  const { openItems } = React.useContext(AccordionContext);
  return openItems.includes(value) ? "open" : "closed";
}
